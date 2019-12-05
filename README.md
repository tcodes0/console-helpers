# Console helpers

console.log helpers

## Usage

### logs

`log string`

#### use case

- nested object that you want to log
- want to make console.log easier to read

_maybe a better name would be log as pretty string_

```js
import { logs } from 'console-helpers'

logs({ foo: { bar: { baz: 22 } } })
/* console.logs Object {
 *    "foo": Object {
 *      "bar": Object {
 *        "baz": 22,
 *      },
 *    },
 *  }
 */
```

uses `pretty-format`

### logk

`log keys`

#### use case

- big object that you want to understand what's inside
- complex props with several hocs
- props with data from server, but the internals of the data are not so important

```js
import { logk } from 'console-helpers'

logk({ foo: 22, bar: 33, baz: 44 })
// console.logk  [ 'foo', 'bar', 'baz' ]
```

### addToGlobalConsole

`you guessed it`

#### use case

- easy access to library functions with no import needed

```js
// index.js or App.js
import { addToGlobalConsole } from 'console-helpers'

addToGlobalConsole()
// console.logs is now defined
// console.logk is now defined
```

## To do

Add some types to fix type errors on console.logs and console.logk.
