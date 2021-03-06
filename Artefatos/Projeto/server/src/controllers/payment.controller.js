const { CommandHandle } = require('..//utils/handle/commandHandle');
const { CreatePaymentCommand } = require('../models/payments/commands/createPaymentCommand');
const { UpdatePaymentCommand } = require('../models/payments/commands/updatePaymentCommand');
const { RemovePaymentCommand } = require('../models/payments/commands/removePaymentCommand');

const { QueryHandle } = require('../utils/handle/queryHandle');
const { GetPaymentQuery } = require('../models/payments/queries/getPaymentQuery');
const { ListPaymentQuery } = require('../models/payments/queries/listPaymentQuery');

const { Obj } = require('../utils/content/dataResult');

const controllerPayment = { };

controllerPayment.getAll = async (req, res) => {
    const query = Obj.getData(new ListPaymentQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result);
}

controllerPayment.getById = async (req, res) => {
    const query = Obj.getData(new GetPaymentQuery(), req);
    const result = await QueryHandle.Execute(query);
    res.json(result); 
}

controllerPayment.create = async (req, res) => {
    const command = Obj.getData(new CreatePaymentCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerPayment.update = async (req, res) => {
    const command = Obj.getData(new UpdatePaymentCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

controllerPayment.remove = async (req, res) => {
    const command = Obj.getData(new RemovePaymentCommand(), req);
    const result = await CommandHandle.Execute(command);
    res.json(result);
}

module.exports = {
    ControllerPayment: controllerPayment
}