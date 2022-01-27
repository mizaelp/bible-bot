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

    const book = message.body.split(" ")[0]
    const chapter = +message.body.split(" ")[1].split(":")[0]
    const verse = +message.body.split(" ")[1].split(":")[1]
    const filteredBook = bible.filter(eachBook => eachBook.name === book)

    if (filteredBook[0].chapters[chapter - 1][verse - 1]) {
      client
        .sendText(message.from, `Olá ${message.chat.contact.name}, o texto que você escolheu diz: ${filteredBook[0].chapters[chapter - 1][verse - 1]}`)
        .then((result) => {
          console.log('Result: ', result)
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro)
        })
    }
  })
}