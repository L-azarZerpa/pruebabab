var express = require('express');
const db = require('../database');

var router = express.Router();

/* GET home page. */

require('dotenv').config()


      
const apiKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJkYXRlIjoiMjAyMy0xMi0wM1QwODoyODo0Mi42OTdaIiwiaWF0IjoxNzAxNTkyMTIyfQ.j025A3ec9zMSQQ9mFtn13LQKRO1gzcHtW0ukhEGXI2I";
      const apiUrl = "https://fakepayment.onrender.com";

      const paymentData = {
        "amount": "1000",
        "card-number": "4111111111111111",
        "cvv": "123",
        "expiration-month": "01",
        "expiration-year": "2024",
        "full-name": "APROVED",
        "currency": "USD",
        "description": "cool stuff",
        "reference": "payment_id:46",
      };

router.get('/', function(req, res, next) {
  db.selectImagesAndProducts(function (productosConImagenes) {
    db.selectCategoria(function (categorias) {
      res.render('index', { title: 'Registros del formulario', productosConImagenes: productosConImagenes, categorias: categorias  });
    });
  });
});

 







 
  


router.post('/admin/agregarImagenes', function(req, res, next) {
  let url = req.body.url
  let producto_id = req.body.producto_id
  let destacado = req.body.destacado
  let id = req.body.id;
  if (id) {
    if (destacado == "si" || destacado == "no") {
    db.updateImg(id, producto_id, url, destacado); // call update function
  }
  } else {
    if (destacado == "si" || destacado == "no") {
      db.insertImagen(producto_id, url, destacado) // call insert function
    }


    
  }
  res.redirect('/imagenes');
});


router.post('/admin/agregarCategoria', function(req, res, next) {
  let nameCategoria = req.body.nameCategoria;
  let idCategoria = req.body.idCategoria
  if (idCategoria) {
    db.updateCategoria(idCategoria, nameCategoria); // call update function
  } else {
    db.insertCategoria(nameCategoria); // call insert function
  }
  res.redirect('/categoria');
});

router.post('/admin/agregar', function(req, res, next) {
  let name = req.body.name;
  let code = req.body.code;
  let price = req.body.price;
  let description = req.body.description;
  let brand  = req.body.brand;
  let size  = req.body.size;
  let categoria_id = req.body.categoria_id


  let id = req.body.id; // new line to get id from request body
  if (id) {
    db.update(id, name, code, price, description,brand, size,categoria_id); // call update function
  } else {
    db.insert(name, code, price, description,brand, size,categoria_id); // call insert function
  }
  res.redirect('/admin');
});














const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy


router.use(express.urlencoded({extended:true}));

router.use(cookieParser('mi'));

router.use(session({
    secret:'mi',
    resave:true,
    saveUninitialized:true
}));

router.use(passport.initialize());
router.use(passport.session());



   passport.use(new PassportLocal(function(username,password,done){
    if (username === process.env.NOMBRE  && password === process.env.CONTRASENA) 
    return done(null,{id:1,name:"cody"})
    done(null,false)
}))




passport.serializeUser(function (user,done) {
 done(null,user.id)   
})

passport.deserializeUser(function (id,done) {
  done(null,{id:1,name:"cody"})  
})











router.get('/admin',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('admin', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});











router.get("/login",(req,res)=>{
  res.render('login', { title: 'login' });
})

router.post("/login",passport.authenticate('local',{
  successRedirect:"/admin",
  failureRedirect:"/login"
}))












router.get('/admin/agregar',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('agregar', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});

router.get('/admin/agregarCategoria',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  res.render('agregarCategoria', { title: 'Registros del formulario'});
});
router.get('/admin/agregarImagenes',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  res.render('agregarImagenes', { title: 'Registros del formulario'});
});







