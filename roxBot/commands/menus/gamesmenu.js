const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

async function createGamesMenu(interaction) {
    const select = new StringSelectMenuBuilder()
        .setCustomId('games')
        .setPlaceholder('Faça uma seleção!')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setEmoji('<:6028valorant:1223682613202649118>')
                .setLabel('Valorant')
                .setDescription('Tipo: Jogo')
                .setValue('Valorant'),
            new StringSelectMenuOptionBuilder()
                .setEmoji('<:8219cs2:1223681732499214467>')
                .setLabel('Counter-Strike 2')
                .setDescription('Tipo: Jogo')
                .setValue('Cs2'),
            new StringSelectMenuOptionBuilder() 
                .setLabel('Voltar')
                .setEmoji('<a:6318blackarrowleft:1223681244152201467>')
                .setDescription('Voltar')
                .setValue('Voltar'),
        );

    const row = new ActionRowBuilder()
        .addComponents(select);

    const embed = {
        color: parseInt('00FF00', 16), 
        title: 'MENU: JOGOS <:9183shoppingcart:1223695453544251523>',
        description: '',
        footer: {
            text: "rox, todos os direitos reservados!",
        },
        image: {
            url: ''
        },
    };

    await interaction.update({ content: '', components: [row], embeds: [embed], ephemeral: true });
}

module.exports = { createGamesMenu };
