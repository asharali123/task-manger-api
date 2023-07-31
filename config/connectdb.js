const mongoose=require("mongoose")

const connectDB=async (DataBaseurl)=>{
    try {
        const DBOption = {
            dbname: "task-manger-api",
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        await mongoose.connect(DataBaseurl, DBOption);
        console.log("connect sucsessfully......")
    } catch (error) {
        console.log(error);
    }
}

module.exports=connectDB;