const http = require('http');
const mysql = require('mysql');
const fs = require('fs');

const port = 4444;

const server = http.createServer( (req,res) => {
    switch(true){
    case (req.method === 'GET' && req.url==='/'):
        fs.readFile('./view/index.html', (err, html) =>{
            if( err ) throw err;
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);
            res.end( html );  
        })
    break;
    
    default:
        fs.readFile('./view/index.html', (err, html) =>{
            if( err ) throw err;
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);
            res.end( html );  
        })
       
    ;
}});

server.listen(port);

/**********************************************************************************/

const con = mysql.createConnection({
    host: 'localhost',
    database: 'colors',
    user: 'root',
    password: ''
});

function connect(){
con.connect(function(err){
    if (err) throw err;
    console.log('Connected to MySQL')

})};

function selectAllQUERY(){
    con.query("SELECT * FROM colors", function (err, result, fields){
        if (err) throw err;
        console.log(result);
    })
}

function deleteQUERY(code){
        var query = 'DELETE FROM colors WHERE code = ' +code;
        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Deleted: " + result);
        });
}

function endConnection(){
    con.end(function(err) {
        if (err) {
          return console.log('error:' + err.message);
        }
        console.log('Closed MySQL connection ! ');
      });
};

console.log('___LEKÉRDEZÉSEK:')
connect();
selectAllQUERY();
deleteQUERY("'#FFFFFF'");
selectAllQUERY();
endConnection();