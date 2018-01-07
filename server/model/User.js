let moment = require('moment')
let db = require('./../db/db')
let service = require('./../global/service')
let env = require('./../../.env')
let fs = require('fs')
let path = require('path')
let http = require('http');

const collectionName = "userCollection"
const SERVERFULLPATH = "http://localhost:3500/"

module.exports = class User {

  constructor(user) {
    this._id = db.genrateID()
    this.publicID = service.encrypt(this._id.toString())
    this.email = user.email
    this.username = user.username
    this.password = user.password
    this.registrationType = user.registrationType
    this.profileImg = user.profileImg
    this.validatedAccount = false
    this.token = null
  }

  save(){
    let confirmToken;
    service.hasPassword(this.password , 10 ,(err , hashedPassword)=>{
      if(err) console.error(err);
      this.password = hashedPassword
      this.token = service.createToken(this)
      confirmToken = service.confirmToken(this.publicID)
      let link = `${SERVERFULLPATH}api/auth/confirmation/${confirmToken}`

      if(this.token){
        this.createdAt = moment().unix()
        this.updatedAt = moment().unix()
        // db.insert(collectionName , this)
        return service.sendMail(this.email , 'Dropit confirmation [Activate Account]', "<h1>Hello and welcome to Dropit. Please confirm your email <a href='"+link+"'>confirmation link </a>" , (error , info)=>{
          if (error) return res.json({error:error , link:link});
          db.insert(collectionName , this)
          console.log('Message %s sent: %s', info.messageId, info.response);
          return;
        });
      }

    });
  }

  static validateSignup(username , email , password){

    if(service.onlyWhiteSpaces(username))
      return false
    else if(service.onlyWhiteSpaces(email))
      return false
    if(service.onlyWhiteSpaces(password))
      return false
    if(!service.isValidEmail(email))
      return false

    return true
  }

  static validateLogin(email , password){
    if(service.onlyWhiteSpaces(email))
      return false
    else if(service.onlyWhiteSpaces(password))
      return false
    if(!service.isValidEmail(email))
      return false
    return true
  }

  static updateUser(userPublicID , newUpdate , callback){
    db.update(collectionName , userPublicID ,  newUpdate , (err , result)=>{
      callback(err , result)
    })

  }

  static updateUserBy(query , newUpdate , callback){
    db.updateGeneric(collectionName , query ,  newUpdate , (err , result)=>{
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
