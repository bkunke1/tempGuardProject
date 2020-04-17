// Constants & Variable Instantiation//
const ALARM = 'Alarm!';
const NORMAL = 'Normal';
const DEGREE_F = '°F';
const DEGREE_C = '°C';
const ACTIVE = 'Active';
const UP = 'UP';
const DOWN = 'DOWN';
let degreeSelected = DEGREE_F;
let tempPadding = 10;
let markingFreq = 2;
let updateTemp;
let userName;
let tempSimulationStatus = 'INACTIVE';
let sensorList = [];

// Declaring Elements
const loginBtn = document.getElementById('login-btn');
const testBtn = document.getElementById('test-btn');
const dashAddSensorBtn = document.getElementById('dashAddSensorModalUpdateBtn');
const dashAddSensorModalCloseBtn = document.getElementById(
  'dashAddSensorModalCloseBtn'
);
const loginModalLoginBtn = document.getElementById('loginModalLoginBtn');
const simTempsBtn = document.getElementById('simTempBtn');
const stopTempFeedBtn = document.getElementById('stopTempFeedBtn');
const dashEditSensorModalUpdate = document.getElementById(
  'dashEditSensorModalUpdateBtn'
);
const editSensorBtn = document.getElementById('editSensorBtn');
const editSensorBtn2 = document.getElementById('editSensorBtn2');
const editSensorBtn3 = document.getElementById('editSensorBtn3');
const editSensorBtn4 = document.getElementById('editSensorBtn4');
const editSensorBtn5 = document.getElementById('editSensorBtn5');
const editSensorBtn6 = document.getElementById('editSensorBtn6');
const deleteSensorBtn = document.getElementById('confirmDeleteBtn');

// creates sensor object
class Sensor {
  constructor(
    name,
    currentTemp,
    highAlarm,
    lowAlarm,
    rangeMax = 100,
    rangeMin = -100
  ) {
    this.id = sensorList.length + 1;
    this.name = name;
    this.displayStatus = ACTIVE;
    this.alarmStatus = 'Normal';
    this.currentTemp = currentTemp;
    this.highAlarm = highAlarm;
    this.lowAlarm = lowAlarm;
    this.rangeMax = rangeMax;
    this.rangeMin = rangeMin;
    this.range = rangeMax - rangeMin;
    this.simTempDirection = 'UP';
    this.tempRecords = [];
  }
}

// consumes an object from sensorList and updates the alarmStatus property
const updateAlarmStatus = (obj, i) => {
  if (+obj.currentTemp >= +obj.highAlarm || +obj.currentTemp <= +obj.lowAlarm) {
    obj.alarmStatus = ALARM;
    document
      .getElementById('sensor' + i + '-name')
      .parentNode.classList.add('alarm-mode-bg');
  } else {
    obj.alarmStatus = NORMAL;
    document
      .getElementById('sensor' + i + '-name')
      .parentNode.classList.remove('alarm-mode-bg');
  }
  return obj.alarmStatus;
};

// updates degree symbol to F or C based on preferences saved
const updateDegreeSymbolSelection = () => {
  // if (sessionStorage.getItem('tempScaleSelection')) {
  //   degreeSelected = sessionStorage.getItem('tempScaleSelection');
  // }
  // degreeSelected = sessionStorage.getItem('tempScaleSelection')
  //   ? sessionStorage.getItem('tempScaleSelection')
  //   : degreeSelected;
  if (sessionStorage.getItem('tempScaleSelection')) {
    if (sessionStorage.getItem('tempScaleSelection') === 'F') {
      degreeSelected = DEGREE_F;
    } else degreeSelected = DEGREE_C;
  }
  const listOfElements = document.getElementsByClassName('cf-selector');
  for (let i = 0; i < listOfElements.length; i++) {
    listOfElements[i].innerText = degreeSelected;
  }
};

