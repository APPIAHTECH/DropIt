let jwt = require('jwt-simple');
let moment = require('moment');
let bcrypt = require('bcrypt');
let path = require('path');
let url = require('url');
let nodemailer = require('nodemailer');
let env = require('./../../.env');
let crypto = require('crypto'), algorithm = 'aes-256-ctr', password = 'd6F3Efeq';

class Service {
  constructor() {}

  static createToken(user){
    let expires;
    if(user){
      if(!expires)
        expires = moment().add(14 , 'days').unix();

      var payload = {
        sub : user.publicID, //Generate a public id for client
        createdAt : moment().unix(),
        expires : expires,
        mail : user.email
      }

      return jwt.encode(payload , env.JWT.SECREET_TOKEN);
    }else {
      return null;
    }
  }

  static confirmToken(publicID){
    let expires;
    if(publicID){
      if(!expires)
        expires = moment().add(14 , 'days').unix();

      var payload = {
        sub : publicID,
        createdAt : moment().unix(),
        expires : expires
      }

      return jwt.encode(payload , env.JWT.SECREET_TOKEN);
    }else {
      return null;
    }
  }

  static unDecodeToken(token , callback){

    try {
      var payload = jwt.decode(token , env.JWT.SECREET_TOKEN);
      callback(false , payload);
    } catch (err) {
      console.log("error  -> " , err);
      callback(err , null);
    }
  }

  static hasPassword(password , saltRounds , callback){

    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        callback(err , hash);
      });
    });

  }

  static sendMail(usermail , subject  , msg , callback){

    var transporter = Service.mailConfig();
    var mailOptions = {
        from: `'<${env.MAILSettings.AUTH.USER}>'`,
        to: usermail,
        subject: subject,
        html: msg
    };

    transporter.sendMail(mailOptions, (error, info) => callback(error , info));
  }

  static mailConfig(){
    var transporter = nodemailer.createTransport({
        service: env.MAILSettings.SERVICE,
        auth: {
            user: env.MAILSettings.AUTH.USER,
            pass: env.MAILSettings.AUTH.PASSWORD
        }
    });

    return transporter;
  }
  static location(req) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host')
    });
  }

  static comparePassword(password, hashedPassword , callback){
    bcrypt.compare(password, hashedPassword, function(err, res) {
      callback(err , res);
    });
  }

  static encrypt(text){
    let cipher = crypto.createCipher(algorithm,password)
    let crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }

  static decrypt(text){
    let decipher = crypto.createDecipher(algorithm,password)
    let dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }


  static isValidEmail(email){

    if(email === undefined || email == " " || email == "")
      return false

    if(email.length <=0) return false;
    if(!email.includes('@') || !email.includes('.')) return false;

    let mail= email.split('@') , domain , i , count = 0 , pos;
    if(mail.length > 2) return false;

    for(i = 0 ; i < mail[1].length; i++){
      if(mail[1].charAt(i) == '.') count++;
      if(count >= 2) return false;
    }

    pos = mail[1].indexOf('.')+1;
    domain = mail[1].substring(pos);
    if(domain.length <= 1) return false;

    return true;
  }

  static onlyWhiteSpaces(str) {
    if(str === undefined)
      return true;
    return !str.replace(/\s/g, '').length
  }

}

module.exports = Service;
