# FugueWeb API

## About

This API aims to support a variety of artistic and charitable goals to include:

* Curated collection of visual and musical artistic creations integrated with Open Sea for the auction of NFTs
* Chainlink External Adapter to pull off-chain data into smart contracts/`web3`
* Promote effective altruism and charitable organizations working in this space

## Quick Start

1. Clone repo and run `npm install`
2. To run locally, [install MongoDB](https://docs.mongodb.com/manual/installation/). In production we are using a Heroku + [MongoDB Cloud](https://cloud.mongodb.com/) backend. We have a a functioning example of this API on Heroku, to which we can add devs/access as necessary. 
3. You will need to add `process.env` environmental variables for use with `app.js` (for `MONGODB_URI` specifically, maybe you know a way to improve this for a local dev environment). Create a `nodemon.json` file in the root directory and add variables as key value pairs (see `nodemon_example.json` for template).
4. `npm start` and navigate to appropriate route (e.g., `localhost:3000/api/v0/nft` or other route).
5. Postman is a useful app for working with APIs (sending GET/POST requests, etc.).

## MongoDB

- Sign up Mongo Atlas (free)
- Create cluster
    - IP address anywhere
    - Create admin account
        - Read instructions about URL encoding
    - Connect with native drivers (Node), copy MONGODB_URI env variable to `nodemon.json` 

## Heroku

- Signup for free account
- Create new app
- Under `Deploy` tab, GitHub repo connects and syncs with Heroku
    - `Deploy Branch` to update to latest commits
- Under `Settings` add the value for your `MONGODB_URI` environment variable
- Note about `package.json`, `morgan` and `nodemon` are included in both dependencies and devDependcies so the app builds in Heroku (otherwise app would error out)

## Docs
TODO

## Contributing to the project

This is an open source project. Contributions are welcomed & encouraged! :smile: If you'd like to improve the code base, please see [Contributing Guidelines](https://github.com/fugueweb/api/blob/master/.github/CONTRIBUTING.md). Also check out the [Change Log](https://github.com/fugueweb/api/blob/master/.github/CHANGELOG.md) for more details.

## Resources

* [MongoDB](https://cloud.mongodb.com/), Mongoose, Heroku, Node, Express
* [OpenAPI Specification](https://swagger.io/specification/)
* [Building a RESTful API with Node.js - Video Series](https://www.youtube.com/playlist?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q)
* [Open Sea Docs](https://docs.opensea.io/docs/getting-started)
* [Chainlink Docs](https://docs.chain.link/docs/advanced-tutorial/)