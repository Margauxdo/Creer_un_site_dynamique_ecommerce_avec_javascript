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

  addToCart.addEventListener ("click",() =>{
const quantityValue = parseInt(quantityInput.value);


  //Créez un objet productsToCart pour stocker les informations du produit sélectionné//
  const productsToCart = {
      quantity : quantityValue,
      colors : document.getElementById("colors").value, 
      id : id 
    };
    console.log(productsToCart);

    //Vérifiez si le localstorage contient déjà des produits//
let productsLocalStorage = [];
if(localStorage.getItem("addToCart") !== null )
  {
    productsLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
    //si le localstorage contient deja des produits on le recupere dans un tableau//
  }
  //Initialisez une variable productFind pour savoir si le produit est déjà dans le localstorage//
  let productFind = false;

  //Parcourez les produits du localstorage pour vérifier s'ils correspondent au produit actuel//
  productsLocalStorage.forEach(function(product){
    if(
      product.id === productsToCart.id && 
      product.colors === productsToCart.colors
    ){
//Si le produit est déjà dans le localstorage, mettez à jour la quantité//
const newQuantity = parseInt(product.quantity) + parseInt(productsToCart.quantity);       ///erreur quand joute une quantite j ajoute la meme quantite du meme produit il ajoute + 1 +2 +3 +4 +5
//Vérifiez que la nouvelle quantité est entre 1 et 100//
if(newQuantity <= 100 && newQuantity >= 0){
  product.quantity = newQuantity.toString();
  //localStorage.setItem("addToCart", JSON.stringify(productsLocalStorage));
  productFind = true;
}else{
  alert('la quantité totale doit être comprise entre 1 et 100');
return;
}


  }
});
//Si le produit n'est pas déjà dans le localstorage, ajoutez-le//
if(!productFind){
 productsLocalStorage.push(productsToCart);
}
//Stockez les produits mis à jour dans le localstorage//
localStorage.setItem('addToCart', JSON.stringify(productsLocalStorage));
console.log(localStorage);
 //}
})
  
  }
   