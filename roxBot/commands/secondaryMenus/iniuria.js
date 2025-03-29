const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

async function iniuriaMenu(interaction) {
    const select = new StringSelectMenuBuilder()
        .setCustomId('iniuria')
        .setPlaceholder('Faça uma seleção!')
        .addOptions(
            new StringSelectMenuOptionBuilder() 
            .setLabel('Voltar')
            .setDescription('Voltar')
            .setValue('Voltar')
            .setEmoji('<a:6318blackarrowleft:1223681244152201467>'),
            new StringSelectMenuOptionBuilder()
            .setEmoji('<:iniuria:1223730904166567947>')
                .setLabel('INIURIA 1 MÊS')
                .setDescription('R$111')
                .setValue('INIURIA30D'),
        );

    const row = new ActionRowBuilder()
        .addComponents(select);


        const embed = {
            title: 'INIURIA',
            description: '\n- SKIN CHANGER\n- WALLHACK\n- AIMBOT\n- TRIGGERBOT\n- RCS\n',
            image: {
                url: 'https://media.discordapp.net/attachments/1172578771103129722/1172992973718429706/image.png?ex=6611ad56&is=65ff3856&hm=e6513b73bb8357ea184d774527c2cffe2c85a129be7eeab63a5874fc217151b6&=&format=webp&quality=lossless&width=1035&height=590'
            },
            color: 0x0000FF
        };
    
        await interaction.update({ content: '', embeds: [embed], components: [row], ephemeral: true });
    }
    
    module.exports = { iniuriaMenu };