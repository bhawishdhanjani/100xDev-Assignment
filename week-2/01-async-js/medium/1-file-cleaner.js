
const fs = require('fs');

fs.readFile("a.txt","utf-8",(err, data)=>{
  if(!err){
    data = data.replace(/\s+/g, " ").trim()
    fs.writeFile("a.txt",data,err=>{
      if(err)
        console.log(err);
      else
        console.log("Done Cleanig");


    })
  }
});