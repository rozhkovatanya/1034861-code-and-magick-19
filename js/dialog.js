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
    setup.removeAttribute('style');
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

  var userDialog = document.querySelector('.setup');

  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

  window.backend.load(function (wizards) {
    for (var i = 0; i < 4; i++) {
      var wizardElement = similarWizardTemplate.cloneNode(true);
      var wizard = window.getRandomElement(wizards);
      wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

      similarListElement.appendChild(wizardElement);
    }
  }, onError);

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.id = 'errorHeader';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var setupWizardForm = document.querySelector('.setup-wizard-form');
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    var data = new FormData();
    data.append('fireball-color', wizardFireballInput.value);
    data.append('eyes-color', wizardEyesInput.value);
    data.append('coat-color', wizardCoatInput.value);
    data.append('files', []);
    data.append('username', userNameInput.value);

    var onSuccess = function () {
      closePopup();
      var errorElement = document.getElementById('errorHeader');
      if (errorElement) {
        errorElement.remove();
      }
    };

    window.backend.save(data, onSuccess, onError);
  };
  setupWizardForm.addEventListener('submit', onFormSubmit);

})();


