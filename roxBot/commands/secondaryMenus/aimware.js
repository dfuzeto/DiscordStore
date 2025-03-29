const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

async function aimwareMenu(interaction) {
    const select = new StringSelectMenuBuilder()
        .setCustomId('aimware')
        .setPlaceholder('Faça uma seleção!')
        .addOptions(
            new StringSelectMenuOptionBuilder() 
            .setLabel('Voltar')
            .setDescription('Voltar')
            .setValue('Voltar')
            .setEmoji('<a:6318blackarrowleft:1223681244152201467>'),
            new StringSelectMenuOptionBuilder()
            .setEmoji('<:aimware:1223732028634173481>')
                .setLabel('AIMWARE 1 MÊS')
                .setDescription('R$151,50')
                .setValue('AIMWARE30D'),
        );

    const row = new ActionRowBuilder()
        .addComponents(select);


        const embed = {
            title: 'AIM-WARE',
            description: '\n- SKIN CHANGER\n- WALLHACK\n- AIMBOT\n- TRIGGERBOT\n- RCS\n',
            image: {
                url: 'https://media.discordapp.net/attachments/896846292293152778/1172992254336581712/mainpreview.png?ex=6611acaa&is=65ff37aa&hm=0f77be12470c2690ad82dd7fcd1a3e6cce51902a305c9003237b58507386e4fa&=&format=webp&quality=lossless&width=967&height=590'
            },
            color: 0xFF5733
        };
    
        await interaction.update({ content: '', embeds: [embed], components: [row], ephemeral: true });
    }
    
    module.exports = { aimwareMenu };