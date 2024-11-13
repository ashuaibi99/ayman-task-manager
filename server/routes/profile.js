import express from "express";

import db from "../db/connection.js";

const router = express.Router();

router.get("/" , async (req,res) => {
    let collection = await db.collection("profiles");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body; 
        

        if (!username && !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        let collection = await db.collection("profiles");
        let user = await collection.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post("/create", async (req, res) => {
    try {
        const { username, password } = req.body; 
        

        if (!username && !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        let collection = await db.collection("profiles");
        let user = await collection.findOne({ username });

        if (!user) {
            await collection.insertOne({username: username, password: password, tasks: []})
            return res.status(200).json({ message: "Account Creation successful!"});
        }
        else{
            return res.status(400).json({ message: "Username already Created"});
        }
    } catch (error) {
        console.error("Error during account creation:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/tasks/:username", async (req, res) => {
    try {
        const { username } = req.params;

        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        const collection = await db.collection("profiles"); 
        const profile = await collection.findOne({ username });

        if (!profile) {
            return res.status(404).json({ message: "No profile found" });
        }

        res.status(200).json(profile.tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;