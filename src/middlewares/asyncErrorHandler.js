module.exports.asyncErrorHandler = (asyncFunction) => (req, res, next) => {
    return Promise.resolve(asyncFunction(req, res, next)).catch((e) => next(e))
}