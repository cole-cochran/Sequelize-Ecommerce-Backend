const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
 try{
   const categoryData = await Category.findAll({
     include: [{
       model: Product,
     }]
   });
   if(!categoryData) {
     res.status(404).json({message: "No categories found!"});
   }
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
 }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: [{ model: Product, }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update({
      id: req.params.id,
      category_name: req.body.category_name
    },{
      where: {
        id: req.params.id,
      }
    });
    if(!updateCategory[0]){
      res.status(404).json({message:"No category found with this id!"});
    }
    res.status(200).json(updateCategory);
  } catch (error){
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deleteCategory = await Category.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    if(!deleteCategory) {
      res.status(404).json({message: "No category found with this id!"});
    }
    res.status(200).json(deleteCategory);
  }catch{
    res.status(500).json(error);
  }
});


module.exports = router;
