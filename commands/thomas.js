const util = require('../utility.js')
module.exports = {
  name: 'thomas',
  description: 'Do something related to thomas.',
  execute(message, args) {
    let thom = ['Why dont ants get sick?', 'Because they have little antibodies', 'Son: What rhymes with orange?\nThomas: no it doesnt', 'Whats loud and sounds like an apple? AN APPLE', 'Whats red and smells like blue paint? red paint', 'Time flies like an arrow; fruit flies like bananas',
      'Whats red and bad for your teeth? A brick', 'I have the heart of a lion and a lifetime ban from the toronto zoo', 'i bought the worlds worst thesaurus yesterday. not only is it terrible, but its terrible',
      'to the guy who stole my MS office, i will find you. you have my word', 'my friend asked me to round up his 37 sheep. i said "40"', 'BEES?'
    ]

    let index = util.getRandomInt(thom.length)

    msg.channel.send(thom[index])


  },
};
