# Console helpers

console.log helpers

## Basically...

This lib exports some helpers you can either import and use directly or add to `console` (the global guy)

-   if adding to `global.console`, call `addToGlobalConsole` in a file close to your entry point (like `index.js`)
-   uses [util.inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options). Highly recommended to read the docs to understand the options
-   lib also exports a few functions to set options for logging

# Usage


## logs

`log string`

### use case

-   nested object that you want to log
-   want to make console.log easier to read

_maybe a better name would be log as pretty string_

```js
import { logs } from 'console-helpers'

logs({ foo: { bar: { baz: 22 } } })
//  console.logs {
//    foo: {
//      bar: {
//        baz: 22
//      }
//    }
//  }
```

uses [util.inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options)

## logk

`log keys`

### use case

-   big object that you want to understand what's inside
-   complex props with several hocs
-   props with data from server, but the internals of the data are not so important

```js
import { logk } from 'console-helpers'

logk({ foo: 22, bar: 33, baz: 44 })
// console.logk  [ 'foo', 'bar', 'baz' ]
```

## addToGlobalConsole

### use case

-   easy access to library functions with no import needed

```js
// index.js or App.js
import { addToGlobalConsole } from 'console-helpers'

addToGlobalConsole()
// console.logs is now defined
// console.logk is now defined
```

```js
import { addToGlobalConsole } from 'console-helpers'

const isProd = process.env === 'production'
const isDev = process.env !== 'production'

addToGlobalConsole(isDev)
// if dev it adds logs and logk to console

addToGlobalConsole(isProd)
// if prod it adds () => {} instead
```

#### types

```typescript
import { addToGlobalConsole, ExtendedConsole } from 'console-helpers'

declare var console: ExtendedConsole

addToGlobalConsole()

// types are ok
console.logs
// types are ok
console.logk
```

# Customizing the output

### logOptionsDefault

#### use case

-   you want to see what the lib thinks are good default options it passes to [util.inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options)

```js
import { logOptionsDefault } from 'console-helpers'

console.log(logOptionsDefault())
// logOptions now are: { showHidden: false, depth: null, colors: true, compact: false }
```

### logOptions

#### use case

-   returns log options currently set

```js
import { logOptions, logOptionsDefault, setLogOptions } from 'console-helpers'

console.log(logOptions().toString() === logOptionsDefault().toString())
// true
```

### setLogOptions

#### use case

-   set log options to your provided object

```js
import { setLogOptions } from 'console-helpers'

console.log(setLogOptions({ showHidden: false, colors: false, compact: true, breakLength: 120 }))
// logOptions now are: { showHidden: false, colors: false, compact: true, breakLength: 120 }
```

### addLogOptions

#### use case

-   combine defaults with your object, giving your options priority

```js
import { addLogOptions } from 'console-helpers'

console.log(addLogOptions({ colors: false, breakLength: 120 }))
// logOptions now are: { showHidden: false, depth: null, colors: false, compact: false, breakLength: 120 }
```

### resetLogOptions

#### use case

-   reset log options to lib default

```js
import { resetLogOptions, addLogOptions, logOptions, logOptionsDefault } from 'console-helpers'

addLogOptions({ colors: false, breakLength: 120 })
logOptions().toString() === logOptionsDefault().toString()
// false, { colors: false, breakLength: 120 } was merged in
console.log(resetLogOptions())
// logOptions now are: { showHidden: false, depth: null, colors: true, compact: false }
logOptions().toString() === logOptionsDefault().toString()
// true, after reset
```

## To do

Browser support
