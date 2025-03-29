const mercadopago = require('mercadopago');
const config = require('../../config.json');

module.exports = async (valor) => {
    try {
        await mercadopago.configure({ access_token: config.acessToken});

        var data = new Date(Date.now() + 60 * 1000 * 60 * 24);
        data.setHours(-3);  


        var dataExp = new Date(Date.now() + 60 * 1000 * 60 * 3);

        const req = {
            transaction_amount: Number(valor),
            description: `Rox recebimentos R$:${valor}`, 
            payment_method_id: 'pix',
            date_of_expiration: dataExp,
            payer: {
                email: 'fuzeto@gmail.com',
                first_name: 'viado',
                last_name: 'gay',
                identification: {
                    type: 'CPF',
                    number: '19119119100'
                },
            }
        };

        var res = await mercadopago.payment.create(req);
        var pix = res.body.point_of_interaction.transaction_data.qr_code;
        var qr = res.body.point_of_interaction.transaction_data.qr_code_base64;
        var id = res.body.id;
        return {
            pix: pix,
            qr: qr,
            id: id
        };
    } catch (error) {
        console.log(error);
    }
};
