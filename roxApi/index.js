const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post('/adicionar-item/:keyName', (req, res) => {
    const keyName = req.params.keyName;
    const keyValue = req.body.value;

    try {
        let keysData = JSON.parse(fs.readFileSync('keys.json', 'utf8'));

        if (keysData.hasOwnProperty(keyName)) {
            keysData[keyName].push(keyValue);
        } else {
            keysData[keyName] = [keyValue];
        }

        fs.writeFileSync('keys.json', JSON.stringify(keysData, null, 2));
        res.status(200).send('Item added successfully!');
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).send('Error adding item');
    }
});

app.delete('/remover-item/:keyName/:keyValue', (req, res) => {
    const keyName = req.params.keyName;
    const keyValue = req.params.keyValue;

    try {
        let keysData = JSON.parse(fs.readFileSync('keys.json', 'utf8'));

        if (keysData.hasOwnProperty(keyName) && Array.isArray(keysData[keyName])) {
            const index = keysData[keyName].indexOf(keyValue);
            if (index !== -1) {
                keysData[keyName].splice(index, 1);
                fs.writeFileSync('keys.json', JSON.stringify(keysData, null, 2));
                res.status(200).send('Item removed successfully!');
            } else {
                res.status(404).send('Item not found!');
            }
        } else {
            res.status(404).send('Item not found!');
        }
    } catch (error) {
        console.error('Error removing item:', error);
        res.status(500).send('Error removing item');
    }
});

app.get('/keys', (req, res) => {
    try {
        let keysData = fs.readFileSync('keys.json', 'utf8');
        let keysJson = JSON.parse(keysData);
        res.status(200).json(keysJson);
    } catch (error) {
        console.error('Error reading keys file:', error);
        res.status(500).send('Error reading keys file');
    }
});

app.delete('/remover-ultimo/:nomeItem', (req, res) => {
    const nomeItem = req.params.nomeItem;

    try {
        let keysData = JSON.parse(fs.readFileSync('keys.json', 'utf8'));

        if (keysData.hasOwnProperty(nomeItem) && Array.isArray(keysData[nomeItem]) && keysData[nomeItem].length > 0) {
            keysData[nomeItem].pop();

            fs.writeFileSync('keys.json', JSON.stringify(keysData, null, 2));
            console.log(`Último item removido com sucesso do item '${nomeItem}'.`);
            res.status(200).send('Último item removido com sucesso!');
        } else {
            console.error(`O item '${nomeItem}' não existe ou está vazio.`);
            res.status(404).send(`O item '${nomeItem}' não existe ou está vazio.`);
        }
    } catch (error) {
        console.error('Error removing last item:', error);
        res.status(500).send('Error removing last item');
    }
});

app.get('/ultimo-item/:nomeItem', (req, res) => {
    const nomeItem = req.params.nomeItem;

    try {
        let keysData = JSON.parse(fs.readFileSync('keys.json', 'utf8'));

        if (keysData.hasOwnProperty(nomeItem) && Array.isArray(keysData[nomeItem]) && keysData[nomeItem].length > 0) {
            const ultimoItem = keysData[nomeItem][keysData[nomeItem].length - 1];
            console.log(`O último item de '${nomeItem}' é: ${ultimoItem}`);
            res.status(200).json({ ultimoItem });
        } else {
            console.error(`O item '${nomeItem}' não existe ou está vazio.`);
            res.status(404).send(`O item '${nomeItem}' não existe ou está vazio.`);
        }
    } catch (error) {
        console.error('Error getting last item:', error);
        res.status(500).send('Error getting last item');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
