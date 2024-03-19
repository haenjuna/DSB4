// MongoDB와 연결
const { MongoClient } = require('mongodb');

// MongoDB 접속 정보
const uri = process.env.DB_LOCAL_URL;
const dbName = 'number1'; // 데이터베이스 이름

// 더미 데이터
const dummyData = [
  { 
    lecture_id: 1,
    lecture_name: '컴퓨터 구조',
    lecture_day: 'Mon',
    lecture_time: '10:00 AM - 12:00 PM',
    lecture_credit: 3,
    lecture_type: 'CS',
    major_id: 1,
    professor_id: 111111111
  },
  {
    lecture_id: 2,
    lecture_name: '자료구조',
    lecture_day: 'Tue',
    lecture_time: '1:00 PM - 3:00 PM',
    lecture_credit: 3,
    lecture_type: 'CS',
    major_id: 1,
    professor_id: 121212121
  },
  {
    lecture_id: 3,
    lecture_name: '데이터베이스',
    lecture_day: 'Wed',
    lecture_time: '2:00 PM - 6:00 PM',
    lecture_credit: 3,
    lecture_type: 'CS',
    major_id: 1,
    professor_id: 222222222
  },
  {
    lecture_id: 4,
    lecture_name: '네트워크 보안',
    lecture_day: 'Tue',
    lecture_time: '9:00 AM - 11:00 AM',
    lecture_credit: 3,
    lecture_type: 'CS',
    major_id: 4,
    professor_id: 232323232
  },
  {
    lecture_id: 5,
    lecture_name: '컴퓨터네트워크',
    lecture_day: 'Tue',
    lecture_time: '9:00 AM - 11:00 AM',
    lecture_credit: 3,
    lecture_type: 'CS',
    major_id: 4,
    professor_id: 333333333
  },
  {
    lecture_id: 6,
    lecture_name: '디시털 신호처리',
    lecture_day: 'Mon',
    lecture_time: '9:00 AM - 11:00 AM',
    lecture_credit: 3,
    lecture_type: 'CS',
    major_id: 4,
    professor_id: 343434343
  },
  {
    lecture_id: 7,
    lecture_name: '기계공학의 이해',
    lecture_day: 'Mon',
    lecture_time: '1:00 PM - 03:00 PM',
    lecture_credit: 3,
    lecture_type: 'CS',
    major_id: 3,
    professor_id: 444444444
  },
  {
    lecture_id: 8,
    lecture_name: '기초전기전자회로',
    lecture_day: 'Mon',
    lecture_time: '1:00 PM - 03:00 PM',
    lecture_credit: 3,
    lecture_type: 'CS',
    major_id: 3,
    professor_id: 454545454
  },
  {
    lecture_id: 9,
    lecture_name: '기계공학실험',
    lecture_day: 'Mon',
    lecture_time: '1:00 PM - 03:00 PM',
    lecture_credit: 3,
    lecture_type: 'CS',
    major_id: 3,
    professor_id: 555555555
  },
  // 나머지 더미 데이터 추가
];

// MongoDB 연결 및 데이터 삽입
async function insertDummyData() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  try {
    await client.connect();
    console.log("Connected successfully to server");
    
    const db = client.db(dbName);
    const collection = db.collection('lecture'); // lecture 테이블
    
    // 더미 데이터 삽입
    const result = await collection.insertMany(dummyData);
    console.log(`${result.insertedCount} documents inserted`);
  } catch (err) {
    console.error("Error: ", err);
  } finally {
    await client.close(); // 연결 종료
  }
}

insertDummyData();
