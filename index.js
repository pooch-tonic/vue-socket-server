const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8088 })
const storage = {
  previousMessage: null,
}

wss.on('connection', ws => {
  ws.on('message', message => {
    storage.previousMessage = message
    console.log(`Received message => ${ message }`)
  })
  ws.send(`You are now connected !`)
  setInterval(() => ws.send('[' + new Date().toTimeString() + '] Random: ' + Math.random() * 1000), 2500)
})