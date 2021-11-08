const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
  // find all tags
  router.get('/', async (req, res) => {
    try {
      const tagData = await Tag.findAll({
        include: [{model: Product}]
      });
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const taggedProduct = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    console.log(taggedProduct);
    if (!taggedProduct) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(taggedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagPostData = await Tag.create(req.body);
    res.status(200).json(tagPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    console.log(req);
    const tagPutData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      }, 
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!tagPutData[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagPutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagDeleteData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagDeleteData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagDeleteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;