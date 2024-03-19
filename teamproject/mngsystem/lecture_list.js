const { MongoClient } = require('mongodb');

// MongoDB 연결 문자열
const uri = process.env.DB_LOCAL_URL;
// 데이터베이스 이름
const dbName = 'number1';
// 컬렉션 이름
const collectionName = 'lecture';

async function lecture_list(){
  const client = new MongoClient(uri);
   try {
       // MongoDB에 연결
       await client.connect();

       // 데이터베이스 및 컬렉션 선택
       const db = client.db(dbName);
       const collection = db.collection(collectionName);

       // major_id와 major_name 조회
       const cursor = collection.find({}, { projection: { _id: 0, lecture_id: 1, lecture_name :1 } });

       // 결과 출력
       await cursor.forEach(doc => {
           console.log(`강의번호: ${doc.lecture_id}, 강의명: ${doc.lecture_name}`);
       });

   } catch (error) {
       console.error('Error:', error); 
   } finally {
       // 클라이언트 연결 닫기
       await client.close();
   }

}
//lecture_list(console.error);
module.exports={lecture_list}

