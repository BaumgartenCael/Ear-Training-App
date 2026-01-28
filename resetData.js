import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(process.env.MONGO_URI);

async function reset() {
    try {
      await client.connect();
      const db = client.db("EarTrainers");
  
      await db.collection("eartrainers/users").drop();
      console.log("Users collection dropped");
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
    }
  }
  
  reset();