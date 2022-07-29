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

module.exports = {
    generateError,
};
