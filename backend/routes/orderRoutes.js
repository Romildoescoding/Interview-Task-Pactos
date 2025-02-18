import express from "express";
import { ordersTable } from "../airtable.js";

const router = express.Router();

// Place a new order
router.post("/", async (req, res) => {
  try {
    const { ProductId, BuyerName, BuyerEmail, Quantity } = req.body;
    const newOrder = await ordersTable.create({
      ProductId,
      BuyerName,
      BuyerEmail,
      Quantity: Number.parseInt(Quantity),
      Status: "Pending",
    });
    res.status(201).json({ id: newOrder.id, ...newOrder.fields });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
});

// Get all orders for a user
router.get("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const records = await ordersTable
      .select({
        filterByFormula: `{BuyerEmail} = '${email}'`,
      })
      .all();
    const orders = records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

export default router;
