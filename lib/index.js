import prettyFormat from 'pretty-format';
export const logs = (...args) => {
    const results = [];
    for (const arg of args) {
        typeof arg === 'string' ? results.push(arg) : results.push(prettyFormat(arg));
    }
    for (const result of results) {
        console.log('console.logs ', result);
    }
};
export const logk = (...args) => {
    const results = [];
    for (const arg of args) {
        let keys;
        try {
            keys = Object.keys(arg);
        }
        catch (error) {
            keys = [`invalid input to Object.keys: ${error.message}`];
        }
        results.push(keys);
    }
    for (const result of results) {
        console.log('console.logk ', result);
    }
};
export default {
    logs,
    logk,
};
//# sourceMappingURL=index.js.map