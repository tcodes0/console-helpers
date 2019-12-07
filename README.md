# Console helpers

`console.log` helpers

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
```

```text
  // console log output

  console.logs {
    foo: {
      bar: {
        baz: 22
      }
    }
  }
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
```

```text
 // console log output

 console.logk  [ 'foo', 'bar', 'baz' ]
```

## addToGlobalConsole

### use case

-   easy access to library functions with no import needed

```js
// index.js or App.js
import { addToGlobalConsole } from 'console-helpers'

// console.logs is now defined
// console.logk is now defined
addToGlobalConsole()
```

```js
import { addToGlobalConsole } from 'console-helpers'

const isProd = process.env === 'production'
const isDev = process.env !== 'production'

// if dev it adds logs and logk to console
addToGlobalConsole(/*isDev*/ false)

// if prod it adds () => {} instead
addToGlobalConsole(/*isProd*/ true)
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

_All functions here that change something return the result_

### logOptionsDefault

#### use case

-   you want to see what the lib thinks are good default options it passes to [util.inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options)

```js
import { logOptionsDefault } from 'console-helpers'

// defaults are: { showHidden: false, depth: null, colors: true, compact: false }
console.log(logOptionsDefault())
```

### logOptions

#### use case

-   returns log options currently set

```js
import { logOptions, logOptionsDefault } from 'console-helpers'

// true
console.log(logOptions().toString() === logOptionsDefault().toString())
```

### setLogOptions

#### use case

-   set log options to your provided object

```js
import { setLogOptions } from 'console-helpers'

// logOptions now are: { showHidden: false, colors: false, compact: true, breakLength: 120 }
console.log(setLogOptions({ showHidden: false, colors: false, compact: true, breakLength: 120 }))
```

### addLogOptions

#### use case

-   combine defaults with your object, giving your object priority

```js
import { addLogOptions } from 'console-helpers'

// logOptions now are defaults + { colors: false, breakLength: 120 }: { showHidden: false, depth: null, colors: false, compact: false, breakLength: 120 }
console.log(addLogOptions({ colors: false, breakLength: 120 }))
```

### resetLogOptions

#### use case

-   reset log options to lib default

```js
import { resetLogOptions, addLogOptions, logOptions, logOptionsDefault } from 'console-helpers'

addLogOptions({ colors: false, breakLength: 120 })
// false because { colors: false, breakLength: 120 } was merged in
logOptions().toString() === logOptionsDefault().toString()
// logOptions now are defaults: { showHidden: false, depth: null, colors: true, compact: false }
console.log(resetLogOptions())
// true because reset
logOptions().toString() === logOptionsDefault().toString()
```

## To do

Browser support
