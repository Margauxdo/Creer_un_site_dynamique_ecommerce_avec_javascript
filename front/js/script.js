fetch('http://localhost:3000/api/products');

const obj={
    "name": "kanap-backend",
    "version": "1.0.0",
    "description": "",
    "main": "server.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "express": "^4.16.4",
      "uuid": "^3.3.2"
    }
  }

  
fetch('http://localhost:3000/api/products') 
.then(function(response){
    if(response.ok){
        return response.json();
    }
})
.then(function(value){
    console.log(value);
})
.catch(function(_err){
});

/***etape 3** */
/* recup la reponse de l'API */
fetch("http://localhost:3000/api/products")
.then (response => response.json())
.then (responseProduct => console.log(responseProduct))

/*  Intégration de chaque produits dans la page acceuil a partir du DOM */


 