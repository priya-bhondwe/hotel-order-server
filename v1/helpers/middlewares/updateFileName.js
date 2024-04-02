//function use for middelware call
const updateFileName = (field, path) => {
  //this middleware
  return (req, res, next) => {
    if (req?.file) {
      req.body[field] = `${path}/${req?.file?.filename}`;
    }
    next();
  };
};

module.exports = updateFileName;
