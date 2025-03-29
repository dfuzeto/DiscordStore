const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const { token } = require('./config.json');
const { createInitialMenu } = require('./commands/menus/initialmenu');
const { handleInteraction } = require('./selectMenuHandler');
const ticketHandler = require('./commands/ticket/tickethandler');
let cheat

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildModeration, 
        GatewayIntentBits.GuildEmojisAndStickers, 
        GatewayIntentBits.GuildIntegrations, 
        GatewayIntentBits.GuildWebhooks, 
        GatewayIntentBits.GuildInvites, 
        GatewayIntentBits.GuildVoiceStates, 
        GatewayIntentBits.GuildMessageReactions, 
        GatewayIntentBits.GuildMessageTyping, 
        GatewayIntentBits.DirectMessages, 
        GatewayIntentBits.DirectMessageReactions, 
        GatewayIntentBits.DirectMessageTyping, 
        GatewayIntentBits.GuildScheduledEvents, 
        GatewayIntentBits.GuildPresences, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel, 
        Partials.GuildMember, 
        Partials.GuildScheduledEvent, 
        Partials.Message, 
        Partials.Reaction, 
        Partials.ThreadMember, 
        Partials.User
    ],
    restTimeOffset: 0,
    failIfNotExists: false,
    presence: {
        activity: {
            name: `roxviado`,
            type: ActivityType.Listening,
            url: ''  
        },
        status: "online"
    },
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.customId === 'buy') {
        const existingMessages = await interaction.channel.messages.fetch({ limit: 10 });
        const existingBuyMessage = existingMessages.find(msg => msg.interaction && msg.interaction.customId === 'buy');

        if (existingBuyMessage) {
            console.log('There is already a "buy" message in the channel.');
            return;
        }

        const allowedOptions = ['AIMWARE30D', 'INIURIA30D', 'KERNEL-GC3D', 'KERNEL-GC7D', 'KERNEL-GC330D', 'MIDNIGHT30D', 'NEVERLOSE30D', 'NIXWARE30D', 'ROXPRIVATE3D', 'ROXPRIVATE7D', 'ROX-PRIVATE30D', 'XONE30D', 'NOVACK1D', 'NOVACK7D', 'NOVACK30D', 'NOVACK90D'];

if (allowedOptions.includes(interaction.customId)) {
     cheat = interaction.values[0]
} 
        await createInitialMenu(interaction);
    } else {
        await handleInteraction(interaction);
    }
    await ticketHandler(interaction, client, cheat);
});

client.once('ready', async () => {
    console.log(`Bot is online as ${client.user.tag}!`);
    
    const readyEvent = require('./commands/utility/ready');
    await readyEvent.execute(client);
});

client.login(token);
