
const {MongoClient} = require("mongodb");

const MONGODB_URL = "mongodb+srv://suraj:admin123@cluster0.lyboc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const MONGODB_NAME = "trailData";

const client = new MongoClient(MONGODB_URL)

module.exports = {
    db : null ,
    logIn : null,
    async connect (){
        await client.connect()
        this.db = client.db(MONGODB_NAME)
        this.logIn = this.db.collection("logIn")
    }
}
