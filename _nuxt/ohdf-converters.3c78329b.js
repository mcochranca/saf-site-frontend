import{_ as c}from"./LibraryPage.vue.9a174bd7.js";import{u as l,t as u}from"./gql.fe79ec12.js";import{g as e,i as y,j as m,v as p,u as t,o as _}from"./entry.440bc1c4.js";import"./components.3aad7ae9.js";const P={__name:"ohdf-converters",setup(b){const r=e(!1),n=e(""),s=e(""),o=async()=>{await l("getLibraryPageByName",()=>u({name:"OHDF Converters"}),{initialCache:!1}).then(({data:a})=>{n.value=a.value.libraryPages.data[0].attributes.content,s.value=a.value.libraryPages.data[0].attributes.library})};return y(async()=>{await m(async()=>{await o(),r.value=!0})}),(a,f)=>{const i=c;return _(),p(i,{"is-loaded":t(r),"page-title":t(s),"library-content":t(n)},null,8,["is-loaded","page-title","library-content"])}}};export{P as default};
