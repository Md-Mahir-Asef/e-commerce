import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/test", (req, res) => {
    console.log("Hitter Test route.");
    res.json({
        message: "Connected to server.",
    });
});

export default app;
