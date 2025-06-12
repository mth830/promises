const countdown = n =>{
  let prom = Promise.resolve();
  for(let i = n;i>=0;i--){
    prom=prom.then(()=>new Promise((res,rej)=>{
      setTimeout(()=>{
        console.log(i);
        res();
    },1000)
    }))
  }
  prom.then(()=>console.log("done"));
}
countdown(5);