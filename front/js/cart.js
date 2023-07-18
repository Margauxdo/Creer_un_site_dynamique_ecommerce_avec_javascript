 //Recuperer les donnees du localstorage//
 let productsLocalStorage = JSON.parse(localStorage.getItem('addToCart')) || [];
     const cartProduct = document.querySelector("#cart__items");

///si le localstorage est null ce qui equivaut a 0 alors le panier est vide//
  if (!productsLocalStorage || productsLocalStorage.length === 0) {
const infoUsers = document.createElement("p");
infoUsers.textContent = "Votre  panier est vide";
cartProduct.appendChild(infoUsers);
  }else {
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
    }  


function showProductsCart(data, product) {
//cree une div pour afficher le produit//
  const cartItem = document.createElement('article');
  cartItem.classList.add('cart__item');
  cartItem.dataset.productId = product.id;
  cartItem.dataset.productColor = product.colors;
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
  productQuantity.textContent = `Quantité : `;
  cartItem.appendChild(productQuantity);
    //creer un input pour modifier la quantité du produit//
    const valueQtity = document.createElement('input');
    document.querySelector('.cart__item__content__settings__quantity');
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
    //Selectionner tous les element de quantité dans le panier//  
    const quantityInput = document.querySelectorAll('.itemQuantity'); 
    //Parcourir chaque element de quantité//
    quantityInput.forEach(quantityOneInput => {
    //Ajouter un écouteur d'événement pour le changement de valeur//
      quantityOneInput.addEventListener('change', (event) => {
      //recuperer la nouvelle quantité en tant que nombre//
        const newQuantity = parseInt(event.target.value);
      //verifier si la quantité est valide (entre 1 et 100)//
          if(newQuantity >= 1 && newQuantity <= 100){
      //Récuperer id du produit et la couleur a partie de l'élément parent dans le DOM//
          const productId = quantityOneInput.closest('.cart__item').dataset.productId;
          const productColor = quantityOneInput.closest('.cart__item').dataset.productColor;
          //Rechercher le produit dans le tableau productslocalStorage//
          const product = productsLocalStorage.find(item => item.id === productId && item.colors === productColor);
          //Vérifier si le produit a été trouvé dans le tableau//
          if(product){
            //mettre a jour la quantite du produit dans l'objet product//
            product.quantity = newQuantity;
           }
            //mettre a jour la quantité dans le localstorage //
          localStorage.setItem('addToCart', JSON.stringify(productsLocalStorage));

          //appel a la function pour que le changement se fasse automatiquement//
          getTotalQuantity();
          calculateTotalPrice();
        }else{
          //la qunatité est inférieure à 1 et superieur à 100, afficher message erreur//
          console.log('la quantité doit être comprise entre 1 et 100');
        }
        });
      });  
}

         
function deleteCart() {
    //Selectionner tous les elements de suppression//
const deleteElements = document.querySelectorAll('.deleteItem');
//Parcourir chaque element de supression//
 deleteElements.forEach(deleteElement => {
   deleteElement.addEventListener("click",(event) => {
    event.preventDefault();
    //reference a element parent//
    const cartItem = deleteElement.closest('.cart__item');
    //verifier si l'élement parent existe//
     if(cartItem){
      //je recup id et sa couleur depuis le DOM//
        const productId = cartItem.dataset.productId;
        const productColor = cartItem.dataset.productColor;        
        //Mettre a jour le tableau productsLocalStorage en filtrant les produits//
        productsLocalStorage = productsLocalStorage.filter(product =>
          product.id !== productId || product.colors !== productColor);
          //Mettre a jour le localStorage avec le tableai mis a jour//
          localStorage.setItem('addToCart', JSON.stringify(productsLocalStorage));
      //Supprimer le produit du DOM//
      cartItem.remove();
      //Filtrer les produits du panier pour supprimer celui ou ceux qui correspondt à ID//
       JSON.parse(localStorage.getItem('addToCart'));      
       const updateProducts= productsLocalStorage.filter(product => product.productId !== productId && product.productColor !== productColor);
           //Mettre a jour les données du panier dans le localstorage//
      localStorage.setItem('addToCart', JSON.stringify(productsLocalStorage));

      calculateTotalPrice();
      getTotalQuantity();
} 
       });       
      });      
}



