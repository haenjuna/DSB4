const Input = require("./userInput");
const { MongoClient } = require('mongodb');

async function student_update(){
    const uri = process.env.DB_LOCAL_URL;
    const client = new MongoClient(uri);

    let exist = true;
    let student_id;

    await client.connect();

    let collection = client.db('number1').collection('student');

    //while문으로 반복실행
    while (exist) {
    console.log(`수정할 학생의 학번을 입력하세요`);
    student_id = await Input.getUserInput();

    let qry = {"student_id":Number(`${student_id}`)}
    // MongoDB에서 데이터 확인
    let student = await client.db('number1').collection('student').findOne(qry);

    if (student) {
        exist = false;
    } else {
        console.log(`입력한 학번 ${student_id}에 해당하는 데이터가 없습니다. 다시 입력해주세요`);
    }
    await wait(1000);
    }

  //학번이 있으면 작업 진행
    if (!exist) {
    console.log(`선택한 학번: ${student_id}`);
    console.log("수정할 항목을 입력하세요");
    console.log("학년/이름/성별/주소/상황/연락처/단과대학");

    let menu = await Input.getUserInput();
    let updatemongo;

    switch (menu) {
      //학년 수정
        case "학년":
            console.log("학년 입력>");
            let student_grade = await Input.getUserInput();
            updatemongo = { $set: { student_grade: student_grade } };
            await collection.updateOne({ student_id: Number(student_id) }, updatemongo);
            console.log(`${student_grade}학년으로 수정되었습니다`);
            break;

        //이름 수정
        case "이름":
        console.log("이름 입력>");
        let student_name = await Input.getUserInput();
        updatemongo = { $set: { student_name: student_name } };
        await collection.updateOne({ student_id: Number(student_id) }, updatemongo);
        console.log(`${student_name}(으)로 수정되었습니다`);
        break;

      //성별 수정
        case "성별":
            console.log("성별 입력>");
            let student_sex = await Input.getUserInput();
            updatemongo = { $set: { student_sex: student_sex } };
            await collection.updateOne({ student_id: Number(student_id) }, updatemongo);
            console.log(`성별이 ${student_sex}으로 수정되었습니다`);
            break;

        //주소 수정
        case "주소":
            console.log("주소 입력>");
            let student_address = await Input.getUserInput();
            updatemongo = { $set: { student_address: student_address } };
            await collection.updateOne({ student_id: Number(student_id) }, updatemongo);
            console.log(`주소가 ${student_address}으로 수정되었습니다`);
            break;

        //상황 수정
        case "상황":
            console.log("상황 입력>");
            let student_status = await Input.getUserInput();
            updatemongo = { $set: { student_status: student_status } };
            await collection.updateOne({ student_id: Number(student_id) }, updatemongo);
            console.log(`상태가 ${student_status}으로 수정되었습니다`);
            break;


        //연락처 수정
        case "연락처":
            console.log("연락처 입력>");
            let student_number = await Input.getUserInput();
            updatemongo = { $set: { student_number: student_number } };
            await collection.updateOne({ student_id: Number(student_id) }, updatemongo);
            console.log(`연락처가 ${student_number}로 수정되었습니다`);
            break;

        //단과대학 수정
        case "단과대학":
            const majors = await getMajorList(client);
            console.log("단과대학 목록:");
            majors.forEach((major, index) => {
            console.log(`${index+1}.${major.college}-${major.major_name}`);
            });
            console.log("단과대학 입력>");
            // let student_college = await Input.getUserInput();
            let selectedMajorIndex = await Input.getUserInput();
            let selectedMajor = majors[selectedMajorIndex - 1];
            let student_college = selectedMajor.college;
            updatemongo = { $set: { student_college: student_college } };
            await collection.updateOne({ student_id: Number(student_id) }, updatemongo);
            console.log(`단과대학이 ${student_college}로 수정되었습니다`);
            break;
        default:
            console.log("올바르지 않은 항목을 입력하셨습니다.");
        }
    }

    await wait(1000);
    await client.close();
    } //student_update end

