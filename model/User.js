const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true,useUnifiedTopology: true });
const userSchema = new mongoose.Schema({
	userId:{
		type:Number,
		index:{unique:true}
	},
	name:{
		type:String
	},
	noOfOrders:{
		type:Number,
		default:0
	}
});
module.exports = mongoose.model('user', userSchema);
