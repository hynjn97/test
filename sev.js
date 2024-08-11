const express = require( 'express' ) 
const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')


const app = express()
const port = 3000

app.listen( port , function(){
    console.log( 'listening on ' + port )
})

app.use(express.static( path.join( __dirname , 'data.xlsx' ) ) )

app.get( '' , function( req , res ){ // main page
    res.sendFile( __dirname + '/index.html' )
} )

app.get('/score', (req, res) => {
    res.sendFile(path.join(__dirname, 'score.html'))
})

app.get('/data', ( req , res ) => {

    const filePath = path.join(__dirname, 'data.xlsx');
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: '파일을 찾을 수 없습니다.' });
    }

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    res.json(data);
});

app.get( '/calendar' , function( req , res ){
    res.sendFile( __dirname + '/calendar.html' )
} )