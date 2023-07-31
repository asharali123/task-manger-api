const taskModel = require("../schema/taskSchema.js")
const userModel = require("../schema/userSchema.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
class TaskController {
    static registry = async (req, resp) => {
        const { name, email, password, Cpassword } = req.body;
        const userEmailCheck = await userModel.findOne({ email: email });
        if (userEmailCheck) {
            //check user is already registry
            resp.status(401).send({ "status": "falied", "message": "Email already exits" });
        } else {
            //console.log("A")
            if (name && email && password && Cpassword) {
                //check password is same
                //console.log("B")
                if (password === Cpassword) {
                    //console.log("C")
                    try {
                        //console.log("D")
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password, salt);
                        //console.log("E")
                        const doc = new userModel({
                            name: name,
                            email: email,
                            password: hashPassword
                        });
                        await doc.save();
                        // console.log("F")
                        //Generate JWT token
                        const saved_user = await userModel.findOne({ email: email });
                        const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SERECT_KEY, { expiresIn: "24h" });
                        resp.send({ "status": "success", "message": "Registration Success", "token": token });
                        //console.log("G")
                    } catch (error) {
                        console.log(error);
                        resp.send({ "status": "falied", "message": "Unable to save" });
                    }
                } else {
                    resp.status(400).send({ "status": "falied", "message": "Password are not match" });
                }
            } else {
                resp.status(401).send({ "status": "falied", "message": "All filed required" });
            }
        }
    }

    static userLogin = async (req, resp) => {
        const { email, password } = req.body
        try {
            if (email && password) {
                const userCheck = await userModel.findOne({ email: email });
                if (userCheck != null) {
                    const isMatchPassword = await bcrypt.compare(password, userCheck.password);
                    if ((userCheck.email === email) && isMatchPassword) {
                        //Generate JWT token
                        const token = jwt.sign({ userID: userCheck._id }, process.env.JWT_SERECT_KEY, { expiresIn: "24h" });
                        resp.status(200).send({ "status": "success", "message": "Welcome User", "token": token });
                    } else {
                        resp.status(400).send({ "status": "failed", "message": "Email or password is not vaild" })
                    }
                } else {
                    resp.status(400).send({ "status": "failed", "message": "you are not registry user" })
                }
            } else {
                resp.status(401).send({ "status": "Failed", "message": "All filed required" })
            }
        } catch (error) {
            console.log(error);
            resp.send({ "status": "falied", "message": "Unable to login" });
        }
    }

    static taskList = async (req, resp) => {
        try {
            const taskList = await taskModel.find();
            resp.status(200).send(taskList)
        } catch (error) {
            resp.status(404).send(error)
        }
    }

    static addTask = async (req, resp) => {
        const { title, description, status } = req.body;
        try {
            if (req.body.title && req.body.description && req.body.status) {
                const createTask = new taskModel({
                    title: title,
                    description: description,
                    status: status
                })
                await createTask.save();
                resp.status(201).send({ "msg": "Task Create" })
            } else {
                resp.status(404).send({ "msg": "All filed require" });
            }

        } catch (error) {
            resp.status(404).send(error)
        }
    }

    static updateTask = async (req, resp) => {
        const { title, description, status } = req.body;
        try {
            const saved_task = await taskModel.findById(req.params.id);
            if (saved_task) {
                let data_odj = {
                    title: title,
                    description: description,
                    status: status,
                    updatedAt: Date.now()
                }
                const updataTask = await taskModel.findByIdAndUpdate(req.params.id, data_odj);
                resp.status(200).send({ "msg": "data updated" })
            } else {
                resp.status(404).send({ "msg": "Not found" })
            }
        } catch (error) {
            resp.status(404).send(error)
        }
    }

    static deleteTask = async (req, resp) => {
        try {
            const deleteTask = await taskModel.findByIdAndDelete(req.params.id)
            resp.status(200).send({ "msg": "data deleted" })
        } catch (error) {
            resp.status(404).send(error)
        }
    }

    static searchTask = async (req, resp) => {
        try {
            const searchTask = await taskModel.find({
                "$or": [
                    { title: { $regex: req.params.key } }
                ]
            })
            resp.status(200).send(searchTask)
        } catch (error) {
            resp.status(404).send(error)
        }
    }
}

module.exports = TaskController