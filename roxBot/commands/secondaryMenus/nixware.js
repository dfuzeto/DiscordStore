const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

async function nixwareMenu(interaction) {
    const select = new StringSelectMenuBuilder()
        .setCustomId('nixware')
        .setPlaceholder('Faça uma seleção!')
        .addOptions(
            new StringSelectMenuOptionBuilder() 
            .setLabel('Voltar')
            .setDescription('Voltar')
            .setValue('Voltar')
            .setEmoji('<a:6318blackarrowleft:1223681244152201467>'),
            new StringSelectMenuOptionBuilder()
            .setEmoji('<:nixware:1223732023487627316>')
                .setLabel('NIXWARE 1 MÊS')
                .setDescription('R$30,30')
                .setValue('NIXWARE30D'),
        );

    const row = new ActionRowBuilder()
        .addComponents(select);


        const embed = {
            title: 'NIX-WARE',
            description: '\n- SKIN CHANGER\n- WALLHACK\n- AIMBOT\n- RCS\n',
            image: {
                url: 'https://media.discordapp.net/attachments/1172578771103129722/1179117479201615982/1.png?ex=66158039&is=66030b39&hm=02a1c466489793990e605bacb9ac9b0da63c8b06ebcb88c526ba3334e75f5830&=&format=webp&quality=lossless&width=450&height=253'
            },
            color: 0x000000
        };
    
        await interaction.update({ content: '', embeds: [embed], components: [row], ephemeral: true });
    }
    
    module.exports = { nixwareMenu };