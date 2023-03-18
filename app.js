const express = require("express");
const path = require("path");

const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://127.0.0.1/imgid', {useNewUrlParser: true});
const port = 4000;

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
   username: String,
   password: String
  });
  const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
//app.use(express.static('static',option))
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/register', (req, res)=>{
    
    const params = {}
    res.status(200).render('register.pug', params);
})

app.post('/register', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.status(200).render('base.pug');
    }).catch(()=>{
        res.status(400).send("Item was not saved to the Database")
    });
});

app.get('/login', (req, res)=>{
    res.status(200).render('login.pug');
    })

    app.post('/login', (req, res)=>{
        //check user exist
        var myData =  Contact({username: req.body.username});
        if(myData){
            const result = req.body.password === user.password;
            if (result) {
                res.render("success");
              }
              else {
                res.status(400).json({ error: "password doesn't match" });
              }
            } else {
                res.status(400).json({ error: "User doesn't exist" });
               
        }
        })














    app.get('/f1', (req, res)=>{
    
        const params = {}
        res.status(200).render('f1.pug', params);
    })







    app.get('/scqform', (req, res)=>{
    
        
        res.status(200).render('scqform.pug');
    })








    app.get('/mcqform', (req, res)=>{
    
        
        res.status(200).render('mcqform.pug');
    })





    app.get('/yesno', (req, res)=>{
    
        
        res.status(200).render('yesno.pug');
    })

   

    
    
  //  res.status(200).render('contact.pug'); give error as do baar send krne ke koshish kr rhe hai


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
 