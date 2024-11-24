const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./tasks.db");


db.serialize(()=>{
    db.run(
        `
        CREATE TABLE IF NOT EXISTS tasks(
        id  TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        due_date TEXT NOT NULL,
        status TEXT NOT NULL
        )`
    )

    console.log("Table created successfully")
})