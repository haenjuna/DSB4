const {MongoClient} = require('mongodb');

// ranking(과목명,학번) ex)ranking("자료구조",201711129) 학번까지 입력했을때 해당 과목의 해당학생의 석차가 출력.
// ranking(과목명,학번) ex)ranking("자료구조") 과목명만 입력하고 학번을 비울 시 해당 과목의 석차 출력.



async function ranking(lecture, student){ 
  const uri = process.env.DB_LOCAL_URL;
  const client = new MongoClient(uri);
  const collection = client.db("number1").collection("student_lecture");

  

  // student_lecture collection의 lecture_id와 lacture collection의 lecture_id를 매칭하여 student_lecture collection의 모든 내용과 lacture collection의 과목명까지 조회가능.
  const result = await collection.aggregate([
    {
      $lookup: {
        from: "lecture",
        localField: "lecture_id",
        foreignField: "lecture_id",
        as: "ranking"
      }
    }
  ]).toArray();

  // result.sort((a, b) => b.midde_score - a.midde_score); //결과값이 음수이면 a에 해당하는 값을 앞으로 이동. 결과적으로 내림차순이됨. 
  result.sort((a, b) => {
    const averageA = (a.midde_score + a.final_score) / 2;
    const averageB = (b.midde_score + b.final_score) / 2;
    return averageB - averageA;
  })
  if(!student){
    var count = 0;
    result.forEach(row => {
      const lectureName = row.ranking.length > 0 ? row.ranking[0].lecture_name : "자료없음";
      if (lectureName === lecture) {
        count++;
        const averageScore = (row.midde_score + row.final_score) / 2;
        console.log(count, "학번:", row.student_id, "| 평균:", averageScore.toFixed(1), "| 과목명:", lectureName); //소수점 첫번째 자리까지 평균값을 출력.
      }
    });
  }else{
    var count = 0;
    result.forEach(row => {
      const lectureName = row.ranking.length > 0 ? row.ranking[0].lecture_name : "자료없음";
      if (lectureName === lecture) {
        count++;
        const averageScore = (row.midde_score + row.final_score) / 2;
        if(row.student_id===student){
          console.log(count, "학번:", row.student_id, "| 평균:", averageScore.toFixed(1), "| 과목명:", lectureName);
        }
      }
    });
  }
 
  await client.close();
};


module.exports={ranking};
// ranking("컴퓨터 구조")


//test
