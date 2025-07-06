// middleware/asyncHandler
//todo change name to something with more direct meaning to me.

const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler