const util = require('../utility.js')
const Discord = require('discord.js')
module.exports = {
  name: 'mudae',
  description: 'Analyzes message from mudae',
  execute(msg, args) {
    const emb = msg.embeds[0]
    const exemb = new Discord.RichEmbed(emb)
    const content = exemb.description
    if (content.includes("Likes"))
      return;
    for (var i = 0; i < content.length; i++) {
      if(content.charAt(i) == '*' && content.charAt(i+1) == '*'){
        let val = "" +content.charAt(i+2);
        val += "" + content.charAt(i+3);
        if(!(content.charAt(i+4) == '*')) {
          val += "" + content.charAt(i+4);
          if(!(content.charAt(i+5) == '*')) {
              val += content.charAt(i+5)
          }
        }
        msg.channel.send("Kakera value: " + val)
        return;
      }
    }
  }
};
