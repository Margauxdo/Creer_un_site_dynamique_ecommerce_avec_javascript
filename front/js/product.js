//Étape 1 : Récupérez les paramètres de l'URL actuelle//
const paramsProduct = new URL (document.location).searchParams; 

//Étape 2 : Obtient la valeur de l'ID à partir des paramètres de l'URL//
const id = paramsProduct.get("id");

//Étape 3 : Construit l'URL de l'API en utilisant l'ID récupéré//
const url = `http://localhost:3000/api/products/${id}`; 
console.log(url);  

//Étape 4 : Définir une fonction fetchArticle pour récupérer les détails du produit à partir de l'API.//
const  fetchArticle = () => {     
    fetch(url)        
    .then (function(response) { 

     return response.json();   
    })  
    .then(function(data)  {
      //Traiter les données ici//
      imageKanap(data);
      optionColorskanap(data);
      
      
      
const appendProduct = document.getElementsByClassName('item'); 
      
const articleTitle = (document.getElementById("title").innerText = data.name); 

const articlePrice = (document.getElementById("price").innerText = data.price); 

//Créez et affichez l'image du produit //
function imageKanap(data){
    const articleImg = document.createElement("img");
      document.querySelector(".item__img").appendChild(articleImg);
      articleImg.src = data.imageUrl;
      articleImg.alt = data.altTxt; 
        console.log(articleImg);
}
const articleDescription = (document.getElementById("description").innerText = data.description); 


//Créez les options de couleur du produit //
function optionColorskanap(data) {
     
      const articleOptionsColors = document.getElementById("colors");
        for (color in data.colors){ 
       
          articleOptionsColors.innerHTML += `<option value = "${data.colors[color]}">${data.colors[color]}</option>`;
      }
  console.log(articleOptionsColors);
} 
})
}

fetchArticle();

localStorageToCart();




function localStorageToCart (){

  const addToCart = document.getElementById("addToCart");

  const quantityInput = document.getElementById("quantity");

 

  addToCart.addEventListener("click", (e) => {

    const quantityValue = parseInt(quantityInput.value);

 

    const productsToCart = {

      quantity: quantityValue,

      colors: document.getElementById("colors").value,

      id: id

    };

 

    let productsLocalStorage = [];

    if (localStorage.getItem("addToCart") !== null) {

      productsLocalStorage = JSON.parse(localStorage.getItem("addToCart"));

    }

 

    let productIndex = false;

    for (let i = 0; i < productsLocalStorage.length; i++) {

      if (

        productsLocalStorage[i].id === productsToCart.id &&

        productsLocalStorage[i].colors === productsToCart.colors

      ) {

        productIndex = i;

        break;

      }

    }

 

    if (productIndex !== false) {

      const newQuantity =

        parseInt(productsLocalStorage[productIndex].quantity) +

        parseInt(productsToCart.quantity);

 

      if (newQuantity >= 1 && newQuantity <= 100) {

        productsLocalStorage[productIndex].quantity = newQuantity;

      } else {

        alert('La quantité totale doit être comprise entre 1 et 100');

        return;

      }

    } else {

      productsLocalStorage.push(productsToCart);

    }

 

    localStorage.setItem('addToCart', JSON.stringify(productsLocalStorage));

    console.log(localStorage);

  });
  
  }
   