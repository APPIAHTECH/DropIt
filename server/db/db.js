let mongodb = require('mongodb')
let MongoClient = require('mongodb').MongoClient
let env = require('./../../.env')

class DB{

  constructor(){}

  static connection(){
    let url = ""
    let connect = null
    url = env.DBSettings.HOST
    connect = MongoClient.connect(url)
    return connect
  }

  static insert(collectionName , document){

    DB.connection().then((db)=> {

        db.collection(collectionName).insertOne(document, (err, result)=>{
          if(err) console.error(err)
          console.log(`Inserted a document into the ${collectionName}collection.`)
          db.close()
        });

    }).catch((err)=> console.error("Error (Insert Collection Failed) : " , err))
  }

  static findLimit(collectionName , limitNumber , callback){

    DB.connection().then((db)=> {
      db.collection(collectionName).find({}).sort({_id : 1}).limit(limitNumber).toArray((err , items)=>{
        callback(err , items)
        db.close();
      })


    }).catch((err)=> console.error("Error (findLimit Collection Failed) : " , err))
  }

  static find(collectionName , findBy , fields , callback){

    DB.connection().then((db)=> {

      let document = db.collection(collectionName).findOne(findBy , fields)
      document.then((item)=> {
        callback(item)
        db.close();
      })


    }).catch((err)=> console.error("Error (Find Collection Failed) : " , err))
  }

  static delete(collectionName , query, callback){

    DB.connection().then((db)=> {

      let document = db.collection(collectionName).remove(query)
      document.then((item)=> {
        callback(item)
        db.close();
      })


    }).catch((err)=> console.error("Error (Find Collection Failed) : " , err))
  }

  static findMuch(collectionName , findBy , fields , callback){

    DB.connection().then((db)=> {

      let document = db.collection(collectionName).find(findBy , fields).sort({_id : -1}).limit(10).toArray((err, result) =>{
        if (err) throw err;
        callback(result)
        db.close();
      });

    }).catch((err)=> console.error("Error (findMuch Collection Failed) : " , err))
  }
  static update(collectionName , id  , updates , callback){
    let publicID = DB.ObjectID(id)

    DB.connection().then((db)=>{
      db.collection(collectionName).updateOne({'publicID' : publicID}, {$set : updates} , (err , result)=> {
        callback(err , result)
        db.close()
      })

    }).catch((err)=> console.error("Error (Update Collection Failed) : " , err))

  }

  static count(collectionName , query  , callback){

    DB.connection().then((db)=>{
      let doc = db.collection(collectionName).count(query)
      doc.then((result)=>{
        callback(result)
        db.close()
      }).catch((err)=> console.error("Error (count Collection Failed) : " , err))

    }).catch((err)=> console.error("Error (count Collection Failed) : " , err))

  }

  static updateGeneric(collectionName , id  ,updates , callback){
    DB.connection().then((db)=>{
      db.collection(collectionName).updateOne(id , updates , (err , result)=> {
        callback(err , result)
        db.close()
      })
    }).catch((err)=> console.error("Error (updateGeneric Collection Failed) : " , err))

  }

  static genrateID(){return new mongodb.ObjectID()}

  static ObjectID(id) //Converteix un string ID a un ObjectID valid per a mongodb
  {return new mongodb.ObjectID(id);}

}

module.exports = DB
