// Shortcuts for button listeners below
const settingsEditCompanyInfoBtn = document.getElementById(
  'settingsEditCompanyInfo'
);
const settingsSaveCompanyInfoBtn = document.getElementById(
  'settingsSaveCompanyInfo'
);

// Function for editing company data fields
const editCompanyInfo = () => {
  document.getElementById('company-info-toggle').disabled = false;
  document.getElementById('companyName').focus();
  document.getElementById('companyName').select();
};

// Button handler for edit company info section
if (settingsEditCompanyInfoBtn) {
  settingsEditCompanyInfoBtn.addEventListener('click', editCompanyInfo);
}

// Function for saving company info field values to sessionStorage
const saveCompanyInfo = () => {
  let companyName = document.getElementById('companyName').value;
  let address1 = document.getElementById('inputAddress').value;
  let address2 = document.getElementById('inputAddress2').value;
  let city = document.getElementById('inputCity').value;
  let state = document.getElementById('inputState').value;
  let zip = document.getElementById('inputZip').value;
  sessionStorage.setItem('companyName', companyName);
  sessionStorage.setItem('address1', address1);
  sessionStorage.setItem('address2', address2);
  sessionStorage.setItem('city', city);
  sessionStorage.setItem('state', state);
  sessionStorage.setItem('zip', zip);
  document.getElementById('company-info-toggle').disabled = true;
};

// Button handler for saving edits made to company data fields
if (settingsSaveCompanyInfoBtn) {
  settingsSaveCompanyInfoBtn.addEventListener('click', saveCompanyInfo);
}

// Function for loading company info on page load if any data exists in sessionStorage
const loadSavedCompanyData = () => {
  let companyName = document.getElementById('companyName');
  let address1 = document.getElementById('inputAddress');
  let address2 = document.getElementById('inputAddress2');
  let city = document.getElementById('inputCity');
  let state = document.getElementById('inputState');
  let zip = document.getElementById('inputZip');
  companyName.value = sessionStorage.getItem('companyName');
  address1.value = sessionStorage.getItem('address1');
  address2.value = sessionStorage.getItem('address2');
  city.value = sessionStorage.getItem('city');
  state.value = sessionStorage.getItem('state');
  zip.value = sessionStorage.getItem('zip');
};

//
// User Profiles on Settings Page
//

let userProfiles = [];

// Shortcuts for button handlers used below
const settingsUserTable = document.getElementById('settings-userTableMain');
const settingsAddNewUserBtn = document.getElementById('settingsAddNewUser');

// Initial data in user profile table
const defaultUserProfile = {
  userIndex: 1,
  userName: 'Brandon',
  email: 'brandon.lloyd.kunkel@gmail.com',
  receiveEmail: 'on',
  userPhone: '407-698-6113',
  receiveText: 'on'
};

// Initializing/Loading sesstionStorage data if present
if (sessionStorage.getItem('userProfileList')) {
  userProfiles = JSON.parse(sessionStorage.getItem('userProfileList'));
} else {
  userProfiles.push(defaultUserProfile);
  sessionStorage.setItem('userProfileList', JSON.stringify(userProfiles));
}

// const loadSavedUserProfiles = () => {
//   renderUsers();
// };

// Creates a new row in the settingsUserProfilesTable
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
  const storedUserList = JSON.parse(sessionStorage.getItem('userProfileList'));
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
    `settings-userTable${++storedUserList.length}`
  );
  lastTableEntry.firstElementChild.innerText = storedUserList.length + 1;
  newThForTable.setAttribute('scope', 'row');
  newThForTable.innerText = storedUserList.length;
  newTdForTable1.innerHTML = `<input id='settingsAddUserInput${+storedUserList.length}' size='15'/>`;
  newTdForTable2.innerHTML = `<input id='settingsAddEmailInput${+storedUserList.length}' size='30'/>`;
  newTdForTable3.innerHTML = `<input type='checkbox' checked id='user1EmailAlert?${+storedUserList.length}'/>`;
  newTdForTable4.innerHTML = `<input id='settingsAddPhoneInput${+storedUserList.length}' size='12'/>`;
  newTdForTable5.innerHTML = `<input type='checkbox' checked id='user1TextAlert?${+storedUserList.length}'/>`;
  settingsAddNewUserBtn.style.display = 'none';
  settingsConfirmNewUserBtn.style.display = 'inline';
  document
    .getElementById(`settingsAddUserInput${+storedUserList.length}`)
    .focus();
};

