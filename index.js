const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const db = require("./db/index.js");
const { player, team } = db;
db.sequelize.sync();

app.get("/playerInfo", async(req, res) => {
    info = await player.findAll();
    res.json(info);
});

app.get("/playerInfo/:id", async(req, res) => {
    id = req.params.id;
    info = await player.findOne({
        //attributes: ['name', ['tid','team'] , 'age'], สามารถเลือกเฉพาะ attributes ที่ต้องการได้ และ ['tid','team'] เขียนเป็น sql ก็จะได้ แบบนี้ครับ tid AS team
        where: { pid: id },
    });
    if (!info) {
        res.sendStatus(500);
    } else {
        res.json(info);
    }
});

app.post("/playerInfo", async(req, res) => {
    data = req.body.data;
    try {
        info = await player.create({
            name: data.name,
            age: data.age,
            position: data.position,
            tid: data.tid,
        });
        if (!info) {
            res.sendStatus(500);
        } else {
            res.status(200).json(info);
        }
    } catch (err) {
        console.log(err);
    }
});

app.put("/playerInfo/:id", async(req, res) => {
    id = req.params.id;
    info = await player.update({ position: "ST" }, {
        where: { pid: id },
    });
    if (!info) {
        res.sendStatus(500);
    } else {
        res.sendStatus(200);
    }
});

app.delete("/playerInfo/:id", async(req, res) => {
    id = req.params.id;
    info = await player.destroy({
        where: { pid: id },
    });
    if (!info) {
        res.sendStatus(500);
    } else {
        res.sendStatus(200);
    }
});

app.use((_req, res) => {
    res.sendStatus(501);
});

app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`);
});