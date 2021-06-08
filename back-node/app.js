let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");
let user = require('./user');
const PORT = process.env.PORT || 3001;

let app = express();

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post('/api/signin', (req, res) => {
  var user_name=req.body.email;
  var password=req.body.password;
  user.validateSignIn(user_name,password,function(result){
    if(result){
      res.send('Success')
    }
    else{
      res.send('Wrong username pass')
    }
  });
  
})

app.post('/api/signup', (req, res) => {
  var name=req.body.name;
  var email=req.body.email;
  var password=req.body.password;

  if(name && email && password){
  	user.signup(name, email, password)
    console.log("Данные получены");
  }
  else{
  	res.send('Failure');
  }
})

app.listen(PORT, () => {
    console.log(`Started listening on port ${PORT}`);
})