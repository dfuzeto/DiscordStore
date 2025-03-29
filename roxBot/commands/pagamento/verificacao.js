const { Message } = require('discord.js');
const axios = require('axios');
const config = require('../../config.json');

async function monitorarPagamentoAprovado(interaction, id, newChannel, replyMessag, client) {
    return new Promise((resolve, reject) => {
        var time = setInterval(async () => {
            try {
                var res = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
                    headers: {
                        Authorization: `Bearer ${config.acessToken}`
                    }
                });

                if (res.data.status == 'approved') {
                    clearInterval(time);
                    if (!newChannel || !newChannel.messages) {
                        reject('Canal ou mensagens não disponíveis');
                        return;
                    }

                    newChannel.messages.fetch().then(messages => {
                        newChannel.bulkDelete(messages);
                    }).catch(error => {
                        console.error('❌ | Erro ao excluir mensagens do canal:', error);
                    });

                    newChannel.send('```✅```')
                        .then(async message => {
                            if (message instanceof Message) {
                                console.log('✅ | PAGAMENTO APROVADO!');
                                try {
                                    const response = await axios.get('http://localhost:3000/keys');
                                    const keysData = response.data;

                                    const lastItemKey = interaction.values[0];
                                    if (!lastItemKey || !keysData.hasOwnProperty(lastItemKey) || !Array.isArray(keysData[lastItemKey])) {
                                        console.error('❌ | Chave inválida ou ausente no JSON de chaves.');
                                        reject('Chave inválida ou ausente');
                                        return;
                                    }

                                    const lastItemIndex = keysData[lastItemKey].length - 1;
                                    const lastItem = keysData[lastItemKey][lastItemIndex];


                                    try {
                                        const user = interaction.user;
                                        await user.send(`Sua key para o produto é! ${lastItem}. Você vai receber o devido cargo para aprender a usar! Verifique os canais de texto.`);
                                        console.log(`Mensagem com a chave enviada para ${user.tag} em seu privado.`);
                                    } catch (error) {
                                        console.error(`❌ | Erro ao enviar mensagem privada para ${user.tag}:`, error);
                                    }


                                    resolve('Pagamento aprovado');
                                } catch (error) {
                                    console.error('❌ | Erro ao processar o pagamento:', error);
                                    reject('Erro ao processar o pagamento');
                                }
                            } else {
                                console.log('❌ | Erro ao enviar mensagem de pagamento aprovado');
                                reject('Erro ao enviar mensagem de pagamento aprovado');
                            }
                        })
                        .catch(error => {
                            console.error('❌ | Erro ao enviar mensagem de pagamento aprovado:', error);
                            reject('Erro ao enviar mensagem de pagamento aprovado');
                        });
                } else if (res.data.status == 'cancelled') {
                    clearInterval(time);
                    reject('Pagamento cancelado');
                }
            } catch (error) {
                console.error('❌ | Erro ao processar o pagamento:', error);
                reject('Erro ao processar o pagamento');
            }
        }, 1000 * 3);
    });
}

module.exports = monitorarPagamentoAprovado;
