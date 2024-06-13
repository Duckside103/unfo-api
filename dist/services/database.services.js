"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cheat.mk3uvwd.mongodb.net/?retryWrites=true&w=majority&appName=cheat`;
class DatabaseService {
    client;
    db;
    constructor() {
        this.client = new mongodb_1.MongoClient(uri);
        this.db = this.client.db(process.env.DB_NAME);
    }
    async connect() {
        try {
            await this.db.command({ ping: 1 });
            console.log('Pinged your deployment. You successfully connected to MongoDB!');
        }
        catch (error) {
            console.log('Can not connect to MongoDB: ', error);
        }
    }
    get questions() {
        return this.db.collection(process.env.DB_QUESTIONS_COLLECTION_NAME);
    }
    get answers() {
        return this.db.collection(process.env.DB_ANSWERS_COLLECTION_NAME);
    }
}
const databaseService = new DatabaseService();
exports.default = databaseService;
