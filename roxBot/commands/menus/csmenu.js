const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

async function createCsCheatsMenu(interaction) {
    const select = new StringSelectMenuBuilder()
        .setCustomId('cs2cheats')
        .setPlaceholder('Faça uma seleção!')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setEmoji('<:midnight:1223731268642934916>')
                .setLabel('MIDNIGHT')
                .setDescription('Tipo: Cheat')
                .setValue('MIDNIGHT'),
            new StringSelectMenuOptionBuilder()
                .setEmoji('<:neverlose:1223732030379130890>')
                .setLabel('NEVERLOSE')
                .setDescription('Tipo: Cheat')
                .setValue('NEVERLOSE'),
            new StringSelectMenuOptionBuilder()
                .setEmoji('<:iniuria:1223730904166567947>')
                .setLabel('INIURIA')
                .setDescription('Tipo: Cheat')
                .setValue('INIURIA'),
            new StringSelectMenuOptionBuilder()
                .setEmoji('<:aimware:1223732028634173481>')
                .setLabel('AIMWARE')
                .setDescription('Tipo: Cheat')
                .setValue('AIMWARE'),
            new StringSelectMenuOptionBuilder()
                .setEmoji('<:gc:1223732027245858866>')
                .setLabel('KERNEL-GC')
                .setDescription('Tipo: Cheat')
                .setValue('KERNEL-GC'),
            new StringSelectMenuOptionBuilder()
                .setEmoji('<:xone:1223732025266016437>')
                .setLabel('XONE')
                .setDescription('Tipo: Cheat')
                .setValue('XONE'),
            new StringSelectMenuOptionBuilder()
                .setEmoji('<:nixware:1223732023487627316>')
                .setLabel('NIX-WARE')
                .setDescription('Tipo: Cheat')
                .setValue('NIX-WARE'),
           new StringSelectMenuOptionBuilder() 
                .setEmoji('<a:6318blackarrowleft:1223681244152201467>')
                .setLabel('Voltar')
                .setDescription('Tipo: Categoria')
                .setValue('Voltar'),
        );

    const row = new ActionRowBuilder()
        .addComponents(select);

        const embed = {
            color: parseInt('00FF00', 16), 
            title: "MENU: COUNTER-STRIKE2 <:9183shoppingcart:1223695453544251523>",
            description: " ",
            footer: {
                text: "rox, todos os direitos reservados!",
            },
            timestamp: new Date(),
            image: {
                url: ''
            },
        };



        await interaction.update({ content: '', components: [row], embeds: [embed], ephemeral: true });
}

module.exports = { createCsCheatsMenu };
