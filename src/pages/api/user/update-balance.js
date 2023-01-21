import UserModel from "../../../../models/UserModel";
import ConnectDB from "../../../../utils/connectDB";

export default async function UserRegistation(req, res) {
    if (req.method == 'POST') {
        try {
            await ConnectDB();
            const { email, addAmount } = req.body;
            if (!email) {
                return res.status(404).json({ message: "Bad request" })
            }
            const candidate = await UserModel.findOne({ email: email });

            if (!candidate) {
                return res.status(404).json({ message: "Bad request" })
            }

            const userBalance = candidate.userBalance;

            const updatedUser = await UserModel.findOneAndUpdate({ email: email }, { userBalance: userBalance + (addAmount * 100) })

            return res.status(200).json(updatedUser);
        } catch (e) {
            console.log(e);
            return
        }
    } else {
        return res.status(403).json({ message: "not" })
    }
}