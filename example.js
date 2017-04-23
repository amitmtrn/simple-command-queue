const CommandQueue = require('./');
const queue = new CommandQueue({executor: (foo) => foo()});

queue.push(() => console.log(1));
queue.push(() => console.log(2));
queue.push(() => console.log(3));
