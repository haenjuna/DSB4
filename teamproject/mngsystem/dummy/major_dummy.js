const { MongoClient } = require('mongodb');

// MongoDB 연결 문자열
const uri = process.env.DB_LOCAL_URL;
// 데이터베이스 이름
const dbName = 'number1';
// 컬렉션 이름
const collectionName = 'major';

// 더미 데이터
const dummyData = [
    { major_id: 1, college: '정보융합대학', major_name: '컴퓨터 공학' },
    { major_id: 2, college: '공과대학', major_name: '전자 공학' },
    { major_id: 3, college: '공과대학', major_name: '기계 공학' },
    { major_id: 4, college: '정보융합대학', major_name: '정보 통신 공학' },
    { major_id: 5, college: '경영대학', major_name: '경영학부' },
    { major_id: 6, college: '자연과학대학', major_name: '물리학과' },
    { major_id: 7, college: '자연과학대학', major_name: '간호학과' }
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