// turns add sensor button on or off
const toggleDisableAddSensorBtn = (length) => {
  if (sensorList.length > 5) {
    document.getElementById('dashAddSensBtn').classList.add('disabled');
    document.getElementById('dashAddSensBtn').setAttribute('data-toggle', '');
  } else {
    document.getElementById('dashAddSensBtn').classList.remove('disabled');
    document
      .getElementById('dashAddSensBtn')
      .setAttribute('data-toggle', 'modal');
  }
};

// turns simulate temps button on or off
// works, but currently disabled to automate temp simulation vs using on/off buttons
// const toggleDisablesimulateTempsBtn = (length) => {
//   if (sensorList.length > 0) {
//     simTempsBtn.classList.remove('disabled');
//   } else {
//     simTempsBtn.classList.add('disabled');
//   }
// };

// updates the position of the temperature reading bar on a sensor
const updateTempBar = (sensor, index) => {
  const tempBarSVG = document.getElementById(`tempBar${index}`);
  const barEl = tempBarSVG.firstElementChild;
  const leftTriangleEl = barEl.nextElementSibling;
  const rightTriangleEl = leftTriangleEl.nextElementSibling;
  const currentPxLocation =
    ((sensor.rangeMax - sensor.currentTemp) / sensor.range) * 205;
  const updatePosns = () => {
    barEl.setAttribute('y', currentPxLocation);
    leftTriangleEl.setAttribute(
      'points',
      `20,${currentPxLocation - 4} 30,${currentPxLocation + 2} 20,${
        currentPxLocation + 8
      }`
    );
    rightTriangleEl.setAttribute(
      'points',
      `70,${currentPxLocation - 4} 60,${currentPxLocation + 2} 70,${
        currentPxLocation + 8
      }`
    );
  };
  updatePosns();
};

// updates the text fields on all sensor objects
const updateDOM = () => {
  for (let i = 0; i < sensorList.length; i++) {
    document.getElementById('sensor' + i + '-name').innerText =
      sensorList[i].name;
    document.getElementById('sensor' + i + '-currentTemp').innerText =
      sensorList[i].currentTemp;
    document.getElementById(
      'sensor' + i + '-alarmStatus'
    ).innerText = updateAlarmStatus(sensorList[i], i);
    document.getElementById('sensor' + i + '-highAlarm').innerText =
      sensorList[i].highAlarm;
    document.getElementById('sensor' + i + '-lowAlarm').innerText =
      sensorList[i].lowAlarm;
    updateDegreeSymbolSelection();
    document.getElementById('s' + i).classList.remove('inactive-box');
    updateTempBar(sensorList[i], i);
  }
};

// updates the temperature scale numbers next to thermometer for a sensor
const updateTempMarkings = (
  id,
  highAlarm,
  lowAlarm,
  rangeMax,
  rangeMin,
  range
) => {
  let maxReading = document.getElementById(`tempScaleNumberMax${id}`);
  const highAlarmReading = document.getElementById(
    `tempScaleNumberMaxAlarm${id}`
  );
  const zeroReading = document.getElementById(`tempScaleMarkerZero${id}`);
  const lowAlarmReading = document.getElementById(
    `tempScaleNumberMinAlarm${id}`
  );
  const minReading = document.getElementById(`tempScaleNumberMin${id}`);
  const validTempZoneMax = document.getElementById(`validTempZone${id}`);
  maxReading.innerText = rangeMax;
  highAlarmReading.innerText = rangeMax - Math.floor(range / 4);
  zeroReading.innerText = rangeMax - Math.floor(range / 2);
  lowAlarmReading.innerText = rangeMax - 3 * Math.floor(range / 4);
  minReading.innerText = rangeMin;
  function setValidTempZone() {
    let newValidCeilingPosition = ((rangeMax - highAlarm) / range) * 205;
    let newValidFloorPosition = ((highAlarm - lowAlarm) / range) * 210;
    newValidCeilingPosition =
      newValidCeilingPosition < 5 ? 5 : newValidCeilingPosition;
    newValidFloorPosition =
      newValidCeilingPosition + newValidFloorPosition > 210
        ? 205 - newValidCeilingPosition
        : newValidFloorPosition;
    if (newValidCeilingPosition >= 5 && newValidCeilingPosition <= 210) {
      validTempZoneMax.setAttribute('y', newValidCeilingPosition);
    } else {
      validTempZoneMax.setAttribute('y', 5);
    }
    if (highAlarm - lowAlarm < 3) {
      validTempZoneMax.setAttribute('height', 6);
    } else if (newValidFloorPosition >= 5 && newValidFloorPosition <= 210) {
      validTempZoneMax.setAttribute('height', newValidFloorPosition);
    } else {
      validTempZoneMax.setAttribute('height', 210);
    }
  }
  setValidTempZone();
};

