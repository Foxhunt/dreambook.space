const mongo = require("mongo")
const { json, send } = require("micro")

module.exports = async (req, res) => {
    try {
        const db = await mongo()
        let { text } = await json(req)

        let text = text.trim()

        // prevent empty strings
        if (text === "") {
            throw new Error("The submitted Dream was empty.")
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
