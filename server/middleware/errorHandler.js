function errorHandler(err, req, res, next) {
    console.log(err)

    let statusCode = null
    let errorMessage = null
    let errorCode = null

    switch(err.name){
        case 'TOKEN_ERROR':
            statusCode = 404
            errorCode = err.name
            errorMessage = 'Token not found'
            break
        case 'USER_NOT_FOUND':
            statusCode = 404
            errorCode = err.name
            errorMessage = 'User not found'
            break 

        case 'AUTHENTICATION_FAILED':
            statusCode = 401
            errorCode = err.name
            errorMessage = 'Authentication failed'
            break 

        case 'SequelizeValidationError':
            statusCode = 400
            errorCode = 'VALIDATION_ERROR'
            const validationErrors = []
            err.errors.forEach(element => {
                validationErrors.push(element.message)
            });
            errorMessage = validationErrors
            break 

        default:
            statusCode = 500
            errorMessage = 'internal server error'
            errorCode = 'INTERNAL_SERVER_ERROR'
    }

    res.status(statusCode).json({
        errorCode,
        message: errorMessage
    })

}

module.exports = errorHandler