// Function for rendering user profile table from sessionStorage userProfileList obj on page load.
const renderUsers = () => {
  const storedUserList = JSON.parse(sessionStorage.getItem('userProfileList'));
  for (user of storedUserList) {
    console.log(user.userName);
    //     // Defining constants
    const newRowForTable = document.createElement('tr');
    const newThForTable = document.createElement('th');
    const newTdForTable1 = document.createElement('td');
    const newTdForTable2 = document.createElement('td');
    const newTdForTable3 = document.createElement('td');
    const newTdForTable4 = document.createElement('td');
    const newTdForTable5 = document.createElement('td');
    const lastTableEntry = document.getElementById('settings-userTableLast');
    //     // Appending all nodes
    lastTableEntry.insertAdjacentElement('beforebegin', newRowForTable);
    newRowForTable.appendChild(newThForTable);
    newRowForTable.appendChild(newTdForTable1);
    newRowForTable.appendChild(newTdForTable2);
    newRowForTable.appendChild(newTdForTable3);
    newRowForTable.appendChild(newTdForTable4);
    newRowForTable.appendChild(newTdForTable5);
    //     // Setting attribues
    newRowForTable.setAttribute('id', `settings-userTable${user.userIndex}`);
    lastTableEntry.firstElementChild.innerText = storedUserList.length + 1;
    newThForTable.setAttribute('scope', 'row');
    newThForTable.innerText = user.userIndex;
    newTdForTable1.innerText = user.userName;
    newTdForTable2.innerText = user.email;
    newTdForTable3.innerHTML = `<input type='checkbox' id='user1EmailAlert?${user.userIndex}'/>`;
    newTdForTable4.innerText = user.userPhone;
    newTdForTable5.innerHTML = `<input type='checkbox' id='user1TextAlert?${user.userIndex}'/>`;
    document.getElementById(`user1EmailAlert?${user.userIndex}`).checked = true;
    document.getElementById(`user1TextAlert?${user.userIndex}`).checked = true;
  }
  disableEditUserBtn();
};

// Function for saving user data when adding user to user profile table
const confirmAddUser = () => {
  const storedUserList = JSON.parse(sessionStorage.getItem('userProfileList'));
  const newUserIndex = ++storedUserList.length;
  const userName = document.getElementById(
    `settingsAddUserInput${newUserIndex}`
  ).value;
  const userEmail = document.getElementById(
    `settingsAddEmailInput${newUserIndex}`
  ).value;
  let receiveEmail = document.getElementById(`user1EmailAlert?${newUserIndex}`)
    .value;
  const userPhone = document.getElementById(
    `settingsAddPhoneInput${newUserIndex}`
  ).value;
  let receiveText = document.getElementById(`user1TextAlert?${newUserIndex}`)
    .value;
  const newTdForTable1 = document.getElementById(
    `settingsAddUserInput${newUserIndex}`
  );
  const newTdForTable2 = document.getElementById(
    `settingsAddEmailInput${newUserIndex}`
  );
  const newTdForTable3 = document.getElementById(
    `user1EmailAlert?${newUserIndex}`
  );
  const newTdForTable4 = document.getElementById(
    `settingsAddPhoneInput${newUserIndex}`
  );
  const newTdForTable5 = document.getElementById(
    `user1TextAlert?${newUserIndex}`
  );

  if (userName && userEmail && receiveEmail && userPhone && receiveText) {
    newTdForTable1.parentElement.innerText = userName;
    newTdForTable2.parentElement.innerText = userEmail;
    newTdForTable4.parentElement.innerText = userPhone;

    const addUserProfileToList = index => {
      const addedUserProfile = {
        userIndex: index,
        userName: userName,
        email: userEmail,
        receiveEmail: 'on',
        userPhone: userPhone,
        receiveText: 'on'
      };

      userProfiles.push(addedUserProfile);
    };

    addUserProfileToList(storedUserList.length);

    const saveUserProfilesForSession = () => {
      sessionStorage.setItem('userProfileList', JSON.stringify(userProfiles));
    };

    saveUserProfilesForSession();

    console.log('userProfiles', userProfiles);
    console.log('session storage', sessionStorage.getItem('userProfileList'));

    settingsAddNewUserBtn.style.display = 'inline';
    settingsConfirmNewUserBtn.style.display = 'none';
  } else {
    alert('Please fill in all fields to create a new user profile!');
  }
  disableEditUserBtn();
};

// Fucntion for disabling the edit user button if there are no user exists
const disableEditUserBtn = () => {
    if (JSON.parse(sessionStorage.getItem('userProfileList')).length < 1) {
        document.getElementById('settingsEditUsers').disabled = true;
      } else {
        document.getElementById('settingsEditUsers').disabled = false;
      }
}

