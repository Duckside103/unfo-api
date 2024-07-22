"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const errors_middlewares_1 = require("./middlewares/errors.middlewares");
const answers_routes_1 = __importDefault(require("./routes/answers.routes"));
const files_routes_1 = __importDefault(require("./routes/files.routes"));
const questions_routes_1 = __importDefault(require("./routes/questions.routes"));
const database_services_1 = __importDefault(require("./services/database.services"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/questions', questions_routes_1.default);
app.use('/answers', answers_routes_1.default);
app.use('/files', files_routes_1.default);
database_services_1.default.connect();
app.use(errors_middlewares_1.defaultErrorHandler);
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`);
});
