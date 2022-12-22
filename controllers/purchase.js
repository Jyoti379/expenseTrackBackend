const Razorpay=require('razorpay');
const Order= require('../models/orders')

 exports.purchasepremium= async (req,res)=>{
    try{
      var rzp= new Razorpay({
        key_id: 'rzp_test_LoZtBiTnDZky8b',
        key_secret: 'uBMEz733aJMaZLByDxBnR1gH',
      })
      const amount =2500
      rzp.orders.create({amount,currency:'INR'},(err,order)=>{
        if(err){
            throw new Error(JSON.stringify(err))
        }
        req.user.createOrder({orderid:order.id,status:'PENDING'}).then(()=>{
            return res.status(201).json({order,key_id:rzp.key_id})
        }).catch(err=>{
            throw new Error(err);
        })
      })
    }
    catch(err){
      console.log(err)
      res.status(500).json({message:'something went wrong',error:err})
    }
}

exports.updateTransaction= async (req,res)=>{
    try{
        const {payment_id,order_id} = req.body;
        const order= await Order.findOne({where:{orderid:order_id}})
        const promise1= order.update({paymentid:payment_id,status:"successful"})
        const promise2 = req.user.update({isPremium:true})

        Promise.all([promise1,promise2]).then(()=>{
            return res.status(202).json({success:true,message:"Transaction Successful"})

        }).catch(err=>{
            throw new Error(err);
        })

    }catch(err){
      console.log(err);
      res.status(403).json({success:false,message:"Something went wrong"})
    }
}