// Function for saving temp scale prefernce to sessionStorage
const savePreferences = () => {
  const fTempSelection = document.getElementById('customRadioInline1');
  const cTempSelection = document.getElementById('customRadioInline2');
  if (sessionStorage.getItem('tempScaleSelection') === 'null') {
    console.log('no existing temp pref');

    return;
  } else if (fTempSelection.checked === true) {
    console.log('saving f as pref');
    sessionStorage.setItem('tempScaleSelection', 'F');
    console.log(sessionStorage.getItem('tempScaleSelection'));
    (fTempSelection.checked = true), (cTempSelection.checked = false);
  } else {
    console.log('saving c as pref');
    sessionStorage.setItem('tempScaleSelection', 'C');
    console.log(sessionStorage.getItem('tempScaleSelection'));
    (fTempSelection.checked = false), (cTempSelection.checked = true);
  }
};

// Function to update DOM for temp scale selection on page load using preferences saved in sessionStorage
const loadSavedPreferences = () => {
  const fTempSelection = document.getElementById('customRadioInline1');
  const cTempSelection = document.getElementById('customRadioInline2');

  if (sessionStorage.getItem('tempScaleSelection') === null) {
    fTempSelection.checked = true;
  } else {
    const selector = sessionStorage.getItem('tempScaleSelection');
    if (selector === 'F') {
      (fTempSelection.checked = true), (cTempSelection.checked = false);
    } else {
      (fTempSelection.checked = false), (cTempSelection.checked = true);
    }
  }
};

// Function for dynamically updating user select list on edit user profile modal
const modifyDropMenu = () => {
  const storedUserList = JSON.parse(sessionStorage.getItem('userProfileList'))
    .length;
  const insertionPlacement = document.getElementById('userIDEditUserSelect');
  insertionPlacement.innerHTML = '';
  let optionCounter = 1;
  for (let i = 0; i < storedUserList; i++) {
    const optionElement = document.createElement('option');
    optionElement.innerText = optionCounter;
    insertionPlacement.insertAdjacentElement('beforeend', optionElement);
    optionCounter++;
  }
};

// Function for saving changes made to users in the edit user profile modal
const saveEditUserProfiles = () => {
  const userID = document.getElementById('userIDEditUserSelect').options
    .selectedIndex;
  const newUserName = document.getElementById('newNameEditUser').value;
  const newUserEmail = document.getElementById('newEmaileditUser').value;
  const newUserPhone = document.getElementById('newPhoneEditUser').value;
  const Users = JSON.parse(sessionStorage.getItem('userProfileList'));
  if (newUserName && newUserEmail && newUserPhone) {
    Users[userID].userName = newUserName;
    Users[userID].email = newUserEmail;
    Users[userID].userPhone = newUserPhone;
    sessionStorage.setItem('userProfileList', JSON.stringify(Users));
    $('#userIDEditUserSelectModal').modal('toggle');
    location.reload();
  } else {
    alert('Please fill in all fields!');
    $('#userIDEditUserSelectModal').modal('toggle');
  }
};

// Function for deleting a user from the user profile table
const deleteUser = () => {
  const userID = +document.getElementById('userIDEditUserSelect')
    .firstElementChild.innerText;
  let usersListHelper = JSON.parse(sessionStorage.getItem('userProfileList'));
  usersListHelper = usersListHelper.filter(user => user.userIndex !== userID);
  for (user of usersListHelper) {
    if (user.userIndex > userID) {
      user.userIndex -= 1;
    }
  }
  sessionStorage.setItem('userProfileList', JSON.stringify(usersListHelper));
  console.log(usersListHelper);
  location.reload();
};

// Helper for button selector adding new user
const settingsConfirmNewUserBtn = document.getElementById(
  'settingsConfirmNewUser'
);

// Button handler for adding new user to user profile table
settingsAddNewUserBtn.addEventListener('click', editAddUser);

// Button handler for saving new user data
settingsConfirmNewUserBtn.addEventListener('click', confirmAddUser);

// Button handler for opening edit user modal for user profile table
document
  .getElementById('settingsEditUsers')
  .addEventListener('click', modifyDropMenu);

// Btn handler for updating edits to user profiles
document
  .getElementById('updateEditUserModalBtn')
  .addEventListener('click', saveEditUserProfiles);

// Btn handler for saving temperature scale preference
document
  .getElementById('savePreferencesBtn')
  .addEventListener('click', savePreferences);

// Btn handler for deleting user on the editUser modal for user profiles
document
  .getElementById('deleteEditUserModalBtn')
  .addEventListener('click', deleteUser);

// Page initialization
const loadSettingsPage = () => {
  loadSavedCompanyData();
  renderUsers();
  loadSavedPreferences();
};

loadSettingsPage();
