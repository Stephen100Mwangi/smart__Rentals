import mongoose from "mongoose";

const Listing = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        required: true
    },
    renttype: {
        type: String,
        required: true,
    },
    capacity:{
        type: Number,
        required: true
    }
},{timeStamps: true})

const RentList = mongoose.model("Rentals", Listing);
export default RentList