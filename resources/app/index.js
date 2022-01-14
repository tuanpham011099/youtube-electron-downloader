const express = require("express")
const path = require("path")
const multer = require('multer')
const fs = require("fs");
const ytdl = require("ytdl-core");
const cors = require("cors");
const app = express()
const { shell } = require("electron")

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.post('/fileasd', async(req, res) => {
    let { url, quality } = req.body;
    let info = await ytdl.getInfo(url);
    if (!url || !ytdl.validateURL(url) || !quality)
        return res.status(400)
    ytdl(url, { quality: "18" }).pipe(fs.createWriteStream(`${__dirname}/public/${info.videoDetails.title}.mp4`))
    shell.openPath(`${__dirname}/public`)
});

app.listen(8080);