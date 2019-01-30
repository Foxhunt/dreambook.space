const MongoClient = require("mongodb").MongoClient

const MONGODB_USER = process.env.MONGODB_USER
const MONGODB_PASS = process.env.MONGODB_PASS
const MONGODB_NAME = process.env.MONGODB_NAME

const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_NAME}.mongodb.net/test?retryWrites=true`

// check if env vars are there
if (!MONGODB_USER || !MONGODB_PASS || !MONGODB_NAME) {
    throw new Error("Missing MONGODB credentials")
}

let client = null

module.exports = function getDb() {
    // don't reuse an unconnected client
    if (client && !client.isConnected) {
        client = null
        console.log("[mongo] client discard")
    }

    // create client so we can use it
    if (client === null) {
        client = new MongoClient(MONGODB_URI, {
            bufferMaxEntries: 0
        })
        console.log("[mongo] client init")
    } else if (client.isConnected) { // return db because we already have a connected client
        console.log("[mongo] client connected, quick return")
        return client.db("dreambook")
    }

    // connect and resolve with a db so we can use it
    return new Promise((resolve, reject) => {
        client.connect(err => {
            if (err) {
                client = null
                console.error("[mongo] client err", err)
                return reject(err)
            }

            console.log("[mongo] connected")
            resolve(client.db("dreambook"))
        })
    })
}
