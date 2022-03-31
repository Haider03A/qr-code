// Start public code
const buttons = document.querySelectorAll('button')
buttons.forEach(but => but.addEventListener('click', e => e.preventDefault()))

const showAndHaddin = theEle => theEle.setAttribute('data-clicked', theEle.dataset.clicked == 'true' ? theEle.dataset.clicked = false : theEle.dataset.clicked = true);

const onClickDocumentHaddin = (e, eleForSwitch, eleCunOne, eleCunTwo, eleCunThree) => eleForSwitch.dataset.clicked !== 'false' && e.target !== eleCunOne && e.target !== eleCunTwo && e.target !== eleCunThree ? eleForSwitch.dataset.clicked = false : '';

const inputValidationNumber = (value, minValue = 0, maxValue = 1) => {
    return new Promise((resolve, reject) => {
        let letters;
        if (value) {
            for (i = 0; i < value.length; i++) {
                for (num = 0; num < 10; num++) {
                    value[i] == num &&
                        (letters ? letters = letters + value[i] : letters = value[i]);
                }
            }
            letters = Number(letters);
            if (!letters) {
                letters = minValue
            } else if (letters < minValue) {
                letters = minValue
            } else {
                letters > maxValue ? letters = maxValue : letters = letters;
            }
        } else {
            letters = minValue
        };
        resolve(letters)

    })
}
// End public code

// Start navbar and header
const butBargerIcon = document.querySelector('.button-berger-icon');
const navBar = document.querySelector('.header-of-page nav ul');
document.addEventListener('click', e => onClickDocumentHaddin(e, butBargerIcon, butBargerIcon, navBar));
butBargerIcon.addEventListener('click', _ => showAndHaddin(butBargerIcon));
// End navbar and header

const buttonAdvanced = document.querySelector('.button-advanced');
const styleAndTiemButtons = document.querySelector('.enter-manual .buttons .style-and-tiem-buttons');
document.addEventListener('click', e => onClickDocumentHaddin(e, buttonAdvanced, buttonAdvanced, styleAndTiemButtons));
buttonAdvanced.addEventListener('click', _ => showAndHaddin(buttonAdvanced))

const buttonExport = document.querySelector('.button-export');
const exportButtons = document.querySelector('.enter-manual .buttons .exports-buttons');
document.addEventListener('click', e => onClickDocumentHaddin(e, buttonExport, buttonExport, exportButtons));
buttonExport.addEventListener('click', _ => showAndHaddin(buttonExport));

const qrcodeStyleButtonOpen = document.querySelector('.enter-manual .buttons .style-and-tiem-buttons .style-button');
const qrcodeStyleButtonClose = document.querySelector('.qr-code-style form .back-button');
const qrcodeStyleBox = document.querySelector('.qr-code-style');

// Start enter manual
const inputQrcodeDataEle = document.querySelector('.enter-manual form label.qr-value input');
const inputQrcodeTitleEle = document.querySelector('.enter-manual form label.qr-title input');
const inputQrcodeChecboxLook = document.querySelector('.enter-manual form label.checkbox-look input');
const cloneValueQrcodeToQrcodeTitle = _ => {
    inputQrcodeChecboxLook.checked &&
        (inputQrcodeTitleEle.value = inputQrcodeDataEle.value);
}
inputQrcodeChecboxLook.addEventListener('click', _ => {
    if (inputQrcodeChecboxLook.checked) {
        inputQrcodeTitleEle.disabled = true;
        cloneValueQrcodeToQrcodeTitle();
        inputQrcodeDataEle.focus();
    } else {
        inputQrcodeTitleEle.disabled = false;
        inputQrcodeTitleEle.focus();
    };
});
inputQrcodeDataEle.addEventListener('keyup', _ => cloneValueQrcodeToQrcodeTitle());
inputQrcodeDataEle.addEventListener('blur', _ => cloneValueQrcodeToQrcodeTitle());

