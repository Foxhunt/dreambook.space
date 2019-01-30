const mongo = require("mongo")

module.exports = async (req, res) => {
    const db = await mongo()

    const col = db.collection("dreams")

    
    const dreams = await col
                            .aggregate([{ $sample: { size: 1 } }])
                            .project({ _id: 0 })
                            .toArray()

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(dreams))
}
