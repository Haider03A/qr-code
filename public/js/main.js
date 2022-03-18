// Start public code
const buttons = document.querySelectorAll('button')
buttons.forEach(but => but.addEventListener('click', e => e.preventDefault()))

const showAndHaddin = theEle => theEle.setAttribute('data-clicked', theEle.dataset.clicked == 'true' ? theEle.dataset.clicked = false : theEle.dataset.clicked = true);

const onClickDocumentHaddin = (e, eleForSwitch, eleCunOne, eleCunTwo, eleCunThree) => eleForSwitch.dataset.clicked !== 'false' && e.target !== eleCunOne && e.target !== eleCunTwo && e.target !== eleCunThree ? eleForSwitch.dataset.clicked = false : '';
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
qrcodeStyleButtonOpen.addEventListener('click', _ => showAndHaddin(qrcodeStyleBox));
qrcodeStyleButtonClose.addEventListener('click', _ => showAndHaddin(qrcodeStyleBox));

const inputQrcodeValue = document.querySelector('.enter-manual form label.qr-value input');
const inputQrcodeTitle = document.querySelector('.enter-manual form label.qr-title input');
const inputQrcodeChecboxLook = document.querySelector('.enter-manual form label.checkbox-look input');
const cloneValueQrcodeToQrcodeTitle = _ => {
    inputQrcodeChecboxLook.checked &&
        (inputQrcodeTitle.value = inputQrcodeValue.value);
}
inputQrcodeChecboxLook.addEventListener('click', _ => {
    if (inputQrcodeChecboxLook.checked) {
        inputQrcodeTitle.disabled = true;
        cloneValueQrcodeToQrcodeTitle();
        inputQrcodeValue.focus();
    } else {
        inputQrcodeTitle.disabled = false;
        inputQrcodeTitle.focus();
    };
});
inputQrcodeValue.addEventListener('keyup', _ => cloneValueQrcodeToQrcodeTitle());
inputQrcodeValue.addEventListener('blur', _ => cloneValueQrcodeToQrcodeTitle());

// Start Qrcode style
const inputsColors = document.querySelectorAll('.qr-code-style form .inputs-box label.color input');
inputsColors.forEach(input => {
    input.addEventListener('keyup', _ => input.value = input.value.toUpperCase())
    input.addEventListener('blur', _ => input.value = input.value.toUpperCase())
})
// End Qrcode style