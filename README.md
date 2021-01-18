# The Intercom Take Home Test

## About this program

Given a list of customer records in file [customers.txt](resources/customers.txt), this program outputs to a new file `output.txt` the names and ids of all customers located within 100km of Intercom's Dublin office.

## Project Structure

Besides this very document ([README.md](README.md)), all other files in the root directory are configuration files for running either the program itself or other development tools.

- [`/resources`](resources) contains the input file
- [`/src`](src) contains all source code
- [`/test`](test) contains all test code

## Prerequisites

This program is written in Typescript. In order to run it you will need the following two programs:
- [npm](https://www.npmjs.com/)
- [Node.js](https://nodejs.org)

Check if you have them already installed on your machine:

```
npm -v
node -v
```

If not, installing these programs is easy. Depending on your operating system, you may need to choose between a Node installer and a Node version manager before proceeding with installation. I suggest that you follow this [Guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to set up your environment in an optimal way.

## Install \& Build

When you are in the root directory of this project, run:

```
npm install
npm run build
```

## Run

When you are in the root directory of this project, run:

```
npm start
```

## Test

When you are in the root directory of this project, run:

```
npm test
```

## Code Coverage

When you are in the root directory of this project, run:

```
npm run coverage
```

Interactive HTML reporters on code coverage can be found in the newly generated directory `/coverage`.