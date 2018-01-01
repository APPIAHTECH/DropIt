let moment = require('moment')
let db = require('./../db/db')
let service = require('./../shared/service')
let env = require('./../../.env')
let fs = require('fs')
let path = require('path')
const collectionName = "userCollection"

module.exports = class User {

  constructor(user) {

    //String
    this.publicID = db.genrateID()
    this.email = user.email
    this.username = user.username
    this.password = user.password
    this.registrationType = user.registrationType
    this.description = user.description
    this.profileImg = user.profileImg
    this.validatedAccount = false
    this.token = null
  }
  save(){

    service.hasPassword(this.password , 10 ,(err , hashedPassword)=>{
      if(err) console.error(err);
      this.password = hashedPassword;
      this.token = service.createToken(this);
      let link = `${env.SERVER.FULLPATH}api/auth/confirmation/${this.token}`;
      console.log(link);
      if(this.token){
        this.createdAt = moment().unix()
        this.updatedAt = moment().unix()
        // return db.insert(collectionName , this)
        return service.sendMail(this.email , 'DAW confirmation pendient', "<h1>Hello and welcome to DAW. Please confirm your email <a href='"+link+"'>confirmation link </a>" , (error , info)=>{
          if (error) return res.json({error:error , link:link});
          db.insert(collectionName , this)
          console.log('Message %s sent: %s', info.messageId, info.response);
          return;
        });
      }
    });
  }

  static updateUser(userPublicID , newUpdate , callback){
    db.update(collectionName , userPublicID ,  newUpdate , (err , result)=>{
      if(err) console.log(err);
      callback(err , result)
    })
  }

  static findUser(findBy , fileds , callback){
    db.find(collectionName , findBy , fileds , (user)=> callback(user))
  }

  static countUserRegisters(query , callback){
    db.find(collectionName , query, (result)=> callback(result))
  }

}
