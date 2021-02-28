const express = require("express");
const router = new express.Router();
const authentication = require("../middleware/token-authentication");
const Clothing = require("../models/clothing");
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

/*Get users clothes can put in localhost:3000?clean=true or false to get clean or not clean clothes*/
router.get(
    "/clothing",
    authentication,
    async (req, res) => {
        try {
            let match = {};
            if (req.query.clean) {
                match["clean"] = req.query.clean === "true";
            }
            await req.user
                .populate({
                    path: "clothing",
                    match,
                })
                .execPopulate();
            res.status(200).send(req.user.clothing);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    (e, req, res, next) => {
        res.status(500).send({ error: e.message });
    }
);

/*Adds a picture to the clothes, the picture field on the clothes object is not required, so nothing is filled automatically
with the form data, you need to have the key of "picture" and then input the picture, it also can't be more than 2 mb in size
you also need to add id for the clothing in the url after the word clothing to add a picture to that particular piece of clothing */
router.post(
    "/clothing/:id",
    authentication,
    multerOptions.single("picture"),
    async (req, res) => {
        try {
            const realBuffer = await sharp(req.file.buffer)
                .resize({ width: 300, height: 300 })
                .png()
                .toBuffer();
            const clothing = await Clothing.findById(req.params.id);
            clothing.picture = realBuffer;
            await clothing.save();
            res.status(200).send("added clothing picture");
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    (e, req, res, next) => {
        res.status(500).send({ error: e.message });
    }
);

/*This will retrieve the picture for that piece of clothing, you do have to pass in the id for that piece of clothing*/
router.get(
    "/clothing/:id/picture",
    async (req, res) => {
        try {
            const clothing = await Clothing.findById(req.params.id);
            if (!clothing) {
                throw new Error("invalid id no piece of clothing with that id");
            }
            if (!clothing.picture) {
                throw new Error(
                    "this piece of clothing does not have a picture"
                );
            }
            res.set("Content-Type", "image/png");
            res.status(200).send(clothing.picture);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    (e, req, res, next) => {
        res.status(500).send({ error: e.message });
    }
);

/*This will add new clothing to database and as long as you pass in the right user token, this will 
automatically go under that user's clothing collection*/
router.post(
    "/clothing",
    authentication,
    async (req, res) => {
        try {
            const clothing = new Clothing({
                ...req.body,
                wearer: req.user._id,
            });
            await clothing.save();
            res.status(200).send(clothing);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    (e, req, res, next) => {
        res.status(500).send({ error: e.message });
    }
);

//Updates clothing with given id provided in req query parameters
router.patch(
    "/clothing",
    authentication,
    async (req, res) => {
        try {
            const oldClothing = await Clothing.findById(req.query.id);
            const updates = Object.keys(req.body);
            updates.forEach((update) => {
                oldClothing[update] = req.body[update];
            });
            const newClothing = await oldClothing.save();
            res.status(200).send(newClothing);
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    (e, req, res, next) => {
        res.status(500).send({ error: e.message });
    }
);

/*Deletes clothing with given id*/
router.delete(
    "/clothing",
    authentication,
    async (req, res) => {
        try {
            const clothing = await Clothing.findById(req.query.id);
            await clothing.remove();
            res.status(200).send("clothing removed");
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    },
    (e, req, res, next) => {
        res.status(500).send({ error: e.message });
    }
);

/*Updates the picture for a certain piece of clothing, notice how you also have to input the id of the piece of clothing you are trying to change
the stuff with the form data stays the same in that you have to use the key 'picture' to get this to set right. Also, it automatically 
crops it to a 300x300 photo with a type of png no matter what image type is brought in.*/
router.patch(
    "/clothing/:id/changepicture",
    authentication,
    multerOptions.single("picture"),
    async (req, res) => {
        try {
            const clothing = await Clothing.findById(req.params.id);
            if (clothing.picture) {
                const realBuffer = await sharp(req.file.buffer)
                    .resize({ width: 300, height: 300 })
                    .png()
                    .toBuffer();
                clothing.picture = realBuffer;
                await clothing.save();
                res.status(200).send("updated clothing pic");
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
