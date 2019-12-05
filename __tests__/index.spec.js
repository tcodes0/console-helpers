import { addToGlobalConsole, logs, logk } from '../src'
import pf from 'pretty-format'

beforeAll(() => {
    // convenience to debug the functions while console.log is mocked
    console.log2 = console.log
})

beforeEach(() => {
    for (const fn of ['logk', 'logs']) {
        if (console[fn]) {
            console[fn] = undefined
        }
    }
})

describe('logs', () => {
    it('uses pretty-format', () => {
        jest.spyOn(global.console, 'log').mockImplementation(() => {})
        const input = { foo: 2 }
        logs(input)
        expect(console.log).toHaveBeenCalledWith('console.logs ', pf(input))
    })
    it('uses passes strings thru', () => {
        jest.spyOn(global.console, 'log').mockImplementation(() => {})
        const input = 'input'
        logs(input)
        expect(console.log).toHaveBeenCalledWith('console.logs ', input)
    })
    it('strings and object case', () => {
        jest.spyOn(global.console, 'log').mockImplementation(() => {})
        logs('input', { foo: 2 })
        expect(console.log).toHaveBeenNthCalledWith(1, 'console.logs ', 'input')
        expect(console.log).toHaveBeenNthCalledWith(2, 'console.logs ', pf({ foo: 2 }))
    })
    it('strings and object case, many params', () => {
        jest.spyOn(global.console, 'log').mockImplementation(() => {})
        logs('input', { foo: 2 }, 'bar', { baz: { bin: 33, gor: false } }, 'melt', 'pelt', {})
        expect(console.log).toHaveBeenNthCalledWith(1, 'console.logs ', 'input')
        expect(console.log).toHaveBeenNthCalledWith(2, 'console.logs ', pf({ foo: 2 }))
        expect(console.log).toHaveBeenNthCalledWith(3, 'console.logs ', 'bar')
        expect(console.log).toHaveBeenNthCalledWith(4, 'console.logs ', pf({ baz: { bin: 33, gor: false } }))
        expect(console.log).toHaveBeenNthCalledWith(5, 'console.logs ', 'melt')
        expect(console.log).toHaveBeenNthCalledWith(6, 'console.logs ', 'pelt')
        expect(console.log).toHaveBeenNthCalledWith(7, 'console.logs ', pf({}))
    })
})
describe('addToGlobalConsole', () => {
    it('addToGlobalConsole adds functions to console', () => {
        addToGlobalConsole()
        expect(console.logk).toBe(logk)
        expect(console.logs).toBe(logs)
    })
})
