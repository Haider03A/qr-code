// Start public code
const buttons = document.querySelectorAll('button')
buttons.forEach(but => {
    but.addEventListener('click', function (e) {
        e.preventDefault();
    })
})

function showAndHaddin(theThis) {
    theThis.setAttribute('data-clicked', theThis.dataset.clicked == 'true' ? theThis.dataset.clicked = false : theThis.dataset.clicked = true);
}

// End public code

const butBargerIcon = document.querySelector('.button-berger-icon');
const buttonExport = document.querySelector('.button-export');

butBargerIcon.addEventListener('click', function () {
    showAndHaddin(this)
})

buttonExport.addEventListener('click', function () {
    showAndHaddin(this)
})
