

let VacancyObj1 = {
    position_name : "QA Manual",
    required_years: 3,
    english_level: "Advanced",
    knowledge: ["postman", "mySQL", "fiddler"], 
    level :"Middle"
}


let VacancyObj2 = {
    position_name : "QA Manual",
    required_years: 0,
    english_level: "Inermediate", 
    level :"Trainee"
}

let VacancyObj3 = {
    position_name : "QA Automation",
    required_years: 2,
    english_level: "",
    knowledge: ["git", "jenkins"],
    programing_language: ["C#","JS"], 
    level :"Junior"
}


let Candidate1=new Object();
let Candidate2=new Object(VacancyObj1); //create object with inherit VacancyObj1
let Candidate3=new Object("John Dow");

console.log(Candidate2);
console.log(Candidate3);


Candidate1.__proto__=VacancyObj2;  //1st way to create inherited obj: candidate1 inherited properties of Obj2
console.log(Candidate1.english_level); // check that Canditate1 is used a proto of Obj2, via output 1 inherited param 

let Candidate4 = Object.create(VacancyObj3);//2nd way to create inherited obj
Candidate4.Surname="Smith" //add entry to object 

console.log(Candidate4.knowledge, Candidate4.Surname);

//task 4 and 5

let Engineer = { 
    company:"MyCompany",
    expirience:"4 years",
    languages: ["EN", "UA", "FR"]
}

let QAengineer =Object.create(Engineer);
QAengineer.role="Manual";
QAengineer.project="TestProjectBANK";
QAengineer.title="Middle Quality Assuarence Engineer"


console.log(QAengineer, Object.getPrototypeOf(QAengineer)); //output all details about obj QAenginee, and the proto for it

let Person = new Object();
Person.name ="Shawn Smith"
Person.place = ["Ukraine", "Kyiv", 61000]

Engineer.__proto__=Person;

console.log (QAengineer,Object.getPrototypeOf(QAengineer), Object.getPrototypeOf(Engineer))