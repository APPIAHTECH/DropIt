let jwt = require('jwt-simple');
let moment = require('moment');
let bcrypt = require('bcrypt');
let path = require('path');
let url = require('url');
let nodemailer = require('nodemailer');
let env = require('./../../.env');

class Service {
  constructor() {}

  static createToken(user , expires){

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
}

module.exports = Service;