function getTotalQuantity() {
  //Recup tous les elements du panier avec la calss cart__item//
  const cartItems = document.querySelectorAll('.cart__item');
  let totalQuantity = 0;
  //Parcourir chaque element du panier //
  cartItems.forEach(item => {
    //recup la qtite de article//
    const quantityElement = item.querySelector('.itemQuantity');
       const quantity = parseInt(quantityElement.value);    
    //Ajouter la quantité de chaque article a la quantité totale//
    totalQuantity +=  quantity;
    //Mettre a jour le HTML qui correspondt a la qtite//
    const totalQuantityElement = document.querySelector('#totalQuantity');
      totalQuantityElement.textContent = totalQuantity;
  });
}



function calculateTotalPrice() {
   //Selectionner tous les elements du panier//
  const cartItems = document.querySelectorAll('.cart__item');
   //initialiser la variable a 0 pour stocker le prix total//  
  let totalPrice = 0;  
  //utiliser array.from() pour convertir en un tableau et utiliser reduce()//
  const productTotals = Array.from(cartItems).reduce((totals, item) => {
    //selectionner element contenant le prix de article//
    const priceElement = item.querySelector('.cart__item__content__description p:last-child');
    //extraire le prix du texte//
  const priceText = priceElement.textContent;
     //convertir le texte du prix en nombre//
      const price = parseFloat(priceText); 
      //selectionner element de la quantité de l'article//
  const quantityElement = item.querySelector('.itemQuantity');  
  //Extraire la valeur de la quantité (0 par defaut)//
  const quantity = quantityElement ? parseInt(quantityElement.value) : 0;   
  //calculer le prix total en multipliant le prix par la quantite //
  const productTotal = price * quantity;
  //ajouter le total du produit au tableau total//
      totals.push(productTotal); 
    //ajouter le total du produit a la variable totalprice
      totalPrice += productTotal;
    //Retourner le tableau des totaux de chaque produit//
    return totals;
    }, []);
    //Sélectionner l'élément où afficher le prix total//
    const totalPriceElement = document.querySelector('#totalPrice');   
    //Mettre à jour le contenu de l'élément avec le prix total arrondi à 2 décimales
    totalPriceElement.textContent = totalPrice.toFixed(2);   
  }



