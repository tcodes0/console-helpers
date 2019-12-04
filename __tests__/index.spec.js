import { addToGlobalConsole, logs } from '../src'
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

describe('lib test', () => {
    it('addToGlobalConsole adds functions to console', () => {
        addToGlobalConsole()
        expect(console.logk).toBeDefined()
        expect(console.logs).toBeDefined()
    })
    it('logs uses pretty-format', () => {
        jest.spyOn(global.console, 'log').mockImplementation(() => {})
        const input = { foo: 2 }
        logs(input)
        expect(console.log).toHaveBeenCalledWith('console.logs ', pf(input))
    })
})
