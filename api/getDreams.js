const mongo = require("mongo")

module.exports = async (req, res) => {
    const db = await mongo()

    const col = db.collection("dreams")

    const aggregation = col.aggregate([{ $sample: { size: 1 } }])
    const dreams = await aggregation.toArray()

    res.end({ dreams })
}
