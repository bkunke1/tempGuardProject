/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/history.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/history.js":
/*!************************!*\
  !*** ./src/history.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* eslint-disable no-magic-numbers */\r\n/* eslint-disable no-undef */\r\n// Constants & Variable Instantiation//\r\nconst sensorListData = JSON.parse(sessionStorage.getItem('sensorList'));\r\nconst sensorListTempRecords = [];\r\n\r\n// Declaring Elements\r\nconst renderChartBtn = document.getElementById('renderChartBtn');\r\n\r\n// parses string dates stored in sessionStorage back into JS date objects\r\nfunction consolidateTempRecords() {\r\n  for (const sensor of sensorListData)\r\n    sensorListTempRecords.push(sensor.tempRecords);\r\n  for (const record of sensorListTempRecords) {\r\n    for (const date of record) {\r\n      date.date = new Date(date.date);\r\n    }\r\n  }\r\n}\r\nconsolidateTempRecords();\r\n\r\n// updates chart sensor name\r\nfunction updateChartName(sensorID = 0) {\r\n  const chartSensorName = document.getElementById('chartSensorName');\r\n  if (sensorListData.length > 0) {\r\n    chartSensorName.innerText = sensorListData[sensorID].name;\r\n  } else chartSensorName.innerText = 'Currently no sensor exists. Please create one to view this chart!';\r\n}\r\nupdateChartName();\r\n\r\n// updates dropdown menu with sensor options\r\nfunction addSelectionOptions() {\r\n  const insertionPoint = document.getElementById('sensor-selection-options');\r\n  for (const sensor of sensorListData) {\r\n    const sensorIndex = sensor.id - 1;\r\n    const newOption = document.createElement('option');\r\n    newOption.innerText = sensor.name;\r\n    newOption.setAttribute('value', sensorIndex);\r\n    insertionPoint.insertAdjacentElement('beforeend', newOption);\r\n  }\r\n}\r\naddSelectionOptions();\r\n\r\n// renders line chart with historical temp data\r\nfunction renderChart() {\r\n  const sensorID = document.getElementById('sensor-selection-options').value;\r\n  updateChartName(sensorID);\r\n  makeChart(sensorID);\r\n}\r\n\r\n// if chart data exists, renders the first sensor chart\r\n// eslint-disable-next-line no-empty\r\nif (sensorListTempRecords[0].length === 0) {\r\n} else makeChart(0);\r\n\r\n// am4core code - builds chart\r\nfunction makeChart(sensorID) {\r\n  // Pulling data from selected sensor\r\n  const {tempRecords} = sensorListData[sensorID];\r\n\r\n  // Create chart instance\r\n  let chart = am4core.create('chartdiv', am4charts.XYChart);\r\n\r\n  // Add data\r\n  // chart.data = generateChartData();\r\n  chart.data = tempRecords;\r\n\r\n  // Create axes\r\n  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());\r\n  dateAxis.renderer.minGridDistance = 50;\r\n\r\n  // eslint-disable-next-line no-unused-vars\r\n  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());\r\n\r\n  // Create series\r\n  let series = chart.series.push(new am4charts.LineSeries());\r\n  series.dataFields.valueY = 'temp';\r\n  series.dataFields.dateX = 'date';\r\n  series.strokeWidth = 2;\r\n  series.minBulletDistance = 10;\r\n  series.tooltipText = '{valueY}';\r\n  series.tooltip.pointerOrientation = 'vertical';\r\n  series.tooltip.background.cornerRadius = 20;\r\n  series.tooltip.background.fillOpacity = 0.5;\r\n  series.tooltip.label.padding(12, 12, 12, 12);\r\n\r\n  // Add scrollbar\r\n  chart.scrollbarX = new am4charts.XYChartScrollbar();\r\n  chart.scrollbarX.series.push(series);\r\n\r\n  // Add cursor\r\n  chart.cursor = new am4charts.XYCursor();\r\n  chart.cursor.xAxis = dateAxis;\r\n  chart.cursor.snapToSeries = series;\r\n}\r\n\r\n// Event listeners\r\nrenderChartBtn.addEventListener('click', renderChart);\r\n\n\n//# sourceURL=webpack:///./src/history.js?");

/***/ })

/******/ });