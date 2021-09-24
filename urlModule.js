const Users = require('./urlModel');


const {CLIENT_URL}= process.env




// program to generate random strings
function generateUrl() {
    let result = ' ';
    // declare all characters
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < 5; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

// console.log(generateString(5));

const urlModule ={
    createUrl : async (req,res) => {
        try {
            const {urlLink} = req.body;

            if(!urlLink )
                return res.status(400).json({msg: "Please fill in all fields."})

            // if(!validateEmail(userName))
            //     return res.status(400).json({msg: "Invalid emails."})

                console.log(req.body.urlLink)
                // res.send(req.body)
                const newUser = new Users({ urlLink,shorturlLink : generateUrl() })
                // inserts or saves into mongodb
                 newUser.save(function (err, data) {
                    if (err) throw err;
                    res.redirect(`${CLIENT_URL}`)
                    // res.redirect('http://localhost:3004/drive')
                    // res.json({msg: "Register Success! Please activate your email to start."})
                    // res.send(newUser)
                })
                // console.log(newUser)
                
                
            
        } catch (error) {
            res.status(500).json({msg:"internal server error"})
        }
    },
    showUrl: async (req,res) => {
        try {
            let data =await Users.find()
            console.log(data)
            res.json(data)
        } catch (error) {
            res.status(500).json({msg:"internal server error"})
        }
    },
    showUrlid: async (req,res) => {
        try {
            // console.log(req.params.url.urlId)
            let urlData =await Users.findOne({shorturlLink :req.params.urlId} )
            console.log(urlData)
            Users.findByIdAndUpdate({_id : urlData.id},{$inc:{clickCount : 1}},function(err,updatedData){
                if(err) throw err;
                res.redirect(urlData.urlLink)
            })
            
        } catch (error) {
            res.status(500).json({msg:"internal server error"})
        }
    },
    deleteUrlid: async (req,res) => { 
        try {
            // console.log(_id : req.params.id)
            let data = await Users.deleteOne({_id : req.params.id})
                console.log(data)
                res.json({msg: "delete Success"})
                
            
            
        } catch (error) {
            res.status(500).json({msg:"internal server error"})
        }
    }
    
    // activateEmail: async (req, res) => {
    //     try {
    //         const {activation_token} = req.body
    //         const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
    //         // console.log(user)

    //         const {firstName, lastName,userName, password} = user

    //         const check = await Users.findOne({userName})
    //         if(check) return res.status(400).json({msg:"This email already exists."})

    //         const newUser = new Users({
    //             firstName, lastName,userName, password
    //         })

    //         await newUser.save()

    //         res.json({msg: "Account has been activated!"})

    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // login: async (req, res) => {
    //     try {
    //         const {userName, password} = req.body
    //         const user = await Users.findOne({userName})
    //         if(!user) return res.status(400).json({msg: "This email does not exist."})

    //         const matchPassword = bcryptjs.compareSync(req.body.password, user.password);
    //         if(!matchPassword) return res.status(400).json({msg: "Username/Password is incorrect."})
    //         // console.log(user)
    //         const refresh_token = createRefreshToken({id: user._id})
            
    //         res.cookie('refreshtoken', refresh_token, {
    //             httpOnly: true,
    //             path: '/user/refresh_token',
    //             maxAge: 7*24*60*60*1000 // 7 days
    //         })
    //         // console.log(refresh_token)
    //         const rf_token = refresh_token
    //         //  console.log({rf_token})
    //          if(!rf_token) return res.status(400).json({msg: "Please login now!"})
    //         // console.log(rf_token)
    //         jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    //             if(err) return res.status(400).json({msg: "Please login now!"})
    //             // console.log(user)
    //             const access_token = createAccessToken({id: user.id})
    //             // console.log({access_token})
    //          })
    //         // if(matchPassword){
    //         //     //Generate JWT token
    //         //     const refresh_token = createRefreshToken({id: user._id})
    //         //     res.cookie('refreshtoken', refresh_token, {
    //         //     httpOnly: true,
    //         //     path: '/user/refresh_token',
    //         //     maxAge: 7*24*60*60*1000 // 7 days
    //         // })

    //         // res.json({msg: "Login success!"})
    //         // }else{
    //         //     res.status(404).json({
    //         //         message : "Username/Password doesn't match"
    //         //     })
    //         // }
    //         res.json({msg: "Login success!"})
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // getAccessToken: async(req, res) => {
    //     try {
    //         // const {userName, password} = req.body
    //         // const user = await Users.findOne({userName})
    //         // const refresh_token = createRefreshToken({id: user._id})
    //         // res.cookie('refreshtoken', refresh_token, {
    //         //     httpOnly: true,
    //         //     path: '/user/refresh_token',
    //         //     maxAge: 7*24*60*60*1000 // 7 days
    //         // })
    //         console.log(refresh_token)
    //         const rf_token= req.refresh_token
    //         console.log(rf_token)
    //         // const rf_token = req.cookies.refreshtoken
    //         console.log({rf_token})
    //         // if(!rf_token) return res.status(400).json({msg: "Please login now!"})
    //         // // console.log(rf_token)
    //         // jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    //         //     if(err) return res.status(400).json({msg: "Please login now!"})
    //         //     // console.log(user)
    //         //     const access_token = createAccessToken({id: user.id})
    //         //     res.json({access_token})
    //          //})
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // forgotPassword: async (req, res) => {
    //     try {
    //         const {userName} = req.body
    //         const user = await Users.findOne({userName})
    //         if(!user) return res.status(400).json({msg: "This email does not exist."})

    //         const access_token = createAccessToken({id: user._id})
    //         const url = `${CLIENT_URL}/user/reset/${access_token}`

    //         sendMail(userName, url, "Reset your password")
    //         res.json({msg: "Re-send the password, please check your email."})
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // resetPassword: async (req, res) => {
    //     try {
            
    //         const {password} = req.body
    //         if(password.length < 6)
    //             return res.status(400).json({msg: "Password must be at least 6 characters."})
            
    //         let salt = bcryptjs.genSaltSync(10);
    //             let hash = bcryptjs.hashSync(req.body.password, salt);
    //             req.body.password=hash;
    //         // console.log(req.user)
    //         await Users.findOneAndUpdate({_id: req.user.id}, {
    //             password: hash
    //         })

    //         res.json({msg: "Password successfully changed!"})
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // logout: async (req, res) => {
    //     try {
    //         res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
    //         return res.json({msg: "Logged out."})
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // }
}




module.exports = urlModule