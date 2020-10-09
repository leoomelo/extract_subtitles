const { processCountWords, getWords, sortByQuantity } = require('./functions')
const fn = require('./functions')

async function main() {
  const files = await fn.loadAllSubtitleFiles()
  let words = fn.extractAllWords(files)
  words = words.join('<><><>')
  
  fn.getWords(words)
    .then(result => processCountWords(result))
    .then(result => sortByQuantity(result))
    .then(console.log)
    .catch(e => console.log(e))
}

main()