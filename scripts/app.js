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
// const s1currTemp = document.getElementById('s1-currTemp').value;

const updateDOM = (listLength) => {
  for (let i = 0; i < sensorList.length; i++) {
    document.getElementById('sensor' + i + '-name').innerText =
      sensorList[i].name;
    document.getElementById('sensor' + i + '-highAlarm').innerText =
      sensorList[i].highAlarm;
    document.getElementById('sensor' + i + '-lowAlarm').innerText =
      sensorList[i].lowAlarm;
    document.getElementById('s' + i).classList.remove('inactive-box');
    document.getElementById('sensor' + i + '-currentTemp').innerText = sensorList[i].currentTemp;
    if (listLength > 5) {   
      document.getElementById('dashAddSensBtn').classList.add('disabled');
      document.getElementById('dashAddSensBtn').setAttribute('data-toggle', '');
    }
  }
};

const addSensor = () => {
    sensorList[sensorList.length] = {
      id: sensorList.length + 1,
      name: document.getElementById('sensorName1').value,
      currentTemp: 0,
      alarmStatus: NORMAL,
      highAlarm: document.getElementById('highAlarm1').value,
      lowAlarm: document.getElementById('lowAlarm1').value,
      displayStatus: ACTIVE
    };
    $('#dashAddSensorModal').modal('toggle');    
    listLength++;
    updateDOM(listLength);
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

const simTempFeed = () => {
    let randomNum;
    function getRandomInt(min, max) {
        min = Math.ceil(1);
        max = Math.floor(5);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    randomNum = getRandomInt();


    function randomCalc(num) {
        if (num > 0.5) {
            sensorList[0].currentTemp = sensorList[0].currentTemp - randomNum;
        } else {
            sensorList[0].currentTemp = sensorList[0].currentTemp + randomNum;
        }
    }
    
    randomCalc(Math.random());
    console.log(sensorList[0].currentTemp)
    updateDOM();
}

function simRun() {
    setInterval(simTempFeed, 1300);
}

