const {MongoClient} = require('mongodb');
const Input = require('./userInput.js');

async function delinfo(table){//-
  //const uri = process.env.DB_LOCAL_URL;
  const uri = process.env.DB_LOCAL_URL;
  const client = new MongoClient(uri);
  //테이블 이름을 전달 받아 자동으로 그 테이블을 사용
  try {
    await client.connect();
    const dbname = 'number1';
    console.log('해당 pk값을 입력해 주세요');
    let pk = await Input.getUserInput();
    pk = Number(pk)
    let pkname = `${table}_id`;
    let qry = {}
    qry[pkname] = pk;
    const result = await client.db(dbname).collection(table).deleteOne(qry);
    console.log("Document Deleted");
  } finally {
      await client.close();
  }
};

module.exports ={delinfo};

