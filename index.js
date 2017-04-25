const _ = require('lodash');
const ALLOW_PARAMETERS = ['initialQueue', 'timing', 'agregator', 'executor'];

class CommandQueue {
  constructor({initialQueue = [], timing = 2000, agregator = null, executor = (fn) => fn()} = {}) {
    if(arguments.length > 1) throw new Error('should have only 1 argument');
    if(!_.isArray(initialQueue)) throw new Error('initialQueue should be array');

    _.each(arguments[0], (value, key) => {
      if(!ALLOW_PARAMETERS.includes(key)) throw new Error('unknown key ' + key);
    });

    if(!_.isArray(initialQueue)) throw new Error('initialQueue should be of type array');
    if(!_.isNumber(timing)) throw new Error('timing should be of type number');
    if(!_.isFunction(agregator) && !_.isNull(agregator))
      throw new Error('agregator should be of type function or null');
    if(!_.isFunction(executor)) throw new Error('executor should be of type function');

    this._queue = initialQueue;
    this._agregator = agregator;
    this._executor = executor;
    this._timing = timing;

    setTimeout(this._exec.bind(this), this._timing);
  }

  _exec() {
    if(this._queue.length > 0)
      this._executor(this._queue.shift());

    setTimeout(this._exec.bind(this), this._timing);
  }

  push(item) {
    this._queue.push(item);

    this._aggregate();
  }

  _aggregate() {
    if(_.isNull(this._agregator))
      return;

    const queue = _.cloneDeep(this._queue);

    this._queue = _.reduce(queue, this._agregator, []);
  }
}

module.exports = CommandQueue;