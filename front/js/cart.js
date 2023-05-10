 const productsLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
//Je recupere le donnees stocké dans le localStoarge avec la cle addToCart  et utilise la methode JSOn.parse , je socke les produits recement ajoutés au panier et je peut les recup dans la page panier//

     const cartProduct = document.querySelector(".cart");
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
productsLocalStorage.forEach(product => {
  //recup les infos depuis API//
fetch(`http://localhost:3000/api/products/${product.id}`)   
      .then ((response) => response.json())
          .then((data) => {
  //cree une div pour afficher le produit//
            const productDiv = document.createElement('article');
            productDiv.classList.add('cart__item');
            console.log(productDiv);
  //afficher le nom et le prix du produit//
            const productName = document.createElement('h2');
            productName.textContent = data.name;
            productDiv.appendChild(productName);
            console.log(productName);

            const productPrice = document.createElement('p');
            productPrice.textContent = `${data.price} € `;
            productDiv.appendChild(productPrice);
            console.log(productPrice);

  //afficher la quantité, la couleur de produit depuis le localstorage
            const productQuantity = document.createElement('p');
            productQuantity.textContent = `Quantité : ${product.quantity}`;
            productDiv.appendChild(productQuantity);
            console.log(productQuantity);

            const productColor = document.createElement('p');
            productColor.textContent = `Couleur : ${product.colors}`;
            productDiv.appendChild(productColor);
            console.log(productColor);

           const productImage = document.createElement('img');
          productImage.src = data.imageUrl;
          productDiv.appendChild(productImage);
          productImage.width='300';
          console.log(productImage);

//  Ajouter le produit a la page panier en liant la variable qui situe les elements du panier et la variable qui positionne articles//
            cartProduct.appendChild(productDiv);
          }
          )
        }
        )
 }//tous les elements du produit ont été ajouté a la page d'acceuil//
    
  
  
    //function imageShow(data){
    //const productImage = document.createElement("img");
    //productImage.src = data.imageUrl;/*on relie la source de image */
    //const cartItemImage = document.querySelector(".cart__item__img");
    //cartItemImage.appendChild(productImage);
    //console.log(cartItemImage);
   //}

    

      


    /*on modifie la hauteur de image*/
 


    //articleElement.appendChild(imageElement);/*image est enfant de article*/
    //onsole.log(products.imageUrl);
    //ajout des paniers de api //
    //image//prix
  



//tous les produits ont été recuperer depuis api//
    //une boucle pour afficher les produits//
    


    //etant dans le panier utilisateur a la possibilité ajouté, modifié ou de supprimer des produits//
    //on affichera un tableau avec les produits selectionné et leurs images en faisant appel a api//




