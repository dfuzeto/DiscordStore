const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

async function createValCheatsMenu(interaction) {
    const select = new StringSelectMenuBuilder()
        .setCustomId('valcheats')
        .setPlaceholder('Faça uma seleção!')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('ROX-PRIVATE')
                .setEmoji('<:RoxStoreLogo2:1223728207468171275>')
                .setDescription('Rox private.')
                .setValue('ROX-PRIVATE'),
            new StringSelectMenuOptionBuilder()
                .setLabel('NOVACK')
                .setEmoji('<:logofullnovack1qgww1uhn330dso6y6:1223735494584565830>')
                .setDescription('NOVACK')
                .setValue('NOVACK'),
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
        title: "MENU: VALORANT  <:9183shoppingcart:1223695453544251523>",
        description: "",
        footer: {
            text: "rox, todos os direitos reservados!",
        },
        timestamp: new Date(),
        image: {
            url: ''
        },
        ephemeral: true
    };

    await interaction.update({ content: '', embeds: [embed], components: [row], ephemeral: true });
}

module.exports = { createValCheatsMenu };
