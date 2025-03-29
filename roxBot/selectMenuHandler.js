const { createGamesMenu } = require('./commands/menus/gamesmenu');
const { createInitialMenu2 } = require('./commands/menus/initialeditmenu');
const { createCsCheatsMenu } = require('./commands/menus/csmenu');
const { createValCheatsMenu } = require('./commands/menus/valorantmenu');
const { midnightMenu } = require('./commands/secondaryMenus/midnight'); 
const { iniuriaMenu } = require('./commands/secondaryMenus/iniuria');
const { xoneMenu } = require('./commands/secondaryMenus/xone');
const { aimwareMenu } = require('./commands/secondaryMenus/aimware');
const { nixwareMenu } = require('./commands/secondaryMenus/nixware');
const { kernelgcMenu } = require('./commands/secondaryMenus/kernelgc');
const { neverloseMenu } = require('./commands/secondaryMenus/neverlose');
const { novackMenu } = require('./commands/secondaryMenus/novack');
const { roxprivateMenu } = require('./commands/secondaryMenus/rox-private');

async function handleInteraction(interaction) {
    if (interaction.customId === 'choose' && interaction.values[0] === 'Cheats') {
        await createGamesMenu(interaction);
    }

    if (interaction.customId === 'games') {
        if (interaction.values[0] === 'Valorant') {
            await createValCheatsMenu(interaction);
        } else if (interaction.values[0] === 'Cs2') {
            await createCsCheatsMenu(interaction);
        } else if (interaction.values[0] === 'Voltar') {
            await createInitialMenu2(interaction);
        }
    }

    if (interaction.customId === 'valcheats' && interaction.values[0] === 'Voltar') {
        await createGamesMenu(interaction);
    }

    if (interaction.customId === 'cs2cheats' && interaction.values[0] === 'Voltar') {
        await createGamesMenu(interaction);
    }

    //

    if (interaction.customId === 'cs2cheats' && interaction.values[0] === 'MIDNIGHT') {
        await midnightMenu(interaction);
    }

    if (interaction.customId === 'midnight' && interaction.values[0] === 'Voltar') {
        await createCsCheatsMenu(interaction);
    }

    if(interaction.customId === 'cs2cheats' && interaction.values[0] === "NEVERLOSE") {
        await neverloseMenu(interaction)
    }

    if (interaction.customId === 'neverlose' && interaction.values[0] === 'Voltar') {
        await createCsCheatsMenu(interaction);
    }

    if(interaction.customId === 'cs2cheats' && interaction.values[0] === "INIURIA") {
        await iniuriaMenu(interaction)
    }

    if (interaction.customId === 'iniuria' && interaction.values[0] === 'Voltar') {
        await createCsCheatsMenu(interaction);
    }

    if(interaction.customId === 'cs2cheats' && interaction.values[0] === "AIMWARE") {
        await aimwareMenu(interaction)
    }

    if (interaction.customId === 'aimware' && interaction.values[0] === 'Voltar') {
        await createCsCheatsMenu(interaction);
    }

    if(interaction.customId === 'cs2cheats' && interaction.values[0] === "KERNEL-GC") {
        await kernelgcMenu(interaction)
    }

    if (interaction.customId === 'kernelgc' && interaction.values[0] === 'Voltar') {
        await createCsCheatsMenu(interaction);
    }

    if(interaction.customId === 'cs2cheats' && interaction.values[0] === "XONE") {
        await xoneMenu(interaction)
    }

    if (interaction.customId === 'xone' && interaction.values[0] === 'Voltar') {
        await createCsCheatsMenu(interaction);
    }

    if(interaction.customId === 'cs2cheats' && interaction.values[0] === "NIX-WARE") {
        await nixwareMenu(interaction)
    }

    if (interaction.customId === 'nixware' && interaction.values[0] === 'Voltar') {
        await createCsCheatsMenu(interaction);
    }

        //

        if(interaction.customId === 'valcheats' && interaction.values[0] === "NOVACK") {
            await novackMenu(interaction)
        }
    
        if (interaction.customId === 'novack' && interaction.values[0] === 'Voltar') {
            await createValCheatsMenu(interaction);
        }

        if(interaction.customId === 'valcheats' && interaction.values[0] === "ROX-PRIVATE") {
            await roxprivateMenu(interaction)
        }
    
        if (interaction.customId === 'rox-private' && interaction.values[0] === 'Voltar') {
            await createValCheatsMenu(interaction);
        }
        

}

module.exports = { handleInteraction };