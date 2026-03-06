const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
let conn = null;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());


const initmysql = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8700
    });
    console.log('Connected to mysql database');
}
// path : GET /users
app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0]);
})
// path : POST /users
app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?',user);
        console.log('results:',results);
        res.json({
            massage: 'User added successfully',
            data: results[0]
        });
    }catch (error) {
        console.error('Error inserting user:',error);
        res.status(500).json({ message: 'Error adding user'});
    }
})
//psth get user
app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        res.json(results[0][0]);
        if (results[0].length === 0) {
            throw { statuscode: 404, message: 'User not found' };
        }
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            message: error.message || 'Error fetching user'
        });
    }

})
app.listen(port, async () => {
    await initmysql();
    console.log(`Server is running on http://localhost:${port}`);
});
app.put('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updatedUser = req.body;
        const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id]);
        res.json({
            message: "User updated successfully",
            data: results[0]
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }

})
//path : DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({
            message: "User deleted successfully",
            data: results[0]
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
})



/*app.use(bodyParser.json());

app.get('/testdb', (req, res) => {
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8700

    }).then((conn) => {
        conn
            .query('SELECT * FROM users')
            .then((results) => {
                res.json(results[0]);
            }).catch((err) => {
                res.json({ error: err.message });
            });
    })
})


/*app.get('/testdb-new',async (req, res) => {
    try {  
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port:8700
});
const results = await conn.query('SELECT * FROM users');
res.json(results[0]);
    }catch (err) {
        console.error('error connecting to the database:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
    
});



















// path : POST /user
app.post('/users', (req, res) => {
    let user = req.body;
    user.id = counter
    counter += 1;
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
    users[selectedIndex].firstName = updatedUser.firstName || users[selectedIndex].firstName;
    users[selectedIndex].lastName = updatedUser.lastName || users[selectedIndex].lastName;
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
*/