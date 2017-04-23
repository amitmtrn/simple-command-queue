# Simple Command queue

this command queue invoke method once every "timing" milliseconds.

## defaults values
* initialQueue = `[]`
* timing = `2000`
* agregator = `null`
* executor: `_.noop`

## code example

```js
const CommandQueue = require('./');
const queue = new CommandQueue({executor: (foo) => foo()});

queue.push(() => console.log(1));
queue.push(() => console.log(2));
queue.push(() => console.log(3));
```

> should log (each line with delay of 2 seconds):
1
2
3