const express = require( 'express' ) ;
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');


const app = express() ;
const port = 8080

app.listen( port , function(){
    console.log( 'listening on 8080' )
}) ;



app.get( '' , function( req , res ){
    res.sendFile( __dirname + '/mainPage.html' )
} )



app.use(express.static(path.join(__dirname, 'data.xlsx')));

// 기본 HTML 페이지 제공
app.get('/score', (req, res) => {
    res.sendFile(path.join(__dirname, 'score.html'));
});



app.get( '/test2' , function( req , res ){
    res.sendFile( __dirname + '/mainPage.html' )
} )