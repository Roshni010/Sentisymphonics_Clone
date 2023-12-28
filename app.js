const express=require('express');
const app=express();
const port=8080;

//static files

app.use(express.static('static'));
app.use('/css',express.static(__dirname + 'static/css'));
app.use('/js',express.static(__dirname + 'static/js'));
app.use('/img',express.static(__dirname + 'static/img'));

app.get('',(req,res)=>{
    res.sendFile(__dirname+"template/web.html")
})

app.get('logged',(req,res)=>{
    res.sendFile(__dirname+"template/logged.html")
})

//listen to port 

app.listen(port,()=>console.info('listen on port ${port}'));