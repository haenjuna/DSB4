const { MongoClient } = require('mongodb');

// MongoDB 연결 문자열
const uri = process.env.DB_ATLAS_URL;
// 데이터베이스 이름
const dbName = 'number1';
// 컬렉션 이름
const collectionName = 'professor';

// 더미 데이터
const dummyData = [
  { professor_id: 111111111, professor_name : '김영봉', professor_tel : '010-1234-5678', professor_major :'컴퓨터공학'},
  { professor_id: 121212121, professor_name : '권오흠', professor_tel : '010-6255-6255', professor_major :'컴퓨터공학'},
  { professor_id: 222222222, professor_name : '송하주', professor_tel : '010-6258-6258', professor_major :'컴퓨터공학'},
  { professor_id: 232323232, professor_name : '김종남', professor_tel : '010-7895-7895', professor_major :'정보통신공학'},
  { professor_id: 333333333, professor_name : '신상욱', professor_tel : '010-9595-9595', professor_major :'정보통신공학'},
  { professor_id: 343434343, professor_name : '김창수', professor_tel : '010-4321-4321', professor_major :'정보통신공학'},
  { professor_id: 444444444, professor_name : '신인철', professor_tel : '010-7410-7410', professor_major :'기계공학'},
  { professor_id: 454545454, professor_name : '최필주', professor_tel : '010-8521-8521', professor_major :'기계공학'},
  { professor_id: 555555555, professor_name : '유승호', professor_tel : '010-1591-1591', professor_major :'기계공학'},
  { professor_id: 565656565, professor_name : '신봉기', professor_tel : '010-4894-4894', professor_major :'해양스포츠공학'},
  { professor_id: 666666666, professor_name : '이경현', professor_tel : '010-5754-5754', professor_major :'해양스포츠공학'},
  { professor_id: 676767676, professor_name : '장원두', professor_tel : '010-5603-5603', professor_major :'해양스포츠공학'},

  
    // 더 많은 더미 데이터를 추가할 수 있습니다.
];

async function insertDummyData() {
    const client = new MongoClient(uri);
    try {
        // MongoDB에 연결
        await client.connect();

        // 데이터베이스 및 컬렉션 선택
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // 더미 데이터 삽입
        const result = await collection.insertMany(dummyData);
        console.log(`${result.insertedCount} documents inserted.`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // 클라이언트 연결 닫기
        await client.close();
    }
}

// 함수 호출
insertDummyData();

