const express = require("express")
const cors = require("cors")
const User = require("./config")


const app = express();

app.use(express.json())
app.use(cors())

app.get("/", async (req, res) => {
    const snapshot = await User.get();
    const list = snapshot.docs.map((doc) => ({ id:doc.id,...doc.data() }))
    res.send(list);
})

app.post("/create", async (req, res) => {
    const data = req.body
    console.log("Data of Users ",data);
    await User.add(data)
    res.send({msg:"User Added"})
})

app.put("/update", async (req, res) => {
    const id = req.body.id
    delete req.body.id
    const body = req.body
    await User.doc(id).update(body)
    res.send({ msg: "User Updated" })
})

app.delete("/delete", async (req, res) => {
    const id = req.body.id
    await User.doc(id).delete()
    res.send({ msg: "Deleted" })
})

app.listen(4000, () => {
    console.log("Up and Running on port 4000");
})