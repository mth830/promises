const delayedGreet = async (name, delay) => {
  return await new Promise((res, rej) => setTimeout(() => {
    console.log(`Hello, ${name}`);
    res();
  },1000));
}
const names = ["Alice", "Bob", "Charlie"];
const greetAll = async (nameList) => {
  if (nameList.length < 1) {
    return;
  }
  for (const name of nameList) {
    await delayedGreet(name, 1000);
  }
  return Promise.resolve();
};
greetAll(names).then(() => console.log("All greetings done!"));