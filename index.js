const venom = require('venom-bot')
const bible = require('./bible.json')

venom
  .create({
    session: 'session-name',
    multidevice: false
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro)
  })

function start(client) {
  client.onMessage((message) => {

    const text = message.body.split(/\s|:/, 3)
    const book = text[0]
    const chapter = (parseInt(text[1]) - 1)
    const verse = (parseInt(text[2]) - 1)

    const filteredBook = bible.filter(eachBook => eachBook.name === book)

    if (filteredBook[0].chapters[chapter][verse]) {
      client
        .sendText(message.from, `Olá ${message.sender.name}, o texto que você escolheu diz: ${filteredBook[0].chapters[chapter][verse]}`)
        .then((result) => {
          console.log('Result: ', result)
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro)
        })
    }
  })
}