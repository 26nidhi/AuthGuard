import express from "express"
import cors from "cors"
import 'dotenv/config'
import cookieParser from "cookie-parser"

const app = express()

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }))

//Api Endpoints

app.get('/', (req, res) => {
    res.send("Api working")
})


app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
})