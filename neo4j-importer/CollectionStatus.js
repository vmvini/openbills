var mongoose = require('mongoose');
var importStatus = new mongoose.Schema({
	collectionName: String
});
mongoose.model('CollectionStatus', importStatus);
