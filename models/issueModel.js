const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://mongo:27017/issuedb_g1');

const issueSchema = new mongoose.Schema({
    name: String,
    adresse: String,
    telefon: String,
    email: String,
    newsletter: Boolean
});

const issueModel = mongoose.model('issues', issueSchema);

module.exports = issueModel;

