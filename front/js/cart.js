 const productsLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
//Je recupere le donnees stocké dans le localStoge avec la cle addToCart  et utilise la methode JSON.parse , je socke les produits recement ajoutés au panier et je peut les recup dans la page panier//

     const cartProduct = document.querySelector("#cart__items");
     console.log(cartProduct);
//je cree une variable pour preciser que les element se situeront dans la class "cart" dans le html

if (!productsLocalStorage || productsLocalStorage.length === 0) {
    console.log("mon panier est vide");//si le localstorage est null ce qui equivaut a 0 alors le panier est vide//
const infoUsers = document.createElement("p");
infoUsers.textContent = "Votre  panier est vide";
cartProduct.appendChild(infoUsers);
infoUsers.style.textAlign = "center";

//message pour informer utilisateur que le panier est vide//
  }else {
    console.log("mon panier n'est pas vide!!");//sinon mon panier n'est pas vide//
//je cree une fonction en utilisant foreach pour parcourir le tableau du localstorage et recupéré id, la couleur et la quantité//
productsLocalStorage.forEach(product => {
  //recup les infos depuis API//
fetch(`http://localhost:3000/api/products/${product.id}`)   
      .then ((response) => response.json())
          .then((data) => {
            showProductsCart(data, product);
            
         
        });
    
      })
      
    };   


//mettre dans un function////fonction supprimer et une modifier//pas les mettre dans fetch//
  
function showProductsCart(data, product) {
//cree une div pour afficher le produit//
const cartItem = document.createElement('article');
cartItem.classList.add('cart__item');
cartItem.dataset.id = product.id;
cartItem.dataset.colors = product.colors;
console.log(cartItem);

  //afficher image//
  const cartItemImg = document.createElement('div');
  cartItemImg.classList.add('cart__item__img');
  const image = document.createElement('img');
  image.src = data.imageUrl;
  image.alt = data.altTxt;
  cartItem.appendChild(cartItemImg);


  //cree la div qui comprend le titre, couleur, prix quantité et bouton supprimer//
  const cartContent = document.createElement('div');
  cartContent.classList.add('cart__item__content');

    //je cree une variable pour mettre dans la description le nom, la couleur et le prix//
    const cartContentDescription = document.createElement('div');
    cartContentDescription.classList.add('cart__item__content__description');
  
  //afficher le titre du produit//
  const productName = document.createElement('h2');
  productName.textContent = data.name;
  cartItem.appendChild(productName);
  //afficher la ou les couleurs du produit//
  const productColor = document.createElement('p');
  productColor.textContent = `Couleur : ${product.colors}`;
  cartItem.appendChild(productColor);
  //je cree une variable pour afficher le prix du produit//
  const productPrice = document.createElement('p');
  productPrice.textContent = `${data.price} € `;
  cartItem.appendChild(productPrice);

  //je cree une div pour positionner element supprimer et modifier//
const cartContentSetting = document.createElement('div');
cartContentSetting.classList.add('cart__item__content__settings');

   //je cree une div ou on va positionner la quantité et la qunatité modifier//
  const productEdit = document.createElement('div');
  productEdit.classList.add('cart__item__content__settings__quantity');
  //afficher la quantité du produit//
  const productQuantity = document.createElement('p');
  productQuantity.textContent = `Quantité : ${product.quantity}`;
  cartItem.appendChild(productQuantity);
    //creer un input pour modifier la quantité du produit//
    const valueQtity = document.createElement('input');
    valueQtity.querySelector('.cart__item__content__settings__quantity');
    valueQtity.classList.add('cart__item__content__settings__quantity');
    //cree un element input de ty^pe number en ajoutant les valeurs//
    valueQtity.setAttribute("type","number");
    valueQtity.setAttribute("class","itemquantity");
    valueQtity.setAttribute("name","itemQuantity");
    valueQtity.setAttribute("min","1");
    valueQtity.setAttribute("max","100");
    valueQtity.setAttribute("value",product.quantity);//ajout la valeur qui correspondt a la quantité choisir//

  //cree un div pour afficher element supprimer//
  const productDelete = document.createElement('div');
  productDelete.classList.add('cart__item__content__settings__delete');
  //créé un variable pour ajouter un element supprimer//
  const deleteItem = document.createElement('p');
  deleteItem.classList.add('deleteItem');
  deleteItem.textContent = `Supprimer`;
  

//  Ajouter le produit a la page panier en liant la variable qui situe les elements du panier et la variable qui positionne articles//
            cartProduct.appendChild(cartItem);
            cartItem.appendChild(cartItemImg);
            cartItemImg.appendChild(image);
            cartItem.appendChild(cartContent);
            cartItem.appendChild(cartContentDescription);
            cartContent.appendChild(cartContentDescription);
            cartItem.appendChild(productName);//
            cartContentDescription.appendChild(productName);
            cartItem.appendChild(productColor);//
            cartContentDescription.appendChild(productColor);
            cartItem.appendChild(productPrice);//
            cartContentDescription.appendChild(productPrice);
            cartItem.appendChild(cartContentSetting);//
            cartContent.appendChild(cartContentSetting);
            cartItem.appendChild(productEdit);//
            cartContentSetting.appendChild(productEdit);
            cartItem.appendChild(productDelete);//
            cartContentSetting.appendChild(productDelete);
            cartItem.appendChild(productQuantity);//
            productEdit.appendChild(productQuantity);
            cartItem.appendChild(valueQtity);//
            productEdit.appendChild(valueQtity);
            cartItem.appendChild(deleteItem);//
            productDelete.appendChild(deleteItem);
//appeler la fonction modifier et supprimer//
editCart();
deleteCart();
            
          }
          

