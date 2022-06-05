
```

       _  _____  ____  _   _    _____ _           _ _    _  __       
      | |/ ____|/ __ \| \ | |  / ____| |         | | |  (_)/ _|      
      | | (___ | |  | |  \| | | |    | |__   __ _| | | ___| |_ _   _ 
  _   | |\___ \| |  | | . ` | | |    | '_ \ / _` | | |/ / |  _| | | |
 | |__| |____) | |__| | |\  | | |____| | | | (_| | |   <| | | | |_| |
  \____/|_____/ \____/|_| \_|  \_____|_| |_|\__,_|_|_|\_\_|_|  \__, |
                                                                __/ |
                                                               |___/ 

```

![example](https://i.imgur.com/jgV7VnR.png)

# JSON Chalkify

This package is a very simple, 1 dependancy, extension to the [chalk](https://www.npmjs.com/package/chalk) package.

It is designed to format and display javascript objects and JSON in the terminal.

## Install
```bash
  npm install json-chalkify
```
    
## Usage

```javascript
import JSONChalkify from 'json-chalkify'

const chalkify = new JSONChalkify().chalkify

console.log(chalkify({myThing: 42}))
```


## Default values

json-chalkify has these values by default, but all of them are configurable, explained in the configuration section.

| Resource      | Type          | Default|
| ------------- |:-------------:|:-----:|
| `propertyColor`      | chalk color | `chalk.blue` |
| `colonColor`      | chalk color | `chalk.blue` |
| `bracketColor`      | chalk color | `chalk.white` |
| `booleanColor`      | chalk color | `chalk.green` |
| `stringColor`      | chalk color | `chalk.yellow` |
| `numberColor`      | chalk color | `chalk.red` |
| `undefinedColor`      | chalk color | `chalk.gray` |
| `nullColor`      | chalk color | `chalk.gray` |
| `functionColor`      | chalk color | `chalk.white` |
| `symbolColor`      | chalk color | `chalk.cyan` |
| `bigintColor`      | chalk color | `chalk.blueBright` |
| `emptyLinesBefore`      | int | `1` |
| `emptyLinesAfter`      | int | `0` |
| `spacingChar`      | string | `" "` |
| `offsetOfSpacingChars`      | int | `0` |
| `numOfSpacingChars`      | int | `2` |
| `maxLengthBeforeTruncate`      | int | `100` |
| `afterTruncateString`      | string | `" ..."` |



## Configuration

Creating a chalkify instance with a custom configuration is quite simple. Just pass in an object of values which should deviate from the default.

```javascript
import chalk from 'chalk'
import JSONChalkify from 'json-chalkify'

const chalkifyConfig = {
  propertyColor: chalk.red
}

const chalkify = new JSONChalkify(chalkifyConfig).chalkify
```
## Configuration Examples

Since the chalkify instance is simply expecting an object of values deviating from the default, you're free to be creative in how you choose to implement this into your project.

For example you could have different color schemes for different node enviornments to see at a glance which logs belong to which env.

```javascript

import chalk from 'chalk'
import JSONChalkify from 'json-chalkify'

const devChalkifyConfig = {
  propertyColor: chalk.red
}

const stagingChalkifyConfig = {// determine which to use based on process.env.NODE_ENV
  propertyColor: chalk.green
}

const devChalkify = new JSONChalkify(devChalkifyConfig).chalkify
const stagingChalkify = new JSONChalkify(stagingChalkifyConfig).chalkify

```