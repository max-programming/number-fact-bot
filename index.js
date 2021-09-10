import { Client } from 'discord.js';
import dotenv from 'dotenv';
import replyFact from './replyFact.js';

dotenv.config();

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
});

client.on('ready', () => {
  console.log(`${client.user.tag} is ready!`);

  const guildId = '885702103174090803';
  const guild = client.guilds.cache.get(guildId);
  let commands;

  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.application?.commands;
  }

  commands.create({
    name: 'fact',
    description: 'Gives a trivia fact for a number',
    options: [
      {
        name: 'number',
        description: 'Number for the fact',
        required: true,
        type: 'NUMBER',
      },
    ],
  });

  commands.create({
    name: 'math_fact',
    description: 'Gives a math fact for a number',
    options: [
      {
        name: 'number',
        description: 'Number for the math fact',
        required: true,
        type: 'NUMBER',
      },
    ],
  });

  commands.create({
    name: 'year_fact',
    description: 'Gives a year fact for a number',
    options: [
      {
        name: 'number',
        description: 'Number for the year fact',
        required: true,
        type: 'NUMBER',
      },
    ],
  });
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const { commandName, options } = interaction;
  const number = options.getNumber('number');

  if (commandName === 'fact') {
    replyFact(number, 'trivia', interaction);
  } else if (commandName === 'math_fact') {
    replyFact(number, 'math', interaction);
  } else if (commandName === 'year_fact') {
    replyFact(number, 'year', interaction);
  }
});

client.login(process.env.BOT_TOKEN);
