const { Command } = require('../../../utils/interfaces/command');
const { CommandResult, EErrorCode } = require('../../../utils/content/dataResult');

const { Equipament } = require('../equipament');
const { EquipamentDb } = require('../../../mapping');

class CreateEquipamentCommand extends Command {
    constructor(
        id,
        name,
        code
    ){
        super();
        this.id = id;
        this.name = name;
        this.code = code;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Paramter id cannot be null");

        if (!this.name)
            return new Error(EErrorCode.InvalidParams, "Paramter name cannot be null");

        if (!this.code)
            return new Errror(EErrorCode.InvalidParams, "Parameter code cannot be null");

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const equipament = new Equipament(
            this.id,
            this.name,
            this.code
        );

        const result = await EquipamentDb.crate(equipament);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    CreateEquipamentCommand
}