<h1> Brief API docs for Amongpop leaderboard </h1>

**GET** /api/users
<br>
// get leaderboard
<br>
`response = [ {name:"abc", "score": 20} ]` 

**GET**  /api/users/:name
<br>
// check if this username is available or not
<br>
`response = { "status": false, "message": "This is username is not available" }` 
<br>
--> มีคนใช้ usernameนี้ไปแล้ว


`response = { "status": true, "message": "This is username is available" }`
<br>
--> เข้าเกมด้วย username นี้ได้

**POST** /api/users/:name
//update user score
<br>
`request body = { "score": 69 }`
<br>
`response = { "name": "abc", "score": 69 }`
<br>
ถ้าเป็นusernameใหม่จะสร้างข้อมูลใหม่ในdb ถ้ามีusernameอยู่แล้วจะเขียนข้อมูลทับลงไป 