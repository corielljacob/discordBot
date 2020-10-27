# discordBot
Discord bot I develop for a group of friends and myself to use.

Bot is built on Node.js has a list of handlers for responding to user inputs. 

This bot is being hosted on Heroku (currently for free as this is just a for-fun small project) -- the bots private key is stored on heroku 
thus you see " client.login(process.env.BOT_TOKEN); " in bot.js.

The bot also makes use of a free MongoDB Atlas database. The access url is stored on heroku due to having sensitive login information. 

The bot can make use of images and other files included in this repo and those are typically stored in the assets folder and furthermore in their respective folders for designated use. 

This project is now tested with SonarQube! You can see my project's page here: https://sonarcloud.io/dashboard?id=corielljacob_discordBot
