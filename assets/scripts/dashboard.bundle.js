!function(e){var t={};function n(r){if(t[r])return t[r].exports;var l=t[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(r,l,function(t){return e[t]}.bind(null,l));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){let n="°F",r="INACTIVE",l=[];const a=document.getElementById("dashAddSensorModalUpdateBtn"),o=(document.getElementById("simTempBtn"),document.getElementById("stopTempFeedBtn"),document.getElementById("dashEditSensorModalUpdateBtn")),i=document.getElementById("editSensorBtn"),m=document.getElementById("editSensorBtn2"),s=document.getElementById("editSensorBtn3"),d=document.getElementById("editSensorBtn4"),u=document.getElementById("editSensorBtn5"),c=document.getElementById("editSensorBtn6"),g=document.getElementById("confirmDeleteBtn");class E{constructor(e,t,n,r,a,o){this.id=l.length+1,this.name=e,this.displayStatus="Active",this.alarmStatus="Normal",this.currentTemp=t,this.highAlarm=n,this.lowAlarm=r,this.rangeMax=a,this.rangeMin=o,this.range=a-o,this.simTempDirection="UP",this.tempRecords=[]}}const h=(e,t)=>(+e.currentTemp>=+e.highAlarm||+e.currentTemp<=+e.lowAlarm?(e.alarmStatus="Alarm!",document.getElementById("sensor"+t+"-name").parentNode.classList.add("alarm-mode-bg")):(e.alarmStatus="Normal",document.getElementById("sensor"+t+"-name").parentNode.classList.remove("alarm-mode-bg")),e.alarmStatus),p=()=>{sessionStorage.getItem("tempScaleSelection")&&(n="F"===sessionStorage.getItem("tempScaleSelection")?"°F":"°C");const e=document.getElementsByClassName("cf-selector");for(let t=0;t<e.length;t++)e[t].innerText=n},y=()=>{l.length>5?(document.getElementById("dashAddSensBtn").classList.add("disabled"),document.getElementById("dashAddSensBtn").setAttribute("data-toggle","")):(document.getElementById("dashAddSensBtn").classList.remove("disabled"),document.getElementById("dashAddSensBtn").setAttribute("data-toggle","modal"))},f=(e,t)=>{const n=document.getElementById("tempBar"+t).firstElementChild,r=n.nextElementSibling,l=r.nextElementSibling,a=(e.rangeMax-e.currentTemp)/e.range*205;n.setAttribute("y",a),r.setAttribute("points",`20,${a-4} 30,${a+2} 20,${a+8}`),l.setAttribute("points",`70,${a-4} 60,${a+2} 70,${a+8}`)},I=()=>{for(let e=0;e<l.length;e++)document.getElementById("sensor"+e+"-name").innerText=l[e].name,document.getElementById("sensor"+e+"-currentTemp").innerText=l[e].currentTemp,document.getElementById("sensor"+e+"-alarmStatus").innerText=h(l[e],e),document.getElementById("sensor"+e+"-highAlarm").innerText=l[e].highAlarm,document.getElementById("sensor"+e+"-lowAlarm").innerText=l[e].lowAlarm,p(),document.getElementById("s"+e).classList.remove("inactive-box"),f(l[e],e)},B=(e,t,n,r,l,a)=>{let o=document.getElementById("tempScaleNumberMax"+e);const i=document.getElementById("tempScaleNumberMaxAlarm"+e),m=document.getElementById("tempScaleMarkerZero"+e),s=document.getElementById("tempScaleNumberMinAlarm"+e),d=document.getElementById("tempScaleNumberMin"+e),u=document.getElementById("validTempZone"+e);o.innerText=r,i.innerText=r-Math.floor(a/4),m.innerText=r-Math.floor(a/2),s.innerText=r-3*Math.floor(a/4),d.innerText=l,function(){let e=(r-t)/a*205,l=(t-n)/a*210;e=e<5?5:e,l=e+l>210?205-e:l,e>=5&&e<=210?u.setAttribute("y",e):u.setAttribute("y",5),t-n<3?u.setAttribute("height",6):l>=5&&l<=210?u.setAttribute("height",l):u.setAttribute("height",210)}()};function v(){for(let e=0;e<l.length;e++)l[e].tempRecords.push({date:new Date,temp:l[e].currentTemp}),"UP"===l[e].simTempDirection&&l[e].currentTemp<+l[e].highAlarm+5?++l[e].currentTemp:"UP"===l[e].simTempDirection&&l[e].currentTemp>=+l[e].highAlarm+5?(l[e].simTempDirection="DOWN",--l[e].currentTemp):"DOWN"===l[e].simTempDirection&&l[e].currentTemp>+l[e].lowAlarm-5?--l[e].currentTemp:(l[e].simTempDirection="UP",++l[e].currentTemp),f(l[e],e),document.getElementById("sensor"+e+"-currentTemp").innerText=l[e].currentTemp,document.getElementById("sensor"+e+"-alarmStatus").innerText=h(l[e],e);r="ACTIVE"}function A(){"INACTIVE"===r&&(tempUpdateActive=setInterval(v,1500))}function S(){$("#dashEditSensorModal").on("show.bs.modal",(function(){!function(e){const t=e.target.offsetParent.getAttribute("id").slice(1,2),n=l[t],r=document.getElementById("editSensorName1"),a=document.getElementById("editHighAlarm1"),o=document.getElementById("editLowAlarm1"),i=document.getElementById("editRangeMax1"),m=document.getElementById("editRangeMin1"),s=document.getElementById("editTemp"),d=document.getElementById("modalID");r.setAttribute("value",n.name),a.setAttribute("value",n.highAlarm),o.setAttribute("value",n.lowAlarm),i.setAttribute("value",n.rangeMax),m.setAttribute("value",n.rangeMin),s.setAttribute("value",n.currentTemp),null!==d&&d.setAttribute("id","modalID-"+t)}(event)}))}$.clearFormFields=function(e){$(e).find("input[type=text").val("")},$("#dashEditSensorModal").on("hidden.bs.modal",(function(){document.getElementById("editSensorName1").parentElement.parentElement.firstElementChild.setAttribute("id","modalID")}));const b=e=>{if(l[e]){const t=e,n=+e+1,r=document.getElementById(`sensor${t}-name`),a=document.getElementById(`sensor${t}-currentTemp`),o=document.getElementById(`sensor${t}-alarmStatus`),i=document.getElementById(`sensor${t}-highAlarm`),m=document.getElementById(`sensor${t}-lowAlarm`);r.innerText=l[e].name,a.innerText=l[e].currentTemp,o.innerText=l[e].alarmStatus,i.innerText=l[e].highAlarm,m.innerText=l[e].lowAlarm,B(n,l[e].highAlarm,l[e].lowAlarm,l[e].rangeMax,l[e].rangeMin,l[e].range),f(l[e],e),document.getElementById("sensor"+e+"-alarmStatus").innerText=h(l[e],e)}},T=e=>{l[e]||document.getElementById("s"+e).classList.add("inactive-box")};window.onbeforeunload=function(){this.sessionStorage.setItem("sensorList",JSON.stringify(l))},a.addEventListener("click",()=>{const e=document.getElementById("sensorName1").value,t=document.getElementById("initialTemp").value,n=document.getElementById("highAlarm1").value,r=document.getElementById("lowAlarm1").value,a=document.getElementById("rangeMax1").value,o=document.getElementById("rangeMin1").value,i=a-o;if(isNaN(t)||isNaN(n)||isNaN(r)||isNaN(a)||isNaN(o))alert("Please enter valid inputs! (Alarms and Range inputs should be numbers)");else if(+n<+r||+a<+o)alert("High Alarm or Range Max cannot be smaller than Low Alarm or Range Min!");else if(e&&t&&n&&r&&a&&o){const m=new E(e,t,n,r,a,o,i);l.push(m),$("#dashAddSensorModal").modal("toggle"),B(m.id,n,r,a,o,i),I(l.length),y(l.length)}else alert("Please fill all of the fields in order to update.")}),o.addEventListener("click",()=>{const e=event.srcElement.parentNode.previousElementSibling.firstElementChild.firstElementChild,t=e.getAttribute("id").slice(-1),n=document.getElementById("editSensorName1"),r=document.getElementById("editHighAlarm1"),a=document.getElementById("editLowAlarm1"),o=document.getElementById("editRangeMax1"),i=document.getElementById("editRangeMin1"),m=document.getElementById("editTemp"),s=o.value-i.value;if(n.value&&r.value&&a.value&&o.value&&i.value&&m.value){if(+r.value<+a.value)return void alert("High Alarm cannot be less than Low Alarm!");if(+o.value<+i.value)return void alert("Range Max cannot be less than Range Min!");l[t].name=n.value,l[t].currentTemp=m.value,l[t].highAlarm=r.value,l[t].lowAlarm=a.value,l[t].rangeMax=o.value,l[t].rangeMin=i.value,l[t].range=o.value-i.value,e.setAttribute("id","modalID"),B(+l[t].id,+r.value,+a.value,+o.value,+i.value,+s),I(),$("#dashEditSensorModal").modal("toggle")}}),i.addEventListener("click",S),m.addEventListener("click",S),s.addEventListener("click",S),d.addEventListener("click",S),u.addEventListener("click",S),c.addEventListener("click",S),g.addEventListener("click",()=>{const e=event.target.offsetParent.offsetParent.offsetParent.previousElementSibling.previousElementSibling.childNodes[1].firstElementChild.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.getAttribute("id").slice(-1);l.splice(e,1);for(let t=e;t<l.length+1;t++)b(t),T(t);$("#confirmationModal").modal("toggle"),$("#dashEditSensorModal").modal("toggle"),y(l.length)}),sessionStorage.getItem("sensorList")?l=JSON.parse(sessionStorage.getItem("sensorList")):(l[0]=new E("Cooler 1",45,55,35,65,25),l[1]=new E("Freezer 1",-5,32,-30,40,-40),l[2]=new E("Dry Storage",75,90,32,100,0),sessionStorage.setItem("sensorList",JSON.stringify(l))),function(){if(sessionStorage.getItem("sensorList")){l=JSON.parse(sessionStorage.getItem("sensorList")),I();for(let e=0;e<l.length+1;e++)b(e)}l===[]||A(),sessionStorage.getItem("tutorialRead")||($("#tutorialModal").modal("toggle"),sessionStorage.setItem("tutorialRead","TRUE"))}(),console.log("Thank you for taking the time to look at my project!")}]);