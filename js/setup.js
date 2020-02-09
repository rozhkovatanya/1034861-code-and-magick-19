'use strict';
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var setup = document.querySelector('.setup');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');


userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_NAME_LENGTH) {
    target.setCustomValidity(
        'Имя должно состоять минимум из ' +
         MIN_NAME_LENGTH +
        '-х символов'
    );
  } else if (target.value.length > MAX_NAME_LENGTH) {
    target.setCustomValidity(
        'Имя не должно превышать ' +
        MAX_NAME_LENGTH +
        '-ти символов'
    );
  } else {
    target.setCustomValidity('');
  }
});

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY && evt.target !== userNameInput) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpenIcon.addEventListener('click', function () {
  openPopup();
});

setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARD_COAT = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_EYES = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var WIZARD_FIREBALL = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var getRandomElement = function (array) {
  var randomNumber = Math.random() * array.length;
  var index = Math.floor(randomNumber);
  return array[index];
};

var wizards = [];
for (var num = 0; num < 4; num++) {
  wizards.push({
    name: getRandomElement(WIZARD_NAMES),
    surname: getRandomElement(WIZARD_SURNAMES),
    coatColor: getRandomElement(WIZARD_COAT),
    eyesColor: getRandomElement(WIZARD_EYES)
  });
}

for (var i = 0; i < wizards.length; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name + ' ' + wizards[i].surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;

  similarListElement.appendChild(wizardElement);
}

var setupWizard = setup.querySelector('.setup-wizard');
var setupWizardAppearance = setup.querySelector('.setup-wizard-appearance');


var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardCoatInput = setupWizardAppearance.querySelector('input[name="coat-color"]');

setupWizardCoat.addEventListener('click', function () {
  var coatColor = getRandomElement(WIZARD_COAT);
  setupWizardCoat.style.fill = coatColor;
  wizardCoatInput.value = coatColor;
});

var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardEyesInput = setupWizardAppearance.querySelector('input[name="eyes-color"]');


setupWizardEyes.addEventListener('click', function () {
  var eyesColor = getRandomElement(WIZARD_EYES);
  setupWizardEyes.style.fill = eyesColor;
  wizardEyesInput.value = eyesColor;
});

var setupWizardFireballWrap = document.querySelector('.setup-fireball-wrap');
var wizardFireballInput = setupWizardFireballWrap.querySelector('input[name="fireball-color"]');

setupWizardFireballWrap.addEventListener('click', function () {
  var fireballColor = getRandomElement(WIZARD_FIREBALL);
  setupWizardFireballWrap.style.background = fireballColor;
  wizardFireballInput.value = fireballColor;
});
