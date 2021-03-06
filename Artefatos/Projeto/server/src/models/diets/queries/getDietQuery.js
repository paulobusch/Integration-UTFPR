const { Query } = require('../../../utils/interfaces/query');
const { Error, QueryResult } = require('../../../utils/content/dataResult');
const { DietTypeDb, DietDb } = require('../../../mapping');
 
 
class GetDietQuery extends Query {
    constructor(
        id
    ){
        super();
        this.id = id;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Parameter id cannot be null");

        const exists = await DietDb.count({ where: { id: this.id, removed:false } });
        if (!exists)
            return new Error(EErrorCode.NotFount, `Diet with id: ${this.id} does not exists`);

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = { 
            attributes: ['id','name','description'],
            where: { id: this.id},
            include: [{
                model: DietTypeDb,
                as: 'type_diet'
            }]
        };

        const diet = await DietDb.findOne(query);
        return new QueryResult(1, [diet]);        
    }
}

module.exports = {
    GetDietQuery
}