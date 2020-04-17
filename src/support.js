/* eslint-disable no-undef */
const sendMessageBtn = document.getElementById('sendMessageBtn');

sendMessageBtn.addEventListener('click', sendMessage);

// sends email to support team
function sendMessage() {
    const firstName = document.getElementById('supportRequestFormFirstName');
    const lastName = document.getElementById('supportRequestFormLastName');
    const emailAddress = document.getElementById('supportRequestFormEmail');
    const messageContent = document.getElementById('supportRequestFormMessage');
    if (firstName.value && lastName.value && emailAddress.value && messageContent.value) {
        $('#messageSuccessModal').modal('toggle');
    } else {
        $('#messageFailModal').modal('toggle');
    }
}
