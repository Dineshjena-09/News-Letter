const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");


const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
});
app.post("/",function(req,res){
  const fname=req.body.fname;
  const lname=req.body.lname;
  const email=req.body.email;
  const data={
    members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
              FNAME:fname,
              LNAME:lname
            }
      }
    ]
  };
  const jsondata=JSON.stringify(data);
  const url="https://us6.api.mailchimp.com/3.0/lists/49d50637f6"
  const options={
    method:"POST",
    auth:"dinesh:c30d7398a8d9f359590d29c839e998a1-us6"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
      response.on("data",function(data){
        console.log(JSON.parse(data));
      });
  })
  request.write(jsondata);
  request.end();
})
app.post("/failure.html",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT||3000,function(){
  console.log("Server running at port at 3000");
});


//API KEY
//c30d7398a8d9f359590d29c839e998a1-us6
//49d50637f6
