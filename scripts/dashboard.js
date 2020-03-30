// Constants //
const ALARM = 'Alarm!';
const NORMAL = 'Normal';
const DEGREE_F = '°F';
const DEGREE_C = '°C';
const ACTIVE = 'Active';
let degreeSelected = DEGREE_F;
const simTempListLength = 100;
let tempPadding = 10;
let markingFreq = 2;
let updateTemp;
let userName;

let sensorList = [];
// let simTempList1 = [];
let listLength = sensorList.length;

function Chart(currentTemp) {
  this.maxMarking = currentTemp + tempPadding;
  this.minMarking = currentTemp - tempPadding;
  this.chartRange = this.maxMarking - this.minMarking;
  this.chartMarkingFrequency = this.chartRange / markingFreq;
  this.greenBackground = {
    yPosn: 5,
    height: 210
  };
  // alarmSection: {<-30 && > 32},
  // normalSection: {-30-30},
  // readingMarker: {},
}

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
    this.simTemps = simTempsPattern1(
      this.lowAlarm,
      this.highAlarm,
      this.currentTemp,
      simTempListLength
    );
    this.chartData = new Chart(this.currentTemp);
  }
}

sensorList[0] = new Sensor('f2', 10, 50, -50);
console.log(sensorList);

// shortcuts
const loginBtn = document.getElementById('login-btn');
const testBtn = document.getElementById('test-btn');
const dashAddSensorBtn = document.getElementById('dashAddSensorModalUpdateBtn');
const dashAddSensorModalCloseBtn = document.getElementById(
  'dashAddSensorModalCloseBtn'
);
const loginModalLoginBtn = document.getElementById('loginModalLoginBtn');
const simTempsBtn = document.getElementById('simTempBtn');
const stopTempFeedBtn = document.getElementById('stopTempFeedBtn');
// const s1currTemp = document.getElementById('s1-currTemp').value;

// Obj -> String
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

const updateDegreeSymbolSelection = () => {
  const listOfElements = document.getElementsByClassName('cf-selector');
  for (let i = 0; i < listOfElements.length; i++) {
    listOfElements[i].innerText = degreeSelected;
  }
};

const toggleDisableAddSensorBtn = length => {
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

const toggleDisablesimulateTempsBtn = length => {
  if (sensorList.length > 0) {
    simTempsBtn.removeAttribute('disabled');
    simTempsBtn.classList.remove('disabled');
  } else {
    simTempsBtn.addAttribute('disabled');
    simTempsBtn.classList.add('disabled');
  }
};

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
    // document.getElementById('sensor' + i + '-rangeMax').innerText =
    // sensorList[i].rangeMax;
    // document.getElementById('sensor' + i + '-rangeMin').innerText =
    // sensorList[i].rangeMin;
    updateDegreeSymbolSelection();
    // addMeasuringLines();
    document.getElementById('s' + i).classList.remove('inactive-box');
  }
};

// function addMeasuringLines() {
//   const insertionPoint = document.getElementById('insertLinesHere');
//   let yPosn = 0;
//   for (i = 0; i < 22; i + 10) {
//     insertionPoint.insertAdjacentHTML('afterend', '<svg><rect x="0" y="200" width="10" height="4" style="fill: yellow;stroke:black;stroke-width:2" /></svg>');
//   }
// };

const updateTempMarkings = (highAlarm, lowAlarm, rangeMax, rangeMin, range) => {
  let maxReading = document.getElementById('tempScaleNumberMax1');
  const highAlarmReading = document.getElementById('tempScaleNumberMaxAlarm1');
  const zeroReading = document.getElementById('tempScaleMarkerZero1');
  const lowAlarmReading = document.getElementById('tempScaleNumberMinAlarm1');
  const minReading = document.getElementById('tempScaleNumberMin1');
  const validTempZoneMax = document.getElementById('validTempZone');
  maxReading.innerText = rangeMax;
  highAlarmReading.innerText = rangeMax - Math.floor(range / 4);
  zeroReading.innerText = rangeMax - Math.floor(range / 2);
  lowAlarmReading.innerText = rangeMax - 3 * Math.floor(range / 4);
  minReading.innerText = rangeMin;
  function setValidTempZone() {
    const newValidMaxPosition = ((range - highAlarm) / range) * 205;
    const newValidMinPosition = ((highAlarm - lowAlarm) / range) * 205;
    if (newValidMaxPosition >= 5 || newValidMaxPosition <= 210) {
      validTempZoneMax.setAttribute('y', newValidMaxPosition);
    } else {
      validTempZoneMax.setAttribute('y', 5);
    }
    if (newValidMinPosition >= 5 || newValidMinPosition <= 210) {
      validTempZoneMax.setAttribute('height', newValidMinPosition);
    } else {
      validTempZoneMax.setAttribute('height', 210);
    }
  }
  setValidTempZone();
};

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
    alert('Please enter valid inputs!');
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
      // sensorList[sensorList.length] = {
      //   id: sensorList.length + 1,
      //   name: setupName,
      //   currentTemp: setupCurrentTemp,
      //   alarmStatus: NORMAL,
      //   highAlarm: setupHighAlarm,
      //   lowAlarm: setupLowAlarm,
      //   displayStatus: ACTIVE
      // };
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
      // listLength++;
      // console.log(listLength);
      updateTempMarkings(
        setupHighAlarm,
        setupLowAlarm,
        setupRangeMax,
        setupRangeMin,
        range
      );
      updateDOM(sensorList.length);
      toggleDisableAddSensorBtn(sensorList.length);
      toggleDisablesimulateTempsBtn(sensorList.length);
      const min = +setupLowAlarm - 5;
      const max = +setupHighAlarm + 5;
      const init = +setupCurrentTemp;
      const length = (+setupHighAlarm - +setupLowAlarm) * 10;
      simTempsPattern1(min, max, init, length);
    } else {
      alert('Please fill all of the fields in order to update.');
    }
  }
};

