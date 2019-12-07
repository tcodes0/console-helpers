# Console helpers

`console.log` helpers

## Basically...

This lib exports some helpers you can either import and use directly or add to `console` (the global guy)

-   if adding to `global.console`, call `addToGlobalConsole` in a file close to your entry point (like `index.js`)
-   uses [util.inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options). Highly recommended to read the docs to understand the options
-   lib also exports a few functions to set options for logging

# Usage

## `logs: (...args: any[]) => void`

`log string`


-   nested object that you want to log
-   want to make console.log easier to read

```typescript
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

## `logk: (...args: any[]) => void`

`log keys`


-   big object that you want to understand what's inside
-   complex props with several hocs
-   props with data from server, but the internals of the data are not so important

```typescript
import { logk } from 'console-helpers'

logk({ foo: 22, bar: 33, baz: 44 })
```

```text
 // console log output

 console.logk  [ 'foo', 'bar', 'baz' ]
```

## `addToGlobalConsole: (isProd?: boolean | undefined) => void`


-   easy access to library functions with no import needed

```typescript
// index.js or App.js
import { addToGlobalConsole } from 'console-helpers'

// console.logs is now defined
// console.logk is now defined
addToGlobalConsole()
```

```typescript
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

### `logOptionsDefault: () => InspectOptions`


-   you want to see what the lib thinks are good default options it passes to [util.inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options)

```typescript
import { logOptionsDefault } from 'console-helpers'

// defaults are: { showHidden: false, depth: null, colors: true, compact: false }
console.log(logOptionsDefault())
```

#### types

```typescript
import { InspectOptions } from 'util'

// @types/node/globals.d.ts
interface InspectOptions {
    /**
     * If set to `true`, getters are going to be
     * inspected as well. If set to `'get'` only getters without setter are going
     * to be inspected. If set to `'set'` only getters having a corresponding
     * setter are going to be inspected. This might cause side effects depending on
     * the getter function.
     * @default `false`
     */
    getters?: 'get' | 'set' | boolean;
    showHidden?: boolean;
    /**
     * @default 2
     */
    depth?: number | null;
    colors?: boolean;
    customInspect?: boolean;
    showProxy?: boolean;
    maxArrayLength?: number | null;
    breakLength?: number;
    /**
     * Setting this to `false` causes each object key
     * to be displayed on a new line. It will also add new lines to text that is
     * longer than `breakLength`. If set to a number, the most `n` inner elements
     * are united on a single line as long as all properties fit into
     * `breakLength`. Short array elements are also grouped together. Note that no
     * text will be reduced below 16 characters, no matter the `breakLength` size.
     * For more information, see the example below.
     * @default `true`
     */
    compact?: boolean | number;
    sorted?: boolean | ((a: string, b: string) => number);
}
```

### `logOptions: () => InspectOptions;`


-   returns log options currently set

```typescript
import { logOptions, logOptionsDefault } from 'console-helpers'

// true
console.log(logOptions().toString() === logOptionsDefault().toString())
```

### `setLogOptions: (options: InspectOptions) => InspectOptions;`


-   set log options to your provided object

```typescript
import { setLogOptions } from 'console-helpers'

// logOptions now are: { showHidden: false, colors: false, compact: true, breakLength: 120 }
console.log(setLogOptions({ showHidden: false, colors: false, compact: true, breakLength: 120 }))
```

### `addLogOptions: (options: InspectOptions) => InspectOptions;`


-   combine defaults with your object, giving your object priority

```typescript
import { addLogOptions } from 'console-helpers'

// logOptions now are defaults + { colors: false, breakLength: 120 }: { showHidden: false, depth: null, colors: false, compact: false, breakLength: 120 }
console.log(addLogOptions({ colors: false, breakLength: 120 }))
```

### `resetLogOptions: () => InspectOptions;`


-   reset log options to lib default

```typescript
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
