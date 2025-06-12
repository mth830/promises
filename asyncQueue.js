class asyncQueue {
  constructor(concurrentCount = 2) {
    this.concurrentCount = concurrentCount;
    this.activeCount = 0;
    this.queuedFunctionList = [];
    this.queueIndex = 0;
  }
  insert = (asyncFunc) => {
    if(this.activeCount<this.concurrentCount){
      this.activeCount++;
      const prom = Promise.resolve();
      prom.then(this.getNextPromise);
    }
    this.queuedFunctionList.push(asyncFunc);

  }
  getNextPromise = () => {
    if (this.queueIndex + 1 > this.queuedFunctionList.length) {
      return new Promise((res, rej) => { this.activeCount--});
    }
    const next = this.queuedFunctionList[this.queueIndex];
    this.queueIndex++;
    return new Promise((res, rej) => next(this.getNextPromise));
  }
}
//TEST
const aq = new asyncQueue(2);
//Comment out these first 2 for uniform  testing
/*aq.insert(async (cb) => {
  setTimeout(() => {
    console.log(0);
    cb();
  }, 6000);
});
aq.insert(async (cb) => {
  setTimeout(() => {
    console.log(1);
    cb();
  }, 12000);
});*/

for (let i = 1; i <= 30; i++) {
  let func = async (cb) => {
    setTimeout(() => {
      console.log(i);
      cb();
    }, 1000);
  }
  aq.insert(func);
}
setTimeout(()=>{
  for (let i = 31; i <= 40; i++) {
  let func = async (cb) => {
    setTimeout(() => {
      console.log(i);
      cb();
    }, 1000);
  }
  aq.insert(func);
}
},25000);