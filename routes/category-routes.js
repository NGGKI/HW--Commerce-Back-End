const router = require('express').Router()
const { Category, Product } = require('../models')

// The `/api/categories` endpoint

router.get('/categories', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    let categories = await Category.findAll({ include: [{ model: Product }] }
    )
    res.json(categories)
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again.', error: err })
  }
})


router.get('/categories/:id', async ({ body, params: { id } }, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    let category = await Category.findOne({ where: { id }, include: [{ model: Product }] }
    )
    res.json(category)
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again.', error: err })
  }
})

router.post('/categories', async (req, res) => {
  // create a new category
  try {
    const data = req.body
    const category = await Category.create(data)
    res.status(200).json(category)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.put('/categories/:id', async ({ body, params: { id } }, res) => {
  // update a category by its `id` value
  try {
    let category = await Category.findOne({ where: { id } })
    
    if (!category) {
      res.status(404).json({ message: 'No user with this id.' })
      return
    }
    await Category.update({ ...body }, { where: { id } })
    res.status(200).json({ message: "Successfuly updated!" })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again.', error: err })
  }
})

router.delete('/categories/:id', async ({ body, params: { id } }, res) => {
  // delete a category by its `id` value
  try {
    let category = await Category.findOne({ where: { id } })
   
    if (!category) {
      res.status(404).json({ message: 'No user with this id.' })
      return
    }
    await Category.destroy({ where: { id } })
    res.status(200).json({ message: "Catergory deleted!" })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again.', error: err })
  }
})

module.exports = router
