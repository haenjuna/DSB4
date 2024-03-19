const { MongoClient } = require('mongodb');

const uri = process.env.DB_LOCAL_URL;
// const uri = process.env.DB_ATLAS_URL;
console.log(uri);

const client = new MongoClient(uri);
const dbName = 'number1';

async function main() {
   await client.connect();
   console.log('Connected successfully to server');
   const db = client.db(dbName);
   const collection = db.collection('documents');
   return 'done.';
}

main()
.then(console.log)
.catch(console.error)
.finally(() => client.close());
