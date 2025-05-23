
//can create a seperate file for this errorConstants and import it here
const errorConstants = [{
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
}]

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case errorConstants.VALIDATION_ERROR:
            res.json ({
                title: "Validation Failed" ,
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case errorConstants.UNAUTHORIZED:
            res.json ({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case errorConstants.FORBIDDEN:
            res.json ({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case errorConstants.NOT_FOUND:
            res.json ({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case errorConstants.SERVER_ERROR:
            res.json ({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
    default:
            console.log("No error, all good");   
        break;
    };
}



module.exports = errorHandler;
