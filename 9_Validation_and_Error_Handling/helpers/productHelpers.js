function validateProduct(req, res, next) {
  const errors = [];
  if (!req.body.name) {
    errors.push({ msg: 'Name is required' });
  }
  if (!req.body.description) {
    errors.push({ msg: 'Description is required' });
  }
  if (!req.body.imageUrl) {
    errors.push({ msg: 'Image is required' });
  }
  if (!req.body.difficultyLevel) {
    errors.push({ msg: 'Difficulty Level is required' });
  }
  if (errors.length > 0) {
    res.render('create', { layout: 'main', title: 'Create Cube Page', errors });
  } else {
    next();
  }
}

module.exports = validateProduct;
