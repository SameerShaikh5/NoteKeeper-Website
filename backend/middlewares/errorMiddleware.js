

export const errorMiddleware = (err, req, res, next) => {

    let statusCode = err.statusCode || 500
    let message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        message: err.message
    })
}


export const TryCatch = (handler) => (req, res, next)=> {
    Promise.resolve(handler(req, res, next)).catch(err => next(err))
}