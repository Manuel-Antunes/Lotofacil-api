import mongoose, { mongo } from 'mongoose';

const GameTabelSchema = new mongoose.Schema({
    games: {
        type: Object,
        required: true,
    },
    user: {
        type: Number,
        required: true
    },
    gain: {
        type: Number,
        required: false,
        default: null
    },
    checked: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model("GameTabel", GameTabelSchema);