// takes user input to create a new sensor and add to sensorList
const addSensor = () => {
  const setupName = document.getElementById('sensorName1').value;
  const setupCurrentTemp = document.getElementById('initialTemp').value;
  const setupHighAlarm = document.getElementById('highAlarm1').value;
  const setupLowAlarm = document.getElementById('lowAlarm1').value;
  const setupRangeMax = document.getElementById('rangeMax1').value;
  const setupRangeMin = document.getElementById('rangeMin1').value;
  const range = setupRangeMax - setupRangeMin;
  if (
    isNaN(setupCurrentTemp) ||
    isNaN(setupHighAlarm) ||
    isNaN(setupLowAlarm) ||
    isNaN(setupRangeMax) ||
    isNaN(setupRangeMin)
  ) {
    alert(
      'Please enter valid inputs! (Alarms and Range inputs should be numbers)'
    );
    return;
  } else if (
    +setupHighAlarm < +setupLowAlarm ||
    +setupRangeMax < +setupRangeMin
  ) {
    alert(
      'High Alarm or Range Max cannot be smaller than Low Alarm or Range Min!'
    );
    return;
  } else {
    if (
      setupName &&
      setupCurrentTemp &&
      setupHighAlarm &&
      setupLowAlarm &&
      setupRangeMax &&
      setupRangeMin
    ) {
      const sensor = new Sensor(
        setupName,
        setupCurrentTemp,
        setupHighAlarm,
        setupLowAlarm,
        setupRangeMax,
        setupRangeMin,
        range
      );
      sensorList.push(sensor);
      $('#dashAddSensorModal').modal('toggle');
      updateTempMarkings(
        sensor.id,
        setupHighAlarm,
        setupLowAlarm,
        setupRangeMax,
        setupRangeMin,
        range
      );
      updateDOM(sensorList.length);
      toggleDisableAddSensorBtn(sensorList.length);
      // toggleDisablesimulateTempsBtn(sensorList.length);
      const min = +setupLowAlarm - 5;
      const max = +setupHighAlarm + 5;
      const init = +setupCurrentTemp;
      const length = (+setupHighAlarm - +setupLowAlarm) * 10;
    } else {
      alert('Please fill all of the fields in order to update.');
    }
  }
};

// validates login modal input
const authLogin = () => {
  userName = document.getElementById('loginInputUsername').value;
  const pass = document.getElementById('loginInputPassword').value;

  if (userName === 'admin' && pass === '1234') {
    $('#loginModal').modal('toggle');
  } else alert('Invalid Username or Password');
};

// launches login modal
const loginLauncher = () => {
  $('#loginModal').modal('toggle');
};

// loginLauncher();
// **Remove comment to activate a login modal

