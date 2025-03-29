const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

async function novackMenu(interaction) {
    const select = new StringSelectMenuBuilder()
        .setCustomId('novack')
        .setPlaceholder('Faça uma seleção!')
        .addOptions(
            new StringSelectMenuOptionBuilder() 
            .setLabel('Voltar')
            .setDescription('Voltar')
            .setValue('Voltar')
            .setEmoji('<a:6318blackarrowleft:1223681244152201467>'),
            new StringSelectMenuOptionBuilder()
                .setLabel('NOVACK 1 DIAS')
                .setEmoji('<:logofullnovack1qgww1uhn330dso6y6:1223735494584565830>')
                .setDescription('R$50,50')
                .setValue('NOVACK1D'),
            new StringSelectMenuOptionBuilder()
                .setLabel('NOVACK 7 DIAS')
                .setEmoji('<:logofullnovack1qgww1uhn330dso6y6:1223735494584565830>')
                .setDescription('R$115,00')
                .setValue('NOVACK7D'),
            new StringSelectMenuOptionBuilder()
                .setLabel('NOVACK 30 DIAS')
                .setEmoji('<:logofullnovack1qgww1uhn330dso6y6:1223735494584565830>')
                .setDescription('R$230,00')
                .setValue('NOVACK30D'),
            new StringSelectMenuOptionBuilder()
                .setLabel('NOVACK 90 DIAS')
                .setEmoji('<:logofullnovack1qgww1uhn330dso6y6:1223735494584565830>')
                .setDescription('R$404,00')
                .setValue('NOVACK90D')
        );

    const row = new ActionRowBuilder()
        .addComponents(select);

    const embed = {
        color: parseInt('FFFF00', 16),
        title: 'NOVACK',
        description: '\n- SKIN CHANGER\n- WALLHACK\n- AIMBOT\n- TRIGGERBOT\n- RCS\n',
        image: {
            url: 'https://media.discordapp.net/attachments/770702608239034412/1166241630760743023/image.png?ex=6614cd28&is=66025828&hm=d3e061373861b9f9941ba6acb9ec33f569deb9fe60b73246c812d46e92c25746&=&format=webp&quality=lossless&width=1051&height=590'
        }
    };

    await interaction.update({ content: '', embeds: [embed], components: [row], ephemeral: true });
}

module.exports = { novackMenu };
