const ALARM = 'Alarm!';
const NORMAL = 'Normal';
const DEGREE_F = '°F';
const DEGREE_C = '°C';
const ACTIVE = 'Active';
let degreeSelected = DEGREE_F;

let updateTemp;
let userName;

let sensorList = [];
let listLength = sensorList.length;

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

const settingsEditCompanyInfoBtn = document.getElementById(
  'settingsEditCompanyInfo'
);
const settingsSaveCompanyInfoBtn = document.getElementById(
  'settingsSaveCompanyInfo'
);

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
  if (listLength > 5) {
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
  if (listLength > 0) {
    simTempsBtn.disabled = false;
  } else {
    simTempsBtn.disabled = true;
  }
};

const updateDOM = listLength => {
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
  }
};

const addSensor = () => {
  const setupName = document.getElementById('sensorName1').value;
  const setupCurrentTemp = document.getElementById('initialTemp').value;
  const setupHighAlarm = document.getElementById('highAlarm1').value;
  const setupLowAlarm = document.getElementById('lowAlarm1').value;
  if (setupName && setupCurrentTemp && setupHighAlarm && setupLowAlarm) {
    sensorList[sensorList.length] = {
      id: sensorList.length + 1,
      name: setupName,
      currentTemp: setupCurrentTemp,
      alarmStatus: NORMAL,
      highAlarm: setupHighAlarm,
      lowAlarm: setupLowAlarm,
      displayStatus: ACTIVE
    };
    $('#dashAddSensorModal').modal('toggle');
    listLength++;
    console.log(listLength);
    updateDOM(listLength);
    toggleDisableAddSensorBtn(listLength);
    toggleDisablesimulateTempsBtn(listLength);
  } else {
    alert('Please fill all of the fields in order to update.');
  }
};

dashAddSensorBtn.addEventListener('click', addSensor);

const authLogin = () => {
  userName = document.getElementById('loginInputUsername').value;
  const pass = document.getElementById('loginInputPassword').value;

  if (userName === 'admin' && pass === '1234') {
    $('#loginModal').modal('toggle');
  } else alert('Invalid Username or Password');
};

loginModalLoginBtn.addEventListener('click', authLogin);

const loginLauncher = () => {
  $('#loginModal').modal('toggle');
};

// loginLauncher();
// **Remove comment to activate login modal

// -> number
// generates a random number to randomly add or subtract from sensor's current temp
// const simulateTempsFeed = () => {
//   let randomNum;
//   function getRandomInt(min, max) {
//     min = Math.ceil(1);
//     max = Math.floor(5);
//     return Math.floor(Math.random() * (max - min)) + min;
//   }

//   randomNum = getRandomInt();

//   function randomCalc(num) {
//     for (let i = 0; i < listLength; i++) {

//       if (num > 0.5) {
//         sensorList[i].currentTemp -= randomNum;

//         console.log('sensor_ID: ', i, ' - ', sensorList[i].currentTemp);
//       } else {
//         sensorList[i].currentTemp += randomNum;
//         console.log('sensor_ID: ', i, ' - ', sensorList[i].currentTemp);
//       }
//     }
//   }

//   randomCalc(Math.random());
//   updateDOM();
// };

function simulateTemps(status = 'activate') {
  let internalStatus = status;
  if (simTempsBtn.disabled) {
    console.log('btn failed');
    return;
  } else {
    if (status === 'activate') {
      const runTemps = setInterval(simulateTempsFeed, 3000);
      internalStatus = 'inactivate';
      return;
    } else {
      function stopTempFeed() {
        clearInterval(runTemps);        
      }
      stopTempFeed();
    }
  }
}




function simulateTempsFeed() {
  if (simTempsBtn.disabled) {
    stopTempFeed();
    return;
  } else {
    let randomNum;
    function getRandomInt(min, max) {
      min = Math.ceil(1);
      max = Math.floor(5);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    randomNum = getRandomInt();

    function randomCalc(num) {
      for (let i = 0; i < listLength; i++) {
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
  }
}

simTempsBtn.addEventListener('click', simulateTemps);
stopTempFeedBtn.addEventListener('click', simulateTemps.bind(event, 'test'));

//settings page buttons

// const toggleCompanyInfoDisable = () => {
//   document.getElementById('company-info-toggle').removeAttribute('disabled');
// }

// settingsEditCompanyInfoBtn.addEventListener('click', toggleCompanyInfoDisable);
