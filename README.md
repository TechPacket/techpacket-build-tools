# How to use

## Installing

```bash
npm install techpacket-build-tools --save
```

## Configuration

1. Create `.techpacketrc.js` config. As example:
   ```bash
    module.exports = {

        // HTML OPTIONS

        html: {
            templatePath: './packages/client/src',
        },

        // OPTIONS

        publicPath: './packages/client',
        outDir: './packages/client/dist',
        entry: './packages/client/src/app.js',

        // PLUGINS

        plugins: [require('techpacket-build-tools/packages/plugin-typescript')()],

    };
    ```
2. To start a project in a development environment, use the command:
   ```bash
    techpacket-build-tools --config .techpacketrc.js
   ```
3. To build a project in the product environment, use the command:
    ```bash
    techpacket-build-tools build --config .techpacketrc.js
    ```
4. To start an watcher without to start the server, use the command:
    ```bash
    techpacket-build-tools watch --config .techpacketrc.js
    ```