async function professor_update() {
    const uri = process.env.DB_LOCAL_URL;
    const client = new MongoClient(uri);

    await client.connect();

    let exist = true;
    let professor_id;
  
    let collection = client.db('number1').collection('professor');
  
    //while문으로 반복실행
    while (exist) {
      //교수번호입력
      console.log(`수정할 교수의 등록번호를 입력하세요`);
      professor_id = await Input.getUserInput();
  
      let qry = {"professor_id":Number(`${professor_id}`)}
      let professor = await client.db('number1').collection('professor').findOne(qry);
  
      if (professor) {
        exist = false;
      } else {
        console.log(`입력한 교번 ${professor_id}에 해당하는 데이터가 없습니다. 다시 입력해주세요`);
      }
    await wait(1000);
    }
    //교수번호가 있으면 작업 진행
    if (!exist) {
      console.log(`선택한 교수번호: ${professor_id}`);
      console.log("수정할 항목을 입력하세요");
      console.log("이름/연락처/학과");
  
      let menu = await Input.getUserInput();
      let updatemongo;
  
      switch (menu) {
        //이름 수정
        case "이름":
          console.log("이름 입력>");
          let professor_name = await Input.getUserInput();
          updatemongo = { $set: { professor_name: professor_name } };
          await collection.updateOne({ professor_id: Number(professor_id) }, updatemongo);
          console.log(`${professor_name}으로 수정되었습니다`);
          break;
  
        //연락처 수정
        case "연락처":
          console.log("연락처 입력>");
          let professor_tel = await Input.getUserInput();
          updatemongo = { $set: { professor_tel: professor_tel } };
          await collection.updateOne({ professor_id: Number(professor_id) }, updatemongo);
          console.log(`${professor_tel}으로 수정되었습니다`);
          break;
  
        //학과 수정
        case "학과":
          const majors = await getMajorList(client);
          console.log("학과 목록:");
          majors.forEach((major, index) => {
            console.log(`${index+1}.${major.college}-${major.major_name}`);
            });
          console.log("학과 입력>");
          // let professor_major = await Input.getUserInput();
          let selectedMajorIndex = await Input.getUserInput();
          let selectedMajor = majors[selectedMajorIndex - 1];
          let professor_major = selectedMajor.major_name;
          updatemongo = { $set: { professor_major: professor_major } };
          await collection.updateOne({ professor_id: Number(professor_id) }, updatemongo);
          console.log(`학과가 ${professor_major}로 수정되었습니다`);
          break;
        
        default:
          console.log("올바르지 않은 항목을 입력하셨습니다.");
      }
    }
  
    await wait(1000);
    await client.close();
  } //professor_update end

async function lecture_update() {
    const uri = process.env.DB_LOCAL_URL;
    const client = new MongoClient(uri);

    await client.connect();

    let exist = true;
    let lecture_id;
  
    let collection = client.db('number1').collection('lecture');
  
    //while문으로 반복실행
    while (exist) {
      //강의번호 입력
      console.log(`수정할 강의의 강의번호를 입력하세요`);
      lecture_id = await Input.getUserInput();
  
      let qry = {"lecture_id":Number(`${lecture_id}`)}
      // MongoDB에서 데이터 확인
      let lecture = await client.db('number1').collection('lecture').findOne(qry);
  
        if (lecture) {
          exist = false;
        } else {
          console.log(`입력한 강의번호 ${lecture_id}에 해당하는 데이터가 없습니다. 다시 입력해주세요`);
        }
      await wait(1000);
    }
    //강의번호가 있으면 작업 진행
    if (!exist) {
      console.log(`선택한 강의번호: ${lecture_id}`);
      console.log("수정할 항목을 입력하세요");
      console.log("강의명/요일/시간/학점/전공영역");
  
      let menu = await Input.getUserInput();
      let updatemongo;
  
      switch (menu) {
        //강의명 수정
        case "강의명":
          console.log("강의명 입력>");
          let lecture_name = await Input.getUserInput();
          updatemongo = { $set: { lecture_name: lecture_name } };
          await collection.updateOne({ lecture_id: Number(lecture_id) }, updatemongo);
          console.log(`${lecture_name}으로 수정되었습니다`);
          break;
  
        //요일 수정
        case "요일":
          console.log("요일 입력>");
          let lecture_day = await Input.getUserInput();
          updatemongo = { $set: { lecture_day: lecture_day } };
          await collection.updateOne({ lecture_id: Number(lecture_id) }, updatemongo);
          console.log(`${lecture_day}으로 수정되었습니다`);
          break;
  
  
        //시간 수정
        case "시간":
          console.log("시간 입력>");
          let lecture_time = await Input.getUserInput();
          updatemongo = { $set: { lecture_time: lecture_time } };
          await collection.updateOne({ lecture_id: Number(lecture_id) }, updatemongo);
          console.log(`${lecture_time}으로 수정되었습니다`);
          break;
  
        //학점 수정
        case "학점":
          console.log("학점 입력>");
          let lecture_credit = await Input.getUserInput();
          updatemongo = { $set: { lecture_credit: lecture_credit } };
          await collection.updateOne({ lecture_id: Number(lecture_id) }, updatemongo);
          console.log(`${lecture_credit}으로 수정되었습니다`);
          break;
  
        //전공영역 수정
        case "전공영역":
          console.log("전공영역(전공/교양)>");
          let lecture_type = await Input.getUserInput();
          updatemongo = { $set: { lecture_type: lecture_type } };
          await collection.updateOne({ lecture_id: Number(lecture_id) }, updatemongo);
          console.log(`${lecture_type}으로 수정되었습니다`);
          break;
  
        default:
          console.log("올바르지 않은 항목을 입력하셨습니다.");
      }
    }
  
    await wait(1000);
    await client.close();
  } //lecture_update end


// 데이터베이스에서 전공 목록을 가져오는 함수
async function getMajorList(client) {
    const majorCollection = client.db('number1').collection('major');
    const majors = await majorCollection.find().toArray();
    return majors;
    }

    function wait(timeToDelay){
    return new Promise((resolve) => setTimeout(resolve, timeToDelay))
}

module.exports = {student_update, professor_update, lecture_update,
getMajorList, wait}

