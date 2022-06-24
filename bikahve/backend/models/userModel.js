import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    password: { type: String, required: true },
    rol: {
        type: String,
        default:"1"
    }
});
const User = mongoose.model('User', userSchema);
export default User;
