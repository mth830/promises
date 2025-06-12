class asyncQueue {
  constructor(concurrentCount = 2) {
    this.concurrentCount = concurrentCount;
    this.activeFunctionList = [];
    this.queuedFunctionList = [];
    this.queueIndex = 0;
  }
  insert=(asyncFunc)=> {
    this.queuedFunctionList.push(asyncFunc)

  }
  getNextPromise=()=> {
    if (this.queueIndex + 1 > this.queuedFunctionList.length) {
      return new Promise((res, rej) => { });
    }
    const next = this.queuedFunctionList[this.queueIndex];
    this.queueIndex++;
    return new Promise((res, rej) =>next(this.getNextPromise));
  }
  run=()=> {
    for (let i = 0; i < this.concurrentCount && i < this.queuedFunctionList.length; i++) {
      let prom = Promise.resolve();
      prom.then(this.getNextPromise)
      this.activeFunctionList.push(prom);
    }
    return Promise.all(this.activeFunctionList);
  }
}
//TEST
const aq = new asyncQueue(5);
/*aq.insert(async (cb) => {
    console.log(0);
    setTimeout(cb, 4000);
  });*/
for (let i = 1; i < 100; i++) {
  let func = async (cb) => {
    console.log(i);
    setTimeout(cb, 2000);
  }
  aq.insert(func);

}
aq.run();