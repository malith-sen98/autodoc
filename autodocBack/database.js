


var mysqll = require('mysql');  

var con = mysqll.createConnection({  
  host: "localhost",  
  user: "root",   
  password: "",
  database: 'auto_nim'  
});  

con.connect(function(err) {   
  if (!!err){
    console.log("database Not Connected!");  

  } 
  else {
    console.log("database Connected!");  

  }
});  

module.exports =con;