// updates all sensors to next simulation temperature and updates text data
function nextTemp() {
  for (let i = 0; i < sensorList.length; i++) {
    sensorList[i].tempRecords.push({
      date: new Date(),
      temp: sensorList[i].currentTemp,
    });
    if (
      sensorList[i].simTempDirection === 'UP' &&
      sensorList[i].currentTemp < +sensorList[i].highAlarm + 5
    ) {
      ++sensorList[i].currentTemp;
    } else if (
      sensorList[i].simTempDirection === 'UP' &&
      sensorList[i].currentTemp >= +sensorList[i].highAlarm + 5
    ) {
      sensorList[i].simTempDirection = 'DOWN';
      --sensorList[i].currentTemp;
    } else if (
      sensorList[i].simTempDirection === 'DOWN' &&
      sensorList[i].currentTemp > +sensorList[i].lowAlarm - 5
    ) {
      --sensorList[i].currentTemp;
    } else {
      sensorList[i].simTempDirection = 'UP';
      ++sensorList[i].currentTemp;
    }
    updateTempBar(sensorList[i], i);
    document.getElementById('sensor' + i + '-currentTemp').innerText =
      sensorList[i].currentTemp;
    document.getElementById(
      'sensor' + i + '-alarmStatus'
    ).innerText = updateAlarmStatus(sensorList[i], i);
  }
  tempSimulationStatus = 'ACTIVE';
}

// launches temperature simulation making the temperatures rise and fall
function simulateTempsFeed() {
  if (tempSimulationStatus === 'INACTIVE') {
    tempUpdateActive = setInterval(nextTemp, 1500);
  }
}

// stops the temperature simulation
function stopTempSimulation() {
  if (simTempsBtn.classList.contains('disabled')) {
    return;
  } else {
    try {
      clearInterval(tempUpdateActive);
      if ((tempUpdateActive = undefined))
        throw 'Temp simulation not currently active';
    } catch (err) {
      console.error(err, 'Temp simulation is not currently active');
    }
  }
  tempSimulationStatus = 'INACTIVE';
}

// runs temperature simulation if the process isnt not already running
const activateTempSimulation = () => {
  let status = 'inactive';
  if (simTempsBtn.classList.contains('disabled')) {
    return;
  } else {
    status = 'active';
    simulateTempsFeed();
  }
};

// generates some sample temperature records for sensor0
function generateTempRecords() {
  let sampleTempRecords = [];
  const max = 60;
  const min = 30;
  let direction = UP;
  let genTemp = 50;
  let genDate = new Date();
  function newNumber() {
    if (direction === UP && genTemp < max) {
      genTemp = ++genTemp;
    } else if (direction === UP) {
      direction = DOWN;
      --genTemp;
    } else if (direction === DOWN && genTemp > min) {
      genTemp = --genTemp;
    } else {
      direction = UP;
      gentemp = ++genTemp;
    }
    return genTemp;
  }
  function newTime(i) {
    const updateTime = new Date();
    updateTimeHelper = updateTime.getSeconds() - i;
    updateTime.setSeconds(updateTimeHelper);
    return updateTime;
  }
  for (let i = 0; i < 300; i++) {
    sampleTempRecords.push({
      date: newTime(i),
      temp: newNumber(),
    });
  }
  return sampleTempRecords;
}

// updates modal after opening
function updateEditSensorForm() {
  $('#dashEditSensorModal').on('show.bs.modal', function () {
    updateEditSensorFormHelper(event);
  });
}

// helps update modal input fields with existing data when editing sensors
function updateEditSensorFormHelper(event) {
  const id = event.target.offsetParent.getAttribute('id').slice(1, 2);
  const sensorID = id;
  const sensor = sensorList[id];
  const NameInput = document.getElementById('editSensorName1');
  const HighAlarmInput = document.getElementById('editHighAlarm1');
  const LowAlarmInput = document.getElementById('editLowAlarm1');
  const rangeMaxInput = document.getElementById('editRangeMax1');
  const rangeMinInput = document.getElementById('editRangeMin1');
  const calibrateTemp = document.getElementById('editTemp');
  const modalID = document.getElementById('modalID');
  NameInput.setAttribute('value', sensor.name);
  HighAlarmInput.setAttribute('value', sensor.highAlarm);
  LowAlarmInput.setAttribute('value', sensor.lowAlarm);
  rangeMaxInput.setAttribute('value', sensor.rangeMax);
  rangeMinInput.setAttribute('value', sensor.rangeMin);
  calibrateTemp.setAttribute('value', sensor.currentTemp);
  if (modalID !== null) {
    modalID.setAttribute('id', `modalID-${id}`);
  }
}

