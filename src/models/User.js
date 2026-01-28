import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    streaks: {
        pitch: {type: Number, default: 0},
        interval: {type: Number, default: 0},
        chord: {type: Number, default: 0}
    }
});

const User = mongoose.model('User', UserSchema);

export default User;