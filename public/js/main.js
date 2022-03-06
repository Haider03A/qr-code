const inputFileForm = document.querySelector('.input-file form')
const inputFile = document.querySelector('.input-file form input[type=file]')
inputFileForm.onsubmit = (e) => {
 e.preventDefault()
 let formData = new FormData()
 formData.append('file', inputFile.files[0])
 fetch('/', {
  method: 'post',
  body: formData
 })

}