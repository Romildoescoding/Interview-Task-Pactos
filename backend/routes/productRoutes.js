import express from "express";
import { productsTable } from "../airtable.js";

const router = express.Router();

// All products
router.get("/", async (req, res) => {
  console.log("Get products");
  try {
    const records = await productsTable.select().all();
    const products = records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
    console.log(products);
    res.json(products);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

//Particular Product with params id :D
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching product with ID: ${id}`);

  try {
    const record = await productsTable.find(id);
    if (!record) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = { id: record.id, ...record.fields };
    console.log("Product found:", product);

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
});

// User specific orders so that i can list them in the Listed Products
router.get("/user/:email", async (req, res) => {
  const { email } = req.params;
  console.log(`Fetching products for user: ${email}`);

  try {
    const records = await productsTable
      .select({
        filterByFormula: `UploaderEmail="${email}"`,
      })
      .all();

    const userProducts = records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));

    console.log("User products:", userProducts);
    res.json(userProducts);
  } catch (error) {
    console.error("Error fetching user products:", error);
    res
      .status(500)
      .json({ message: "Error fetching user products", error: error.message });
  }
});

// Add new product page one...
router.post("/", async (req, res) => {
  try {
    const { Name, Description, Price, ImageUrl, UploaderEmail } = req.body;
    const newProduct = await productsTable.create({
      Name,
      Description,
      Price: Number.parseFloat(Price),
      ImageUrl,
      UploaderEmail,
    });
    res.status(201).json({ id: newProduct.id, ...newProduct.fields });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
});

// Edit product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Description, Price, ImageUrl } = req.body;
    const updatedProduct = await productsTable.update(id, {
      Name,
      Description,
      Price: Number.parseFloat(Price),
      ImageUrl,
    });
    res.json({ id: updatedProduct.id, ...updatedProduct.fields });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
});

// Delete that product :)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await productsTable.destroy(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
});

export default router;
