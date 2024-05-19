
function promiceToCount(i){
return new Promise((resolve)=>{
  setTimeout(() => {
    console.log(i);
    resolve("Done");
  }, 1000);
  
})
}

async function myAsyncCount(){
  for (let i = 0; i < 10; i++) {
    await promiceToCount(i);
    
  }
  
}

myAsyncCount();