const { Command } = require('../../../utils/interfaces/command');
const { CommandResult, Error, EErrorCode } = require('../../../utils/content/dataResult');
const { Payment } = require('../payment');
const { PaymentsDb } = require('../../../mapping');

class CreatePaymentCommand extends Command {
    constructor(
        id,
        name,
        value,
        day
    ){
        super();
        this.id = id;
        this.name = name;
        this.value = value;
        this.day = day;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Parameter id cannot be null");
        
        if (!this.name)
            return new Error(EErrorCode.InvalidParams, "Parameter name cannot be null");

        if (!this.value || typeof this.value !== 'number' || this.value <= 0)
            return new Error(EErrorCode.InvalidParams, "Parameter value is invalid");

        if (!this.day || typeof this.value !== 'number' || this.day <= 0 || this.day > 32)
            return new Error(EErrorCode.InvalidParams, "Parameter day is invalid");

        const existsName = await PaymentsDb.count({ where: { name: this.name, removed: false } });
        if (existsName)
            return new Error(EErrorCode.DuplicateUnique, `Payment with name already exists`);

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const payment = new Payment(
            this.id,
            this.name,
            this.value,
            this.day
        );

        const result = await PaymentsDb.create(payment);
        return new CommandResult(result ? 1 : 0);
    }
}

module.exports = {
    CreatePaymentCommand
}