router.get('/admin/:id/actualizar',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  let idp = req.params.id
  console.log(idp);
  db.select2(idp,function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('actualizar', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});


router.get('/admin/:id/delete',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  let iddp = req.params.id
  console.log(iddp);
  db.delete(iddp);
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('admin', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});

















router.get('/admin/:id/actualizarCat',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => { 
  let idc = req.params.id
  console.log(idc);
  db.select(function (productos) {
    db.selectCategoria2(idc,function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('actualizarCat', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});


router.get('/categoria/:id/delete',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  let iddc = req.params.id
  console.log(iddc);
  db.delete2(iddc);
  let iddx = req.params.id
  console.log(iddx);
  db.delete4(iddx);
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('categoria', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});










router.get('/admin/:id/actualizarImg',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  let idImg = req.params.id
  console.log(idImg);
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen2(idImg,function (imagenes) {
        res.render('actualizarImg', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});


router.get('/imagenes/:id/delete',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {   
  let iddi = req.params.id
  console.log(iddi);
  db.delete3(iddi);
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('imagenes', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});








router.get('/categoria',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('categoria', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});
router.get('/imagenes',(req,res,next)=>{
  if(req.isAuthenticated()) return next();

  res.redirect("/login")
},(req, res) => {
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('imagenes', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});




router.get('/producto/:id',(req,res,next)=>{
  let idImg = req.params.id
  console.log(idImg);
  db.selectImagesAndProducts3(idImg,function  (productosConImagenes3) {
  db.selectImagesAndProducts2(idImg,function 
  (productosConImagenes2)  {
    db.selectCategoria(function (categorias) {
      res.render('producto', { title: 'Registros del formulario',productosConImagenes3:productosConImagenes3, productosConImagenes2: productosConImagenes2, categorias: categorias });
    });
     });
  })
    
    });
    
   

    const methods = require('../controllers/authentication.controller');
    const authorization = require('../middlewares/authorization');
   
    router.post("/api/login",methods.login)
    router.post("/api/register",methods.register)
    
    router.get("/register",authorization.soloPublico,(req,res)=>{
      res.render('register', { title: 'registro'});
    })
    router.post('/register', function(req, res, next) {
      
      res.redirect('/clientes');
    });
    router.get("/login2",authorization.soloPublico,(req,res)=>{
      res.render('login2', { title: 'registro'});
    })
    router.post('/login2', function(req, res, next) {
      let username = req.body.user;
      let password = req.body.password;
      db.insertClientes(username,password)
      res.redirect('/login2');
    });
 
    router.get("/pago",authorization.soloAdmin,(req,res)=>{
        res.render('pago', { title: 'clientes'});
    })

    router.post('/pago', async function(req, res, next) {


      const apiKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJkYXRlIjoiMjAyMy0xMi0wM1QwODoyODo0Mi42OTdaIiwiaWF0IjoxNzAxNTkyMTIyfQ.j025A3ec9zMSQQ9mFtn13LQKRO1gzcHtW0ukhEGXI2I";
      const apiUrl = "https://fakepayment.onrender.com";


      let amount = req.body.amount;
      let cardNumber = req.body.card;
      let cvv = req.body.cvv;
      let expirationMonth = req.body.month;
      let expirationYear = req.body.year;
      let fullName = req.body.full;
      let currency = req.body.currency;
      let description = req.body.description;
      let reference = req.body.reference;
   
      
      
      const paymentData = {
        
        "amount": amount,
        "card-number": cardNumber,
        "cvv": cvv,
        "expiration-month": expirationMonth,
        "expiration-year": expirationYear,
        "full-name": fullName,
        "currency": currency,
        "description": description,
        "reference": reference,
      };
        
     
      try {
        pagar = () => {
          fetch(apiUrl + "/payments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(paymentData),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Response:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        };
        pagar()
        res.redirect('/pago');
      } catch (error) {
        console.error(error);
      }

      
    });

   



    router.get("/clientes",(req,res)=>{
      db.selectClientes(function (clientes) {
        res.render('clientes', { title: 'clientes', clientes:clientes});
      })
    })

    router.get('/clientes/:id/delete',(req, res) => {   
      let iddcl = req.params.id
      console.log(iddcl);
      db.deletecli(iddcl);
      db.selectClientes(function (clientes) {
        res.render('clientes', { title: 'clientes', clientes:clientes});
      })
    
    });
    

let data
    db.selectClientes(function (clientes) {
       data = clientes
      
    });
    
    console.log(data);

     
    

module.exports = router;  