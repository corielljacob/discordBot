const util = require('../utility.js')
module.exports = {
  name: 'ping',
  description: 'Ping!',
  array: ['1','2','three'],
  execute(msg, args) {
    const str = "Hello, one two, three"
    let arr = str.split(",")
    msg.channel.send(args)
  }
};
