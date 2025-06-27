//maximum space before default console writes to a new line
const MAX_BAR_LENGTH = 154;
class ProgressBar {
  constructor(options) {
    const { updateFunction,
      max = 100,
      barLength = 100,
      usePercentage = true } = options;
    this.updateFunction = updateFunction;
    this.progress = 0;
    this.max = max;
    this.barLength = Math.min(barLength, MAX_BAR_LENGTH);
    this.usePercentage = usePercentage;
  }
  print = () => {
    let template= "sdf";
    const percentage = this.progress / this.max;
    const background = '-'.repeat(this.barLength);
    const completeBars = Math.floor(percentage * this.barLength);
    const complete = '='.repeat(completeBars);
    const fullBar = complete + background.slice(completeBars);
    const barText = `[${fullBar}]`;
    if (this.usePercentage) {
      template = this.getPercentageTemplate(barText,percentage)
    } else {
      template = this.getChunksTemplate(barText);
    }
     process.stdout.write(template);
  }

  getPercentageTemplate = (barText,percentage) => {
    const template = `\rPROGRESS: ${barText}    ${(100 * percentage).toFixed(2)}%`;
    return template;
  }
  getChunksTemplate = (barText) => {
    const template = `\rPROGRESS: ${barText}    ${Math.floor(this.progress)}/${Math.floor(this.max)}`;
    return template;

  }
  increment = (increment) => {
    this.progress += increment;
    this.progress = Math.min(this.progress, this.max);
  }
  setProgress = (progress) => {
    this.progress = progress;
    this.progress = Math.min(this.progress, this.max);
  }
}
const options = { max: 354, barLength: 15, usePercentage: false };

const testProgressBar = async () => {
  const pb = new ProgressBar(options);
  pb.print();
  return new Promise((res, rej) => {
    let interval = setInterval(() => {
      pb.increment(Math.random() * 100);
      pb.print();
      if (pb.progress === pb.max) {
        console.log("\nComplete!");
        clearInterval(interval);
        res();
      }
    }, 100)
  });
};
console.log("Starting");
testProgressBar();