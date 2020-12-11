"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var compression_1 = __importDefault(require("compression"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
var app = express_1.default();
var clientBuildPath = path_1.default.join(__dirname, process.env.CLIENT_BUILD_PATH);
// Middlewares
app.use(express_1.default.static(clientBuildPath));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(helmet_1.default({
    contentSecurityPolicy: false,
}));
app.use(compression_1.default());
// @ts-ignore
app.use(cors_1.default());
// Catch all for deploy
app.get('/*', function (_req, res) {
    res.sendFile(clientBuildPath + '/index.html', function (err) {
        if (err)
            res.status(500).send(err);
    });
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening on port " + port + ".");
});
