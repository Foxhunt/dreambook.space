import { IncomingMessage, ServerResponse } from "http"
import mongo = require("mongo")
import { send } from "micro"

export default async (req: IncomingMessage, res: ServerResponse) => {
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
