import UserModel from "../../../../models/UserModel";
import ConnectDB from "../../../../utils/connectDB";

export default async function UserRegistation(req, res) {
    if (req.method == 'POST') {
        try {
            await ConnectDB();
            const { email } = req.body;
            if (!email) {
                return res.status(404).json({ message: "Bad request" })
            }
            const candidate = await UserModel.findOne({ email: email });
            if (!candidate) {
                return res.status(400).json({ email: "Bad request" })
            }
            const balance = candidate.userBalance;
            const currency = candidate.currency;
            const User = { balance, currency }
            return res.json(User);
        } catch (e) {
            console.log(e);
            return
        }
    } else {
        return res.status(403).json({ message: "not" })
    }
}