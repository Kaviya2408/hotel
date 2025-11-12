const express=require('express')
const bodyParser=require('body-parser')
const mysql=require('mysql')
const path=require('path')

const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname))

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'2624',
    database:'hotelusers' //change to your database name
})

db.connect(err=>{if(err)throw err;console.log("MySQL Connected")})

app.post('/signup',(req,res)=>{
    const{name,email,phone,password,address}=req.body
    const sql="INSERT INTO users(name,email,phone,password,address) VALUES(?,?,?,?,?)"
    db.query(sql,[name,email,phone,password,address],err=>{
	if(err){
		console.log(err)
		return res.send("Error: "+err.message)
	}
	res.redirect('index.html')
    })
})

app.post('/login',(req,res)=>{
    const{email,password}=req.body
    const sql="SELECT * FROM users WHERE email=? AND password=?"
    db.query(sql,[email,password],(err,result)=>{
        if(err)return res.send("Error")
        if(result.length==0)return res.send("Invalid email or password")
        res.redirect('index.html')
    })
})

app.listen(3000,()=>console.log("Server running at http://localhost:3000"))
