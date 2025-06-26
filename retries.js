const makeMockResponse =  () => {
  let attemptNumber = 0;
  return async()=>new Promise((res, rej) => setTimeout(() => {
    console.log("trying attempt #: "+attemptNumber++);
    if (Math.random() < .03) {
      res("success");
    }
    res("fail");
  }, 50));
};

const retryNtimes = async (retryLimit, asyncFunc) => {
  for (let i = 0; i < retryLimit; i++) {
    let response = await asyncFunc();
    if (response === 'success') {
      return response;
    }
    if (i === retryLimit - 1) {
      throw new Error("Failure obtaining a response");
    }
  }
};
const mockResponse = makeMockResponse();
retryNtimes(30,mockResponse)
  .then(res => console.log(res))
  .catch(e =>console.log(e.message));