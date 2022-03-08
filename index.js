const express = require("express")
const ejs = require('ejs')
const excelToJson = require('convert-excel-to-json');
const app = express()
const routerHome = require('./routes/home')
const routerError = require('./routes/error')
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static('routes'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* const result = excelToJson({ 
    sourceFile: './public/data/dataExcel.xlsx' ,
    header: {
        rows: 2
    }
});
 */

app.use('/', routerHome)
app.use('/', routerError)

app.listen(port, () => {
    console.log(`Server run on port http://localhost:${port}`);
})