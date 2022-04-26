const router = require('express').Router();
const jwt = require('jsonwebtoken')

router.post('/signup',[
    check('email').isEmail(),
    check('password').isLength({min:8})
    ], async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
    return res.status(400).json({
    errors: errors.array()
    })
    }
    const user = await User.findOne({email:req.body.email})
    if(!user){
    return res.status(400).send('user doesnt exist')
    }
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass){
    return res.status(400).send('password is wrong')
    }

    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token)

    res.send('success')
    })

module.exports= router 