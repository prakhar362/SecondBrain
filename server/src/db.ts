import {model,Schema,Types} from 'mongoose'
import { object } from 'zod'


const contentTypes = ['image', 'video','article', 'audio', 'document','other','social']

const UserSchema=new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
    })

const ContentSchema=new Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags : [{ type: Types.ObjectId, ref: 'tags' }],
    userId : { type : Types.ObjectId, ref: 'users', required: true },
},{ timestamps: true }
)

const LinkSchema=new Schema({
   hash: { type: String, required: true },
   contentId: { type: Types.ObjectId, ref: "Content", required: true },
  userId: { type: Types.ObjectId, ref: "users", required: true },
    })


const TagSchema=new Schema({
     title: { type: String, required: true, unique: true },
    })

export const UserModel=model("users",UserSchema)
export const ContentModel = model('content', ContentSchema);
export const LinkModel = model('links', LinkSchema);
export const TagModel = model('tags', TagSchema);