const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let users = [];
let counter = 1;

// path : GET /users

app.get('/users', (req, res) => {
    res.json(users);
    
});
// path : POST /user
app.post('/users', (req, res) => {
    let user = req.body;
    user.id = counter
    counter+=1;
    users.push(user);
    res.json({
        message: "User added successfully",
        user: user
    });
});
//path : PUT /user/:id
app.patch('/users/:id', (req, res) => {
    let id = req.params.id;
    let updatedUser = req.body;
    let selectedIndex = users.findIndex(user => user.id == id);
        
    //หา user ที่มี id ตรงกับ id ที่ส่งมา
    // อัพเดทข้อมูล ของ user 
    users[selectedIndex].firstName = updatedUser.firstName||users[selectedIndex].firstName;
    users[selectedIndex].lastName = updatedUser.lastName||users[selectedIndex].lastName;
    if (updatedUser.firstName) {
    users[selectedIndex].firstName = updatedUser.firstName;
}
    if (updatedUser.lastName) {
    users[selectedIndex].lastName = updatedUser.lastName;
}

    
    res.json({
        message: "User updated successfully",
        data: {
            user: updatedUser,
            indexUpdate: selectedIndex
        }
    });
});

    //ส่ง users กลับไป
app.delete('/users/:id', (req, res) => {
    let id = req.params.id;
    //หา index จาก id ที่ต้องการลบส่งมา
    let selectedIndex = users.findIndex(user => user.id == id);
    //ลบ user
    
     res.json({
        message: "User deleted successfully",
            indexDeleted: selectedIndex
        
    });


    
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});