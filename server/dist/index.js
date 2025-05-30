"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//TypeScript follows ES6 Module System so use only import and export
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send("Server working test");
});
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
