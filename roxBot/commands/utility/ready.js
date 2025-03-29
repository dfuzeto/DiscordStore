const colors = require('colors');
const { channelId } = require('../../config.json');
const { ActionRowBuilder, Colors, ButtonBuilder, ButtonStyle } = require('discord.js');

let readyEventSent = false; 

module.exports = {
    name: 'ready',
    once: false,
    execute: async (client) => {
        const channel = client.channels.cache.get(channelId);
        if (!channel) {
            console.error(`Channel with ID ${channelId} not found.`);
            return;
        }

        const messages = await channel.messages.fetch();
        const sentMessages = messages.filter(message => message.author.id === client.user.id);

        if (sentMessages.size > 0) {
            readyEventSent = true;
        }

        if (!readyEventSent) {
            console.log(`[READY] ${client.user.tag} (${client.user.id}) is ready !`.green);

            let channelid = client.channels.cache.get(channelId);

            await channelid.send({
                embeds: [{
                    color: '#00FF00',
                    title: "<:RoxStoreLogo2:1223728207468171275> ROX-STORE",
                    description: "Seja bem vindo a rox-store. Clique abaixo para comprar!",
                    color: Colors.Green,
                    footer: {
                        text: "rox-store, todos direitos reservados",
                    },
                    timestamp: new Date(),
                    image: {
                        url: ''
                    },
                }],
                components: [
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder().setCustomId('buy').setLabel('Comprar').setStyle(ButtonStyle.Success)
                    )
                ]
            });

            readyEventSent = true; 
        }
    }
};
