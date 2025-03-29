const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

async function xoneMenu(interaction) {
    const select = new StringSelectMenuBuilder()
        .setCustomId('xone')
        .setPlaceholder('Faça uma seleção!')
        .addOptions(
            new StringSelectMenuOptionBuilder() 
            .setLabel('Voltar')
            .setDescription('Voltar')
            .setValue('Voltar')
            .setEmoji('<a:6318blackarrowleft:1223681244152201467>'),
            new StringSelectMenuOptionBuilder()
            .setEmoji('<:xone:1223732025266016437>')
                .setLabel('XONE 1 MÊS')
                .setDescription('R$30,30')
                .setValue('XONE30D'),
        );

    const row = new ActionRowBuilder()
        .addComponents(select);


        const embed = {
            title: 'XONE',
            description: '\n- SKIN CHANGER\n- WALLHACK\n- AIMBOT\n- TRIGGERBOT\n- RCS\n',
            image: {
                url: 'https://media.discordapp.net/attachments/896846292293152778/1172709506812227645/IvqlEzr8wftHO63gS1Pg9G19wg2wsKZkaNxlCTJ8.png?ex=6619dfd6&is=66076ad6&hm=d8d52bf1e41953b48521d843ae6e0f8f8becaf856b905bebe1dd8234ab3daff3&=&format=webp&quality=lossless&width=1049&height=590'
            },
            color: 0x800000
        };
    
        await interaction.update({ content: '', embeds: [embed], components: [row], ephemeral: true });
    }
    
    module.exports = { xoneMenu };