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
    simTempsBtn.removeAttribute('disabled');
    simTempsBtn.classList.remove('disabled');
  } else {
    simTempsBtn.addAttribute('disabled');
    simTempsBtn.classList.add('disabled');
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
//       for (let i = 0; i < listLength; i++) {
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

// let state = 'off';

// const activateTempSimulation = () => {
//   let status = 'inactive';
//   console.log(state)
//   console.log(status);
//   if (simTempsBtn.classList.contains('disabled')) {
//     console.log('simtempbtn is disabled right now');
//     return;
//   } else {
//     console.log('simtempsbtn clicked');
//     status = 'active';
//     console.log(status)
//   }
// };

// simTempsBtn.addEventListener('click', activateTempSimulation);
// // stopTempFeedBtn.addEventListener('click', myStopFunction);

// const test2 = () => {
//   console.log('');
// }

// const testf = () => {
//   console.log('test msg');
// }

// if (state === 'off') {
//   test2();
// } else {
// const test = setInterval(testf, 1500);
// }

//settings page buttons

// const toggleCompanyInfoDisable = () => {
//   document.getElementById('company-info-toggle').removeAttribute('disabled');
// }

// settingsEditCompanyInfoBtn.addEventListener('click', toggleCompanyInfoDisable);

const editCompanyInfo = () => {
  console.log('test');
  document.getElementById('company-info-toggle').disabled = false;
  document.getElementById('companyName').focus();
  document.getElementById('companyName').select();
};

if (settingsEditCompanyInfoBtn) {
  settingsEditCompanyInfoBtn.addEventListener('click', editCompanyInfo);
}

const saveCompanyInfo = () => {
  let companyName = document.getElementById('companyName').value;
  let address1 = document.getElementById('inputAddress').value;
  let address2 = document.getElementById('inputAddress2').value;
  let city = document.getElementById('inputCity').value;
  let state = document.getElementById('inputState').value;
  let zip = document.getElementById('inputZip').value;
  localStorage.setItem('companyName', companyName);
  localStorage.setItem('address1', address1);
  localStorage.setItem('address2', address2);
  localStorage.setItem('city', city);
  localStorage.setItem('state', state);
  localStorage.setItem('zip', zip);
  document.getElementById('company-info-toggle').disabled = true;
};

if (settingsSaveCompanyInfoBtn) {
  settingsSaveCompanyInfoBtn.addEventListener('click', saveCompanyInfo);
}

const loadSettingsPage = () => {
  let companyName = document.getElementById('companyName');
  let address1 = document.getElementById('inputAddress');
  let address2 = document.getElementById('inputAddress2');
  let city = document.getElementById('inputCity');
  let state = document.getElementById('inputState');
  let zip = document.getElementById('inputZip');
  companyName.value = localStorage.getItem('companyName');
  address1.value = localStorage.getItem('address1');
  address2.value = localStorage.getItem('address2');
  city.value = localStorage.getItem('city');
  state.value = localStorage.getItem('state');
  zip.value = localStorage.getItem('zip');
};

//
// User Profiles on Settings Page
//

const settingsUserTable = document.getElementById('settings-userTableMain');
const settingsDefaultUser = document.getElementById('settings-userTable1');
const settingsAddNewUserBtn = document.getElementById('settingsAddNewUser');

let settingsUserTableCount = 1; // used as a counter in editAddUser();

// Creates a new row in the settingsUserTable
const editAddUser = () => {
  // Defining constants
  const newRowForTable = document.createElement('tr');
  const newThForTable = document.createElement('th');
  const newTdForTable1 = document.createElement('td');
  const newTdForTable2 = document.createElement('td');
  const newTdForTable3 = document.createElement('td');
  const newTdForTable4 = document.createElement('td');
  const newTdForTable5 = document.createElement('td');
  const lastTableEntry = document.getElementById('settings-userTableLast');
  // Appending all nodes
  lastTableEntry.insertAdjacentElement('beforebegin', newRowForTable);
  newRowForTable.appendChild(newThForTable);
  newRowForTable.appendChild(newTdForTable1);
  newRowForTable.appendChild(newTdForTable2);
  newRowForTable.appendChild(newTdForTable3);
  newRowForTable.appendChild(newTdForTable4);
  newRowForTable.appendChild(newTdForTable5);
  // Setting attribues
  newRowForTable.setAttribute(
    'id',
    `settings-userTable${++settingsUserTableCount}`
  );
  lastTableEntry.firstElementChild.innerText = settingsUserTableCount + 1;
  newThForTable.setAttribute('scope', 'row');
  newThForTable.innerText = settingsUserTableCount;
  newTdForTable1.innerHTML = `<input id='settingsAddUserInput${settingsUserTableCount}' size='15'/>`
  newTdForTable2.innerHTML = `<input id='settingsAddEmailInput${settingsUserTableCount}' size='30'/>`
  newTdForTable3.innerHTML = `<input type='checkbox' id='user1EmailAlert?${settingsUserTableCount}'/>`
  newTdForTable4.innerHTML = `<input id='settingsAddPhoneInput${settingsUserTableCount}' size='12'/>`
  newTdForTable5.innerHTML = `<input type='checkbox' id='user1EmailAlert?${settingsUserTableCount}'/>`
  settingsAddNewUserBtn.style.display = 'none';
  settingsConfirmNewUserBtn.style.display = 'inline';



};

if (settingsAddNewUserBtn) {
  settingsAddNewUserBtn.addEventListener('click', editAddUser);
}

const settingsConfirmNewUserBtn = document.getElementById('settingsConfirmNewUser');

const confirmAddUser = () => {
  const userName = document.getElementById(`settingsAddUserInput${settingsUserTableCount}`).value;
  const userEmail = document.getElementById(`settingsAddEmailInput${settingsUserTableCount}`).value;
  const receiveEmail = document.getElementById(`user1EmailAlert?${settingsUserTableCount}`).value;
  const userPhone = document.getElementById(`settingsAddPhoneInput${settingsUserTableCount}`).value;
  const receiveText = document.getElementById(`user1EmailAlert?${settingsUserTableCount}`).value;

  console.log(userName, userEmail, receiveEmail, userPhone, receiveText);

}

if (settingsConfirmNewUserBtn) {
  settingsConfirmNewUserBtn.addEventListener('click', confirmAddUser);
}

loadSettingsPage();
