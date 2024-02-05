require("dotenv").config()
const express = require("express")
const {app} = require("./app")
const port = process.env.PORT
const path = require("path")

app.use(express.static(path.join(__dirname, 'website')))

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, "website", "index.html"))
})

app.listen(port ,()=>{
    console.log(`server started at http://localhost:${port}`)
})
   