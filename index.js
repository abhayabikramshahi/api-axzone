const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Resolve the path to data.json
const dataPath = path.join(__dirname, "data", "data.json");

// Read data.json safely
let products = [];
try {
  const data = fs.readFileSync(dataPath, "utf-8");
  products = JSON.parse(data);
} catch (err) {
  console.error("Error reading data.json:", err);
}

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Get product by ID
app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