function validationForms() {
    //Selection du formulaire//
      const form = document.querySelector('.cart__order__form');
     
    function firstName() {
        //Je selectionne le champ de saisie du prenom//
        const firstNameInput = document.querySelector('#firstName');  
      //selection element du message erreur//
        const firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
      //Recupere la valeur du prenom saisi//
        const firstName = firstNameInput.value;  
      //Definir expression reguliere pour verifier il y es au moins trois lettres//  
      const regexFirstName = /^[a-zA-Z]{3,}$/;  
      //Je test si le prenom respecte bien expression reguliere //  
      if (regexFirstName.test(firstName)) {
          firstNameErrorMsg.textContent = 'Valide';
          return true;
        } else {
          //le prenom ne respecte pas les trois lettres, je recupere le message erreur//
          firstNameErrorMsg.textContent = 'Le prénom doit contenir au moins 3 lettres.';
          return false;  
      }  
    }
    
    function lastName() {
        //je selectionne le champ du nom//
        const lastNameInput = document.querySelector('#lastName');  
      //Je recup le message erreur du nom//
        const lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');  
      //Je recupere la valeur du nom saisi//
        const lastName = lastNameInput.value;  
      //Definir l'expression reguliere il y a minimum 5 lettres//  
      const regexLastName = /^[a-zA-Z]{5,}$/;  
      if (regexLastName.test(lastName)) {  
        lastNameErrorMsg.textContent = 'Valide';  
        return true;  
      } else {  
        lastNameErrorMsg.textContent = 'Le nom doit contenir au moins 5 lettres. ';  
        return false;  
      }  
    }
    
    function adress() {
        //je selectionne le champ de l'adresse postale//
        const addressInput = document.querySelector('#address'); 
        const addressErrorMsg = document.querySelector('#addressErrorMsg');  
      //je recup adress postale//  
      const address = addressInput.value;
      const regexAddress = /([0-9]{1,}) ?([a-zA-Z,\. ]*)$/;  
      if (regexAddress.test(address)) {  
        addressErrorMsg.textContent = 'Valide';
        return true;  
     } else {  
        addressErrorMsg.textContent = 'Adresse postale doit être complete';
        return false;  
      } 
    }
  
    function city() {  
      //je selectionne le champ de la ville//  
      const cityInput = document.querySelector('#city');  
      const cityErrorMsg = document.querySelector('#cityErrorMsg');  
      //je recup le code postale et nom de la ville//
      const city = cityInput.value;  
      const regexCity = /^[a-zA-Z]{2,}$/;  
    ;
        if (regexCity.test(city)) {
          cityErrorMsg.textContent = 'Valide';  
        return true;  
      } else { 
        cityErrorMsg.textContent = 'La ville a un minimum de 2 lettres. ';
        return false;  
      }  
    }
   
    function email() {
        //Je selectionne adresse-email // 
      const emailInput = document.querySelector('#email');  
      const emailErrorMsg = document.querySelector('#emailErrorMsg');  
      //je recupere le mail//  
      const email = emailInput.value;  
      const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;  
      if (regexEmail.test(email)) {
        emailErrorMsg.textContent = 'Valide';
        return true;  
      } else {  
        emailErrorMsg.textContent = 'Adresse email doit être complete ';  
        return false;  
      }
  
    }

    const orderBtn = document.querySelector('#order');  
    orderBtn.addEventListener("click", (event) => {  
      event.preventDefault();  
      const isFirstNameValid = firstName();  
      const isLastNameValid = lastName();  
      const isAddressValid = adress();  
      const isCityValid = city();  
      const isEmailValid = email();

      if (isFirstNameValid && isLastNameValid && isAddressValid && isCityValid && isEmailValid) {
        //redirection vers la page de confirmation//  
        const firstName = document.querySelector('#firstName').value;  
        const lastName = document.querySelector('#lastName').value;  
        const address = document.querySelector('#address').value; 
        const city = document.querySelector('#city').value;  
        const email = document.querySelector('#email').value;
        //Stocker les infos de contact dans un objet//
        const contact = {  
          firstName: firstName,  
          lastName: lastName,  
          address: address,  
          city: city,  
          email: email  
        };
          ;  
        //Recuperer les produits du panier//  
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];  
        //Map les articles du panier à un tableau de produit avec identifiant et la quantité //  
        const products = cartItems.map(item => {  
          return {  
            id: item.id, 
            quantity: item.quantity  
          };  
        });     
        //Envoyer les donnees au serveur//  
        const data = {  
          contact: contact,  
          products: products  
        };  
        // Envoyer les données au serveur  
        fetch("http://localhost:3000/api/products/order", {  
          method: 'POST',  
          headers: {  
            'Content-Type': 'application/json'  
          },  
          body: JSON.stringify(data)  
        })  
          .then(response => response.json())  
          .then(data => {
              //traiter la réponse du serveur//  
            //Rediriger utilisateur vers la page de confirmation de commande//
              window.location.href = `confirmation.html?id=${data.orderId}`;  
            //effacer le panier apres avoir passé la commande//
              localStorage.clear('addToCart');  
          });  
      } else {  
        console.log("Le formulaire contient des erreurs.");  
      }  
    });  
  }



    


  




