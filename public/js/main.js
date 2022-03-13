/* const inputFileForm = document.querySelector('.input-file form')
const inputFile = document.querySelector('.input-file form input[type=file]')
inputFileForm.onsubmit = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', inputFile.files[0])
    fetch('/', {
        method: 'post',
        body: formData
    })

} */
const butBargerIcon = document.querySelector('.button-berger-icon');
const ulNav = document.querySelector('ul.perint-items');
const buttonExport = document.querySelector('.button-export');


document.addEventListener('click', e => {
    e.target !== butBargerIcon &&
        e.target !== ulNav &&
        (butBargerIcon.dataset.clicked = false)

})

function showAndHaddin(theThis) {
    theThis.setAttribute('data-clicked', theThis.dataset.clicked == 'true' ? theThis.dataset.clicked = false : theThis.dataset.clicked = true);
    console.log(theThis);
}


const selectInputTypeSaction = document.querySelectorAll('main section.perint-section > section.select-input-type form')[0];

const inputFileSaction = document.querySelectorAll('main section.perint-section > section.input-file')[0];

const enterManualSaction = document.querySelectorAll('main section.perint-section > section.enter-manual')[0];

const qrcodeStyleSaction = document.querySelectorAll('main section.perint-section > section.qr-code-style')[0];

const showItemSaction = document.querySelectorAll('main section.perint-section > section.show-item')[0];

selectInputTypeSaction.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this)
    // formData.append('id', 11)
    fetch('/a', {
        method: 'POST',
        body: JSON.stringify({ id: 123 })
    }).then(res => res.json())
        .then(data => {
            console.log(data);
        })
})