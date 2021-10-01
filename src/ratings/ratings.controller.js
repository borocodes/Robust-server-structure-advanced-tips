const ratings = require("../data/ratings-data");

function ratingExists(req, res, next) {
  const ratingId = Number(req.params.ratingId);
  const foundRating = ratings.find((rating) => rating.id === ratingId);
  if (foundRating) {
    res.locals.rating = foundRating;
    return next();
  }
  next({
    status: 404,
    message: `Rating with ID ${req.params.ratingId} does not exist`,
  });
}

function list(req, res) {
  const noteId = Number(req.params.noteId);
  const ratingId = Number(req.params.ratingId);
  let byResult;
  if (noteId) {
    byResult = (rating) => rating.noteId === noteId;
  } else if (ratingId) {
    byResult = (rating) => rating.id === ratingId;
  } else {
    byResult = () => true;
  }
  res.json({ data: ratings.filter(byResult) });
}

function read(req, res) {
  res.json({ data: res.locals.rating });
}

module.exports = {
  list,
  read: [ratingExists, read],
  ratingExists,
};
