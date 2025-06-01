"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModel = exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const contentTypes = ['image', 'video', 'article', 'audio', 'document', 'other', 'social'];
const UserSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});
const ContentSchema = new mongoose_1.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.Types.ObjectId, ref: 'tags' }],
    userId: { type: mongoose_1.Types.ObjectId, ref: 'users', required: true },
}, { timestamps: true });
const LinkSchema = new mongoose_1.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.Types.ObjectId, ref: "users", required: true },
});
const TagSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
});
exports.UserModel = (0, mongoose_1.model)("users", UserSchema);
exports.ContentModel = (0, mongoose_1.model)('content', ContentSchema);
exports.LinkModel = (0, mongoose_1.model)('links', LinkSchema);
exports.TagModel = (0, mongoose_1.model)('tags', TagSchema);
