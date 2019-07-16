module.exports = {
  name: 'dm',
  description: 'Bot sends a dm to anyone who uses this command. Allows for easy way for user to send bot a name picture.',
  execute(msg, args) {
    msg.author.send('Send a pic to change your command pic')
  }
}
