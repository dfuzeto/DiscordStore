const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

async function createInitialMenu2(interaction) {
    const select = new StringSelectMenuBuilder()
        .setCustomId('choose')
        .setPlaceholder('Faça uma seleção!')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Cheats')
                .setEmoji('📁')
                .setDescription('Tipo: Categoria..')
                .setValue('Cheats'),
        );

    const row = new ActionRowBuilder()
        .addComponents(select);

    const embed = {
        color: parseInt('00FF00', 16), 
        title: "MENU: INICIAL <:9183shoppingcart:1223695453544251523>",
        description: "",
        footer: {
            text: "rox, todos os direitos reservados!",
        },
        timestamp: new Date(),
        image: {
            url: ''
        },
    };

    await interaction.update({ content: '', embeds: [embed], components: [row], ephemeral: true });
}

module.exports = { createInitialMenu2 };
