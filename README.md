# wanip
get the wan ipv4 from different resolvers

## prerequisites

* access to `curl` and `dig`


## pure typescript package

your relevant `webpack.config.js` should look like this
```json
module: {
    rules: [
        {
            test: /\.ts$/,
            loader: 'ts-loader',
            options: {
                allowTsInNodeModules: true
            }
        }
    ]
},
```
your relevant `tsconfig.json` should look like this
```json
"include": [
    "src/**/*",
    "node_modules/wanip/src/**/*"
]
```

If you have to use js, you can require it via
```js
const checkipv4 = require('wanip/dist').checkIpv4;
```