function editCart() {

  //Selectionner tous les element du panier avec la class cart//
  const editContent = document.querySelectorAll('.cart__item');
  //Parcourir chaque element du panier//
   editContent.forEach(cartItem =>{
    
    //Selectionne input pour la qunatité et element supprimer//
     const quantityInput = cartItem.querySelector('.cart__item__content__settings');
     const deleteElement = cartItem.querySelector('.cart__item__content__settings__delete');

    //Ajouter un evenement pour le changement de quantité//
     if(quantityInput){
     quantityInput.addEventListener('change',(event)=>{
      //recuperer les nouvelle qunatité en tant que nombre 
       const newQuantity = parseInt(event.target.value);

      //Recuperer id du produit et sa couleur actuel//
       const productId = cartItem.dataset.productId;
       const productColor = cartItem.dataset.productColors;

      //mettre a jour la quantité dans le localstorage//
       const productsLocalStorageQuantity = JSON.parse(localStorage.getItem('addToCart'));
       const updateProducts = productsLocalStorageQuantity.map((product)=>{
        //Verifier si id et la couleur du produit correspondent a element actuel//
         if(product.id ===productId && product.color === productColors){
           product.quantity = newQuantity;
         }
         return product;
       });
       localStorage.setItem('addToCart',JSON.stringify(updateProducts));
      //Mettre a jour la quantité dans le DOM//
       const quantityElement = cartItem.querySelector('.cart__item__content__settings__quantity');
       quantityElement.textContent =`Quantité: ${newQuantity}`;
     });
 }
  
   if(deleteElement){
  //Ajouter un evenemnet pour le bouton suppression//
     deleteElement.addEventListener('click',() => {
      //Recup id et la couleur du produit actuel//
       const productId = cartItem.dataset.productId;
       const productColor = cartItem.dataset.productColors;

      //Supprimer le produit du localstorage//
       const productsLocalStorageQuantity = JSON.parse(localStorage.getItem('addtocart'));
       const updateProducts = productsLocalStorageQuantity.filter(
         (product) => product.id !== productId ||product.color !== productColors
       );
     
       localStorage.setItem('addToCart', JSON.stringify(updateProducts));
    

      //Supprimer le produit du DOM//
       cartItem.remove();
   
     });   
  }
 }
  )}
function deleteCart() {
const deleteContent = document.querySelectorAll('.deleteItem');
//des on supprime un produit on cree une boucle evenement//
 deleteContent.forEach(deleteItem => {
   deleteItem.addEventListener("click",(event) => {
     event.preventDefault();
     const parentItem = event.currentTarget.closest('.cart__item');
    
     if(parentItem)//si element parent//
     {
      //je recup la valeur de data.id et data.color//
       const id = parentItem.getAttribute('data-id');
       const color = parentItem.getAttribute('data-color');

      //trouver indice du produit selectionne dans le tableau du localstorage pour comparer son id et sa couleur au produit qui se trouve dans la boucle foreach// 
      //utilise findindex , la fonction callback parcourt tout le tableau jusqua ce que le retour soit positif//
     let idCheckDelete = productsLocalStorage.findIndex((p) => p.id === id && p.colors ===color);
    //si le produit est dans le localstorage//
     if (idCheckDelete !== -1){
      //supprime les produits dans le localstorage en utlisant splice//
       productsLocalStorage.splice(idCheckDelete, 1);
      //mettre a jour dans le local storage//
       localStorage.setItem("addToCart",JSON.stringify(productsLocalStorage) );

      //supprimer article de la page panier//
       parentItem.parentNode.removeChild(parentItem);

  
     } 
    
    //variable pour mettre a jour le panier en supprimant les produits du DOM qui ne sont plus present dns le localstorage//
    const cartItemElement = document.createElement('article'); 
    //const cartItem = document.querySelectorAll(".cart__item");
    
    //selectionne tous les elements du panier//
     cartItemElement.forEach((cartItem) =>{
       const id = cartItem.getAttribute("data-id");
       const color = cartItem.getAttribute("data-color");
      //recupere id et la couleur du produit dans le panier//
       const productexists = productsLocalStorage.some((product((product) => product.id === id && product.colors ===color)));
      //verif si le produit est present dans le localstorage en comparant son id et sa couleur avec les produits du localstorage//
       if(!productexists){
        //si le produit n'existe pas dans le localstorage alors il sera supprime du DOM//
         cartProduct.removeChild(cartItemElement);

       }})
     
    }
     
    }
    
 )

  });
  
  }
     


 
 


