let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");
let user = require('./user');
const PORT = process.env.PORT || 3001;

let app = express();

app.use(bodyParser.json());

app.get("/api/getusers", (req, res) => {
  res.json(user.getUsers());
});

app.post('/api/signin', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  user.validateSignIn(email,password, (result) => {
    if(result){
      res.send('Success')
    }
    else{
      res.send('Wrong username pass')
    }
  });
  
})

app.post('/api/signup', (req, res) => {
  let name=req.body.name;
  let email=req.body.email;
  let password=req.body.password;

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