const fs = require('fs');
const path = require('path');
const { ActionRowBuilder, ChannelType, PermissionFlagsBits, Colors, ButtonStyle, ButtonBuilder } = require('discord.js');
const config = require('../../config');
const axios = require('axios');
const monitorarPagamentoAprovado = require('../pagamento/verificacao');

async function ticketHandler(interaction, client, member) {
    const allowedOptions = ['AIMWARE30D', 'INIURIA30D', 'KERNEL-GC3D', 'KERNEL-GC7D', 'KERNEL-GC330D', 'MIDNIGHT30D', 'NEVERLOSE30D', 'NIXWARE30D', 'ROXPRIVATE3D', 'ROXPRIVATE7D', 'ROX-PRIVATE30D', 'XONE30D', 'NOVACK1D', 'NOVACK7D', 'NOVACK30D', 'NOVACK90D'];
    if (!interaction.isStringSelectMenu() || !allowedOptions.includes(interaction.values[0])) return;

    try {
        const response = await axios.get('http://localhost:3000/keys');
        const keys = response.data;

        if (!keys[interaction.values[0]] || keys[interaction.values[0]].length === 0 || keys[interaction.values[0]][0] === "") {
            return interaction.reply({
                content: ":x: | Sem estoque!",
                ephemeral: true
            });
        }

        let support_team = config.support_team;

        let AlreadyChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id);
        if (AlreadyChannel) return interaction.reply({
            content: ":x: | Você já tem um ticket aberto!",
            ephemeral: true
        });

        const ticketName = `Ticket de ${interaction.user.username}`;

        const permissionOverwrites = [
            {
                id: interaction.user.id,
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                deny: [PermissionFlagsBits.MentionEveryone]
            },
            {
                id: support_team,
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                deny: [PermissionFlagsBits.MentionEveryone]
            },
            {
                id: interaction.guild.id,
                deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.MentionEveryone]
            }
        ];

        const newChannel = await interaction.guild.channels.create({
            name: ticketName,
            type: ChannelType.GuildText,
            topic: interaction.user.id,
            parent: config.ticket_category,
            permissionOverwrites
        });

        setTimeout(async () => {
            try {
                await newChannel.delete();
            } catch (error) {
                console.error('❌ | Erro ao excluir o canal:', error);
            }
        }, 15 * 60 * 1000);

        await interaction.reply({
            embeds: [{
                title: "🎉 SEU TICKET DE PAGAMENTO FOI CRIADO! 🎉",
                description: `${interaction.user} Parabéns! Seu ticket de pagamento foi criado com sucesso. Se necessário entre em contato para ajudá-lo com qualquer dúvida ou problema que você tenha.`,
                color: Colors.Blurple,
                footer: {
                    text: "rox-store, todos os direitos reservados"
                },
                timestamp: new Date()
            }],
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder().setLabel('IR PARA O TICKET').setStyle(ButtonStyle.Link).setURL(`https://discord.com/channels/1222254899534889090/${newChannel.id}`)
                    )
            ],
            ephemeral: true
        });

        const valoresDosPagamentos = {
            'AIMWARE30D': 0.02,
            'INIURIA30D': 111,
            'KERNEL-GC3D': 30.3,
            'KERNEL-GC7D': 60.60,
            'KERNEL-GC330D': 140.14,
            'MIDNIGHT30D': 40.40,
            'NEVERLOSE30D': 169.68,
            'NIXWARE30D': 30.30,
            'ROXPRIVATE3D': 56.56,
            'ROXPRIVATE7D': 101,
            'ROX-PRIVATE30D': 252.2,
            'XONE30D': 30.30,
            'NOVACK1D': 50.5,
            'NOVACK7D': 115,
            'NOVACK30D': 230,
            'NOVACK90D': 404,
        };

        const cargos = {
            'AIMWARE30D': '1224746230840557670',
            'INIURIA30D': 123123,
            'KERNEL-GC3D': 12312321,
            'KERNEL-GC7D': 12312321312,
            'KERNEL-GC330D': 1232132132,
            'MIDNIGHT30D': 12312312312,
            'NEVERLOSE30D': 12323123,
            'NIXWARE30D': 123123123,
            'ROXPRIVATE3D': 123123,
            'ROXPRIVATE7D': 123123123,
            'ROX-PRIVATE30D': 123123123,
            'XONE30D': 1231231231,
            'NOVACK1D': 123123123,
            'NOVACK7D': 123123123,
            'NOVACK30D': 123123123,
            'NOVACK90D': 1231321,
        };

        const cargoID = cargos[interaction.values[0]]

        const valorDoPagamento = valoresDosPagamentos[interaction.values[0]];

        var infoPix = await require('../pagamento/pix')(valorDoPagamento);

        var base = infoPix.qr;
        var code = infoPix.pix


        const image = Buffer.from(base, "base64");

        const filePath = path.join(__dirname, '..', 'pagamento', `${infoPix.id}.png`);

        fs.writeFileSync(filePath, image);

        const embed = {
            title: 'Informações do Pagamento',
            description: `**Valor do Pagamento: R$ ${valorDoPagamento} \n👤 | Referente a: ${client.user.tag} \nID do Referente: ${client.user.id}** \nAcima esta o QR CODE gerado: \nAs chaves também foram enviadas no ticket, mas elas só ficarão disponíveis por 15 minutos! Portanto, lembre-se de ativar as mensagens privadas para receber as informações diretamente em sua caixa de entrada.`,
            color: 0x00FF00
        };

        newChannel.send({ embeds: [embed], files: [{ attachment: filePath, name: 'QR_CODE.png' }], components: [
            new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('codigo').setLabel('Código copia e cola!').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('delticket').setLabel('Excluir canal!').setStyle(ButtonStyle.Danger)
            )
        ] });

        client.on('interactionCreate', async interaction => {
            if (interaction.customId === 'codigo') {
                interaction.reply(code);
            }
        });

        client.on('interactionCreate', async interaction => {
            if (interaction.customId === 'delticket') {
                newChannel.delete()
            }
        });


        monitorarPagamentoAprovado(interaction, infoPix.id, newChannel, client)
        .then(async () => {
            console.log('Pagamento aprovado caiu aqui');
            const response = await axios.get('http://localhost:3000/keys');
            const keysData = response.data;
            const lastItemKey = interaction.values[0];
            const lastItemIndex = keysData[lastItemKey].length - 1;
            const lastItem = keysData[lastItemKey][lastItemIndex];
            
            const embed2 = {
                title: 'APROVADO!',
                description: `${lastItem} / ${interaction.user} / ${interaction.values[0]}`,
                image: {
                    url: ''
                },
                color: 0x00FF00
            };

            const embed = {
                title: 'APROVADO!',
                description: `Sua key para o produto é! ${lastItem}. Você vai receber o devido cargo para aprender a usar! Verifique os canais de texto.`,
                image: {
                    url: ''
                },
                color: 0x00FF00
            };

            newChannel.send({content: "", embeds: [embed]})
            await interaction.user.send({content: "", embeds: [embed]})
            const channel = client.channels.cache.get(config.logsChannel);

            if (channel) {
                channel.send({content: "", embeds: [embed2]});
            }

            keysData[lastItemKey].splice(lastItemIndex, 1);
            await axios.delete(`http://localhost:3000/remover-ultimo/${lastItemKey}`, keysData);
            console.log(`Valor removido do array associado à chave ${lastItemKey} no JSON de chaves.`);

                                    
                                    

            
            if (cargoID) {
                const cargo = interaction.guild.roles.cache.get(cargoID);
                
                if (cargo) {
                    try {
                        await interaction.member.roles.add(cargo);
                        console.log(`Cargo ${cargo.name} adicionado com sucesso ao usuário ${interaction.user}`);
                    } catch (error) {
                        console.error('❌ | Erro ao adicionar o cargo ao usuário:', error);
                    }
                } else {
                    console.error('❌ | Cargo não encontrado.');
                }
            } else {
                console.error('❌ | ID do cargo não encontrado para a opção selecionada.');
            }
        });
    } catch (error) {
        console.error('❌ | Erro ao processar o ticket:', error);
        interaction.reply({
            content: ":x: | Ocorreu um erro ao processar o ticket.",
            ephemeral: true
        });
    }
}

module.exports = ticketHandler;
