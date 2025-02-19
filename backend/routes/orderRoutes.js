import express from "express";
import { ordersTable, productsTable } from "../airtable.js";

const router = express.Router();

// New order
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

// Get orders along with the product detials
router.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email is required" });

    console.log(`Fetching orders for email: ${email}`);

    const records = await ordersTable
      .select({
        filterByFormula: `{BuyerEmail} = '${email}'`,
      })
      .all();

    const orders = await Promise.all(
      records.map(async (record) => {
        const orderData = {
          id: record.id,
          ...record.fields,
        };

        // Debug: Log ProductId
        console.log(`Fetching product with ID: ${orderData.ProductId}`);

        // Fetch product details safely
        try {
          const product = await productsTable.find(orderData.ProductId);
          orderData.Product = product.fields; // Attach product details
        } catch (error) {
          console.warn(`Product not found for ID: ${orderData.ProductId}`);
          orderData.Product = { Name: "Unknown", Price: 0, ImageUrl: "" }; // Default values
        }

        return orderData;
      })
    );

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

export default router;
