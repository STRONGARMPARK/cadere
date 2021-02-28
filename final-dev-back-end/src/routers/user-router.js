const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const authentication = require("../middleware/token-authentication");
const weather = require("../weather/complete-weather");
const mail = require("@sendgrid/mail");
const multer = require("multer");
const sharp = require("sharp");

const multerOptions = multer({
    limits: {
        fileSzie: 2000000,
    },
    fileFilter(req, file, callback) {
        callback(undefined, true);
    },
});

const mailAPI =
    "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";

mail.setApiKey(mailAPI);

/*This will set a profile picture for a user which can afterwards be accessed through the profilePic field on the 
user object. Notice you don't have to pass a token to this as long as they are authenticated and you send the 
bearer token with the right heading*/
router.post(
    "/users/profilepic",
    authentication,
    multerOptions.single("profilepic"),
    async (req, res) => {
        try {
            const realBuffer = await sharp(req.file.buffer)
                .resize({ width: 300, height: 300 })
                .png()
                .toBuffer();
            const user = req.user;
            user.profilePic = realBuffer;
            await user.save();
            res.status(200).send();
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    (e, req, res, next) => {
        res.status(500).send({ error: e.message });
    }
);

/*This will retrieve the profile picture for the user with the given id, notice how you have to specify
the id*/
router.get(
    "/users/:id/profilepic",
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                throw new Error("invalid id no user with that id");
            }
            if (!user.profilePic) {
                throw new Error("this user does not have a profilpic");
            }
            res.set("Content-Type", "image/png");
            res.status(200).send(user.profilePic);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    (e, req, res, next) => {
        res.status(500).send({ error: e.message });
    }
);

/*Create new user, req body will have to include name, username, email, password,
net worth, and zipCode, the only ones that are required are name, username, email, password
and zipCode. The password will be hashed and stored and the email and username
have ot be unique. Also, when the user is registered, it will send an email to them 
welcoming them to the app, there is nothing fancy in this email right now but 
we can change that later*/
router.post(
    "/users/register",
    async (req, res) => {
        try {
            const user = new User(req.body);
            await user.save();
            const token = await user.makeToken();
            console.log(user.email);
            await mail.send({
                to: user.email,
                from: "goarmstrongpark.ap@gmail.com",
                subject: `Welcome ${user.name} to Cloth Both`,
                text: "Welcome to Cloth Both!",
            });
            res.status(200).send({ token, user });
        } catch (e) {
            res.status(500).status(500).send({ error: e.message });
        }
    },
    (e, req, res, next) => {
        res.status(500).send({ error: e.message });
    }
);

/*This will update anything you specify in the body, notice that you again dont have to pass an id 
authentication will take care of this for you*/
router.patch(
    "/users",
    authentication,
    async (req, res) => {
        try {
            const user = req.user;
            const updates = req.body;
            const update_list = Object.keys(req.body);
            update_list.forEach((update) => {
                user[update] = updates[update];
            });
            await user.save();
            res.status(200).send(user);
        } catch (e) {
            res.status(500).status(500).send({ error: e.message });
        }
    },
    (e, req, res, next) => {
        res.status(500).send({ error: e.message });
    }
);

/*This will delete a user who is currently logged in. In order to delete that PARITCULAR user 
you just have to pass the right bearer token with the right heading*/
router.delete(
    "/users",
    authentication,
    async (req, res) => {
        try {
            const deletedUser = await User.findOneAndDelete({
                _id: req.user._id,
            });
            res.status(200).send(deletedUser);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    (e, req, res, next) => {
        res.status(500).send({ error: e.message });
    }
);

/*This simply logs out the current user. Again, we just need to send the token authentication correctly
and the back-end will do the rest.*/
router.post(
    "/users/logout",
    authentication,
    async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token !== req.token;
            });
            await req.user.save();
            res.status(200).send(`${req.user.name} is logged out`);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    (e, req, res, next) => {
        res.status(500).send({ error: e.message });
    }
);

/*This logs in the user, it will provide readable errors if they provided incorrect email or password. This is actually one 
of the most (probably) comlicated or most feature involved routers so this will be the longest explanation. When the
user logs in, it will autmatically find the user by their username, and also find the weather at that current time for the user.
Afterwards, it will calculate the average of the feelslike temperature and the actual temperature, for the user with the 
current zipcode (part of the user object) and it will send back all of the THAT USERS specific clothes that are CLEAN and 
are within 20 degrees (farenheit) of the actual temperature there. Basically giving them reccomended clothes for the day.
Along with this, it will also send back the forecast itself, the username, email, and token, of the user so that the front end
can use this.*/
router.get(
    "/users/login",
    async (req, res) => {
        try {
            await User.loginUser(req.body.username, req.body.password);
            const user = await User.findOne({ username: req.body.username });
            const token = await user.makeToken();
            const forecast = await weather(user.zipCode);
            const realWeather = (forecast.feelslike + forecast.temperature) / 2;
            let match = {
                temp: { $gte: realWeather - 20, $lte: realWeather + 20 },
                clean: true,
            };
            await user
                .populate({
                    path: "clothing",
                    match,
                })
                .execPopulate();
            res.status(200).send({
                username: user.username,
                email: user.email,
                token,
                forecast,
                reccomended: user.clothing,
            });
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    (e, req, res, next) => {
        res.status(500).send({ error: e.message });
    }
);

/*This just gives back the users profile with everything included*/
router.get(
    "/users",
    authentication,
    (req, res) => {
        try {
            res.status(200).send(req.user);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    (e, req, res, next) => {
        res.status(500).send({ error: e.message });
    }
);

/*This changes the profile picture of the user to what you want, again notice that you have to provide 
not the id but the form-data with 'profilepic' as the key for the file. Also, any image file should work 
because I convert and crop behind the scenes toa 300x300 size png image.*/
router.patch(
    "/users/changeprofilepic",
    authentication,
    multerOptions.single("profilepic"),
    async (req, res) => {
        try {
            if (req.user.profilePic) {
                const realBuffer = await sharp(req.file.buffer)
                    .resize({ width: 300, height: 300 })
                    .png()
                    .toBuffer();
                const user = req.user;
                user.profilePic = realBuffer;
                await user.save();
                res.status(200).send("updated profile pic");
            }
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    (e, req, res, next) => {
        res.status(500).send({ error: e.message });
    }
);

module.exports = router;
