const { processCountWords, getWords, sortByQuantity } = require('./functions')
const functions = require('./functions')

functions.readFile('legendas_01.srt')
      .then(content => getWords(content))
      .then(result => processCountWords(result))
      .then(result => sortByQuantity(result))
      .then(console.log)
      .catch(e => console.log(e)) 

