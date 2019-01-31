const mongo = require("mongo")
const { json, send } = require("micro")

module.exports = async (req, res) => {
    try {
        const db = await mongo()
        const { text } = await json(req)

        if (text === "") {
            throw new Error("No Dream was submitted.")
        } else {
            const col = db.collection("dreams")

            await col.insertOne({ text })

            send(res, 200, "Thank you! We collected your Dream.")
        }
    } catch(error) {
        console.error(error)
        send(res, 500, "Sorry i was not able to collect your Dream.")
    }
}