// updates sensorList array and DOM after submitting edit updates
const EditSensorModalUpdateBtn = () => {
  const modalBody =
    event.srcElement.parentNode.previousElementSibling.firstElementChild
      .firstElementChild;
  const modalID = modalBody.getAttribute('id').slice(-1);
  const editName = document.getElementById('editSensorName1');
  const editHighAlarm = document.getElementById('editHighAlarm1');
  const editLowAlarm = document.getElementById('editLowAlarm1');
  const editRangeMax = document.getElementById('editRangeMax1');
  const editRangeMin = document.getElementById('editRangeMin1');
  const editCurrentTemp = document.getElementById('editTemp');
  const editRange = editRangeMax.value - editRangeMin.value;
  const min = +editLowAlarm.value - 5;
  const max = +editHighAlarm.value + 5;
  const init = +editCurrentTemp.value;
  const length = (+editHighAlarm.value - +editLowAlarm.value) * 10;
  if (
    editName.value &&
    editHighAlarm.value &&
    editLowAlarm.value &&
    editRangeMax.value &&
    editRangeMin.value &&
    editCurrentTemp.value
  ) {
    if (+editHighAlarm.value < +editLowAlarm.value) {
      alert('High Alarm cannot be less than Low Alarm!');
      return;
    } else if (+editRangeMax.value < +editRangeMin.value) {
      alert('Range Max cannot be less than Range Min!');
      return;
    } else sensorList[modalID].name = editName.value;
    sensorList[modalID].currentTemp = editCurrentTemp.value;
    sensorList[modalID].highAlarm = editHighAlarm.value;
    sensorList[modalID].lowAlarm = editLowAlarm.value;
    sensorList[modalID].rangeMax = editRangeMax.value;
    sensorList[modalID].rangeMin = editRangeMin.value;
    sensorList[modalID].range = editRangeMax.value - editRangeMin.value;
    modalBody.setAttribute('id', 'modalID');
    updateTempMarkings(
      +sensorList[modalID].id,
      +editHighAlarm.value,
      +editLowAlarm.value,
      +editRangeMax.value,
      +editRangeMin.value,
      +editRange
    );
    updateDOM(modalID);
    $('#dashEditSensorModal').modal('toggle');
  }
};

// Function to clear form fields for the add sensor modal after closing
$.clearFormFields = function (area) {
  $(area).find('input[type=text').val('');
};

// Function to rename the editSensorModal divID back to original state
$('#dashEditSensorModal').on('hidden.bs.modal', function () {
  document
    .getElementById('editSensorName1')
    .parentElement.parentElement.firstElementChild.setAttribute(
      'id',
      'modalID'
    );
});

// updates sensorList array and DOM after deleting a sensor
const rebuildSensorList = (id) => {
  if (sensorList[id]) {
    const sensorNumber = id;
    const sensorNumberAddOne = +id + 1;
    const sensorName = document.getElementById(`sensor${sensorNumber}-name`);
    const sensorTemp = document.getElementById(
      `sensor${sensorNumber}-currentTemp`
    );
    const sensorStatus = document.getElementById(
      `sensor${sensorNumber}-alarmStatus`
    );
    const sensorHighAlarm = document.getElementById(
      `sensor${sensorNumber}-highAlarm`
    );
    const sensorLowAlarm = document.getElementById(
      `sensor${sensorNumber}-lowAlarm`
    );
    sensorName.innerText = sensorList[id].name;
    sensorTemp.innerText = sensorList[id].currentTemp;
    sensorStatus.innerText = sensorList[id].alarmStatus;
    sensorHighAlarm.innerText = sensorList[id].highAlarm;
    sensorLowAlarm.innerText = sensorList[id].lowAlarm;
    updateTempMarkings(
      sensorNumberAddOne,
      sensorList[id].highAlarm,
      sensorList[id].lowAlarm,
      sensorList[id].rangeMax,
      sensorList[id].rangeMin,
      sensorList[id].range
    );
    updateTempBar(sensorList[id], id);
    document.getElementById(
      'sensor' + id + '-alarmStatus'
    ).innerText = updateAlarmStatus(sensorList[id], id);
  }
};

