import prettyFormat from 'pretty-format'
import { noop } from './utils'

export interface ExtendedConsole extends Console {
    logs: typeof logs
    logk: typeof logk
}

export const logs = (...args: any[]) => {
    const results = []
    for (const arg of args) {
        typeof arg === 'string' ? results.push(arg) : results.push(prettyFormat(arg))
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
