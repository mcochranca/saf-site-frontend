<template>
  <TransitionRoot
    :show="props.isCommandPaletteOpen"
    as="template"
    appear
    @after-leave="query = ''"
  >
    <Dialog
      as="div"
      class="relative z-50"
      @close="$emit('update:isCommandPaletteOpen', false)"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-blur bg-opacity-90 transition-opacity" />
      </TransitionChild>

      <div
        class="fixed inset-0 z-50 mt-20 overflow-y-auto text-foreground text-xl"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class="mx-auto mt-5 max-w-5xl transform divide-y divide-accent overflow-hidden rounded-xl bg-neutral-1 shadow-2xl ring-1 ring-accent ring-opacity-5 transition-all dark:divide-opacity-20"
          >
            <Combobox>
              <div class="relative">
                <Search
                  class="pointer-events-none absolute left-4 top-3.5 h-5 w-5"
                  aria-hidden="true"
                />
                <ComboboxInput
                  class="h-12 w-full border-0 bg-transparent pl-11 pr-4 placeholder:focus:ring-0 text-lg placeholder:text-foreground"
                  placeholder="Search..."
                  @change="query = $event.target.value"
                />
              </div>

              <ComboboxOptions
                v-if="Object.keys(filteredItems).length > 0"
                static
                class="max-h-96 scroll-py-3 overflow-y-auto p-3"
              >
                <div
                  v-for="section in Object.keys(filteredItems)"
                  :key="section"
                  class="mb-2"
                >
                  <h1 class="mb-1 font-bold">{{ section }}</h1>
                  <ComboboxOption
                    v-for="item in filteredItems[section]"
                    :key="item.id"
                    v-slot="{active}"
                    :value="item"
                    as="template"
                  >
                    <li
                      :class="[
                        'flex cursor-default select-none rounded-xl p-3',
                        active && 'bg-neutral-2 '
                      ]"
                    >
                      <a
                        :href="`/docs/${item.subsection_href}`"
                        class="ml-4 flex-auto"
                      >
                        <p :class="['font-semibold', active ? '' : '']">
                          {{ item.subsection_title }}
                        </p>
                        <p
                          :class="['', active ? 'text-muted ' : 'text-muted ']"
                        >
                          {{
                            item.text_found !== ''
                              ? item.text_found + '...'
                              : ''
                          }}
                        </p>
                      </a>
                    </li>
                  </ComboboxOption>
                </div>
              </ComboboxOptions>

              <div
                v-if="query !== '' && Object.keys(filteredItems).length === 0"
                class="px-6 py-14 text-center sm:px-14"
              >
                <AlertTriangle class="mx-auto h-6 w-6" />
                <p class="mt-4 font-semibold">No results found</p>
                <p class="mt-2 text-muted">
                  No results found for this search term. Please try again.
                </p>
              </div>
            </Combobox>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {computed, ref, onMounted, nextTick} from 'vue';
import {Search, AlertTriangle} from 'lucide-vue-next';
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue';

/*   Data   */
const isLoaded = ref(false);
const results = ref<DocumentationCommandPaletteResult[]>();
const query = ref('');

const props = defineProps({
  isCommandPaletteOpen: {
    type: Boolean,
    required: true
  }
});

// Updates parent isCommandPaletteOpen variable
defineEmits(['update:isCommandPaletteOpen']);

/*   Methods   */
const getDocumentation = async () => {
  results.value = await useAsyncData('getAllDocumentation', () =>
    GqlGetAllDocumentation()
  ).then(({data}) => {
    const newArray: DocumentationCommandPaletteResult[] = [];

    data?.value?.documentations?.data.forEach((section) => {
      section?.attributes?.subsections.forEach((sub) => {
        newArray.push({
          id: section?.id ?? 'Error',
          section_title: section?.attributes?.section_title ?? 'Error',
          subsection_title: sub?.title ?? 'Error',
          // Replaces are used to take out html characters that shouldn't be searchable
          subsection_content:
            sub?.content
              ?.replace(/<\/?[^>]+(>|$)/g, ' ')
              .replace(/&nbsp/g, ' ')
              .replace(/&lt/g, '<')
              .replace(/&gt/g, '>') ?? 'Error',
          subsection_href: sub?.href ?? 'Error',
          text_found: null
        });
      });
    });

    return newArray;
  });
};

const filteredItems = computed(() => {
  if (query.value === '') {
    return {};
  }
  const resultsMappedObj: {[key: string]: DocumentationCommandPaletteResult[]} =
    {};

  const filteredResults = results?.value?.filter(
    (result) =>
      result.section_title.toLowerCase().includes(query.value.toLowerCase()) ||
      result.subsection_title
        .toLowerCase()
        .includes(query.value.toLowerCase()) ||
      result.subsection_content
        .toLowerCase()
        .includes(query.value.toLowerCase())
  );

  if (filteredResults) {
    for (const result of filteredResults) {
      const findIndex = result.subsection_content
        .toLowerCase()
        .indexOf(query.value.toLowerCase());
      let startIndex = -1;
      let endIndex = -1;
      let resultText = '';

      // If the substring will be out of range at the start
      if (findIndex - 50 <= 0) {
        startIndex = 0;
      } else {
        startIndex = findIndex - 50;
        resultText += '...';
      }

      // If the substring will be out of range at the end
      if (findIndex + 50 >= result.subsection_content.length) {
        endIndex = result.subsection_content.length;
      } else {
        endIndex = findIndex + 50;
      }

      result.text_found =
        findIndex !== -1
          ? resultText +
            result.subsection_content.substring(startIndex, endIndex)
          : '';

      // Add result to the mapping of sections
      if (result.section_title in resultsMappedObj) {
        resultsMappedObj[result.section_title].push(result);
      } else {
        resultsMappedObj[result.section_title] = [result];
      }
    }
  }
  return resultsMappedObj;
});

/*   Lifecycle   */
onMounted(async () => {
  await nextTick(async () => {
    await getDocumentation();
    isLoaded.value = true;
  });
});
</script>
