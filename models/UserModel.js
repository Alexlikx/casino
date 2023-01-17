import { model, models, mongoose } from 'mongoose';

const userModel = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    currency: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    userBalance: { type: Number },
    role: { type: String }
})

const UserModel = models.Users || model('Users', userModel);

export default UserModel;