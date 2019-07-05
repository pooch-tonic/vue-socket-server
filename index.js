const express = require('express')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')
const port = 500
const socket = io(http)

socket.on('connection', socket => {
  console.log('user connected')
  socket.emit('message', '[' + new Date().toTimeString().slice(0, 8) + '] You are now connected to the server.')

  socket.on('start-operation', () => {
    console.log('user started an operation')

    let progress = 0
    const intervalId = setInterval(() => {
      progress += Math.floor(Math.random() * 20)
      
      if (progress >= 100) {
        progress = 100
        socket.emit('message', '[' + new Date().toTimeString().slice(0, 8) + '] Operation in progress... 100%')
        socket.emit('finalize-operation')
      }
      socket.emit('message', '[' + new Date().toTimeString().slice(0, 8) + '] Operation in progress... ' + progress.toString().padStart(3, ' ') + '%')
    }, 500)

    socket.on('end-operation', () => {
      clearInterval(intervalId)
      console.log('user ended the operation')
    })
  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  }) 
})

http.listen(port, () => {
  console.log('connected to port: ' + port)
})