 //Recuperer les donnees du localstorage//
 let productsLocalStorage = JSON.parse(localStorage.getItem('addToCart')) || [];
 console.log(productsLocalStorage);
 
     const cartProduct = document.querySelector("#cart__items");
     console.log(cartProduct);
//je cree une variable pour preciser que les element se situeront dans la class "cart" dans le html

if (!productsLocalStorage || productsLocalStorage.length === 0) {
    console.log("mon panier est vide");//si le localstorage est null ce qui equivaut a 0 alors le panier est vide//
const infoUsers = document.createElement("p");
infoUsers.textContent = "Votre  panier est vide";
cartProduct.appendChild(infoUsers);


//message pour informer utilisateur que le panier est vide//
  }else {
    console.log("mon panier n'est pas vide!!");//sinon mon panier n'est pas vide//
//je cree une fonction en utilisant foreach pour parcourir le tableau du localstorage et recupéré id, la couleur et la quantité//
productsLocalStorage.forEach( product => {
  //recup les infos depuis API//
fetch(`http://localhost:3000/api/products/${product.id}`)   
      .then ((response) => response.json())
          .then((data) => {
            showProductsCart(data, product);
            editCart();
            getTotalQuantity();
            calculateTotalPrice();
            deleteCart();
        }
        );
    
      })
validationForms();
orderConfirmation();
placeOrder();
    }  
     
  



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
    document.querySelector('.cart__item__content__settings__quantity');
    //valueQtity.querySelector('.cart__item__content__settings__quantity');
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
            

  }
          


function editCart() {
    //Selectionner element entree de la quantite//
  
    const quantityInput = document.querySelectorAll('.itemQuantity');
    console.log(quantityInput);

    //element actuel du panier//
    console.log(quantityInput);
  
   quantityInput.forEach(quantityOneInput => {
  
   quantityOneInput.addEventListener('change', (event) => {
  
        //recuperer la quantité en tant que nombre//
  
        if (quantityInput) {
  
          const newQuantity = parseInt(event.target.value);
          console.log(newQuantity);

          console.log(quantityInput);

  
          //mettre a jour la quantité dans le localstorage avec une cle basé sur ID//
  
          localStorage.setItem('addToCart', JSON.stringify(productsLocalStorage));

          
  
          // Sélectionner l'élément d'affichage de la quantité dans le DOM//
  
          const quantityDisplay = document.querySelector('.itemQuantity');
  
          quantityDisplay.textContent = ` Quantité : ${newQuantity}`;
  
          console.log(quantityDisplay);

          
   
  
  

  
        }
  

  
 
      });
  
})
  }

  

  
       
