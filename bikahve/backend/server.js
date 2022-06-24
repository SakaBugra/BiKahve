import control from './adminControl.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config.js';
import userRouter from './routers/userRouter.js';
import data from './data.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from "fs"
let __dirname = dirname(fileURLToPath(import.meta.url));
__dirname = __dirname.replace("backend","")
mongoose
    .connect(config.MONGODB_URL, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log('Connected to mongodb.');
    })
    .catch((error) => {
        console.log("Hata"+error);
    });
const app = express();
app.use("/frontend",express.static(__dirname + "/frontend"))
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRouter);

app.get('/api/products', (req, res) => {
    res.send(data.products);
    console.log(data.products)
});
app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found!' });
    }
});
app.get("/",(req,res)=>{

    res.sendFile("/frontend/index.html",{root:__dirname})
})

app.listen(config.PORT, () => {
    console.log('serve at http://localhost:4000');
});
app.get("/admin",(req,res)=>{ 
    res.status(200).sendFile("/frontend/admin.html",{root:__dirname})
}) 
app.post("/admin/control",(req,res)=>{
    req.on("data",(hash)=>{
        hash = hash.toString()
        control(hash).then(response => {
            res.send(response)
            }).catch(err => res.send(err))
        })
})
app.post("/newPrice",(req,res)=>{
    req.on("data",(object)=>{
        object = JSON.parse(object)
       const products = data.products
       for(const x of products){
        if(object.coffeName == x.name){
            x.price = Number(object.price)
        }
       }
       const string = `export default {
        products: ${JSON.stringify(products)}
        }
        `
       fs.writeFile("backend/data.js",string,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("Fiyat Güncellendi")
        }
       })
    })
})
