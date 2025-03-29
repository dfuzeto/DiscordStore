const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

async function kernelgcMenu(interaction) {
    const select = new StringSelectMenuBuilder()
        .setCustomId('kernelgc')
        .setPlaceholder('Faça uma seleção!')
        .addOptions(
            new StringSelectMenuOptionBuilder() 
            .setLabel('Voltar')
            .setDescription('Voltar')
            .setValue('Voltar')
            .setEmoji('<a:6318blackarrowleft:1223681244152201467>'),
            new StringSelectMenuOptionBuilder()
            .setEmoji('<:gc:1223732027245858866>')
            .setLabel('KERNEL-GC 3 DIAS')
            .setDescription('R$30,30')
            .setValue('KERNEL-GC3D'),
            new StringSelectMenuOptionBuilder()
            .setEmoji('<:gc:1223732027245858866>')
            .setLabel('KERNEL-GC 7 DIAS')
            .setDescription('R$60,60')
            .setValue('KERNEL-GC7D'),
            new StringSelectMenuOptionBuilder()
            .setEmoji('<:gc:1223732027245858866>')
                .setLabel('KERNEL-GC 1 MÊS')
                .setDescription('R$140,14')
                .setValue('KERNEL-GC30D'),
        );

    const row = new ActionRowBuilder()
        .addComponents(select);


        const embed = {
            title: 'KERNEL-GC',
            description: 'Supports:\n[+] Windows 11\n[+] Windows 10\n[+] NVIDIA Video Card\n[+] AMD Video Card\n\nFeatures:\n[+] Crosshair\n[+] Health ESP\n[+] Distance ESP\n[+] Health Text ESP\n[+] Skeleton ESP\n[+] Fullfill Box ESP',
            image: {
                url: ''
            },
            color: 0x008B8B
        };
    
        await interaction.update({ content: '', embeds: [embed], components: [row], ephemeral: true });
    }
    
    module.exports = { kernelgcMenu };