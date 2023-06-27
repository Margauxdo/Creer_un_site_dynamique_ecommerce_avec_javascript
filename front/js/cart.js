 //Recuperer les donnees du localstorage//
 let productsLocalStorage = JSON.parse(localStorage.getItem('addToCart')) || [];
 console.log(productsLocalStorage);
 
     const cartProduct = document.querySelector("#cart__items");
     console.log(cartProduct);
//je cree une variable pour preciser que les element se situeront dans la class "cart" dans le html

if (!productsLocalStorage || productsLocalStorage.length === 0) {
  //le panier est vide//  
  console.log("mon panier est vide");//si le localstorage est null ce qui equivaut a 0 alors le panier est vide//
const infoUsers = document.createElement("p");
infoUsers.textContent = "Votre  panier est vide";
cartProduct.appendChild(infoUsers);


//message pour informer utilisateur que le panier est vide//
  }else {
    //console.log("mon panier n'est pas vide!!");//sinon mon panier n'est pas vide//
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
            orderConfirmation();
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
  productQuantity.textContent = `Quantité : `;
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
    //Selectionner tous les element de quantité dans le panier//
  
    const quantityInput = document.querySelectorAll('.itemQuantity');
    console.log(quantityInput);

    //element actuel du panier//
    console.log(quantityInput);
  
   //Parcourir chaque element de quantité//
    quantityInput.forEach(quantityOneInput => {
  
   //Ajouter un écouteur d'événement pour le changement de valeur//
      quantityOneInput.addEventListener('change', (event) => {
  
        //recuperer la nouvelle quantité en tant que nombre//
  
          const newQuantity = parseInt(event.target.value);
          console.log(newQuantity);

          //Récuperer id du produit et la couleur a partie de l'élément parent dans le DOM//
          const productId = quantityOneInput.closest('.cart__item').dataset.productId;
          console.log(productId);
          const productColor = quantityOneInput.closest('.cart__item').dataset.productColor;
          console.log(productColor);

          //Rechercher le produit dans le tableau productslocalStorage//
          const product = productsLocalStorage.find(item => item.id === productId && item.colors === productColor);
          console.log(product);

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

    //reference a element parent//
    const cartItem = deleteElement.closest('.cart__item');

    //verifier si l'élement parent existe//
     if(cartItem){
      //je recup id et sa couleur depuis le DOM//
      


        const productId = cartItem.dataset.productId;
        console.log(productId);
        const productColor = cartItem.dataset.productColor;
        console.log(productColor);

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
      console.log(updateProducts);
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
 
  //variable pour vérifier la validité du formulaire//
  let isValid = true; 

  function firstName() {
    //Je selectionne le champ de saisie du prenom//
  const firstNameInput = document.querySelector('#firstName');
  console.log(firstNameInput);
  //selection element du message erreur//
  const firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
  console.log(firstNameErrorMsg);


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
        isValid =  false; 
      }
  }

  function lastName() {
    //je selectionne le champ du nom//
  const lastNameInput = document.querySelector('#lastName');
  console.log(lastNameInput);
  //Je recup le message erreur du nom//
  const lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');
  console.log(lastNameErrorMsg);
   
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
    isValid = false;
    }
  }

  function adress() {
      //je selectionne le champ de l'adresse postale//
  const addressInput = document.querySelector('#address');
  console.log(addressInput);
  const addressErrorMsg = document.querySelector('#addressErrorMsg');
  console.log(addressErrorMsg);
  
    //je recup adress postale//
    const address = addressInput.value;
    const regexAddress = /([0-9]{1,}) ?([a-zA-Z,\. ]*)$/;
    console.log(regexAddress); 
    if (regexAddress.test(address)) {
      addressErrorMsg.textContent = 'Valide';
    } else {
        addressErrorMsg.textContent = 'Adresse postale doit être complete';
        console.log(addressErrorMsg);
        isValid =  false;
    }
  }
  
  function city() {
   //je selectionne le champ de la ville//
  const cityInput = document.querySelector('#city');
  console.log(cityInput);
  const cityErrorMsg = document.querySelector('#cityErrorMsg');
  console.log(cityErrorMsg); 
  
    //je recup le code postale et nom de la ville//
    const city = cityInput.value;
    const regexCity = /^[a-zA-Z]{2,}$/;
    console.log(regexCity);
    if (regexCity.test(city)) {
      cityErrorMsg.textContent = 'Valide';
    } else {
      cityErrorMsg.textContent = 'La ville a un minimum de 2 lettres. ';
      console.log(cityErrorMsg);
      isValid =  false;
    }
  }

  function email() {
     //Je selectionne adresse-email //
  const emailInput = document.querySelector('#email');
  console.log(emailInput);
  const emailErrorMsg = document.querySelector('#emailErrorMsg');
  console.log(emailErrorMsg); 

    //je recupere le mail//
    const email = emailInput.value;
    const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    console.log(regexEmail);
    if (regexEmail.test(email)) {
      emailErrorMsg.textContent = 'Valide';
    } else {
      emailErrorMsg.textContent = 'Adresse email doit être complete. ';
      console.log(emailErrorMsg);
      isValid = false;
    }
  }

  form.addEventListener('submit', function(event){
    event.preventDefault();
  
    isValid = true;

    firstName();
    lastName();
    adress();
    city();
    email();


    //Passer à la suite si le formulaire est valide//
if (isValid) {
  //orderConfirmation();
} 
else {
  //Formulaire invalide//
  console.log('le formulaire est invalide. Veuillez corriger les erreurs');
}

  });

}



function orderConfirmation(){
 
  const orderBtn = document.querySelector('#order');

  orderBtn.addEventListener("click", () => {
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
// Vérifier si tous les champs sont remplis
   if (firstName && lastName && address && city && email) {
      const selectedProducts = [];
      console.log(selectedProducts);
const cartItems = document.querySelectorAll('.cart__item');
      console.log(cartItems);
      cartItems.forEach((item) => {
        const productId = item.dataset.productId;
        console.log(productId);
        const productName = item.querySelector('h2').textContent;
        const quantity = parseInt(item.querySelector('.itemQuantity').value);
        console.log(quantity);
        const colors = item.dataset.productColor;
        console.log(colors);
        selectedProducts.push({
          id: productId,
          name: productName,
          quantity: quantity,
          color: colors
        });
      });
const orderData = {
        customer: {
          firstName: firstName,
          lastName: lastName,
          address: address,
          city: city,
          email: email
        },
        products: selectedProducts
      }
console.log(orderData);

// Envoyer les données au serveur
  fetch("http://localhost:3000/api/products/order", {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json'
        },
      body: JSON.stringify(orderData)
      })
        .then(response => response.json())
          .then(data => {
// Rediriger vers la page de confirmation avec l'ID de commande dans l'URL
  window.location.href = `http://127.0.0.1:5500/front/html/confirmation.html?id=${orderNumber}`;
        })
        .catch(error => {
          console.log("Erreur lors de l'envoi des données au serveur :", error);
        });
    } else {
// Afficher un message d'erreur ou effectuer une autre action si des champs sont manquants
  console.log("Veuillez remplir tous les champs du formulaire.");
    }

    const orderNumber = Math.floor(Math.random() * 1000000) + 1;
    console.log(orderNumber);

    // Affichage du numéro de commande à l'utilisateur
    const orderConfirmationElement = document.querySelector('#orderConfirmation');
    orderConfirmationElement.textContent = `Numéro de commande : ${orderNumber}`;
    // Supprimer les produits du panier et du localStorage
    cartProduct.innerHTML = '';
    localStorage.removeItem('addToCart');
  });
}



//10 a 15 lignes plan acceptation il manque ---resultat observe ok ---page produit souvre avec information//selection qtite et couleur et validation quantite max 100----paier calcul se fait si on veut ajoute des produits ----------selectionne qtite couleur je me repete l5 et l4----dans plan test un ligen chaque action ajouter une couleur un action, supprimer une action , total des produits cets une cation, remplir le formulaire cets une action, envoye les donnees a api cets une action     ---