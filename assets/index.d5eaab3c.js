import{j as n,a as e,F as y,r as l,b as N,M as v,T as _,c as P,P as x,d as I,R as S,e as b}from"./vendor.42481960.js";const w=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&d(a)}).observe(document,{childList:!0,subtree:!0});function c(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(t){if(t.ep)return;t.ep=!0;const r=c(t);fetch(t.href,r)}};w();function M(){return n("div",{className:"lds-ellipsis",children:[e("div",{}),e("div",{}),e("div",{}),e("div",{})]})}function O({ipInfo:o,loading:i}){return e("div",{className:"results",children:i?e("div",{style:{display:"flex",justifyContent:"center",width:"100%"},children:e(M,{})}):n(y,{children:[n("div",{className:"result",children:[e("small",{className:"result__title",children:"ip address"}),e("p",{className:"result__text",children:o.ip})]}),n("div",{className:"result",children:[e("small",{className:"result__title",children:"location"}),e("p",{className:"result__text",children:o.location||"No location registered"})]}),n("div",{className:"result",children:[e("small",{className:"result__title",children:"timezone"}),e("p",{className:"result__text",children:o.timezone||"No timezone registered"})]}),n("div",{className:"result",children:[e("small",{className:"result__title",children:"ISP"}),e("p",{className:"result__text",children:o.isp||"No ISP registered"})]})]})})}var z="/ip-geolocator/assets/icon-arrow.01e6ab28.svg";function L({onSubmitIPHandler:o}){const[i,c]=l.exports.useState(""),[d,t]=l.exports.useState({ip:"",location:"",coords:"",timezone:"",isp:""}),[r,a]=l.exports.useState(""),[f,u]=l.exports.useState(!1),g=()=>!!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(i),p=async()=>{try{u(!0);const{data:s}=await N(`https://geo.ipify.org/api/v2/country,city?apiKey=at_Pjdp9AgXwcEzrs8P2e4tibZtMpWuj&ipAddress=${i}`),h=[s.location.lat,s.location.lng];t({ip:s.ip,location:s.location.city,timezone:s.location.timezone,coords:h,isp:s.isp}),c(s.ip),o(h)}catch(s){a("Woops, looks like something went wrong"),console.error(s)}finally{u(!1)}},m=()=>{g()?(p(),a("")):a("Looks like you wrote an invalid IP Address")};return l.exports.useEffect(()=>{p()},[]),n("div",{className:"header",children:[e("h1",{className:"header__title",children:"IP Address tracker"}),n("div",{className:"search",children:[e("input",{placeholder:"Search for any IP address or domain",className:r?"search__input hasError":"search__input",onChange:s=>c(s.target.value),value:i,type:"text",onKeyPress:s=>s.key==="Enter"?m():()=>{}}),e("button",{className:"search__button",onClick:()=>m(),children:e("img",{src:z,alt:"icon"})})]}),r&&e("span",{className:"error",children:r}),e(O,{ipInfo:d,loading:f})]})}function k(){const o=l.exports.createRef(),[i,c]=l.exports.useState([]);return n("div",{className:"main-wrapper",children:[e(L,{onSubmitIPHandler:t=>{o.current&&(c(t),o.current.flyTo(t,15))}}),e("div",{className:"map",id:"map",children:n(v,{center:[10.963889,-74.796387],zoom:2,style:{height:"100%"},children:[e(_,{attribution:'\xA9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),i.length===0?"":e(P,{position:i,children:e(x,{children:"Current IP position"})}),e(I,{children:t=>(o.current=t,null)})]})})]})}S.render(e(b.StrictMode,{children:e(k,{})}),document.getElementById("root"));