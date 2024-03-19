const { MongoClient } = require('mongodb');

// MongoDB 연결 문자열
const uri = process.env.DB_LOCAL_URL;
// 데이터베이스 이름
const dbName = 'number1';
// 컬렉션 이름
const collectionName = 'student_lecture';

// 더미 데이터
const dummyData = [
  { student_id: 201811769, midde_score : 50, final_score : 40, lecture_id :1},
  { student_id: 201911869, midde_score : 90, final_score : 85, lecture_id : 1},
  { student_id: 201911855, midde_score : 80, final_score : 70, lecture_id : 1},
  { student_id: 201711129, midde_score : 90, final_score : 85, lecture_id : 1},
  { student_id: 201911687, midde_score : 80, final_score : 70, lecture_id : 1},
  { student_id: 201911687, midde_score : 100, final_score : 100, lecture_id : 2},
  { student_id: 201811769, midde_score : 85, final_score : 50, lecture_id : 2},
  { student_id: 201911869, midde_score : 60, final_score : 70, lecture_id :2},
  { student_id: 201911855, midde_score : 85, final_score : 50, lecture_id : 2},
  { student_id: 201711129, midde_score : 60, final_score : 70, lecture_id :2},
  { student_id: 201811769, midde_score : 70, final_score : 50, lecture_id : 3},
  { student_id: 201911855, midde_score : 70, final_score : 40, lecture_id : 3},
  { student_id: 201711129, midde_score : 85, final_score : 50, lecture_id : 3},
  { student_id: 201911869, midde_score : 60, final_score : 70, lecture_id :3},
  { student_id: 201911687, midde_score : 85, final_score : 50, lecture_id : 3},
  { student_id: 201811769, midde_score : 80, final_score : 50, lecture_id : 4},
  { student_id: 201911855, midde_score : 70, final_score : 90, lecture_id : 4},
  { student_id: 201711129, midde_score : 85, final_score : 50, lecture_id : 4},
  { student_id: 201911869, midde_score : 60, final_score : 70, lecture_id :4},
  { student_id: 201911687, midde_score : 85, final_score : 50, lecture_id : 4},
  { student_id: 201811769, midde_score : 80, final_score : 70, lecture_id : 5},
  { student_id: 201911855, midde_score : 70, final_score : 90, lecture_id : 5},
  { student_id: 201711129, midde_score : 65, final_score : 50, lecture_id : 5},
  { student_id: 201911869, midde_score : 90, final_score : 70, lecture_id :5},
  { student_id: 201911687, midde_score : 85, final_score : 80, lecture_id : 5},
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

