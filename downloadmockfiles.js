const downloadFile=(fileName)=>{
  return new Promise((res,rej)=>{
    const delay = (Math.random()*(3000-1000))+1000;
    setTimeout(()=>res(`Downloaded ${fileName} successfully`),delay);
  });
};
const downloadMultipleFiles=(files)=>{
  const fileList=files.map(file=>downloadFile(file));
  Promise.all(fileList).then(r=>r.forEach(res=>console.log(res)));
}
downloadMultipleFiles(["File A","File B","File C"]);

let a = downloadFile("file A");
let b = downloadFile("file B");
let c = downloadFile("file C");