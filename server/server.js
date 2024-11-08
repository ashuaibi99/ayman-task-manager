import express from "express";
import cors from "cors";
import profiles from "./routes/profile.js"

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json);
app.use("/profiles", profiles);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});