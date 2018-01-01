let User = require('./../model/User')
let service = require('./../shared/service')
let moment = require('moment')
let db = require('../db/db')

module.exports = class UserController {
  constructor() {}

  static singup(req , res , next){
    let email = req.body.email

    User.findUser({ 'email': email }, {} ,(user)=>{

      if(!user){

        let user = new User({
          email : email,
          username : req.body.username,
          password : req.body.password,
          registrationType : 'local',
          description : "",
          profileImg : req.body.profileImg
        })

        user.save()
        res.send({find : false , toValidate:true})
      }
      else
        return res.json({find : true, userExist : true})
    });

  }

  static login(req , res , next){

    let email = req.body.email;
    let password = req.body.password;

    User.findUser({ 'email': email }, {} ,(user)=>{

      if(user){
        service.comparePassword(password , user.password , (err ,passwordMathed)=>{
          if (err) return console.error(err);

          if(passwordMathed){
            return res.json({
              find : true ,
              passwordMathed,
              tokenAcces : service.createToken(user)
            });
          }
          else
            return res.json({passwordNotMathed : passwordMathed});

        });
      }
      else
        return res.json({find : false})
    });

  }

  static confirmation(req , res , next){
    let token = (req.params.token).toString().trim();

    service.unDecodeToken(token , (err , payload)=>{

      if(err) return res.status(500).send({message : "Invalid Token"});

      if(payload.expires <= moment().unix())
        return res.status(401).send({message : "Token has expires"});

        User.updateUser(payload.sub, { validatedAccount: true },()=>{
          return res.json({validatedAccount : true});
        });

    });
  }

  static getUser(req, res , next){
    let publicID = db.ObjectID(req.user)
    User.findUser({ 'publicID': publicID }, { '_id' : 0 , 'token': 0 , 'password' : 0 , 'validatedAccount' : 0 , 'updatedAt' : 0} , (user)=>{
      if(user){
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
    console.log("token -> ", token);
    service.unDecodeToken(token , function(err , payload){

      if(err) return res.status(500).send({message : "Invalid Token"});

      if(payload.expires <= moment().unix())
        return res.status(401).send({message : "Token has expires"});

        req.user = payload.sub;
        next();
    });
  }

}
