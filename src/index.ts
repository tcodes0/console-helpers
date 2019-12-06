import { noop } from './utils'
import { inspect, InspectOptions } from 'util'

export const logOptionsDefault: () => InspectOptions = () => ({
    showHidden: false,
    depth: null,
    colors: true,
    compact: false,
})
let _logOptions = logOptionsDefault()
export const setLogOptions = (options: InspectOptions) => {
    _logOptions = options
    return _logOptions
}
export const logOptions = () => _logOptions
export const addLogOptions = (options: InspectOptions) => {
    _logOptions = { ..._logOptions, ...options }
    return _logOptions
}
export const resetLogOptions = () => {
    _logOptions = logOptionsDefault()
    return _logOptions
}
const inspectWithOptions = (options: InspectOptions) => (args: any[]) => inspect(args, options)

export interface ExtendedConsole extends Console {
    logs: typeof logs
    logk: typeof logk
}

export const logs = (...args: any[]) => {
    const results = []
    for (const arg of args) {
        typeof arg === 'string' ? results.push(arg) : results.push(inspectWithOptions(logOptions())(arg))
    }
    for (const result of results) {
        console.log('console.logs', result)
    }
}

export const logk = (...args: any[]) => {
    const results = []
    for (const arg of args) {
        let keys
        try {
            keys = Object.keys(arg)
        } catch (error) {
            keys = error
        }
        results.push(keys)
    }
    for (const result of results) {
        console.log('console.logk', result)
    }
}

export const addToGlobalConsole = (isProd?: boolean) => {
    if (isProd) {
        ;(console as any).logs = noop
        ;(console as any).logk = noop
    } else {
        ;(console as any).logs = logs
        ;(console as any).logk = logk
    }
}

export default {
    logs,
    logk,
    addToGlobalConsole,
}
