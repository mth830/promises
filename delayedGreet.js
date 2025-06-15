const delayedGreet = (name, delay) => {
  return new Promise((res, rej) => setTimeout(() => {
    console.log(`Hello, ${name}!`);
    res();
  },delay));
}
const names = ["Alice", "Bob", "Charlie"];
const greetAll = (nameList) => {
  if (nameList.length < 1) {
    return;
  }
  let prom = Promise.resolve();
  for (const name of nameList){
    prom = prom.then(()=>delayedGreet(name,1000));
  }
};
greetAll(names);