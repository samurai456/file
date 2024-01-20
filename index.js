const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const targetMsgPool = [];
const adminMsgPool = [];

app.use(express.json());
app.post('/targetMsgPool', async (req, res) => {
    if (targetMsgPool.length >= 100) {
        targetMsgPool.shift()
    }

    targetMsgPool.push(req.body.msg);

    res.send({
        status: 200
    });
});
app.get('/targetMsgPool', async (req, res) => {
    res.send({
        status: 200,
        msgs: targetMsgPool
    });
})

app.post('/adminMsgPool', async (req, res) => {
    if (adminMsgPool.length >= 100) {
        adminMsgPool.shift()
    }

    adminMsgPool.push(req.body.msg);

    res.send({
        status: 200
    });
});
app.get('/adminMsgPool', async (req, res) => {
    res.send({
        status: 200,
        msgs: adminMsgPool
    });
})

async function startApp(){
    try {
        server.listen(8000, () => console.log('server is running...'));
    } catch (e) {
        console.log(e)
    }
}

startApp();