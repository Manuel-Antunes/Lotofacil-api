import Sequelize from 'sequelize';
import mongoose from "mongoose";
import User from '../app/models/User'
import Loto from '../app/models/Loto';

import databaseConfig from '../config/database';

const models = [User, Loto];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models
            .map(model => model.init(this.connection));
    }
    mongo() {
        this.mongoConnection = mongoose.connect(process.env.MONGO_DB_HOST, {
            useNewUrlParser: true,
            useFindAndModify: true
        });
    }
}

export default new Database();