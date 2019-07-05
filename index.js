const express = require('express')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')
const port = 500
const socket = io(http)

socket.on('connection', socket => {
  console.log('user connected')
  socket.emit('request', '[' + new Date().toTimeString().slice(0, 8) + '] You are now connected to the server.')

  const socketIntervalId = setInterval(() => {
    const dateString = '[' + new Date().toTimeString().slice(0, 8) + ']'
    socket.emit('request', dateString + ' A random message with a new random number: ' + Math.floor(Math.random() * 1000))
  }, 2000)
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  }) 
})

http.listen(port, () => {
  console.log('connected to port: ' + port)
})