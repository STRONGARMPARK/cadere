const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

require("../database/database-connect");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not a valid email");
            }
        },
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    netWorth: {
        type: Number,
        required: false,
    },
    zipCode: {
        type: String,
        required: true,
    },
    tokens: [],
    profilePic: {
        type: Buffer,
        required: false,
    },
});

schema.virtual("clothing", {
    ref: "Clothing",
    localField: "_id",
    foreignField: "wearer",
});

//always rehash password whenever it is changed
schema.pre("save", async function (next) {
    if (this.isModified("password")) {
        try {
            const hashed = await bycrypt.hash(this.password, 8);
            this.password = hashed;
        } catch (e) {
            console.log(e);
        }
    }
    next();
});

schema.statics.loginUser = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error("no user with that name");
    }
    const verifiedUser = await bycrypt.compare(password, user.password);
    if (!verifiedUser) {
        throw new Error("wrong email or password");
    }
    return verifiedUser;
};

schema.methods.makeToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, "randomsecret");
    this.tokens.push(token);
    await this.save();
    return token;
};

const User = mongoose.model("User", schema);

module.exports = User;
