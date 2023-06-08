const jwt = require("jsonwebtoken")

const authentication = (req,res,next) =>{
    const token = req.headers.authorization
    if(token){
        let decoded = jwt.verify(token,"masai")
        if(decoded){
            req.body.userid = decoded.userid
            next()
        }
        else{
            res.send({
                "msg":"login again"
            })
        }
    }
    else{
        res.send({
            "msg":"login again"
        })
    }
}

module.exports={
    authentication
}