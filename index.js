const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const Order = require('./model/Order');
const User = require('./model/User');

app.get('/order', async(req, res)=>{
	const newUser = await Order.aggregate([
		{
			$group : {
				_id:'$userId',
		    	totalAmount:  {$avg: "$subtotal" },
           		noOfOrders: { $sum: 1 }
		    }
		},
		{
			$lookup : {
				from : 'users',
				localField : '_id',
				foreignField : 'userId',
				as : 'usersdetail'
			}
		},
	])
	const orderDetail = [];
	if(newUser.length>0) {
		newUser.forEach((rows)=>{
			orderDetail.push({
				'userId': rows._id,
				'name': rows.usersdetail[0].name,
				'noOfOrders': rows.noOfOrders,
				'averageBillValue': rows.totalAmount
			});
		});
		res.status(200).send(orderDetail);
	}
	else
		res.status(200).send({message : 'record not found'});
});	
app.post('/user/update', async(req, res)=>{
	if(req.body.userId === undefined)
		res.status(200).send({message : 'user id should be required'});
	let order = 0;
	if(req.body.noOfOrders !== undefined)
		order = req.body.noOfOrders;

	const userId =  parseInt(req.body.userId);
	const record = await User.updateOne({userId : userId}, {$set : {noOfOrders:order}});
	if(record.nModified>0)
		res.status(200).send({success:true, message : 'Successfully Updated'});
	else
		res.status(200).send({message : 'Record not Updated'});
});	
app.listen(8080, "localhost");