const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
 try{
   const categoryData = await Category.findAll({
     include: [{
       model: Product,
     }]
   });
   if(!categoryData) {
     res.status(404).json({message: "Categories cannot be found!"});
   }
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
 }
});

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
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
      res.status(404).json({message:"The category with that id cannot be found!"});
    }
    res.status(200).json(updateCategory);
  } catch (error){
    res.status(500).json(error);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  
});

module.exports = router;
