const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();

const port = 3000;

app.use(express.json())

const db = new sqlite3.Database("./tasks.db");

app.get("/tasks",async(req,res)=>{
    const query = `
    SELECT * FROM tasks`;
    console.log("Got got");
    const ans = await db.all(query);

    

    res.send(ans.json());
})

app.post("/tasks", async(req,res) =>{

    const {id,title,description,due_date,status} = req.body;

    const query = `INSERT INTO tasks(id,title,description,due_date,status)
    values (${id},${title},${description},${due_date},${status})`

    await db.run(query);

    res.send("Task added successfully");
} )

app.listen(port , () =>{
    console.log(`server running at${port}`)
})

