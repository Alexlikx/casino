import UserModel from "../../../../models/UserModel";
import ConnectDB from "../../../../utils/connectDB";

export default async function UserRegistation(req, res) {
    if (req.method == 'POST') {
        try {
            const { email, password, phoneNumber, currency } = req.body;
            if (!email || !password || !phoneNumber || !currency) {
                return res.status(404).json({ message: "Bad request" })
            }
            const candidate = await UserModel.findOne({ email: email });
            if (candidate) {
                return res.status(400).json({ email: "Такая почта уже зарегистрирована" })
            }
            const telcandidate = await UserModel.findOne({ phoneNumber: phoneNumber });
            if (telcandidate) {
                return res.status(400).json({ tel: "Такой номер телефона уже был зарегистрирован" })
            }
            await ConnectDB();
            const user = await UserModel.create({ email, password, phoneNumber, currency, role: 'USER', userBalance: 0 });
            return res.json({ user });
        } catch (e) {
            console.log(e);
        }
    }
}