!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([,function(e,t){const n=JSON.parse(sessionStorage.getItem("sensorList")),r=[],o=document.getElementById("renderChartBtn");function s(e=0){const t=document.getElementById("chartSensorName");n.length>0?t.innerText=n[e].name:t.innerText="Currently no sensor exists. Please create one to view this chart!"}function a(e){const{tempRecords:t}=n[e];let r=am4core.create("chartdiv",am4charts.XYChart);r.data=t;let o=r.xAxes.push(new am4charts.DateAxis);o.renderer.minGridDistance=50;r.yAxes.push(new am4charts.ValueAxis);let s=r.series.push(new am4charts.LineSeries);s.dataFields.valueY="temp",s.dataFields.dateX="date",s.strokeWidth=2,s.minBulletDistance=10,s.tooltipText="{valueY}",s.tooltip.pointerOrientation="vertical",s.tooltip.background.cornerRadius=20,s.tooltip.background.fillOpacity=.5,s.tooltip.label.padding(12,12,12,12),r.scrollbarX=new am4charts.XYChartScrollbar,r.scrollbarX.series.push(s),r.cursor=new am4charts.XYCursor,r.cursor.xAxis=o,r.cursor.snapToSeries=s}!function(){for(const e of n)r.push(e.tempRecords);for(const e of r)for(const t of e)t.date=new Date(t.date)}(),s(),function(){const e=document.getElementById("sensor-selection-options");for(const t of n){const n=t.id-1,r=document.createElement("option");r.innerText=t.name,r.setAttribute("value",n),e.insertAdjacentElement("beforeend",r)}}(),0===r[0].length||a(0),o.addEventListener("click",(function(){const e=document.getElementById("sensor-selection-options").value;s(e),a(e)}))}]);