const {MongoClient} = require('mongodb');
const MList = require('./major_list.js');
const LList = require('./lecture_list.js');
const Input = require('./userInput.js');

async function student_insert(){
   const uri = process.env.DB_LOCAL_URL;
   const client = new MongoClient(uri);
   console.log(`학번을 입력해주세요`);
   let student_id = await Input.getUserInput();
   console.log(`몇 학년입니까?`)     
   let grade = await Input.getUserInput();             
   console.log('이름을 입력해주세요')       
   let name = await Input.getUserInput();                  
   console.log('성별을 입력해주세요');      
   let sex = await Input.getUserInput();                   
   console.log('주소를 입력해주세요'); 
   let address = await Input.getUserInput();                  
   console.log('현재 학적상태를 입력해주세요');         
   let status = await Input.getUserInput();                
   console.log('연락처를 입력해주세요');        
   let number = await Input.getUserInput();
   console.log('소속 단과대학을 입력해주세요');
   await MList.major_list(client);
   let college = await Input.getUserInput();
   console.log('학과 번호를 입력해주세요');        
   let major_id = await Input.getUserInput();

   try {
      await client.connect();
      await createdoc(client, "number1", "student", {
         "student_id":student_id, "student_grade":grade, "student_name":name,
         "student_sex":sex, "student_address":address, "student_status" : status,
         "student_number":number,"student_college":college, "major_id" : major_id
      });    
   } finally {
      await client.close();
   }
};

async function professor_insert(){
   const uri = process.env.DB_LOCAL_URL;
   const client = new MongoClient(uri);
   console.log(`교수번호를 입력해주세요`);
   let id = await Input.getUserInput();
   console.log(`성함을 입력해주세요`)     
   let name = await Input.getUserInput();             
   console.log('연락처를 입력해주세요')       
   let tel = await Input.getUserInput();                  
   console.log('학과를 입력해 주세요');      
   let major = await Input.getUserInput();                   

   try {
      await client.connect();
      await createdoc(client, "number1", "professor", {
         "professor_id":id, "professor_name":name, 
         "professor_tel":tel, "professor_major":major
      });    
   } finally {
      await client.close();
   }
};

async function major_insert(){
   const uri = process.env.DB_LOCAL_URL;
   const client = new MongoClient(uri);
   console.log(`학과번호를 입력해주세요`);
   let id = await Input.getUserInput();
   console.log(`단과대학을 입력해주세요`)     
   let college_name = await Input.getUserInput();             
   console.log('학과명을 입력해주세요')       
   let name = await Input.getUserInput();                                     

   try {
      await client.connect();
      await createdoc(client, "number1", "major", {
         "major_id":id, "college":college_name, "major_name":name
      });    
   } finally {
      await client.close();
   }
};
async function lecture_insert(){//강의 추가하기 
   const uri = process.env.DB_LOCAL_URL;
   const client = new MongoClient(uri);
   console.log(`강의번호를 입력해주세요`);
   let id = await Input.getUserInput();
   console.log(`강의명을 입력해주세요`)     
   let name = await Input.getUserInput();             
   console.log('강의요일을 입력해주세요')       
   let day = await Input.getUserInput();                  
   console.log('강의시간을 입력해주세요');      
   let time = await Input.getUserInput();                   
   console.log('학점을 입력해주세요'); 
   let credit = await Input.getUserInput();                  
   console.log('강의형태를 입력해주세요');         
   let type = await Input.getUserInput();                
   console.log('전공번호를 입력해주세요');        
   let major_id = await Input.getUserInput();
   console.log('교수번호를 입력해주세요');        
   let professor_id = await Input.getUserInput();

   try {
      await client.connect();
      await createdoc(client, "number1", "lecture", {
         "lecture_id":id, "lecture_name":name, "lecture_day":day,
         "lecture_time":time, "lecture_credit":credit, "lecture_type" : type,
         "major_id":major_id,"professor_id":professor_id
      });    
   } finally {
      await client.close();
   }
};  

async function enrol(id){//수강신청하기 id인자값 추가하였음
   const uri = process.env.DB_LOCAL_URL;
   const client = new MongoClient(uri);
   try {
      await client.connect();
      console.log('수강 할 강의의 번호를 입력하시오')
      await LList.lecture_list();
      let num = await Input.getUserInput();
      await createdoc(client, "number1", "student_lecture", {
         "student_id":id, "middle":0, "fianl":0, "lecture_num": num
      });    
   } finally {
      await client.close();
   }

}
// enrol(console.error);
async function createdoc(client, dbname, colname, doc){
   const dbobj = await client.db(dbname);
   const col = dbobj.collection(colname);
   const result = await col.insertOne(doc);
   console.log(`성공적으로 삽입하였습니다.`);
};

module.exports={student_insert, professor_insert, major_insert, 
   lecture_insert, enrol, createdoc};  
