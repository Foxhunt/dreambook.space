const mongo = require("mongo")
const { send } = require("micro")

module.exports = async (req, res) => {
    const db = await mongo()

    const col = db.collection("dreams")
    
    const dreams = await col
                            .aggregate([{ $sample: { size: 5 } }])
                            .toArray()

    send(res, 200, dreams)
}
