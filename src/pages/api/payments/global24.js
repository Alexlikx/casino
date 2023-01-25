import Global24Payments from "../../../../models/Globa24Payment";
import ConnectDB from "../../../../utils/connectDB";

export default async function UserRegistation(req, res) {
    if (req.method == 'POST') {
        try {
            await ConnectDB();
            const { txID, timestamp, direction, type, src, dst, amount, secret_key } = req.body;
            const secretKey = 'Jjspl86av42nk'

            if (secretKey !== secret_key) {
                return res.status(401).json({ message: "Отказано в доступе" })
            }

            if (!txID || !timestamp || !direction || !type || !src || !dst || !amount || !secret_key) {
                return res.status(400).json({ message: 'Bad request' })
            }

            const payment = await Global24Payments.create({ txID, timestamp, direction, type, src, dst, amount, secret_key })

            return res.json({ payment });
        } catch (e) {
            console.log(e);
            return
        }
    } else {
        return res.status(403).json({ message: "not" })
    }
}