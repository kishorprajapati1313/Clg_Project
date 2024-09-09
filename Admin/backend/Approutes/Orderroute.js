const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ordermodel = require("../Models/Order");

router.post("/addorder", async (req, res) => {
  const orderData = req.body.orderdata;
  console.log("Order data:" + orderData)
  try {
    if (!orderData.product || !orderData.formdata || !orderData.payment || !orderData.charges || !orderData.totalamount) {
      return res.status(400).json({ error: "Incomplete order data" });
    }

    if (!orderData.product.totalcartitems || orderData.product.totalcartitems.length === 0) {
      return res.status(400).json({ error: "No products in the order" });
    }

    const orders = [];

    for (const product of orderData.product.totalcartitems) {
      const orderItem = {
        orderid: new mongoose.Types.ObjectId(), // Remove 'new' keyword
        product_id: product.productid,
        product_name: product.product_name,
        img1: product.img1,
        qty: product.qty,
        singleprice: product.price,
        withoutcharges: product.withoutcharges,
        withcharges: product.withcharges,
      };

      const order = {
        charges: orderData.charges,
        userid: orderData.product.userid,
        fname: orderData.formdata.fname,
        lname: orderData.formdata.lname,
        email: orderData.formdata.email,
        mobile_no: orderData.formdata.mobile_no,
        country: orderData.formdata.country,
        state: orderData.formdata.state,
        city: orderData.formdata.city,
        street: orderData.formdata.street,
        pincode: orderData.formdata.pincode,
        payment_status: "pending",
        order_status: "Pending",
        payment_type: orderData.payment.payment,
        time: Date.now(),
        orderItems: [orderItem],
      };
      // console.log(order)
      const savedOrder = await ordermodel.create(order);
      // console.log("Saved Order:" + savedOrder)
      orders.push(savedOrder); // Collect orders
    }

    // Send response after all orders are saved
    res.status(200).json({ message: "Place Order Is Done", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/getorder/:userid", async (req, res) => {

  const useridparams = req.params.userid;

  try {
    console.log(useridparams)
    const orderdata = await ordermodel.find({ userid: useridparams })
    console.log(orderdata)
    if (orderdata) {
      res.status(200).json({ message: "Order Successfully", orderdata })
    } else {
      res.status(500).json({ message: "Not Any Order Yet" })

    }

  } catch (error) {
    res.status(500).json({ message: "Internal Error" })
  }
})

router.get("/getAllorders", async (req, res) => {
  try {
    const allorder = await ordermodel.find();

    if (allorder.length > 0) {
      const ordersWithProducts = allorder.filter(order => order.orderItems && order.orderItems.length > 0);

      if (ordersWithProducts.length > 0) {
        res.status(200).json({ message: "All orders retrieved successfully", orders: ordersWithProducts });
      } else {
        res.status(404).json({ message: "No orders with products found" });
      }
    } else {
      res.status(500).json({ message: "No Order Found" })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Error" });
  }
})


router.put("/updateorder/:orderid", async (req, res) => {
  try {
    const orderidparam = req.params.orderid;
    const { payment_status, order_status } = req.body;

    // Find and update the order in the database
    const updatedOrder = await ordermodel.findOneAndUpdate(
      { 'orderItems.0.orderid': orderidparam }, // Assuming orderid is inside the first item of orderItems array
      { $set: { payment_status, order_status } },
      { new: true } // This ensures that the updated document is returned
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
