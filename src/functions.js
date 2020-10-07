const { countReset } = require('console')
const fs = require('fs')
const { parse } = require('path')
const path = require('path')
const SRT_EXTENSION = 'srt'

const loadAllSubtitleFiles = () => {
  return new Promise( (resolve, reject) => {
    fs.readdir(path.join(__dirname, '..', 'legendas'), (err, files) => {
      if (err) reject('Erro to read srt files')
      
      validFiles = files.filter( item => isSrtFiles(item))
      resolve(validFiles)
    })
  })
}

const readFile = (filename) => {
  return new Promise( (resolve, reject) => {
    fs.readFile(path.join(__dirname, '..', 'legendas', filename), 'utf8', (err, data) => {
      if (err) reject('Error to read file!')
    
      resolve(data.toString())
    })
  })
}

const isSrtFiles = (filename) => {
  const splittedFileName = filename.split('.')
  return splittedFileName[splittedFileName.length -1].toLowerCase() === SRT_EXTENSION.toLowerCase()
}

const getWords = (content) => {
  return new Promise( (resolve, reject) => {
    const wordRegex = /(?!<.?)(?!.?>)([a-zA-Z]|\')+/gm
    resolve(content.match(wordRegex))
  })
}

const processCountWords = (wordsArray) => {
  return new Promise( (resolve, reject) => {
    let countedWordResult = {}
    
    wordsArray.map( word => {
      countedWordResult.hasOwnProperty(word) ? countedWordResult[word]++ : countedWordResult[word] = 1
    })
  
    resolve(countedWordResult)
  })
}

const sortByQuantity = (myObj) => {
  return new Promise( (resolve, reject) => {
    const keySorted = Object.keys(myObj)
    .sort((a, b) => myObj[b] - myObj[a])
    .reduce(
      (_sortedObj, key) => ({
        ..._sortedObj,
        [key]: myObj[key],
      }),
      {}
    );
    resolve(keySorted)
  })
}

module.exports = {
  readFile,
  isSrtFiles,
  getWords,
  processCountWords,
  sortByQuantity,
  loadAllSubtitleFiles
}
