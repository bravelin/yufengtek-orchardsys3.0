module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'indent': 'off',
        'eqeqeq': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'arrow-parens': 'off',
        'valid-jsdoc': 'off',
        'eol-last': 'off',
        'array-bracket-spacing': 'off',
        'no-unused-vars': 'off',
        'no-else-return': 'off',
        'strict': 'off',
        'space-before-function-paren': 0,
        'no-irregular-whitespace': [
            'error',
            {
                'skipComments': true
            }
        ],
        'comma-dangle': [
            'error',
            {
                'arrays': 'only-multiline',
                'objects': 'only-multiline'
            }
        ]
    },
    globals: {
        BMap: true,
        AMap: true,
        videojs: true,
        BMapLib: true,
        google: true,
        MarkerClusterer: true,
        EZUIKit: true,
        removepano: true,
        embedpano: true,
        L: true,
        TweenMax: true,
        Linear: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
