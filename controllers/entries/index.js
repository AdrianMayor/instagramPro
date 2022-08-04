const getSingleEntry = require('./getSingleEntry');
const insertCommentToEntry = require('./insertCommentToEntry');
const likeEntry = require('./likeEntry');
const listEntries = require('./listEntries');
const newEntry = require('./newEntry');
const viewEntryComments = require('./viewEntryComments');
const getOwnPhotos = require('./getOwnPhotos');

module.exports = {
    newEntry,
    insertCommentToEntry,
    likeEntry,
    listEntries,
    viewEntryComments,
    getSingleEntry,
    getOwnPhotos,
};
