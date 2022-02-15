let contActive = 0
let numberSelectCheckBoxs = 0
const updateActiveNumbers = () => {
    const elementsHaveActive0 = document.querySelectorAll('.active0');
    elementsHaveActive0.forEach(active0 => {
        active0.setAttribute("active", contActive.toString())
    })
}
const addActiveCheckboxs= () => {
    const checkboxs = document.querySelectorAll('div.select-input-file div.checkbox ul li');
    checkboxs.forEach(checkbox => {
        checkbox.addEventListener('click', (e) => {
            checkboxs.forEach(checkbox => {
                checkbox.lastElementChild.firstElementChild.setAttribute("active", 0)
            })
            e.target.lastElementChild.firstElementChild.setAttribute("active", 1)
        })
    })
}

addActiveCheckboxs()

function buttonsMove() {
    const moveButtons = document.querySelectorAll('div.buttons-mover > button');
    moveButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target == moveButtons[1]) {
                contActive == 2 ||
                    contActive++;
            } else {
                contActive == 0 ||
                    contActive--;
            }
            updateActiveNumbers();
            const inputOutputDatas = document.querySelector('div.data-canter div.input-output-datas')
            contActive < 0 ||
                (inputOutputDatas.style.transform = `translateX(calc(-100% * ${contActive} - ${contActive == 0 ? 0 : 20}px))`)
        });
    });
}
updateActiveNumbers()
buttonsMove()
