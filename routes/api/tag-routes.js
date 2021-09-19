const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // include its associated Product data
  try {
    // get all tags
    const tagsData = await Tag.findAll({
      include: [{ model: Product }],
    });

    // send to client
    res.status(200).json(tagsData);
  } catch (err) {
    // return error message if query fails
    res.status(500).json(err.message);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    // get all tags
    const tagData = await Tag.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }],
    });

    if (tagData) {
      res.status(200).json(tagData);
    } else {
      res.status(404).json({ message: "Tag not found" });
    }
  } catch (err) {
    // return error message if query fails
    res.status(500).json(err.message);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    // save http body as tag
    const tagData = await Tag.create(req.body);
    // send client saved record
    res.status(201).json(tagData);
  } catch (err) {
    // return error message if query fails
    res.status(500).json(err.message);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const count = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (count > 0) {
      const tagData = await Tag.findOne({ where: { id: req.params.id } });
      res.status(200).json(tagData);
    } else {
      res.status(404).json({ message: "Tag not found" });
    }
  } catch (err) {
    // return error message if query fails
    res.status(500).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const count = await Tag.destroy({ where: { id: req.params.id } });

    if (count > 0) {
      res.status(200).json({ message: "ok" });
    } else {
      res.status(204).json({ message: "Tag not found" });
    }
  } catch (err) {
    // return error message if query fails
    res.status(500).json(err.message);
  }
});

module.exports = router;
