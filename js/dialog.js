'use strict';

(function () {

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

  var setupWizard = setup.querySelector('.setup-wizard');
  var setupWizardAppearance = setup.querySelector('.setup-wizard-appearance');


  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardCoatInput = setupWizardAppearance.querySelector('input[name="coat-color"]');

  setupWizardCoat.addEventListener('click', function () {
    var coatColor = window.getRandomElement(window.WIZARD_COAT);
    setupWizardCoat.style.fill = coatColor;
    wizardCoatInput.value = coatColor;
  });

  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardEyesInput = setupWizardAppearance.querySelector('input[name="eyes-color"]');


  setupWizardEyes.addEventListener('click', function () {
    var eyesColor = window.getRandomElement(window.WIZARD_EYES);
    setupWizardEyes.style.fill = eyesColor;
    wizardEyesInput.value = eyesColor;
  });

  var setupWizardFireballWrap = document.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = setupWizardFireballWrap.querySelector('input[name="fireball-color"]');

  setupWizardFireballWrap.addEventListener('click', function () {
    var fireballColor = window.getRandomElement(window.WIZARD_FIREBALL);
    setupWizardFireballWrap.style.background = fireballColor;
    wizardFireballInput.value = fireballColor;
  });

})();


