import prettyFormat from 'pretty-format'

export const logs = (...args: any[]) => {
    const results = []
    for (const arg of args) {
        typeof arg === 'string' ? results.push(arg) : results.push(prettyFormat(arg))
    }
    for (const result of results) {
        console.log('console.logs ', result)
    }
}

export const logk = (...args: any[]) => {
    const results = []
    for (const arg of args) {
        let keys
        try {
            keys = Object.keys(arg)
        } catch (error) {
            keys = [`invalid input to Object.keys: ${error.message}`]
        }
        results.push(keys)
    }
    for (const result of results) {
        console.log('console.logk ', result)
    }
}

export const addToGlobalConsole = () => {
    (console as any).logs = logs
    ;(console as any).logk = logk
}

export default {
    logs,
    logk,
    addToGlobalConsole,
}
