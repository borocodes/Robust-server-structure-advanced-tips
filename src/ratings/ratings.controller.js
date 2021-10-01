const ratings = require("../data/ratings-data")

function ratingExists(req, res, next) {
    const { ratingId } = req.params;
    const foundRating = rating[ratingId]

    if(foundRating === undefined) {
        return next({
            status: 404,
            message: `Rating id not found: ${ratingId}`,
        })
    }
    res.locals.rating = foundRating
    next()
}

function list(req, res) {
    const filteredRatings = ratings.filter(
        (rating) => !req.params.noteId || rating.noteId == Number(req.params.noteId)
        );
        res.json({ data: filteredRatings })
}

function read(req, res) {
    res.json({ data: res.locals.rating })
}
    
    module.exports = {
        list,
        read: [ratingExists, read],
        ratingExists,
    }