'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const textLogin = document.querySelector('.textLogin');

const inputUsername = document.querySelector('.inputUsername');
const inputPassword = document.querySelector('.inputPassword');

const btnLogin = document.querySelector('.btnLogin');
const btnforgotPassword = document.querySelector('.btnforgotPassword');
const btnCreateAccount = document.querySelector('.btnCreateAccount');

const infoLoginContainer = document.querySelector('.infoLoginContainer');
const forgotPassword = document.querySelector('.forgotPassword');
const createAccount = document.querySelector('.createAccount');

const user = [
  { nameUser: 'alejo', passwordUser: '1234' },
  { nameUser: 'yefer', passwordUser: '1234' },
];

btnLogin.addEventListener('click', () => {
  if (
    user.some(
      element =>
        element.nameUser === inputUsername.value &&
        element.passwordUser === inputPassword.value
    )
  ) {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    document.querySelector('.pageSearch').classList.remove('hidden');
  } else {
    textLogin.style.fontSize = '17px';
    textLogin.style.color = '#FF0000';
    textLogin.textContent = 'User not found 😐';
  }
});

btnCreateAccount.addEventListener('click', () => {
  infoLoginContainer.classList.add('hidden');
  createAccount.classList.remove('hidden');
});

btnforgotPassword.addEventListener('click', () => {
  infoLoginContainer.classList.add('hidden');
  forgotPassword.classList.remove('hidden');
});
