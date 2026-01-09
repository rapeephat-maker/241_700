//string
/*let fname = "john"
const idcard = '123'

//number
let age = 30
let height = 174.5
const pi = 3.14
fname = 'Tom'
idcard = '456'

console.log('name:', fname, 'age:', age)
console.log('idcard:', idcard)*/
/*
+
-
*
/
% mod หารเอาเศษ
 condition statement (if else ,switch)*
 == เท่ากับ
 != ไม่เทากับ
 > มากกว่า >= มากกว่าหรือเท่ากับ
 < น้อยกว่า <= น้อยกว่าหรือเท่ากับ
*/


/*let number1 = 1
let number2 = 5
let condition1 = number1 != number2 //boolean (true,false)
let number3 = number1 +' '+number2
// if else  condition
/*if(number1 >= number2){
    console.log('this if ')
    
}else if(number1 == number2){
    console.log('this else if ')
}else{
    console.log('this else ')
}*/
/*grad >= 80 A
>= 70 B
>= 60 c
>= 50 D
*/
/*let score = 55
if(score >= 80){
    console.log('Grade :A')
}else if(score >= 70){
    console.log('Grade :B')
}else if(score >= 60){
    console.log('Grade :C')
}else if(score >= 50){
    console.log('Grade :D')
}else{
    console.log('Grade :F')
}*/
/* && และ
|| หรือ
! not ไม่
*/
/*let number1 = 5
let number2 = 10
let condition = !(number1 >=3 || number2 >=11)
console.log('result:',condition)

let number = 20
if(number %2 == 0){
    console.log('you are even')
}
for 
let counter = 0
while(counter < 10){
    console.log('hi')
    counter ++
}
for(let counter = 0 ; counter <10 ; counter++){
    console.log('hi')
} 
    
array
let age1 = 20
let age2 = 25
let age3 = 30
let age = [20,25,30]
age = [200,100,50]
console.log('age1 age2 age3 :' + age1 + ' ' + age2 + ' ' + age3)
console.log(`age1 age2 age3 ${age1} ${age2} ${age3}`)
console.log('array ',age)
console.log('index ',age[0])
//ต่อ array
age.push(25)
console.log('push arry',age)
//ลบ array ตัวสุดท้าย
age.pop()
console.log('pop arry',age)

let age = [20,25,30,35,40]
if(age.includes(30)){
    console.log('มีเลข 30 อยุ่ใน array')
}
age.sort()
console.log(age)
let name_list = ['aa','bb','cc']
name_list.push('dd')
console.log(name_list)

name_list.pop()
console.log('pop name_list',name_list)
console.log('name_list',name_list.length)


for(let index = 0;index <name_list.length;index++){
    console.log('namme_list',name_list[index])
}
object 
let student = [{
    age:30,
    name:'aa',
    Grade:'A'
},{ age:35,
    name:'bb',
    Grade:'B'
}]
student.push({
    age:40,
    name:"cc"
    ,Grade:'C'
})
student.pop()

console.log(student)
console.log(student.age)
console.log(student.name)
console.log(student.Grade)

for(let index = 0; index < student.length; index++){
    console.log('Student number',(index+1))
    console.log('age',student[index].age)
    console.log('name',student[index].name)
    console.log('Grade',student[index].Grade)
}
let age1 = 30
let name1 = 'aa'
let Grade1 = 'A'
let age2 = 25
let name2 = 'bb'
let Grade2 = 'B'

function
let score1 = 55
let score= 65
let grade = ' '
//ประกาศฟังกชั่น
function calulate_GRASE(score){

if (score >=80){
    grade = 'A'
}else if(score >=70){
    grade = 'B'
}else if(score >=60){
    grade = 'C'
}else if(score >=50){
    grade = 'D'
}else{
    grade = 'F'
}
return grade      
}
//เรียกใช้ฟังกชั่น
let Grade1 = calulate_GRASE(score1)
console.log('Grade',Grade1)

array
let score = [20,30,40,50]
for (index = 0;index<score.length;index++){
    console.log("score ",score[index])
    
    
}
let newscore = score.filter((s)=>{
    return s >=30
})

newscore.forEach((ns)=>{
     console.log('newscore',ns)
})
object function*/
let students = [{
    name :'aa',
    score: 50,
    grade: 'D',
},{
    name :'bb',
    score: 80,
    grade: 'A',
}]
let student = students.find((s)=>{
    if(s.name == 'aa'){
        return true
    }
})
let double_score = students.map((s)=>{
    s.score = s.score * 2
    return s
})
let heightscore = students.filter((s)=>{
    if(s.score>=120){
        return true
    }
})
console.log(student)
console.log('double_score',double_score)
console.log('hightscore',heightscore)