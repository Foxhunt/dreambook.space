const mongo = require("mongo")
const { send } = require("micro")

module.exports = async (req, res) => {
    try {
        const db = await mongo()
    
        const col = db.collection("dreams")
        
        const dreams = await col
                                .aggregate([{ $sample: { size: 10 } }])
                                .toArray()
    
        send(res, 200, dreams)
    } catch (error) {
        console.error(error)
    }
}
