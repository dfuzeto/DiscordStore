const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

async function neverloseMenu(interaction) {
    const select = new StringSelectMenuBuilder()
        .setCustomId('neverlose')
        .setPlaceholder('Faça uma seleção!')
        .addOptions(
            new StringSelectMenuOptionBuilder() 
            .setLabel('Voltar')
            .setDescription('Voltar')
            .setValue('Voltar')
            .setEmoji('<a:6318blackarrowleft:1223681244152201467>'),
            new StringSelectMenuOptionBuilder()
            .setEmoji('<:neverlose:1223732030379130890>')
                .setLabel('NEVERLOSE 1 MÊS')
                .setDescription('R$169,80')
                .setValue('NEVERLOSE30D'),
        );

    const row = new ActionRowBuilder()
        .addComponents(select);


        const embed = {
            title: 'NEVERLOSE',
            description: '\n- SKIN CHANGER\n- WALLHACK\n- AIMBOT\n- TRIGGERBOT\n- RCS\n',
            image: {
                url: 'https://media.discordapp.net/attachments/896846292293152778/1211831790969290822/image.png?ex=66148b4d&is=6602164d&hm=0c987d746ff156a9d12bbb05b53ef99ee84db50667208a1f5abcd3220f265405&=&format=webp&quality=lossless&width=1099&height=590'
            },
            color: 0x00008B
        };
    
        await interaction.update({content: '', embeds: [embed], components: [row], ephemeral: true });
    }
    
    module.exports = { neverloseMenu };