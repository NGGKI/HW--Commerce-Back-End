const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../models");

// The `/api/tags` endpoint

router.get("/tags", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    let tags = await Tag.findAll({ include: [{ model: Product }] });
    res.json(tags);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again.", error: err });
  }
});

router.get("/tags/:id", async ({ body, params: { id } }, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    let tag = await Tag.findOne({
      where: { id },
      include: [{ model: Product }],
    });

    res.json(tag);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again.", error: err });
  }
});

router.post("/tags", async (req, res) => {
  // create a new tag
  try {
    const data = req.body;
    const tag = await Tag.create(data);
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/tags/:id", async ({ body, params: { id } }, res) => {
  // update a tag's name by its `id` value
  try {
    let tag = await Tag.findOne({ where: { id } });

    if (!tag) {
      res.status(404).json({ message: "No user with this id." });
      return;
    }
    await Tag.update({ ...body }, { where: { id } });
    res.status(200).json({ message: "Successfuly updated!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again.", error: err });
  }
});

router.delete("/tags/:id", async ({ body, params: { id } }, res) => {
  // delete on tag by its `id` value
  try {
    let tag = await Tag.findOne({ where: { id } });

    if (!tag) {
      res.status(404).json({ message: "No user with this id." });
      return;
    }
    await Tag.destroy({ where: { id } });
    res.status(200).json({ message: "Catergory deleted!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again.", error: err });
  }
});

module.exports = router;
