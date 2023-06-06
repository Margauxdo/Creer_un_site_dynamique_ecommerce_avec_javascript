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
     
  



function showProductsCart(data, product) {
//cree une div pour afficher le produit//
const cartItem = document.createElement('article');
cartItem.classList.add('cart__item');
cartItem.dataset.productId = product.id;
cartItem.dataset.productColor = product.colors;
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
  productPrice.textContent = `${parseFloat(data.price) || 0} € `;
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
    valueQtity.setAttribute("class","itemQuantity");
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
            

  //Appel des fonctions//
  editCart();
  deleteCart();
  getTotalQuantity();
  calculateTotalPrice();
  //validationForms();
  }
          


function editCart() {

  //Selectionner tous les element du panier avec la class cart//
   const editContent = document.querySelectorAll('.cart__item');
   console.log(editContent);

     //Parcourir chaque element dans le panier(le DOM)//
     //for (let a = 0; a < editContent.length; a++){
      editContent.forEach((cartItem) =>{

      

        //element actuel du panier//
        //const cartItem = editContent[a];
       //console.log(cartItem);

       //Selectionner element entree de la quantite//
       const quantityInput = cartItem.querySelector('.cart__item__content__settings__quantity input');
       console.log(quantityInput);
        
       
       //Selectionner element de supression//
       //const deleteElement = cartItem.querySelector('.deleteItem');
       //console.log(deleteElement);
       //recuperer id a partir de l'attribut data//
       //const productId = cartItem.dataset.productId;
       //console.log(productId);

       //Ajouter un evenement pour le changement de quantité//
      quantityInput.addEventListener('change',(event)=>{
      //recuperer la quantité en tant que nombre//
      const newQuantity = parseInt(event.target.value);
      console.log(newQuantity)

      const productId = cartItem.dataset.productId;

       //mettre a jour la quantité dans le localstorage avec une cle basé sur ID//
        localStorage.setItem(`addToCart_${productId}_quantity`, newQuantity);

        // Sélectionner l'élément d'affichage de la quantité dans le DOM//
        const quantityDisplay = cartItem.querySelector('.cart__item__content__settings__quantity');
        quantityDisplay.textContent = ` Quantité : ${newQuantity}`;

        getTotalQuantity();
        calculateTotalPrice();
      });   
    });
  }
  

  
       


      

 
 





function deleteCart() {
  //Slectionner tous les elements de suppression//
const deleteElements = document.querySelectorAll('.deleteItem');
console.log(deleteElements);

//Parcourir chaque element de supression//
 deleteElements.forEach(deleteElement => {
   deleteElement.addEventListener("click",(event) => {
    event.preventDefault();

     //trouver element parent le plus proche de cart__item( de supression)//
    const cartItem = deleteElement.closest('.cart__item');
    console.log(cartItem);

    //verifier si l'élement parent existe//
     if(cartItem){
      //je recup id et sa couleur depuis le data-productId//
       const productId = cartItem.dataset.productId;
       console.log(productId);
       const productColor = cartItem.dataset.productColor;
       console.log(productColor);

       //Recup les donnees du panier depuis le localstorage//
       let productsLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
       console.log(productsLocalStorage);

      //Supprimer le produit du DOM//
      cartItem.remove();

      //Filtrer les produits du panier pour supprimer celui ou ceux qui correspondt à ID//
      productsLocalStorage = productsLocalStorage.filter(product => product.id !== productId && product.color !== productColor);
      //Mettre a jour les données du panier dans le localstorage//
      localStorage.setItem('addToCart', JSON.stringify(productsLocalStorage));
  
      getTotalQuantity();
      calculateTotalPrice();
  }
  
       });
      });
}



function getTotalQuantity() {
  //Recup tous les elements du panier avec la calss cart__item//
  const cartItems = document.querySelectorAll('.cart__item');

  let totalQuantity = 0;
  console.log(totalQuantity);

  //Parcourir chaque element du panier //
  cartItems.forEach(item => {

    //recup la qtite de article//
    const quantityElement = item.querySelector('.cart__item__content__settings__quantity input');
    console.log(quantityElement);
    const quantity = parseInt(quantityElement.value);
    console.log(quantity);
    
     //recup le nombre article//
     //const numberArticlesElement = item.querySelector('.cart__item__content__settings__quantity input');
     //console.log(numberArticlesElement);
     //const numberArticles = parseInt(numberArticlesElement.value);
     //console.log(numberArticles);

    //Ajouter la quantité de chaque article a la quantité totale//
    totalQuantity +=  quantity;
    console.log(totalQuantity);
    
    
    //Mettre a jour le HTML qui correspondt a la qtite//
    const totalQuantityElement = document.querySelector('#totalQuantity');
    console.log(totalQuantityElement);
    totalQuantityElement.textContent = totalQuantity;
    console.log(quantity);
    console.log(totalQuantityElement);
  });

  //mettre a jour la quantite total dans le localstorage//
  //localStorage.setItem('totalQuantity', totalQuantity);
  //console.log(totalQuantity);

  //evenement d ela modification de la quantite 
  //document.addEventListener('change',function(event){
    //const target = event.target;
    //console.log(target);
    //Verifier si element modifie est une quantite article//
    //if(target.classList.contains('itemQuantity')){
      //getTotalQuantity();
    }