if (dashAddSensorBtn) {
  dashAddSensorBtn.addEventListener('click', addSensor);
}

const authLogin = () => {
  userName = document.getElementById('loginInputUsername').value;
  const pass = document.getElementById('loginInputPassword').value;

  if (userName === 'admin' && pass === '1234') {
    $('#loginModal').modal('toggle');
  } else alert('Invalid Username or Password');
};

if (loginModalLoginBtn) {
  loginModalLoginBtn.addEventListener('click', authLogin);
}

const loginLauncher = () => {
  $('#loginModal').modal('toggle');
};

// loginLauncher();
// **Remove comment to activate login modal

function simTempsPattern1(min, max, init, length) {
  let simTempList1 = [];
  simTempList1[0] = +init;
  let direction = 'up';
  for (i = 1; i < length; i++) {
    if (direction === 'up') {
      simTempList1[i] = simTempList1[i - 1] + 1;
      if (simTempList1[i] === max) {
        direction = 'down';
      }
    } else {
      simTempList1[i] = simTempList1[i - 1] - 1;
      if (simTempList1[i] === min) {
        direction = 'up';
      }
    }
  }
  // console.log(simTempList1);
  return simTempList1;
}

//generates a random number to randomly add or subtract from sensor's current temp
const simulateTempsFeed = () => {
  let randomNum;
  function getRandomInt(min, max) {
    min = Math.ceil(1);
    max = Math.floor(5);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  randomNum = getRandomInt();

  function randomCalc(num) {
    for (let i = 0; i < sensorList.length; i++) {
      if (num > 0.5) {
        sensorList[i].currentTemp -= randomNum;

        console.log('sensor_ID: ', i, ' - ', sensorList[i].currentTemp);
      } else {
        sensorList[i].currentTemp += randomNum;
        console.log('sensor_ID: ', i, ' - ', sensorList[i].currentTemp);
      }
    }
  }

  randomCalc(Math.random());
  updateDOM();
};

// function simulateTemps(status = 'activate') {
//   let internalStatus = status;
//   if (simTempsBtn.disabled) {
//     console.log('btn failed');
//     return;
//   } else {
//     if (status === 'activate') {
//       const runTemps = setInterval(simulateTempsFeed, 3000);
//       internalStatus = 'inactivate';
//       return;
//     } else {
//       function stopTempFeed() {
//         clearInterval(runTemps);
//       }
//       stopTempFeed();
//     }
//   }
// }

// function simulateTempsFeed() {
//   if (simTempsBtn.disabled) {
//     stopTempFeed();
//     return;
//   } else {
//     let randomNum;
//     function getRandomInt(min, max) {
//       min = Math.ceil(1);
//       max = Math.floor(5);
//       return Math.floor(Math.random() * (max - min)) + min;
//     }

//     randomNum = getRandomInt();

//     function randomCalc(num) {
//       for (let i = 0; i < sensorList.length; i++) {
//         if (num > 0.5) {
//           sensorList[i].currentTemp -= randomNum;

//           console.log('sensor_ID: ', i, ' - ', sensorList[i].currentTemp);
//         } else {
//           sensorList[i].currentTemp += randomNum;
//           console.log('sensor_ID: ', i, ' - ', sensorList[i].currentTemp);
//         }
//       }
//     }

//     randomCalc(Math.random());
//     updateDOM();
//   }
// }

let state = 'off';

const activateTempSimulation = () => {
  let status = 'inactive';
  console.log(state);
  console.log(status);
  if (simTempsBtn.classList.contains('disabled')) {
    console.log('simtempbtn is disabled right now');
    return;
  } else {
    console.log('simtempsbtn clicked');
    status = 'active';
    console.log(status);
    simulateTempsFeed();
  }
};

simTempsBtn.addEventListener('click', activateTempSimulation);
// stopTempFeedBtn.addEventListener('click', myStopFunction);

updateDOM(); // delete this later

// const updateEditSensorForm = () => {
//   console.log(this);
//   console.log(event);
//   const id = event.srcElement.offsetParent.getAttribute('id').slice(1, 2);
//   const sensor = sensorList[id];
//   const NameInput = document.getElementById('editSensorName1');
//   const HighAlarmInput = document.getElementById('editHighAlarm1');
//   const LowAlarmInput = document.getElementById('editLowAlarm1');
//   const rangeMaxInput = document.getElementById('editRangeMax1');
//   const rangeMinInput = document.getElementById('editRangeMin1');
//   const calibrateTemp = document.getElementById('editTemp');
//   NameInput.innerText = sensor.name;
//   HighAlarmInput.innerText = sensor.highAlarm;
//   LowAlarmInput.innerText = sensor.lowAlarm;
//   rangeMaxInput.innerText = sensor.rangeMax;
//   rangeMinInput.innerText = sensor.rangeMin;
//   calibrateTemp.innerText = sensor.currentTemp;
//   $("#dashEditSensorModal").on('show.bs.modal', function(event){
//     alert('The modal is fully shown.');
//     console.log(event);
//   });
// };

const updateEditSensorForm = () => {
  console.log(this);
  console.log(event);
  $('#dashEditSensorModal').on('shown.bs.modal', function(event) {
    const id = event.relatedTarget.offsetParent.getAttribute('id').slice(1, 2);
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
    modalID.setAttribute('id', `modalID-${id}`);
  });
  const EditSensorModalUpdateBtn = () => {
    const modal = document
    .getElementById('editSensorName1')
    .parentElement.parentElement.firstElementChild;
    const modalID = document
      .getElementById('editSensorName1')
      .parentElement.parentElement.firstElementChild.getAttribute('id')
      .slice(-1);
    const editName = document.getElementById('editSensorName1');
    const editHighAlarm = document.getElementById('editHighAlarm1');
    const editLowAlarm = document.getElementById('editLowAlarm1');
    const editRangeMax = document.getElementById('editRangeMax1');
    const editRangeMin = document.getElementById('editRangeMin1');
    const editCurrentTemp = document.getElementById('editTemp');
    const editRange = editRangeMax - editRangeMin;
    const min = +editLowAlarm - 5;
    const max = +editHighAlarm + 5;
    const init = +editCurrentTemp;
    const length = (+editHighAlarm - +editLowAlarm) * 10;
    sensorList[modalID].name = editName;
    sensorList[modalID].currentTemp = editCurrentTemp;
    sensorList[modalID].highAlarm = editHighAlarm;
    sensorList[modalID].lowAlarm = editLowAlarm;
    sensorList[modalID].rangeMax = editRangeMax;
    sensorList[modalID].rangeMin = editRangeMin;
    modal.setAttribute('id', 'modalID');
    updateTempMarkings(
      +editHighAlarm.value,
      +editLowAlarm.value,
      +editRangeMax.value,
      +editRangeMin.value,
      +editRange.value
      );
      // updateDOM(modalID);
      // simTempsPattern1(min, max, init, length);
      $('#dashEditSensorModal').modal('toggle');
  };

  const dashEditSensorModalUpdateBtn = document.getElementById(
    'dashEditSensorModalUpdateBtn'
  );
  dashEditSensorModalUpdateBtn.addEventListener(
    'click',
    EditSensorModalUpdateBtn
  );
};

$('#dashEditSensorModal').on('hidden.bs.modal', function() {
  document
      .getElementById('editSensorName1')
      .parentElement.parentElement.firstElementChild.setAttribute('id', 'modalID');
});

const editSensorBtn = document.getElementById('editSensorBtn');
editSensorBtn.addEventListener('click', updateEditSensorForm);

// const EditSensorModalUpdateBtn = () => {
//   const modalID = document.getElementById('editSensorName1').parentElement.parentElement.firstElementChild.getAttribute('id').slice(-1);
//   const editName = document.getElementById('editSensorName1');
//   const editHighAlarm = document.getElementById('editHighAlarm1');
//   const editLowAlarm = document.getElementById('editLowAlarm1');
//   const editRangeMax = document.getElementById('editRangeMax1');
//   const editRangeMin = document.getElementById('editRangeMin1');
//   const editCurrentTemp = document.getElementById('editTemp');
//   const editRange = (editRangeMax - editRangeMin);
//   const min = +editLowAlarm - 5;
//   const max = +editHighAlarm + 5;
//   const init = +editCurrentTemp;
//   const length = (+editHighAlarm - +editLowAlarm) * 10;
//   sensorList[modalID].name = editName;
//   sensorList[modalID].currentTemp = editCurrentTemp;
//   sensorList[modalID].highAlarm = editHighAlarm;
//   sensorList[modalID].lowAlarm = editLowAlarm;
//   sensorList[modalID].rangeMax = editRangeMax;
//   sensorList[modalID].rangeMin = editRangeMin;
//   $('#dashEditSensorModal').modal('toggle');
//   // updateTempMarkings(
//   //   editHighAlarm,
//   //   editLowAlarm,
//   //   editRangeMax,
//   //   editRangeMin,
//   //   editRange
//   // );
//   // updateDOM(modalID);
//   // simTempsPattern1(min, max, init, length);
// }

// const dashEditSensorModalUpdateBtn = document.getElementById('dashEditSensorModalUpdateBtn');
// dashEditSensorModalUpdateBtn.addEventListener('click', EditSensorModalUpdateBtn);
