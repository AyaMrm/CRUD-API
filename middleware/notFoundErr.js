
const notFounderr= (err, req, res, next)=>{
    res.status(404).send("sorry.. Can't find this !");
}

export default notFounderr;