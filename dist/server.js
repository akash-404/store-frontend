"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var product_1 = __importDefault(require("./handlers/product"));
var order_1 = __importDefault(require("./handlers/order"));
var user_1 = __importDefault(require("./handlers/user"));
var cart_1 = __importDefault(require("./handlers/cart"));
var app = express_1.default();
var address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
app.use(cors_1.default({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
product_1.default(app);
order_1.default(app);
user_1.default(app);
cart_1.default(app);
app.listen(3000, function () {
    console.log("starting app on: " + address);
});
exports.default = app;
