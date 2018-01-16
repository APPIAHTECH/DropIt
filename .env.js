module.exports = {
  DBSettings : {
    DB:"DAWPDB",
    //HOST:"mongodb://eunisae:admin@ds247077.mlab.com:47077/dropit",
    HOST:'mongodb://localhost:27017/dropitDB',
    PORT:23456
  },

  JWT:{
    SECREET_TOKEN : "Dropit"
  },

  MAILSettings : {
    SERVICE : 'gmail',
    AUTH : {
      USER : 'dropitup3@gmail.com',
      PASSWORD : 'wInRbJOqq06Z5P0'
    }
  }
}
