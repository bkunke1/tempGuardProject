!function(e){var t={};function n(s){if(t[s])return t[s].exports;var d=t[s]={i:s,l:!1,exports:{}};return e[s].call(d.exports,d,d.exports,n),d.l=!0,d.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var d in e)n.d(s,d,function(t){return e[t]}.bind(null,d));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}({2:function(e,t){const n=document.getElementById("settingsEditCompanyInfo"),s=document.getElementById("settingsSaveCompanyInfo"),d=()=>{document.getElementById("company-info-toggle").disabled=!1,document.getElementById("companyName").focus(),document.getElementById("companyName").select()};n&&n.addEventListener("click",d);const i=()=>{let e=document.getElementById("companyName").value,t=document.getElementById("inputAddress").value,n=document.getElementById("inputAddress2").value,s=document.getElementById("inputCity").value,d=document.getElementById("inputState").value,i=document.getElementById("inputZip").value;sessionStorage.setItem("companyName",e),sessionStorage.setItem("address1",t),sessionStorage.setItem("address2",n),sessionStorage.setItem("city",s),sessionStorage.setItem("state",d),sessionStorage.setItem("zip",i),document.getElementById("company-info-toggle").disabled=!0};s&&s.addEventListener("click",i);let o=[];const l=document.getElementById("settingsAddNewUser"),r={userIndex:1,userName:"Brandon",email:"brandon.lloyd.kunkel@gmail.com",receiveEmail:"on",userPhone:"407-698-6113",receiveText:"on"};sessionStorage.getItem("userProfileList")?o=JSON.parse(sessionStorage.getItem("userProfileList")):(o.push(r),sessionStorage.setItem("userProfileList",JSON.stringify(o)));const m=()=>{JSON.parse(sessionStorage.getItem("userProfileList")).length<1?document.getElementById("settingsEditUsers").disabled=!0:document.getElementById("settingsEditUsers").disabled=!1};function a(e){return/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(e)}const c=document.getElementById("settingsConfirmNewUser");l.addEventListener("click",()=>{const e=document.createElement("tr"),t=document.createElement("th"),n=document.createElement("td"),s=document.createElement("td"),d=document.createElement("td"),i=document.createElement("td"),o=document.createElement("td"),r=document.getElementById("settings-userTableLast"),m=JSON.parse(sessionStorage.getItem("userProfileList"));r.insertAdjacentElement("beforebegin",e),e.appendChild(t),e.appendChild(n),e.appendChild(s),e.appendChild(d),e.appendChild(i),e.appendChild(o),e.setAttribute("id","settings-userTable"+ ++m.length),r.firstElementChild.innerText=m.length+1,t.setAttribute("scope","row"),t.innerText=m.length,n.innerHTML=`<input id='settingsAddUserInput${+m.length}' size='15'/>`,s.innerHTML=`<input id='settingsAddEmailInput${+m.length}' size='30'/>`,d.innerHTML=`<input type='checkbox' checked id='user1EmailAlert?${+m.length}'/>`,i.innerHTML=`<input id='settingsAddPhoneInput${+m.length}' size='12'/>`,o.innerHTML=`<input type='checkbox' checked id='user1TextAlert?${+m.length}'/>`,l.style.display="none",c.style.display="inline",document.getElementById("settingsAddUserInput"+ +m.length).focus()}),c.addEventListener("click",()=>{const e=JSON.parse(sessionStorage.getItem("userProfileList")),t=++e.length,n=document.getElementById("settingsAddUserInput"+t).value,s=document.getElementById("settingsAddEmailInput"+t).value;let d=document.getElementById("user1EmailAlert?"+t).value;const i=document.getElementById("settingsAddPhoneInput"+t).value;let r=document.getElementById("user1TextAlert?"+t).value;const u=document.getElementById("settingsAddUserInput"+t),g=document.getElementById("settingsAddEmailInput"+t),p=document.getElementById("settingsAddPhoneInput"+t),I=a(s);if(n&&s&&d&&I&&i&&r){u.parentElement.innerText=n,g.parentElement.innerText=s,p.parentElement.innerText=i,(e=>{const t={userIndex:e,userName:n,email:s,receiveEmail:"on",userPhone:i,receiveText:"on"};o.push(t)})(e.length),(()=>{sessionStorage.setItem("userProfileList",JSON.stringify(o))})(),l.style.display="inline",c.style.display="none"}else alert("Please fill in all fields and a valid email address to create a new user profile!");m()}),document.getElementById("settingsEditUsers").addEventListener("click",()=>{const e=JSON.parse(sessionStorage.getItem("userProfileList")).length,t=document.getElementById("userIDEditUserSelect");t.innerHTML="";let n=1;for(let s=0;s<e;s++){const e=document.createElement("option");e.innerText=n,t.insertAdjacentElement("beforeend",e),n++}}),document.getElementById("updateEditUserModalBtn").addEventListener("click",()=>{const e=document.getElementById("userIDEditUserSelect").options.selectedIndex,t=document.getElementById("newNameEditUser").value,n=document.getElementById("newEmaileditUser").value,s=document.getElementById("newPhoneEditUser").value,d=JSON.parse(sessionStorage.getItem("userProfileList"));if(!a(n))return alert("Please enter a valid email address"),void $("#userIDEditUserSelectModal").modal("toggle");t&&n&&s?(d[e].userName=t,d[e].email=n,d[e].userPhone=s,sessionStorage.setItem("userProfileList",JSON.stringify(d)),$("#userIDEditUserSelectModal").modal("toggle"),location.reload()):(alert("Please fill in all fields!"),$("#userIDEditUserSelectModal").modal("toggle"))}),document.getElementById("savePreferencesBtn").addEventListener("click",()=>{const e=document.getElementById("customRadioInline1"),t=document.getElementById("customRadioInline2");"null"!==sessionStorage.getItem("tempScaleSelection")&&(!0===e.checked?(sessionStorage.setItem("tempScaleSelection","F"),e.checked=!0,t.checked=!1):(sessionStorage.setItem("tempScaleSelection","C"),e.checked=!1,t.checked=!0))}),document.getElementById("deleteEditUserModalBtn").addEventListener("click",()=>{const e=+document.getElementById("userIDEditUserSelect").firstElementChild.innerText;let t=JSON.parse(sessionStorage.getItem("userProfileList"));t=t.filter(t=>t.userIndex!==e);for(const n of t)n.userIndex>e&&(n.userIndex-=1);sessionStorage.setItem("userProfileList",JSON.stringify(t)),location.reload()});(()=>{let e=document.getElementById("companyName"),t=document.getElementById("inputAddress"),n=document.getElementById("inputAddress2"),s=document.getElementById("inputCity"),d=document.getElementById("inputState"),i=document.getElementById("inputZip");e.value=sessionStorage.getItem("companyName"),t.value=sessionStorage.getItem("address1"),n.value=sessionStorage.getItem("address2"),s.value=sessionStorage.getItem("city"),d.value=sessionStorage.getItem("state"),i.value=sessionStorage.getItem("zip")})(),(()=>{const e=JSON.parse(sessionStorage.getItem("userProfileList"));for(const t of e){const n=document.createElement("tr"),s=document.createElement("th"),d=document.createElement("td"),i=document.createElement("td"),o=document.createElement("td"),l=document.createElement("td"),r=document.createElement("td"),m=document.getElementById("settings-userTableLast");m.insertAdjacentElement("beforebegin",n),n.appendChild(s),n.appendChild(d),n.appendChild(i),n.appendChild(o),n.appendChild(l),n.appendChild(r),n.setAttribute("id","settings-userTable"+t.userIndex),m.firstElementChild.innerText=e.length+1,s.setAttribute("scope","row"),s.innerText=t.userIndex,d.innerText=t.userName,i.innerText=t.email,o.innerHTML=`<input type='checkbox' id='user1EmailAlert?${t.userIndex}'/>`,l.innerText=t.userPhone,r.innerHTML=`<input type='checkbox' id='user1TextAlert?${t.userIndex}'/>`,document.getElementById("user1EmailAlert?"+t.userIndex).checked=!0,document.getElementById("user1TextAlert?"+t.userIndex).checked=!0}m()})(),(()=>{const e=document.getElementById("customRadioInline1"),t=document.getElementById("customRadioInline2");null===sessionStorage.getItem("tempScaleSelection")?e.checked=!0:"F"===sessionStorage.getItem("tempScaleSelection")?(e.checked=!0,t.checked=!1):(e.checked=!1,t.checked=!0)})()}});
//# sourceMappingURL=settings.bundle.js.map