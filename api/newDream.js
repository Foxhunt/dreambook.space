const mongo = require("mongo")
const { json, send } = require("micro")

module.exports = async (req, res) => {
    try {
        const [ db, { text } ] = await Promise.all([mongo(), json(req)])
    
        const col = db.collection("dreams")
    
        const insertCount = await col.insertOne({ text })

        if (insertCount === 1) {
            send(res, 200, "Dream was added")   
        } else {
            throw new Error("could not insert Dream!")
        }
    } catch(error) {
        console.error(error)
        send(res, 500, "error")
    }
}
