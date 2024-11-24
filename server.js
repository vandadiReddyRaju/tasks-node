const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize database
const db = new sqlite3.Database("./tasks.db", (err) => {
    if (err) {
        console.error("Error connecting to database:", err);
    } else {
        console.log("Connected to SQLite database");
    }
});

// GET: Fetch all tasks
app.get("/tasks", (req, res) => {
    const query = "SELECT * FROM tasks";
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error("Error fetching tasks:", err);
            res.status(500).send("Error fetching tasks");
        } else {
            res.json(rows); // Send fetched rows as JSON
        }
    });
});

// POST: Add a new task
app.post("/tasks", (req, res) => {
    const { id, title, description, due_date, status } = req.body;

    if (!id || !title || !description || !due_date || !status) {
        return res.status(400).send("All fields are required");
    }

    const query = `
        INSERT INTO tasks (id, title, description, due_date, status)
        VALUES (?, ?, ?, ?, ?)
    `;
    const params = [id, title, description, due_date, status];

    db.run(query, params, function (err) {
        if (err) {
            console.error("Error adding task:", err);
            res.status(500).send("Error adding task");
        } else {
            res.send("Task added successfully");
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
