const mongo = require("mongo")
const { json, send } = require("micro")

module.exports = async (req, res) => {
    try {
        const [ db, { text } ] = await Promisse.all([mongo(), json(req)])
    
        const col = db.collection("dreams")
    
        const insertCount = await col.insertOne({ text })

        send(res, 200, "Dream was added")    
    } catch(error) {
        console.error(error)
        send(res, 500, "error")
    }
}