const fetchData = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}
const enterManualButtonSubmit = document.querySelector('form#enter-manual button[type=submit]');
let allDataForm = [];
let id = -1;
enterManualButtonSubmit.addEventListener('click', async _ => {
    const objData = {};
    objData.id = ++id

    // Start form vild
    const qrcodeTitleValue = inputQrcodeTitleEle.value.trim();
    const qrcodeDataValue = inputQrcodeDataEle.value.trim();
    for (i = 0; i <= 7000; i++) {
        if (i < 12) {
            if (qrcodeTitleValue) {
                if (qrcodeTitleValue[i] == ' ' || qrcodeTitleValue[i]) {
                    objData.qrcodeTitle ? objData.qrcodeTitle += qrcodeTitleValue[i] : objData.qrcodeTitle = qrcodeTitleValue[i];
                }
            } else {
                objData.qrcodeTitle = 0;
            }
        }

        if (qrcodeDataValue) {
            if (qrcodeDataValue[i] == ' ' || qrcodeDataValue[i]) {
                objData.qrcodeData ? objData.qrcodeData += qrcodeDataValue[i] : objData.qrcodeData = qrcodeDataValue[i];
            }
        } else {
            objData.qrcodeData = 0;
        }
    }
    // End form vild
    const urlPOST = 'http://localhost:3000/qrcode/upload';
    if (objData.qrcodeData) {
        allDataForm.push(objData)
        try {
            const res = await fetchData(urlPOST, allDataForm);
            const data = await res.json()
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    } else {
        inputQrcodeDataEle.style.animation = 'input-error-vild 1s 1';
        setTimeout(() => {
            inputQrcodeDataEle.style.animation = null
        }, 1000);
    }
})
// End enter manual

// Start Qrcode style
const inputsColors = document.querySelectorAll('.qr-code-style form .inputs-box label.color input');
inputsColors.forEach(input => {
    input.addEventListener('keyup', _ => input.value = input.value.toUpperCase())
    input.addEventListener('blur', _ => input.value = input.value.toUpperCase())
})

// Start qrcode style inputs elements 
const qrcodeStyleWidthInput = document.querySelector('.qr-code-style form .qr-style-width input');
const qrcodeStyleHeightInput = document.querySelector('.qr-code-style form .qr-style-height input');
const qrcodeStyleMarginInput = document.querySelector('.qr-code-style form .qr-style-margin input');
const qrcodeStyleColorInput = document.querySelector('.qr-code-style form .qr-style-color input');
const qrcodeStyleBackgroundColorInput = document.querySelector('.qr-code-style form .qr-style-background input');
// End qrcode style inputs elements

qrcodeStyleButtonOpen.addEventListener('click', _ => showAndHaddin(qrcodeStyleBox));
qrcodeStyleButtonClose.addEventListener('click', async _ => {
    await inputValidationNumber(qrcodeStyleWidthInput.value, 20, 700).then(value => qrcodeStyleWidthInput.value = value);
    await inputValidationNumber(qrcodeStyleHeightInput.value, 20, 700).then(value => qrcodeStyleHeightInput.value = value);
    await inputValidationNumber(qrcodeStyleMarginInput.value, 0, 15).then(value => qrcodeStyleMarginInput.value = value);
    showAndHaddin(qrcodeStyleBox);
});
qrcodeStyleWidthInput.addEventListener('blur', function () {
    inputValidationNumber(qrcodeStyleWidthInput.value, 20, 700).then(value => qrcodeStyleWidthInput.value = value);
});

qrcodeStyleHeightInput.addEventListener('blur', function () {
    inputValidationNumber(qrcodeStyleHeightInput.value, 20, 700).then(value => qrcodeStyleHeightInput.value = value);
});

qrcodeStyleMarginInput.addEventListener('blur', function () {
    inputValidationNumber(qrcodeStyleMarginInput.value, 20, 700).then(value => qrcodeStyleMarginInput.value = value);
})
// End Qrcode style

// Start show items
const perintItemsBox = document.querySelector('section.show-items');
const buttonOpenItems = document.querySelector("section.enter-manual .buttons .style-and-tiem-buttons .show-items-button");
const buttoncloseItems = document.querySelector("section.show-items .cloes-button button");
buttonOpenItems.addEventListener('click', _ => showAndHaddin(perintItemsBox));
buttoncloseItems.addEventListener('click', _ => showAndHaddin(perintItemsBox));
// Ens show items