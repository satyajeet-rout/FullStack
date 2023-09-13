const asyncHandler = (fn) => async () => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}








export default asyncHandler;








// const asyncHandler = () => {}
// const asyncHandler = (fn) => {}
// const asyncHandler = (fn) => () => {}
// const asyncHandler = (fn) => async() => {}




// closure in js
        // function asyncHandler(fn){
        //     return async function(req, res, next){
        //         try {
        //             await fn(req, res, next)
        //         } catch (err) {
        //             res.status(err.code || 500).json({
        //                 success : false
        //             });
                    
        //         }
        //     };
        // }




