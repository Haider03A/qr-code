// WIFI:S:Hayder Mi;T:WPa;P:asdzaed3612;H:false;;
// Start public code
const qrcodeValuesDefault = {
    data: 'Hi ****__4x',
    title: 'MrLAG'
}
let vlauesFormsToGenerate = [];
let colors = {
    color: '#1B1A17',
    backgroundColor: '#F0A500',
    titleColor: '#1B1A17'
};

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

const qrcodeStyleButtonOpen = document.querySelector('.enter-manual .buttons .style-and-tiem-buttons .style-button');
const qrcodeStyleButtonClose = document.querySelector('.qr-code-style form .back-button');
const qrcodeStyleBox = document.querySelector('.qr-code-style');

const inputQrcodeDataEle = document.querySelector('.enter-manual form label.qr-value textarea');
const inputQrcodeTitleEle = document.querySelector('.enter-manual form label.qr-title input');
const inputQrcodeChecboxLook = document.querySelector('.enter-manual form label.checkbox-look input');
const enterManualButtonSubmit = document.querySelector('form#enter-manual button[type=submit]');
const feakQrcodeBoxMainZoon = document.querySelector("section.enter-manual > div.qrcode-img > div");
const inputsColors = document.querySelectorAll('.qr-code-style form .inputs-box label.color input');
const feakQrcodeBoxStyleZoon = document.querySelector("section.qr-code-style form > div.qrcode-img > div")
const buttonSaveQrcode = document.querySelector("section.enter-manual > div.buttons > button.save-qrcode.main-button")

// Start enter manual

// Start on click checkbox
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
// End on click checkbox

const vildFromInputs = (qrcodeData, qrcodeTitle, callBackValuesAndStatus) => {
    const qrcodeDataNotVild = qrcodeData.toString();
    const qrcodeTitleNotVild = qrcodeTitle.toString();
    const qrcodeDataValue = qrcodeDataNotVild.trim();
    const qrcodeTitleValue = qrcodeTitleNotVild.trim();
    let status = {
        qrcodeDataStatus: false,
        qrcodeTitleStatus: false
    }
    let valuesForms = {}
    if (qrcodeDataValue.length <= 1273 && qrcodeDataValue != '') {
        status.qrcodeDataStatus = true
    } else {
        status.qrcodeDataStatus = false
    }
    if (qrcodeTitleValue.length <= 30 && qrcodeTitleValue !== ' ') {
        status.qrcodeTitleStatus = true
    } else {
        status.qrcodeTitleStatus = false
    }

    if (status.qrcodeDataStatus && status.qrcodeTitleStatus) {
        valuesForms.qrcodeDataValue = qrcodeDataValue;
        valuesForms.qrcodeTitleValue = qrcodeTitleValue;
    }
    callBackValuesAndStatus(valuesForms, status);
}

const generateQrcodeAndAppend = (qrcodeData, qrcodeTitle = false, qrcodeBoxToAppend, callbackImgCreated = false, optionsQrcode = false, colors = false) => {
    const optionsDefault = {
        type: 'svg',
        color: {
            dark: colors.color || '#000000',
            light: '#240a0a00',
        },
        margin: 1,
        errorCorrectionLevel: 'H',
    }
    QRCode.toString(qrcodeData, optionsQrcode || optionsDefault, (err, imgCreated) => {
        callbackImgCreated &&
            callbackImgCreated(imgCreated, err);

        qrcodeBoxToAppend.innerHTML = imgCreated;
        qrcodeBoxToAppend.style.backgroundColor = colors.backgroundColor || '#240a0a00';
        if (qrcodeTitle) {
            const spanTitle = document.createElement('span');
            const spanTitleText = document.createTextNode(qrcodeTitle);
            spanTitle.style.color = colors.titleColor || '#000000';
            spanTitle.append(spanTitleText);
            qrcodeBoxToAppend.prepend(spanTitle);
        };
    })
}

const inputNotVildBorderErr = ele => {
    ele.style.animation = 'input-error-vild 1s 1';
    setTimeout(() => {
        ele.style.animation = null
    }, 1000);
}

const generateQrcodeFun = (qrcodeData, qrcodeTitle, qrcodeBox, colors, ...eleInputErr) => {
    vildFromInputs(qrcodeData, qrcodeTitle, (vlaues, status) => {
        const { qrcodeDataValue, qrcodeTitleValue } = vlaues;
        const { qrcodeDataStatus, qrcodeTitleStatus } = status;
        const dataObj = {}
        if (qrcodeDataStatus && qrcodeTitleStatus) {
            dataObj.data = { qrcodeDataValue, qrcodeTitleValue }
            dataObj.status = { qrcodeDataStatus, qrcodeTitleStatus }
            vlauesFormsToGenerate.push(dataObj)
        }

        if (qrcodeDataStatus && qrcodeTitleStatus) {
            generateQrcodeAndAppend(qrcodeDataValue, qrcodeTitleValue, qrcodeBox, false, false, colors);
        } else {
            if (!eleInputErr) {
                qrcodeDataStatus ||
                    inputNotVildBorderErr(eleInputErr[0]);
                qrcodeTitleStatus ||
                    inputNotVildBorderErr(eleInputErr[1]);
            }
        }
    });
}

window.addEventListener('load', _ => {
    generateQrcodeFun(qrcodeValuesDefault.data, qrcodeValuesDefault.title, feakQrcodeBoxMainZoon, colors);
    generateQrcodeFun(qrcodeValuesDefault.data, qrcodeValuesDefault.title, feakQrcodeBoxStyleZoon, colors);
    inputsColors[0].value = colors.color;
    inputsColors[1].value = colors.backgroundColor;
    inputsColors[2].vlaue = colors.titleColor;
})

enterManualButtonSubmit.addEventListener('click', _ => {
    generateQrcodeFun(inputQrcodeDataEle.value, inputQrcodeTitleEle.value, feakQrcodeBoxMainZoon, colors, inputQrcodeDataEle, inputQrcodeTitleEle);
})

buttonSaveQrcode.addEventListener('click', _ => {
    html2canvas(feakQrcodeBoxMainZoon).then(canvas => {
        const imgDataSRC = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgDataSRC;
        link.download = 'qrcode-mrlag.png';
        link.click();
        link.remove()
    });
});
// End enter manual

// Start Qrcode style
inputsColors.forEach(input => {
    input.addEventListener('keyup', _ => input.value = input.value.toUpperCase())
    input.addEventListener('blur', _ => input.value = input.value.toUpperCase())
    input.addEventListener('change', _ => {
        const [color, backgroundColor, titleColor] = inputsColors;
        colors.color = color.value;
        colors.backgroundColor = backgroundColor.value;
        colors.titleColor = titleColor.value;
        generateQrcodeFun(qrcodeValuesDefault.data, qrcodeValuesDefault.title, feakQrcodeBoxMainZoon, colors);
        generateQrcodeFun(qrcodeValuesDefault.data, qrcodeValuesDefault.title, feakQrcodeBoxStyleZoon, colors);
        generateQrcodeFun(inputQrcodeDataEle.value, inputQrcodeTitleEle.value, feakQrcodeBoxMainZoon, colors, inputQrcodeDataEle, inputQrcodeTitleEle);
    })
})

qrcodeStyleButtonOpen.addEventListener('click', _ => showAndHaddin(qrcodeStyleBox));
qrcodeStyleButtonClose.addEventListener('click', async _ => {
    await inputValidationNumber(qrcodeStyleMarginInput.value, 0, 15).then(value => qrcodeStyleMarginInput.value = value);
    showAndHaddin(qrcodeStyleBox);
});
// End Qrcode style