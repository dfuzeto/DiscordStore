const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, Colors } = require('discord.js');
const { colors } = require('colors')

async function roxprivateMenu(interaction) {
    const select = new StringSelectMenuBuilder()
        .setCustomId('rox-private')
        .setPlaceholder('Faça uma seleção!')
        .addOptions(
            new StringSelectMenuOptionBuilder() 
            .setLabel('Voltar')
            .setDescription('Voltar')
            .setValue('Voltar')
            .setEmoji('<a:6318blackarrowleft:1223681244152201467>'),
            new StringSelectMenuOptionBuilder()
               .setEmoji('<:RoxStoreLogo2:1223728207468171275>')    
                .setLabel('ROX-PRIVATE 3 DIAS')
                .setDescription('R$56,56')
                .setValue('ROXPRIVATE3D'),
                new StringSelectMenuOptionBuilder()
                .setEmoji('<:RoxStoreLogo2:1223728207468171275>')
                .setLabel('ROX-PRIVATE 7 DIAS')
                .setDescription('R$101,00')
                .setValue('ROXPRIVATE7D'),
                new StringSelectMenuOptionBuilder()
                .setEmoji('<:RoxStoreLogo2:1223728207468171275>')
                .setLabel('ROX-PRIVATE 30 DIAS')
                .setDescription('R$101,00')
                .setValue('ROXPRIVATE30D'),
        );

    const row = new ActionRowBuilder()
        .addComponents(select);


        const embed = {
            color: parseInt('00FF00', 16), 
            title: 'ROX-PRIVATE',
            description: '\n- WALLHACK\n- AIMBOT\n- TRIGGERBOT\n RCS\n',
            image: {
                url: 'https://media.discordapp.net/attachments/770702608239034412/1172393951240654859/image.png?ex=6618b9f4&is=660644f4&hm=276034ef04155ffb378c6e78e64ec8d5ed6cf0d03d609bc8167a64c1b781bf97&=&format=webp&quality=lossless&width=1049&height=590'
            },
        };
    
        await interaction.update({ content: '', embeds: [embed], components: [row], ephemeral: true });
    }
    
    module.exports = { roxprivateMenu };