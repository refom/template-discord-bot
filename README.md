<div id="top"></div>

<h1 align="center">Template Discord Bot</h3>
<h3 align="center">
    Starter file for creating Discord bot using discord.js
</h3>

<p align="center">
  <a href="#about-the-project">About The Project</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#usage">Usage</a>
</p>



<!-- ABOUT THE PROJECT -->
## About The Project

I made this template because I was lazy to edit an existing project file to make a new one, so I created an starter file that can be used directly to create a discord bot!


### Built With

* [Discord.js](https://discord.js.org/)
* [Node.js](https://nodejs.org/)



### Features

- Commands Handler
- Events Handler
- Features Handler
- Permission Handler
- Reactions Handler
- Human-readable format
- Organized Folders and Files


<!-- GETTING STARTED -->
## Getting Started

### Config

Make sure you have node.js and npm installed. First you need to create an `.env` file and fill it according to the one in `.env.example`
* .env
  ```env
  CLIENT_TOKEN="Your Bot Token"
  OWNER="Your Discord Account ID"
  ```

Next, create a `config.json` file according to the one in `config.json.example`
* config.json
  ```json
  {
	"bot": {
		"id": "your bot id",
		"status": [
			{ "type": "WATCHING", "activity": "My Master", "status": "dnd" },
			{ "type": "PLAYING", "activity": "Games, ofc", "status": "dnd" }
		],
		"statusDelay": [ 2, 60, 1000 ]
	},
	"guilds": [ "your discord server with your bot" ]
  }
  ```

If you want to add your friend as admin or tester bot, then open the handler folder then edit the `permission.json` file, fill it with your friend's discord account id

* permission.json
  ```json
  {
    "admins": [ "your friend id" ],
    "tester": [ "your friend id" ]
  }
  ```


### Installation

Install the required package using npm
* npm
  ```sh
  npm install
  ```


<!-- USAGE EXAMPLES -->
## Usage

Run the bot for the first time, then open a second command prompt to run the `deploy-guild.js` file
* Run the bot
  ```sh
  npm start
  ```
  or
  ```sh
  node .
  ```
* Run deploy commands
  ```sh
  node deploy-guild.js
  ```

After `deploy-guild.js` is complete, now you can deploy new commands via the command on your server that you enter the id into `config.json`

To make commands, I have prepared a template for creating commands which is in the commands [folder](commands).


<p align="right">(<a href="#top">back to top</a>)</p>
