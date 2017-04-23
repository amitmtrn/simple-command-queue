
class CommandQueue {
  constructor({initialQueue = [], timing = 2000, agregator = (a) => a, executor: _.noop} = {}) {
    if(!_.isArray(initialQueue)) throw new Error('initialQueue should be array');

    this.queue = initialQueue;
    this.agregator = agregator;
    this.executor = executor;
    this.interval = setInterval(exec.bind(this), timing);
  }

  exec() {
    if(this.queue.length <= 0) 
      return;
    
    this.executor(this.queue.shift());
  }

  push(item) {
    this.queue.push(item);
    this.agragate();
  }

  agregate() {
    const queue = _.deepClone(this.queue);

    this.queue = this.agregator(queue);
  }
}