const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, Intents, Presence } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


/////////////////////COMMANDS HANDLER

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


/////////////////////////EVENTS HANDLER

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

///////////////////////////MONITOR

const keepAlive = require('./server');
const Monitor = require('ping-monitor');
const axios = require('axios');

keepAlive();
const monitor = new Monitor({
    website: 'https://yest.kycss.repl.co',
    title: 'NAME',
    interval: 2
});

monitor.on('up', (res) => {
  console.log(`   - ${res.website} is up.`);
  sendWebhookMessage('[🟢] Monitor is up', res.website);
});

monitor.on('down', (res) => {
  console.log(`${res.website} has died - ${res.statusMessage}`);
  sendWebhookMessage('[🔴] Monitor is down', res.website);
});

monitor.on('stop', (website) => {
  console.log(`[🟠] ${website} has stopped.`);
  sendWebhookMessage('Monitor has stopped', website);
});

monitor.on('error', (error) => {
  console.log(error);
  sendWebhookMessage('[🚨] Monitor error', error);
});

function sendWebhookMessage(title, message) {
  const webhookURL = 'https://discord.com/api/webhooks/1109447246593929246/TYvjbcQ1Qwb4zyoKwuaGFCvGkgaEJwHjIuIpK4ueqsxBPzxPHfgQyYti7T10QYo-_jIh'; // Replace with your actual webhook URL

  axios.post(webhookURL, { content: message, username: title })
    .then(() => console.log('[📢] Webhook sent successfully.'))
    .catch((error) => console.error('[⚠] Error sending webhook:', error));
}

///////////////////////DEPLOY COMMANDS

const { exec } = require('child_process');

exec('node deploy-commands.js', (error, stdout, stderr) => {
  if (error) {
    console.error('Error executing deploy-commands.js:', error);
    return;
  }
  console.log('[📢] Updating all commands...');
  console.log(stdout);
});


///////////////////////LOGIN

client.login(process.env.token);