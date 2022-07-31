const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');
/**
 * ####################
 * ## Generate Error ##
 * ####################
 */

const generateError = (message, status) => {
    const err = new Error(message);
    err.statusCode = status;
    return err;
};

/**
 * ################
 * ## Save Photo ##
 * ################
 */

const savePhoto = async (photo) => {
    const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIR);

    try {
        await fs.access(uploadsPath);
    } catch {
        await fs.mkdir(uploadsPath);
    }

    const sharpPhoto = sharp(photo.data);

    sharpPhoto.resize(300);

    const photoName = `${uuid()}.jpg`;

    const photoPath = path.join(uploadsPath, photoName);

    await sharpPhoto.toFile(photoPath);

    return photoName;
};

module.exports = {
    generateError,
    savePhoto,
};
