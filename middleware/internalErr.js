
const internalErr= (err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("an internal server error!");
}


export default internalErr;