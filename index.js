const _ = require('lodash');

class CommandQueue {
  constructor({initialQueue = [], timing = 2000, agregator = (a) => a, executor: _.noop} = {}) {
    if(!_.isArray(initialQueue)) throw new Error('initialQueue should be array');

    this._queue = initialQueue;
    this._agregator = agregator;
    this._executor = executor;
    this._timing = timing;

    setTimeout(this._exec.bind(this), this._timing);
  }

  _exec() {
    if(this._queue.length <= 0)
      return setTimeout(this._exec.bind(this), this._timing);

    this._executor(this._queue.shift());

    setTimeout(this._exec.bind(this), this._timing);
  }

  push(item) {
    this._queue.push(item);
    this._agragate();
  }

  _agregate() {
    const queue = _.deepClone(this._queue);

    this._queue = this._agregator(queue);
  }
}