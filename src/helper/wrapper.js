const responseWrapper = (res, statusCode, message, data = {}, code = statusCode) => {
    res.status(statusCode).json({
        status: code,  
        message,
        data
    });
};

module.exports=responseWrapper