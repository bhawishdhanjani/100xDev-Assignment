
setInterval(() => {
  const date = new Date();
  let time;
  let hour = date.getHours();
  let minute = date.getMinutes();
  let seconds = date.getSeconds();
  if(hour<=12){
    time =  `${hour}:${minute}:${seconds} AM`;
  }
  else{
    time  =  `${hour-12}:${minute}:${seconds} PM`;
  }
  console.log(time);
    
  
}, 1000);
