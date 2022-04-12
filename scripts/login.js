'use strict';

//Page home
const pageHome = document.querySelector('.page-home');

//Modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.show-modal');

//Login
const infoLoginContainer = document.querySelector('.info-login-container');
const textLogin = document.querySelector('.text-login');
const inputUsername = document.querySelector('.input-username');
const inputPassword = document.querySelector('.input-password');
const btnLogin = document.querySelector('.btn-login');
const btnforgotPassword = document.querySelector('.btn-forgot-password');
const btnCreateAccount = document.querySelector('.btn-create-account');

//Forgot Password
const forgotPassword = document.querySelector('.forgot-password');
const textNewPassword = document.querySelector('.text-new-password');
const inputUsernameNewPassword = document.querySelector(
  '.input-username-new-password'
);
const btnSearchUser = document.querySelector('.btn-search-user');
const newPassword = document.querySelector('.new-password');
const confirmNewpassword = document.querySelector('.confirm-new-password');
const btnChangePassword = document.querySelector('.btn-change-password');

//Create Account
const singUp = document.querySelector('.sing-up');
const textCreateAccount = document.querySelector('.text-create-account');
const inputUsernameSingUp = document.querySelector('.input-username-sing-up');
const confirmInputUsernameSingUp = document.querySelector(
  '.confirm-input-username-sing-up'
);
const inputPasswordSingUp = document.querySelector('.input-password-sing-up ');
const btnRegister = document.querySelector('.btn-register');

//user
const user = [
  { nameUser: 'alejo', passwordUser: '1234' },
  { nameUser: 'yefer', passwordUser: '1234' },
];
let currentUser;

//Fuction Block KeyCode
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  let keys = {};
  window.addEventListener(
    'keydown',
    function (e) {
      keys[e.keyCode] = true;
      switch (e.keyCode) {
        case 40:
          e.preventDefault();
          break;
        default:
          break;
      }
    },
    false
  );

  window.addEventListener(
    'keyup',
    function (e) {
      keys[e.keyCode] = false;
    },
    false
  );
};

//Fuction Close Modal and Reset Cases
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  singUp.classList.add('hidden');
  forgotPassword.classList.add('hidden');
  infoLoginContainer.classList.remove('hidden');
  modal.classList.remove('modal-change-password');
  btnCloseModal.classList.remove('close-modal-Change-Password');
  newPassword.classList.add('hidden');
  confirmNewpassword.classList.add('hidden');
  btnChangePassword.classList.add('hidden');
  inputUsernameNewPassword.value = '';
  newPassword.value = '';
  confirmNewpassword.value = '';
  inputUsername.value = '';
  inputPassword.value = '';
  textLogin.style.color = '#000000';
  textLogin.textContent = '👋 Welcome !';
};

//Open modal
btnOpenModal.addEventListener('click', openModal);

//Close Modal
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Case Login Modal
btnLogin.addEventListener('click', () => {
  if (
    user.some(
      element =>
        element.nameUser === inputUsername.value &&
        element.passwordUser === inputPassword.value
    )
  ) {
    currentUser = user.filter(
      element =>
        element.nameUser === inputUsername.value &&
        element.passwordUser === inputPassword.value
    )[0]?.nameUser;
    document.querySelector(
      '.text-search-name'
    ).textContent = `WELCOME ${currentUser.toUpperCase()}!`;
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    pageHome.classList.add('hidden');
    document.querySelector('.page-search').classList.remove('hidden');
  } else {
    if (user.some(element => element.nameUser !== inputUsername.value))
      textLogin.textContent = 'User not found 😐';
    if (user.some(element => element.passwordUser !== inputPassword.value))
      textLogin.textContent = 'Invalid password 😐';
    textLogin.style.color = '#FF0000';
    inputUsername.value = '';
    inputPassword.value = '';
  }
});

//Case Create User
btnCreateAccount.addEventListener('click', () => {
  infoLoginContainer.classList.add('hidden');
  singUp.classList.remove('hidden');
});

btnRegister.addEventListener('click', () => {
  let newUserName = inputUsernameSingUp.value;
  let validationNewUserName = confirmInputUsernameSingUp.value;
  let newPassword = inputPasswordSingUp.value;

  if (
    user.some(element => element.nameUser === newUserName) ||
    newUserName !== validationNewUserName ||
    newPassword === '' ||
    newUserName === ''
  ) {
    if (user.some(element => element.nameUser === newUserName))
      textCreateAccount.textContent = 'User exist';

    if (newUserName !== validationNewUserName || newUserName === '')
      textCreateAccount.textContent = 'Invalid user';

    if (newPassword === '') textCreateAccount.textContent = 'Invalid password';

    textCreateAccount.style.color = '#FF0000';
    inputUsernameSingUp.value = '';
    confirmInputUsernameSingUp.value = '';
    inputPasswordSingUp.value = '';
  } else {
    user.push({
      nameUser: newUserName,
      passwordUser: newPassword,
    });
    textCreateAccount.textContent = 'Sing Up';
    textCreateAccount.style.color = '#000000';
    inputUsernameSingUp.value = '';
    confirmInputUsernameSingUp.value = '';
    inputPasswordSingUp.value = '';
    singUp.classList.add('hidden');
    infoLoginContainer.classList.remove('hidden');
    inputUsername.value = '';
    inputPassword.value = '';
  }
});

//Case Forgot Password
btnforgotPassword.addEventListener('click', () => {
  infoLoginContainer.classList.add('hidden');
  forgotPassword.classList.remove('hidden');
  modal.classList.add('modal-change-password');
  btnCloseModal.classList.add('close-modal-change-password');
});

btnSearchUser.addEventListener('click', () => {
  if (
    user.some(element => element.nameUser === inputUsernameNewPassword.value)
  ) {
    newPassword.classList.remove('hidden');
    confirmNewpassword.classList.remove('hidden');
    btnChangePassword.classList.remove('hidden');
    textNewPassword.textContent = 'Recover password';
    textNewPassword.style.color = '#000000';
  } else {
    textNewPassword.textContent = 'User not found 😐';
    textNewPassword.style.color = '#FF0000';
    inputUsernameNewPassword.value = '';
  }
  newPassword.value = '';
  confirmNewpassword.value = '';
});

btnChangePassword.addEventListener('click', () => {
  if (newPassword.value === confirmNewpassword.value) {
    const userToChangePassword = user.filter(
      element => element.nameUser === inputUsernameNewPassword.value
    );
    userToChangePassword[0].passwordUser = newPassword.value;
    modal.classList.remove('modal-change-password');
    btnCloseModal.classList.remove('close-modal-change-password');
    newPassword.classList.add('hidden');
    confirmNewpassword.classList.add('hidden');
    btnChangePassword.classList.add('hidden');
    forgotPassword.classList.add('hidden');
    infoLoginContainer.classList.remove('hidden');
    inputUsernameNewPassword.value = '';
    textNewPassword.textContent = 'Recover password';
    textNewPassword.style.color = '#000000';
  } else {
    textNewPassword.textContent = 'Invalid password 😐';
    textNewPassword.style.color = '#FF0000';
  }
  newPassword.value = '';
  confirmNewpassword.value = '';
});
