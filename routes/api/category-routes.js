const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // include its associated Products
  try {
    const catData = await Category.findAll({ include: { model: Product } });
    res.status(200).json(catData);
  } catch (err) {
    // return error message if query fails
    res.status(500).json(err.message);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // include its associated Products
  try {
    const catData = await Category.findOne({ where: { id: req.params.id } });
    if (catData) {
      res.status(200).json(catData);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (err) {
    // return error message if query fails
    res.status(500).json(err.message);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const catData = await Category.create(req.body);
    res.status(201).json(catData);
  } catch (err) {
    // return error message if query fails
    res.status(500).json(err.message);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const count = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (count > 0) {
      const catData = await Category.findOne({ where: { id: req.params.id } });
      res.status(200).json(catData);
    } else {
      res.status(204).json({ message: "Category not found" });
    }
  } catch (err) {
    // return error message if query fails
    res.status(500).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const count = await Category.destroy({ where: { id: req.params.id } });
    if (count > 0) {
      res.status(200).json({ message: "ok" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (err) {
    // return error message if query fails
    res.status(500).json(err.message);
  }
});

module.exports = router;