// removes old DOM elements after deleting sensor
const removeOldSensors = (id) => {
  if (!sensorList[id]) {
    document.getElementById('s' + id).classList.add('inactive-box');
  }
};

// deletes sensor from dashboard
const deleteSensor = () => {
  const id = event.target.offsetParent.offsetParent.offsetParent.previousElementSibling.previousElementSibling.childNodes[1].firstElementChild.firstElementChild.nextElementSibling.firstElementChild.firstElementChild
    .getAttribute('id')
    .slice(-1);
  sensorList.splice(id, 1);
  for (let i = id; i < sensorList.length + 1; i++) {
    const sensor = sensorList[i];
    rebuildSensorList(i);
    removeOldSensors(i);
  }
  $('#confirmationModal').modal('toggle');
  $('#dashEditSensorModal').modal('toggle');
  // toggleDisablesimulateTempsBtn(sensorList.length);
  toggleDisableAddSensorBtn(sensorList.length);
};

// saves sensorList to sessionStorage when navigating away from dashboard page
window.onbeforeunload = function () {
  this.sessionStorage.setItem('sensorList', JSON.stringify(sensorList));
};

// initializes dashboard page
function init() {
  if (sessionStorage.getItem('sensorList')) {
    sensorList = JSON.parse(sessionStorage.getItem('sensorList'));
    updateDOM();
    for (let i = 0; i < sensorList.length + 1; i++) {
      const sensor = sensorList[i];
      rebuildSensorList(i);
    }
    // toggleDisablesimulateTempsBtn(sensorList.length);
  }
  if (sensorList === []) {
  } else {
    simulateTempsFeed();
  }
  if (!sessionStorage.getItem('tutorialRead')) {
    $('#tutorialModal').modal('toggle');
    sessionStorage.setItem('tutorialRead', 'TRUE');
  }
}

// Event Listeners
dashAddSensorBtn.addEventListener('click', addSensor);
loginModalLoginBtn.addEventListener('click', authLogin);
// simTempsBtn.addEventListener('click', activateTempSimulation); // working feature, currently removed for ease of use
// stopTempFeedBtn.addEventListener('click', stopTempSimulation); // working feature, currently removed for ease of use
dashEditSensorModalUpdate.addEventListener('click', EditSensorModalUpdateBtn);
editSensorBtn.addEventListener('click', updateEditSensorForm);
editSensorBtn2.addEventListener('click', updateEditSensorForm);
editSensorBtn3.addEventListener('click', updateEditSensorForm);
editSensorBtn4.addEventListener('click', updateEditSensorForm);
editSensorBtn5.addEventListener('click', updateEditSensorForm);
editSensorBtn6.addEventListener('click', updateEditSensorForm);
deleteSensorBtn.addEventListener('click', deleteSensor);

// creates initial sensors
if (sessionStorage.getItem('sensorList')) {
  sensorList = JSON.parse(sessionStorage.getItem('sensorList'));
} else {
  sensorList[0] = new Sensor('Cooler 1', 45, 55, 35, 65, 25);
  // sensorList[0].tempRecords = generateTempRecords();
  sensorList[1] = new Sensor('Freezer 1', -5, 32, -30, 40, -40);
  sensorList[2] = new Sensor('Dry Storage', 75, 90, 32, 100, 0);
  sessionStorage.setItem('sensorList', JSON.stringify(sensorList));
}

init();

console.log('Thank you for taking the time to look at my project!');
