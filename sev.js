const express = require( 'express' ) 
const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')


const app = express()
const port = 3000

app.listen( port , function(){
    console.log( 'listening on ' + port )
})

app.get( '' , function( req , res ){ // main page
    res.sendFile( __dirname + '/index.html' )
} )

app.get('/score', (req, res) => {
    res.sendFile(path.join(__dirname, '/score.html'))
})

app.get('/data/:file', (req, res) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, '/public', fileName); 

    // 엑셀 파일 읽기
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    res.json(data);
});

app.get( '/calendar' , function( req , res ){
    res.sendFile( __dirname + '/calendar.html' )
} )
