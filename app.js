const express=require('express');
const app=express();
const fs=require('fs');
const { deflateRaw } = require('zlib');

app.set('view engine','ejs');

app.get('/',function(req,res){
    fs.readdir(`./uploads/`,{withFileTypes:true},function(err,files){
      
        // // Loop through each file in the directory
        // for (let file of files) {
        //     // Check if it's a directory using isDirectory() method
        //     if (file.isDirectory()) {
        //         console.log(`${file.name} is a folder`);
        //     } else {
        //         console.log(`${file.name} is a file`);
        //     }
        // }
           
      
        res.render('front.ejs',{files});
    })
    
})


app.get('/show/:file',function(req,res){
    fs.readFile(`./uploads/${req.params.file}`,{encoding:'utf-8'},function(err,data){
        res.render("Show",{data,titles:req.params.file});
    });
})

app.get('/delete/:file',function(req,res){
    fs.unlink(`./uploads/${req.params.file}`,function(err){
        if(err)throw err;
        else res.redirect('/');
    });
})





app.get('/new',function(req,res){
    res.render('note.ejs');
})

app.get('/edit/:title',function(req,res){
    const title=req.params.title;
    fs.readFile(`./uploads/${title}`,{encoding: 'utf-8'},function(err,data)  
    {res.render('updation.ejs',
        {title:title,
        defd:data});})
  
})

app.get('/update/:old',function(req,res){
    fs.rename(`./uploads/${req.params.old}`,`./uploads/${req.query.title}`,function(err){
        fs.writeFile(`./uploads/${req.query.title}`,req.query.description,function(err,data){
            res.redirect('/');
        })
    })
})



app.get('/save',function(req,res){
    
    fs.writeFile(`./uploads/${req.query.title}.txt`,req.query.description,function(err){
if(err){
    console.log(err);
}else{
    res.redirect('/');
}
    });
   
})

app.listen(3000);
