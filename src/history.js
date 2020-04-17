/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */
// Constants & Variable Instantiation//
const sensorListData = JSON.parse(sessionStorage.getItem('sensorList'));
const sensorListTempRecords = [];

// Declaring Elements
const renderChartBtn = document.getElementById('renderChartBtn');

// parses string dates stored in sessionStorage back into JS date objects
function consolidateTempRecords() {
  for (const sensor of sensorListData)
    sensorListTempRecords.push(sensor.tempRecords);
  for (const record of sensorListTempRecords) {
    for (const date of record) {
      date.date = new Date(date.date);
    }
  }
}
consolidateTempRecords();

// updates chart sensor name
function updateChartName(sensorID = 0) {
  const chartSensorName = document.getElementById('chartSensorName');
  if (sensorListData.length > 0) {
    chartSensorName.innerText = sensorListData[sensorID].name;
  } else chartSensorName.innerText = 'Currently no sensor exists. Please create one to view this chart!';
}
updateChartName();

// updates dropdown menu with sensor options
function addSelectionOptions() {
  const insertionPoint = document.getElementById('sensor-selection-options');
  for (const sensor of sensorListData) {
    const sensorIndex = sensor.id - 1;
    const newOption = document.createElement('option');
    newOption.innerText = sensor.name;
    newOption.setAttribute('value', sensorIndex);
    insertionPoint.insertAdjacentElement('beforeend', newOption);
  }
}
addSelectionOptions();

// renders line chart with historical temp data
function renderChart() {
  const sensorID = document.getElementById('sensor-selection-options').value;
  updateChartName(sensorID);
  makeChart(sensorID);
}

// if chart data exists, renders the first sensor chart
// eslint-disable-next-line no-empty
if (sensorListTempRecords[0].length === 0) {
} else makeChart(0);

// am4core code - builds chart
function makeChart(sensorID) {
  // Pulling data from selected sensor
  const {tempRecords} = sensorListData[sensorID];

  // Create chart instance
  let chart = am4core.create('chartdiv', am4charts.XYChart);

  // Add data
  // chart.data = generateChartData();
  chart.data = tempRecords;

  // Create axes
  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.minGridDistance = 50;

  // eslint-disable-next-line no-unused-vars
  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  // Create series
  let series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = 'temp';
  series.dataFields.dateX = 'date';
  series.strokeWidth = 2;
  series.minBulletDistance = 10;
  series.tooltipText = '{valueY}';
  series.tooltip.pointerOrientation = 'vertical';
  series.tooltip.background.cornerRadius = 20;
  series.tooltip.background.fillOpacity = 0.5;
  series.tooltip.label.padding(12, 12, 12, 12);

  // Add scrollbar
  chart.scrollbarX = new am4charts.XYChartScrollbar();
  chart.scrollbarX.series.push(series);

  // Add cursor
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.xAxis = dateAxis;
  chart.cursor.snapToSeries = series;
}

// Event listeners
renderChartBtn.addEventListener('click', renderChart);
