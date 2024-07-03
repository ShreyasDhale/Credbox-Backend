const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    middleName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    avatar: {
        type: Buffer,
    }
}, { timestamps: true });

userSchema.statics.findByCredential = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid Credentials");
    return user;
};

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    return user;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismyprivatekey');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};
userSchema.statics.removeUser = async function (id) {
    const user = await User.findByIdAndDelete(id)
    if (!user) throw new Error('User Not found : 404');
    await Tasks.deleteMany({ owner: id });
    return user;
}

userSchema.statics.encryptPassword = async function (password) {
    return await bcrypt.hash(password, 8);
};

const User = mongoose.model('User', userSchema);

module.exports = User;