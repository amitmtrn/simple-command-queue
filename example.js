const CommandQueue = require('./');
const queue2 = new CommandQueue();
const queue = new CommandQueue({executor: (foo) => foo()});

queue.push(() => console.log(1));
queue.push(() => console.log(2));
queue.push(() => console.log(3));


try {
  const queue3 = new CommandQueue(1,2,3);
} catch(err) {
  console.log(err.message);
}

try {
  const queue4 = new CommandQueue({www: 222});
} catch(err) {
  console.log(err.message);
}
