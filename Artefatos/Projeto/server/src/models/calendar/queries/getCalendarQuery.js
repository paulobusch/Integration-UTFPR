const { QueryResult, Error, EErrorCode } = require('../../../utils/content/dataResult');
const { Query } = require('../../../utils/interfaces/query');
const { CalendarDb } = require('../../../mapping');
 
class GetCalendarQuery extends Query {
    constructor(
        id
    ){
        super();
        this.id = id;
    }

    async GetError(){
        if (!this.id)
            return new Error(EErrorCode.InvalidParams, "Parameter id cannot be null");

        const exists = await CalendarDb.count({ where: { id: this.id } });
        if (!exists)
            return new Error(EErrorCode.NotFount, `Calendar with id: ${this.id} does not exists`);

        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = { 
            attributes: ['id','name','description'],
            where: { id: this.id }
        };

        const calendar = await CalendarDb.findOne(query);
        return new QueryResult(1, [calendar]);        
    }
}

module.exports = {
    GetCalendarQuery
}