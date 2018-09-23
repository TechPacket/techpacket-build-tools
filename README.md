# How to use

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/80596bc67fc44d4189c50ce41147f22d)](https://app.codacy.com/app/vladislav-andreevich/techpacket-build-tools?utm_source=github.com&utm_medium=referral&utm_content=TechPacket/techpacket-build-tools&utm_campaign=Badge_Grade_Dashboard)
[![Greenkeeper badge](https://badges.greenkeeper.io/TechPacket/techpacket-build-tools.svg)](https://greenkeeper.io/)

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