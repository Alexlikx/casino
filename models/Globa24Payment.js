import { model, models, mongoose } from 'mongoose';

const Global24PaymentsModel = new mongoose.Schema({
    txID: { type: String },
    timestamp: { type: String },
    direction: { type: String },
    type: { type: String },
    src: { type: String },
    dst: { type: String },
    amount: { type: Number },
    secret_key: { type: String }
})

const Global24Payments = models.global24payments || model('global24payments', Global24PaymentsModel);

export default Global24Payments;