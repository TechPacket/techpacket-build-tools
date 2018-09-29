<p align="center">
  <img alt="Lerna" src="https://avatars1.githubusercontent.com/u/41538082?s=400&u=52411d8b405d1f3ec01e592081a467db2dd0c6f1&v=4" width="100">
</p>

<h3 align="center"><b>TechPacket</b></h3>
<h4 align="center">Build tools</h4>

---

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/80596bc67fc44d4189c50ce41147f22d)](https://app.codacy.com/app/vladislav-andreevich/techpacket-build-tools?utm_source=github.com&utm_medium=referral&utm_content=TechPacket/techpacket-build-tools&utm_campaign=Badge_Grade_Dashboard)
[![Greenkeeper badge](https://badges.greenkeeper.io/TechPacket/techpacket-build-tools.svg)](https://greenkeeper.io/)

One Paragraph of project description goes here.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

```bash
npm install techpacket-build-tools --save
```

#### Configuration

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

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
