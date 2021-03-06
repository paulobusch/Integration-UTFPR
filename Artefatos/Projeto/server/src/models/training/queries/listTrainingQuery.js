const { Query } = require('../../../utils/interfaces/query');
const { TrainingDb} = require('../../../mapping');
const { QueryResult } = require('../../../utils/content/dataResult');

const Op = require('sequelize');

class ListTrainingQuery extends Query{
    constructor(
        search,
        page,
        limit,
        name,
        sortAsc,
        columnSort,
        id_athlete
    ){
        super();
        this.search = search;
        this.page = page;
        this.limit = limit;
        this.name = name;
        this.sortAsc = sortAsc;
        this.columnSort = columnSort;
        this.id_athlete = id_athlete;
    }

    async GetError(){
        if (this.page && this.page <= 0)
            return new Error(EErrorCode.InvalidPararms, "Paramter page require positive");

        if (this.limit && this.limi <= 0 && this.limit > 100)
            return new Error(EErrorCode.InvalidParams, "Paratmer limit require between 1 and 100");
    
        return null;
    }

    async HasPermission(){
        return true;
    }

    async Execute(){
        const query = {
            attributes: ['id', 'name', 'description'], 
            where: { removed: false },
            limit: this.limit,
            offset: (this.page - 1) * this.limit,
            order: [[this.columnSort, this.sortAsc ? 'asc' : 'desc']]
            // include: [{
            //     attributes: ['name'],
            //     as: 'atleta',
            //     model: UserDb
            // }]
        };

        
         if (this.id_athlete){
             query.where = [{removed: false, id_athlete: this.id_athlete}]
        }

        if (this.search){
            const searchLike = `%${this.search}%`;
            query.where[Op.or] = [
                { name: { [Op.like]: searchLike } },
                { description: { [Op.like]: searchLike } }
            ];
        }



        const training = await TrainingDb.findAndCountAll(query);
        return new QueryResult(training.count, training.rows);
    }
}

module.exports = {
    ListTrainingQuery
}
