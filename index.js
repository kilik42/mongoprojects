const MongoClient = require('mongodb').MongoClient;

//connection url
const url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, db){
  if(err){
    return console.dir(err);
  }
  console.log('connected to mongodb');


  InsertDocuments(db, function(){
    db.close();
  });

  FindDocuments(db, function(){
    db.close();
  });
});

//insert single doc
const InsertDocument = function(db, callback){
  //get collection
  const collection = db.collection('users');
  //insert docs and check for errors
  collection.insert({
    name: 'marvin evins',
    email: 'marvinevins@yahoo.com'
  }, function(err, result){
    if(err){
      return console.dir(err);
    }
    console.log('inserted document');

    callback(result);
  });

}
//insert mutliple documents


const InsertDocuments = function(db, callback){
  // get collection
  const collection = db.collection('users');
  collection.insertMany([
      {
        name: 'sam smith',
        email: 'samsmith@yahoo.com'

      },

      {
        name: 'john doe',
        email: 'johndoe@yahoo.com'
      },
      {
        name: 'lavere thomas',
        email: 'laverethomas@yahoo.com'
      }

  ], function(err, result){
    if(err){
      return console.dir(err);
    }
    console.log('Inserted ' +result.ops.length + ' documents');

    callback(result);
  });


}

const FindDocuments = function(db, callback){
  //get collection
  const collection = db.collection('users');
  collection.find({}).toArray(function(err, docs){
    if(err){
      return console.dir(err);
    }
    console.log('found the following records');
    console.log(docs);
    callback(docs);
  });
}
