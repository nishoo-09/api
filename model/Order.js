const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true,useUnifiedTopology: true });
const orderSchema = new mongoose.Schema({
	orderId:{
		type:Number,
		index:{unique:true}
	},
	userId:{
		type : Number, 
		ref:"users",
		required: true
	},
	subtotal:Number,
	date:String
});
module.exports = mongoose.model('order', orderSchema);