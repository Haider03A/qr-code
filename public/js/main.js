// // WIFI:S:Hayder Mi;T:WPa;P:asdzaed3612;H:false;;
// Start public code
const qrcodeValuesDefault = {
    data: 'test',
    title: 'Title'
}
let vlauesFormsToGenerate = [];
let colors = {
    color: '#000000',
    backgroundColor: '#ffffff',
    titleColor: '#000000'
};

Coloris({
  el: '.color-pick',
  format: 'hex',
  formatToggle: false,
  margin: 2,
  parent: true,
  focusInput: true,
  wrap: false,
  swatchesOnly: false,
  autoClose: false,
  swatches: [
    '#264653',
    '#2a9d8f',
    '#e9c46a',
    '#f4a261',
    '#e76f51',
    '#d62828',
    '#023e8a',
    '#0077b6',
    '#0096c7',
    '#00b4d8',
    '#48cae4',
  ]
});

const buttons = document.querySelectorAll('button')
buttons.forEach(but => but.addEventListener('click', e => e.preventDefault()))

const showAndHaddin = (eleToShowAndeHaddin, eleSwitchStatus = false) => {
    const eleToShowAndeHaddinStatus = eleToShowAndeHaddin.dataset.show == 'true' ? true : false;
    eleToShowAndeHaddin.dataset.show = !eleToShowAndeHaddinStatus;
    eleSwitchStatus &&
        (eleSwitchStatus.dataset.clicked = !eleToShowAndeHaddinStatus);
} 

const onClickDocumentHaddin = (event, eleToHaddin, eleSwitchStatus, ...notEqualThis) => {
    const eleToHaddinStatus = eleToHaddin.dataset.show == 'true' ? true : false;
    if (eleToHaddinStatus) {
        const cundLog = [];
        notEqualThis.map(ele => {
            if (event.target !== ele) {
                cundLog.push(true)
            } else {
                cundLog.push(false)
            }
        })
        const cundStatus = cundLog.every(cund => cund == true);
        if (cundStatus) {
            eleToHaddin.dataset.show = false;
            eleSwitchStatus &&
                (eleSwitchStatus.dataset.clicked = false);
        }
    }
}
// // End public code

// Start navbar and header
const butBargerIcon = document.querySelector('.button-berger-icon');
const navBar = document.querySelector('.header-of-page nav ul');
document.addEventListener('click', e => onClickDocumentHaddin(e, navBar, butBargerIcon, navBar, butBargerIcon));
butBargerIcon.addEventListener('click', _ => showAndHaddin(navBar, butBargerIcon));
// End navbar and header

const inputQrData = document.querySelector('.box-input-qr-data textarea');
const inputQrTitle = document.querySelector('.box-input-qr-title input');
const enterManualButtonSubmit = document.querySelector('form#enter-manual button[type=submit]');

const feakQrcodeBoxMainZoon = document.querySelector('.enter-manual .main-qrcode-style');

const butQrSave = document.querySelector('.save-qrcode');
const butAdvanced = document.querySelector('.button-advanced');
const butBoxAdvancedSettings = document.querySelector('.box-advanced-settings');
document.addEventListener('click', e => onClickDocumentHaddin(e, butBoxAdvancedSettings, butAdvanced, butBoxAdvancedSettings, butAdvanced));
butAdvanced.addEventListener('click', _ => showAndHaddin(butBoxAdvancedSettings, butAdvanced))

const qrBoxStyle = document.querySelector('.qr-code-style');
const butOpenQrBoxStyle = document.querySelector('.button-open-box-style');
const butCloseQrBoxStyle = document.querySelector('.button-close-box-style');
const feakQrcodeBoxStyleZoon = document.querySelector('.qr-code-style .main-qrcode-style');

const inputsColors = document.querySelectorAll(".qr-code-style .color-pick")

// Start enter manual
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
    generateQrcodeFun(inputQrData.value, inputQrTitle.value, feakQrcodeBoxMainZoon, colors, inputQrData, inputQrTitle);
})

butQrSave.addEventListener('click', _ => {
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
butOpenQrBoxStyle.addEventListener('click', _ => showAndHaddin(qrBoxStyle));
butCloseQrBoxStyle.addEventListener('click', _ => showAndHaddin(qrBoxStyle));

inputsColors.forEach(inputColor => {
    inputColor.addEventListener('input', _ => {
        inputsColors[0].value = colors.color;
        inputsColors[1].value = colors.backgroundColor;
        inputsColors[2].vlaue = colors.titleColor;
        generateQrcodeFun(qrcodeValuesDefault.data, qrcodeValuesDefault.title, feakQrcodeBoxMainZoon, colors);
        generateQrcodeFun(qrcodeValuesDefault.data, qrcodeValuesDefault.title, feakQrcodeBoxStyleZoon, colors);
    })
})
// // End Qrcode style