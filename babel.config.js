module.exports = api => {
    const isTest = api.env('test')
    const config = {
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        node: 'current',
                    },
                },
            ],
        ],
    }
    if (isTest) {
        config.presets.push('@babel/preset-typescript')
    }
    return config
}
