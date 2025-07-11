//maximum space before default console writes to a new line
const MAX_BAR_LENGTH = 154;
class StackableProgressBar {
  constructor() {
    this.progressBars = [];
  }
  add = (ProgressBarInstance) => {
    ProgressBarInstance.callback = this.print;
    this.progressBars.push(ProgressBarInstance);
  }
  print = () => {
    console.clear();
    if (this.progressBars.length === 0) {
      console.log("No Progress Bars");
    }
    let output = "\r";
    this.progressBars.forEach(x => output += x.format() + "\n");
    process.stdout.write(output);
  }
}
class ProgressBar {
  constructor(options = {}) {
    const {
      max = 100,
      barLength = 100,
      usePercentage = true,
      callback = null } = options;
    this.callback = callback;
    this.progress = 0;
    this.max = max;
    this.barLength = Math.min(barLength, MAX_BAR_LENGTH);
    this.usePercentage = usePercentage;
  }
  print = () => {
    let template = "";
    const percentage = this.progress / this.max;
    const background = '-'.repeat(this.barLength);
    const completeBars = Math.floor(percentage * this.barLength);
    const complete = '='.repeat(completeBars);
    const fullBar = complete + background.slice(completeBars);
    const barText = `[${fullBar}]`;
    if (this.usePercentage) {
      template = this.getPercentageTemplate(barText, percentage)
    } else {
      template = this.getChunksTemplate(barText);
    }
    process.stdout.write(template);
  }
  get progressState() {
    return this.progress;
  }
  get percentComplete() {
    return Math.min((this.progress / this.max) * 100, 100);
  }
  format = () => {
    let template = "";
    const percentage = this.progress / this.max;
    const background = '-'.repeat(this.barLength);
    const completeBars = Math.floor(percentage * this.barLength);
    const complete = '='.repeat(completeBars);
    const fullBar = complete + background.slice(completeBars);
    const barText = `[${fullBar}]`;
    if (this.usePercentage) {
      template = this.getPercentageTemplate(barText, percentage)
    } else {
      template = this.getChunksTemplate(barText);
    }
    return template;
  }

  getPercentageTemplate = (barText, percentage) => {
    const template = `\rPROGRESS: ${barText}    ${(100 * percentage).toFixed(2)}%`;
    return template;
  }
  getChunksTemplate = (barText) => {
    const template = `\rPROGRESS: ${barText}    ${Math.floor(this.progress)}/${Math.floor(this.max)}`;
    return template;

  }
  runCallback = () => {
    if (this.callback !== null) {
      this.callback();
    }
  }
  increment = (increment) => {
    this.progress += increment;
    this.progress = Math.min(this.progress, this.max);
    this.runCallback();

  }
  setProgress = (progress) => {
    this.progress = progress;
    this.progress = Math.min(this.progress, this.max);
    this.runCallback();
  }
}

const stackCount = 5;
let intervals = [];
const spb = new StackableProgressBar();
const options = { barLength: 20, usePercentage: false };
//add new bars
for (let i = 0; i < stackCount; i++) {
  const pb = new ProgressBar(options);
  intervals[i] = setInterval(() => {
    pb.increment(Math.random() * 5 * (i + 1));
    if (pb.progressState === 100) {
      clearInterval(intervals[i]);
    }
  }, 100);
  spb.add(pb);
}
setTimeout(() => {
  let i = stackCount;
  const pb = new ProgressBar(options);
  intervals[i] = setInterval(() => {
    pb.increment(Math.random() * 5);
    if (pb.progressState === 100) {
      clearInterval(intervals[i]);
    }
  }, 100);
  spb.add(pb);
}, 1000);