function calculateTotalPrice() {
  //Selectionner tous les element du panier//
  const cartItems = document.querySelectorAll('.cart__item__content__description');

  //Initialiser la variable totalPrice à 0//
  let totalPrice = 0;
  console.log(totalPrice);
  let totalQuantity = 0;
  console.log(totalQuantity);
  //Parcourir chaque element du panier//
  cartItems.forEach(item => {

    //Selectionner le prix dans la description de chaque produit//
    const priceElement = item.querySelector('.cart__item__content__description p:last-child');
    console.log(priceElement);
    //Recup le texte du prix à partir de element selectionne//
    const priceText = priceElement.textContent;
    console.log(priceText);
    //Convertir le texte du prix en nombre en supprimant le symbole € + les espaces supplémentaires//
    const price = parseFloat(priceText);
    console.log(price);

    //Selectionne element de la quantite de chaque produit//
    //const quantityElement = item.querySelector('.cart__item__content__settings__quantity input.itemQuantity');
    //console.log(quantityElement);

    //verifier si le panier existe avant d'acceder a la valeur //
    //if(priceElement && quantityElement){

    //Obtenir la quantite a partir de la valeur du produit//
    //const quantity = parseInt(quantityElement.innerHTML);
    //console.log(quantity);

    //calcul du prix en multipliant le prix par la quantiite//
    //const productTotal = price * quantity;
    //console.log(productTotal);

    //Ajouter le prix total//
    //totalPrice += productTotal;
    //console.log(totalPrice);
    //}
  });

    //Ajouter la quantité au totalQuantity//
    //totalQuantity += quantity;
    //console.log(totalQuantity);
    //});

    //Mettre  ajour le prix total dans le localstorage//
    //onst productsLocalStorage = JSON.parse(localStorage.getItem('addToCart'));
    //console.log(productsLocalStorage);
    //const updatedProducts = productsLocalStorage.map(product =>{
      //const productTotal = totalPrice * (product.quantity / totalQuantity);
      //console.log(productTotal);
      //product.price = productTotal;
      //console.log(productTotal);
      //return product;
    //});
    //console.log(updatedProducts);

//Selectionner le prix total dans le HTML
  //const totalPriceElement = document.querySelector('#totalPrice');
  //console.log(totalPriceElement);
  //Mettre a jour le contenur le element prix avec le prix total arrondi a deux decimal//
  //totalPriceElement.textContent = totalPrice.toFixed(2);
  //console.log(totalPriceElement);
  
  //Mettre  ajour la quantite totale dans le DOM//
  //const totalQuantityElement = document.querySelector('#totalQuantity');
  //totalQuantityElement.textContent = totalQuantity;
  //console.log(totalQuantityElement);
}



//function validationForms() {
  //recup la ref vers element du prenom//
  //const firstNameInput = document.getElementById('firstName');
  //console.log(firstNameInput);
  //recup la ref vers erreur du message//
  //const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
  //console.log(firstNameErrorMsg);

  //Ajouter un ecouteur evenement sur la soumission du formulaire//
  //document.querySelector('.cart__order__form').addEventListener('submit', function(event){

    //Verifier si le prenom constient au moins 3 lettres//
    //if (firstNameInput.value === "" || firstNameInput.value.length > 3 || !/^a-zA-Z]+$/.test(firstNameInput.value)) {
      //Affichage du message erreur//
      //firstNameErrorMsg.textContent = " ceci est un message d'erreur";
      //Empecher la soumission du formulaire//
      //false;
      //event.preventDefault();
    //}

  //else{
    //firstNameErrorMsg.textContent =" Valide ";
    //Autorisation de la soumission du formulaire //
    //return true;
  //}
//});

  
//}

//Appel des functions pour initialiser le panier//
editCart();
deleteCart();
getTotalQuantity();
calculateTotalPrice();
//validationForms();

// Corriger pour que j utilise get afin que avant la soumission si le prenom a moins de trois lettre il repond false  avec un message "erreur" alors que si il repond 5 lettre il repond truc avec un message d" valide"



 //valider la commande/

 //regex dans un variable et faire un . test
//************pourquoi quand je modifie la valeur elle est pas prise en compte***//