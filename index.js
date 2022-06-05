import defaultConfig from './config.js'

const isPrimitive = (test) => {
  return test !== Object(test);
}

const isPrimitiveOrEmptyObject = (test) => {
  const primative = isPrimitive(test)
  if (primative) {
    return true
  }

  if (Object.keys(test).length === 0) {
    return true
  }

  return false
}

const truncate = (str, max, afterTruncateStr) => {
  return (str.length > max) ? str.substr(0, max - 1) + afterTruncateStr : str;
};

const reverseString = (str) => {
  return str.split("").reverse().join("");
}

const traverse = (obj, depth = 1, options = {}) => {
  const {
    emptyLinesBefore,
    emptyLinesAfter,
    offsetOfSpacingChars,
    numOfSpacingChars,
    spacingChar,
    maxLengthBeforeTruncate,
    afterTruncateString,
    propertyColor,
    colonColor,
    bracketColor,
    booleanColor,
    stringColor,
    numberColor,
    undefinedColor,
    nullColor,
    functionColor,
    symbolColor,
    bigintColor
  } = options


  const parentIsArray = Object.prototype.toString.call(obj) === "[object Array]"
  const parentIsPrimativeArray = parentIsArray && obj.every(el => isPrimitive(el) === true)
  const spacingString = spacingChar.repeat(depth * numOfSpacingChars + offsetOfSpacingChars)
  const closingSpacingString = spacingChar.repeat((depth - 1) * numOfSpacingChars + offsetOfSpacingChars)

  let result = ''

  if (parentIsPrimativeArray) {
    result += bracketColor('[')
  } else if (parentIsArray) {
    result += bracketColor('[\n')
  } else {
    result += bracketColor(`${depth === 1 ? closingSpacingString : ''}{\n`)
  }

  for (const property in obj) {
    if (!parentIsArray) {
      result += spacingString
      result += propertyColor(property)
      result += colonColor(':')
      result += spacingChar
    }

    if (parentIsPrimativeArray) {
      result += spacingChar
    }

    const currentPropertyIsPrimativeOrEmptyObject = isPrimitiveOrEmptyObject(obj[property])
    if (parentIsArray && !parentIsPrimativeArray && currentPropertyIsPrimativeOrEmptyObject) {
      result += spacingString
    }

    const type = Object.prototype.toString.call(obj[property])
    switch (type) {
      case '[object Undefined]':
        result += undefinedColor(obj[property])
        break

      case '[object Null]':
        result += nullColor(obj[property])
        break

      case '[object Boolean]':
        result += booleanColor(obj[property])
        break

      case '[object Number]':
        result += numberColor(obj[property])
        break

      case '[object BigInt]':
        result += bigintColor(truncate(obj[property].toString(), maxLengthBeforeTruncate, afterTruncateString))
        break

      case '[object Function]':
        result += functionColor(truncate(obj[property].toString(), maxLengthBeforeTruncate, afterTruncateString))
        break

      case '[object Symbol]':
        result += symbolColor(truncate(obj[property].toString(), maxLengthBeforeTruncate, afterTruncateString))
        break

      case '[object String]':
        const displayString = `"${truncate(obj[property], maxLengthBeforeTruncate, afterTruncateString)}"`
        result += stringColor(displayString)
        break

      case '[object Object]': {
        if (Object.keys(obj[property]).length === 0) {
          result += bracketColor('{}')
          break
        }

        const newDepth = depth + 1
        const newResult = traverse(obj[property], newDepth, options)

        if (parentIsArray) {
          result += spacingString
        }

        result += newResult
        break
      }

      case '[object Array]': {
        const newDepth = depth + 1
        const newResult = traverse(obj[property], newDepth, options)
        result += newResult
        break
      }
    }

    if (parentIsPrimativeArray) {
      result += `${bracketColor(',')} `
    } else {
      result += `${bracketColor(',')}\n`
    }
  }

  if (parentIsPrimativeArray) {
    result += `${bracketColor(']')}`
  } else if (parentIsArray) {
    result += `${closingSpacingString}${bracketColor(']')}`
  } else {
    result += `${closingSpacingString}${bracketColor('}')}`
  }

  if(depth === 1){
    result = "\n".repeat(emptyLinesBefore) + result + "\n".repeat(emptyLinesAfter)
  }

  const reversedResult = reverseString(result)
  const COMMA_DELIMITER = bracketColor(',')
  const reversedKeys = reverseString(COMMA_DELIMITER)
  const formatted = reversedResult.replace(reversedKeys, '')

  return reverseString(formatted)
}

class JSONChalkify {
  constructor(options){
    this.options = options
  }

  chalkify = (obj) => {
    const newOptions = {
      ...defaultConfig,
      ...this.options
    }

    const result = traverse(obj, 1, newOptions)
    return result
  }
}

export default JSONChalkify