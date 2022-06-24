import mongoose from "mongoose"
import User from "./models/userModel.js"

function control(hash){
    return new Promise((resolve,reject)=>{
        User.findById(hash,(err,data)=>{
            if(err){
                reject(err)
                }
                else{
                    resolve(data)
                }
            }) 
    })
    }
export default control
