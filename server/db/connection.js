import {MongoClient, ServerApiVersion} from "mongodb";

const uri = "mongodb+srv://ashuaibi99:JPsV329Ib1VX4L9i@taskmanagementayman.8ftdg.mongodb.net/?retryWrites=true&w=majority&appName=TaskManagementAyman";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

try{
    await client.connect();
    await client.db("users").command({ping: 1});
    console.log("Pinged, Successfully connected!");
} catch(err){
    console.error("bruh");
}

let db = client.db("test");

export default db;