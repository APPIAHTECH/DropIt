let User = require('./../model/User')
let service = require('./../global/service')
let randomstring = require("randomstring");
let moment = require('moment');
let db = require('../db/db')
const redirectTo = "http://localhost:4200/login"


module.exports = class UserController {
  constructor() {}

  static singup(req , res , next){
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password
    User.findUser({ 'email': email }, {} ,(user)=>{

      if(!user){
        if(User.validateSignup(username , email , password)){
          let user = new User({
            email : email,
            username : req.body.username,
            password : req.body.password,
            registrationType : 'local',
            profileImg : req.body.profileImg
          })
          user.save()
          res.send({created : false , toValidate:true , error:false})
        }else
          res.send({error:true})

      }
      else
        res.send({exist : true})
    });

  }

  static login(req , res , next){

    let email = req.body.email;
    let password = req.body.password;

    if(User.validateLogin(email , password)){

      User.findUser({'email': email }, {} ,(user)=>{

        if(user){

          if(user.validatedAccount){
            service.comparePassword(password , user.password , (err ,passwordMathed)=>{
              if (err) return res.json({error : true})

              if(passwordMathed){
                return res.json({
                  exist : true ,
                  passwordMathed,
                  validatedAccount:true,
                  tokenAcces : service.createToken(user)
                });
              }
              else
                return res.json({passwordMathed , validatedAccount:true});

            });
          }else
            return res.json({passwordMathed:false , validatedAccount:false});

        }
        else
          return res.json({exist : false})
      });

    }else
      return res.json({error : true})


  }

  static confirmation(req , res , next){
    let token = (req.params.token).toString().trim() , id;
    service.unDecodeToken(token , (err , payload)=>{

      if(err) return res.status(500).send({message : "Invalid Token"});

      if(payload.expires <= moment().unix())
        return res.status(401).send({message : "Token has expires"});

        id = service.decrypt(payload.sub)

        User.findUser({ '_id': db.ObjectID(id) }, {} ,(user)=>{

          if(user){

            if(user.validatedAccount)
              return res.redirect(redirectTo);
            else{
              let updateUser = user
              updateUser.createdAt = moment().unix()
              updateUser.validatedAccount = true

              User.updateUserBy({"_id":user._id}, updateUser,(err , result)=>{
                return res.redirect(redirectTo);
              });
            }
          }
          else
            return res.status(500).send({message : "Invalid user token"});
        });



    });
  }

  static resetPassword(req , res , next){
    let email = req.body.email

    User.findUser({'email': email }, {} ,(user)=>{
      if(user && user.validatedAccount){
        let confirmCode = randomstring.generate(4)
        // res.json({exist:true , confirmCode , error:false})
        service.sendMail(email , "Dropit [Reset Password]" , `<h1>Dropit string link</h1><br/><h1>${confirmCode}</h1>` , (err , info)=>{
          if(err) res.json({error : true})
          res.json({exist:true , confirmCode})
        })
      }else
        res.json({exist:false})
    })


  }

  static changePassword(req , res , next){
    let newPassword = req.body.password
    let email = req.body.email
    let updatingUser = null
    if(newPassword === undefined  || newPassword == "")
      return res.json({error:true})

    User.findUser({'email': email }, {} ,(user)=>{

      if(user){

        if(user.validatedAccount){
          service.hasPassword(newPassword , 10 , (err , hashedPassword)=>{

            updatingUser = user
            updatingUser.createdAt = moment().unix()
            updatingUser.password = hashedPassword

            if(err) return res.json({error:true})
            User.updateUserBy({"_id":user._id}, updatingUser ,(err , result)=>{
              // res.json({resetPassword:true})
              service.sendMail(email , "Dropit [Password Changed]" , `You have recently changed your password. Time : ${moment().unix()}` , (err , info)=>{
                if(err) res.json({error : true})
                res.json({resetPassword:true})
              })
            });

          })
        }else{
          res.json({validatedAccount:false , resetPassword:false})
        }

      }

    })


  }

  static getUser(req, res , next){
    let publicID = db.ObjectID((service.decrypt(req.user)))
    User.findUser({ 'publicID': publicID }, { '_id' : 0 , 'token': 0 , 'password' : 0 , 'validatedAccount' : 0 , 'updatedAt' : 0} , (user)=>{
      if(user && user.validatedAccount){
        return res.json({find : true , userData : user});
      }
      else
        return res.json({find : false})
    });
  }

  static isAuth(req, res , next){
    if(!req.headers.authorization)
      return res.status(403).send({message : "Permision Deniend"});

    var token = req.headers.authorization.split(' ')[1];
    service.unDecodeToken(token , function(err , payload){

      if(err) return res.status(500).send({message : "Invalid Token"});

      if(payload.expires <= moment().unix())
        return res.status(401).send({message : "Token has expires"});

        req.user = payload.sub;
        next();
    });
  }

}
