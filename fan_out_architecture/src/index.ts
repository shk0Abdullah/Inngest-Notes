import { serve } from "inngest/express";
import { inngest } from "./inngest/client";
import express from "express";
import {functions} from "./inngest/functions";
const app = express();
app.use(express.json());
app.use(
    "/api/inngest",
    serve({
        client: inngest,
        functions
        }
    )
);


app.get("/", async(req, res)=>{
    try{
        return res.json({
            message: {
                running: "App is healthy"
            }
        })}catch{
            return res.json({
                message: {
                    error: "Error on /"
                }
            })
        }
    }
)

app.post("/hit-inngest", async(req, res, next)=>{
    try{
        const {ids} = await inngest.send({
            name: "api/hello.world",
            data: {
                email: req.body.email
            }
        })

    
    console.log("These are the ids ",ids);
    return res.json({ message: 'Event sent! from /hit-inngest' });
    }catch{
        return res.json({
            message:{
                error: "Error on inngest-hit"
            }
    })
    }
    
    
})

app.listen(3000, ()=>{
    console.log("Port is running on localhost:3000")})