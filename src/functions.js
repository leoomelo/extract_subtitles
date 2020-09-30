const fs = require('fs')
const path = require('path')
const SRT_EXTENSION = 'srt'

const read_file = () => {
  return new Promise( (resolve, reject) => {
    fs.readFile(path.join(__dirname, '..', 'legendas', 'legendas_01.srt'), 'utf8', (err, data) => {
      if (err) throw new Error('Error to read file!')
    
      resolve(data.toString())
    })
  })
}

const isSrtFiles = (filename) => {
  const splittedFileName = filename.split('.')
  return splittedFileName[splittedFileName.length -1].toLowerCase() === SRT_EXTENSION.toLowerCase()
}

module.exports = {
  read_file,
  isSrtFiles
}