function deleteCart() {
  
  //Slectionner tous les elements de suppression//
const deleteElements = document.querySelectorAll('.deleteItem');
console.log(deleteElements);

//Parcourir chaque element de supression//
 deleteElements.forEach(deleteElement => {
   deleteElement.addEventListener("click",(event) => {
    event.preventDefault();

    //reference a element parent//
    const cartItem = deleteElement.closest('.cart__item');

    //verifier si l'élement parent existe//
     if(cartItem){
      //je recup id et sa couleur depuis le DOM//
       ////jfais une boucle foreach je cherche tous les element input de la page web et non le html//


        const productId = cartItem.dataset.productId;
        console.log(productId);
        const productColor = cartItem.dataset.productColor;
        console.log(productColor);
       //Recup les donnees du panier depuis le localstorage//
      JSON.parse(localStorage.getItem("addToCart"));
       //console.log(productsLocalStorage);

      //Supprimer le produit du DOM//
      cartItem.remove();

      //Filtrer les produits du panier pour supprimer celui ou ceux qui correspondt à ID//
       JSON.parse(localStorage.getItem('addToCart'));
      
       const updateProducts= productsLocalStorage.filter(product => product.productId !== productId && product.productColor !== productColor);
      console.log(updateProducts);
       //Mettre a jour les données du panier dans le localstorage//
      localStorage.setItem('addToCart', JSON.stringify(productsLocalStorage));
  

  
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
    const quantityElement = item.querySelector('.itemQuantity');
    console.log(quantityElement);
    const quantity = parseInt(quantityElement.value);
    console.log(quantity);
    

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
}







function calculateTotalPrice() {
  
 //Selectionner tous les elements du panier//
  const cartItems = document.querySelectorAll('.cart__item');
  console.log(cartItems);
  //initialiser la variable a 0 pour stocker le prix total//  
  let totalPrice = 0;
  
  //utiliser array.from() pour convertir en un tableau et utiliser reduce()//
  const productTotals = Array.from(cartItems).reduce((totals, item) => {
    //slectionner element contenant le prix de article//
    const priceElement = item.querySelector('.cart__item__content__description p:last-child');
    console.log(priceElement);  
  
    //extraire le prix du texte//
  const priceText = priceElement.textContent;
  console.log(priceText);

    //covertir le texte du prix en nombre//
      const price = parseFloat(priceText);
      console.log(price);
  
      //selectionner element de la quantité de l'article//
  const quantityElement = item.querySelector('.itemQuantity');
  console.log(quantityElement);  
  
  //Extraire la valeur de la quantité (0 par defaut)//
  const quantity = quantityElement ? parseInt(quantityElement.value) : 0;
  console.log(quantity);
   
  //calculer le prix total en multipliant le prix par la quantite //
  const productTotal = price * quantity;
  console.log(productTotal);

  //ajouter le total du produit au tableau total//
      totals.push(productTotal); 
  
      //ajouter le total du produit a la variable totalprice
      totalPrice += productTotal;
  
      //Retourner le tableau des totaux de chaque produit//
    return totals;
    }, []);
  
    //Sélectionner l'élément où afficher le prix total//
    const totalPriceElement = document.querySelector('#totalPrice');
    console.log(totalPriceElement);
    //Mettre à jour le contenu de l'élément avec le prix total arrondi à 2 décimales
    totalPriceElement.textContent = totalPrice.toFixed(2);
    // Tableau des totaux de chaque produit dans la console
      console.log(productTotals); 
  }


function validationForms() {
  //Selection du formulaire//
  const form = document.querySelector('.cart__order__form');
  console.log(form);


  //Je selectionne le champ de saisie du prenom//
  const firstNameInput = document.querySelector('#firstName');
  console.log(firstNameInput);
  //selection element du message erreur//
  const firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
  console.log(firstNameErrorMsg);

  //je selectionne le champ du nom//
  const lastNameInput = document.querySelector('#lastName');
  console.log(lastNameInput);
  //Je recup le message erreur du nom//
  const lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');
  console.log(lastNameErrorMsg);

  //je selectionne le champ de l'adresse postale//
  const addressInput = document.querySelector('#address');
  console.log(addressInput);
  const addressErrorMsg = document.querySelector('#addressErrorMsg');
  console.log(addressErrorMsg);

  //je selectionne le champ de la ville//
  const cityInput = document.querySelector('#city');
  console.log(cityInput);
  const cityErrorMsg = document.querySelector('#cityErrorMsg');
  console.log(cityErrorMsg);

  //Je selectionne adresse-email //
  const emailInput = document.querySelector('#email');
  console.log(emailInput);
  const emailErrorMsg = document.querySelector('#emailErrorMsg');
  console.log(emailErrorMsg);


  //Ajouter un gestionnaire evenement a la soumission du formulaire //
  form.addEventListener('submit', (event) =>{
    //empeche le comportement par defaut du formulaire(soumission)//
    event.preventDefault();
    //Recupere la valeur du prenom saisi//
    const firstName = firstNameInput.value;
    console.log(firstName);
    //Definir expression reguliere pour verifier il y es au moins trois lettres//
    const regexFirstName = /^[a-zA-Z]{3,}$/;
    console.log(regexFirstName);
    //Je test si le prenom respecte bien expression reguliere //
        if(regexFirstName.test(firstName)){
        firstNameErrorMsg.textContent ='Valide';
        }else{
        //le prenom ne respecte pas les trois lettres, je recupere le message erreur//
        firstNameErrorMsg.textContent = 'Le prénom doit contenir au moins 3 lettres.';
        console.log(firstNameErrorMsg);  
        false; 
      }
  
  //Je recupere la valeur du nom saisi//
  const lastName = lastNameInput.value;
  console.log(lastName);
  //Definir l'expression reguliere il y a minimum 5 lettres//
  const regexLastName = /^[a-zA-Z]{5,}$/;
  console.log(regexLastName);
  if(regexLastName.test(lastName)){
    lastNameErrorMsg.textContent = 'Valide';
  }else{
  lastNameErrorMsg.textContent = 'Le nom doit contenir au moins 5 lettres. ';
  console.log(lastNameErrorMsg);
  false;
  }

  //je recup adress postale//
  const address = addressInput.value;
  const regexAddress = /([0-9]{1,}) ?([a-zA-Z,\. ]*)$/;
  console.log(regexAddress); 
  if (regexAddress.test(address)) {
    addressErrorMsg.textContent = 'Valide';
  } else {
      addressErrorMsg.textContent = 'Adresse postale doit être complete';
      console.log(addressErrorMsg);
      false;
  }

  //je recup le code postale et nom de la ville//
  const city = cityInput.value;
  const regexCity = /^[a-zA-Z]{2,}$/;
  console.log(regexCity);
  if (regexCity.test(city)) {
    cityErrorMsg.textContent = 'Valide';
  } else {
    cityErrorMsg.textContent = 'La ville a un minimum de 2 lettres. ';
    console.log(cityErrorMsg);
    false;
  }

  //je recupere le mail//
  const email = emailInput.value;
  const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  console.log(regexEmail);
  if (regexEmail.test(email)) {
    emailErrorMsg.textContent = 'Valide';
  } else {
    emailErrorMsg.textContent = 'Adresse email doit être complete. ';
    console.log(emailErrorMsg);
    false;
  }
  
    })

//Recuperer les produits depuis le loclstorage//
//const contactFromLocalStorage = JSON.parse(localStorage.getItem('contact'));
//console.log(contactFromLocalStorage);
//Création de l'objet contact en récupérant les valeurs des champs du formulaire//
const contact = {
  firstName : firstNameInput.value,
  lastName : lastNameInput.value,
  address : addressInput.value,
  city : cityInput.value,
  email : emailInput.value
};
console.log(contact);

//Ajout de l'objet contact au local storage//
//localStorage.setItem('contact', JSON.stringify(contact));



//Creer le tableau de produits//
const products = [];
console.log(products);


// Sélectionner tous les éléments avec la classe 'cart__item'
const cartItems = document.querySelectorAll('.cart__item');
console.log(cartItems);
// Parcourir chaque élément du panier (cartItems) pour récupérer les informations nécessaires//
cartItems.forEach((item) => {
  // Récupérer l'ID du produit à partir de l'attribut 'data-product-id'
  const productId = item.dataset.productId;
  console.log(productId);
  // Récupérer l'ID du produit à partir de l'attribut 'data-product-id'
  const productColor = item.dataset.productColor;
  console.log(productColor);
  // Récupérer la quantité du produit à partir de l'élément avec la classe 'itemQuantity'
  const productQuantity = document.querySelector('.itemQuantity').value;
  //const productQuantity = item.querySelector('.itemQuantity').value;

  // Ajouter les informations du produit récupérées dans un nouvel objet et le pousser dans le tableau 'products'//
  products.push({
    id: productId,
    color: productColor,
    quantity: parseInt(productQuantity)
  });
  console.log(productQuantity);

});

//Création de l'objet order//
const order = {
  contact: contact,
  products: products
};
console.log(order);

}



function orderConfirmation(){
//Recup des produits du local storage//
JSON.parse(localStorage.getItem("addToCart"));
console.log(productsLocalStorage);

//Recup l'élement DOM pour afficher les produits du panier(section pour ensemble des articles)//
const cartProducts = document.querySelector('#cart__items');
console.log(cartProducts);

//verifier si le panier est vide//
if (!productsLocalStorage || productsLocalStorage.length === 0) {
  //si le panier est vide afficher un msge approprié à l'utilisateur//
  const infoUsers = document.createElement("p");
  infoUsers.textContent = " Votre panier est vide. ";
  console.log(infoUsers);
  cartProduct.appendChild(infoUsers);
  infoUsers.style;textAlign = "center";
} else {
  //Si le panier n'est pas vide on passe la commande//

  //Extraire les identifiants des produits du panier//
  const productIds = productsLocalStorage.map(product => product.id);
  console.log(productIds);

  //Envoyer la commande au serveur lors de la soumission fu formulaire//
  const orderForm = document.querySelector('.cart__order__form');
  console.log(orderForm);
  orderForm.addEventListener('submit', function(event){
    event.preventDefault();
    //Empeche le rechargement de la page lors de la soumission//


  //Recup les valeurs du formulaire//
  const firstName = document.querySelector('#firstName').value;
  console.log(firstName);
  const lastName = document.querySelector('#lastName').value;
  console.log(lastName);
  const address = document.querySelector('#address').value;
  console.log(address);
  const city = document.querySelector('#city').value;
  console.log(city);
  const email = document.querySelector('#email').value;
  console.log(email);

  //Creer objet "order" contenant les infos de contact et les identifiants des produits//
  const order = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email
    },
    products: productIds
  };
  console.log(order);

  //Envoyer la commande au serveur//
  fetch("http://localhost:3000/api/products/order" , {
    method:"POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(order)
  })
  .then(response => response.json())
  .then(data => {
    //Recup identifiant de la commande a partir de la reponse//
    const orderId = data.orderId;
    console.log(orderId);
    console.log(" Numero de la commande :", orderId);
  })
  .catch(error =>{
    //Gerer les erreur lors de l'envoi de la commande//
    console.error("Erreur:", error);
  });
});
}

}



function placeOrder() {
 //fonction pour enregistrer la commande//
 //Code pour enregistrer la commande et obtenir ID de commande//
 const orderId = 'c4bb5df0-0609-11ee-9d50-fdb7c9e1bf6d';
 console.log(orderId);

 //Selectionner l'element envoyer//
 const orderSubmit = document.getElementById('order');
 console.log(orderSubmit);
 //Ajouter un gestionnaire d'evenement au clic sur le bouton commander//
 orderSubmit.addEventListener('click', function(event){
  event.preventDefault();
 
 
 //redirection vers la page web avec Id de la commande//
 window.location.href = 'http://127.0.0.1:5500/front/html/confirmation.html?id=${orderId}';
})

}




//editcart ma newQuantite est egal a la quantite du localstorage avec
//lien vers la page confirmation le numero de confirmation dans url ne s'affiche pas//z