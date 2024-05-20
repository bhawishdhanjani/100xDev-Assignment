
const { log } = require('console');
const fs = require('fs');

fs.readFile("a.txt","utf-8",(err, data)=>{
  if(!err){
    fs.writeFile("b.txt",data,err=>{
      if(err)
        console.log(err);
      else
        console.log("Done Writing Data");


    })
  }
});