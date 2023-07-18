//* fonction fetchAPI avec fetch et une promise then//
function fetchAPI() {

  //etape 1, effectue une requête GET vers la data//
fetch("http://localhost:3000/api/products")
  //etape 2, recup la reponse au format json//
.then ((response) => response.json())
  //etape 3, appel de la function showProducts avec les donnees recupéré//
.then((data) => {
  showProducts(data)
})
}
//appel de la fonction fetchAPI pour recup les produits//
  fetchAPI();
 
 function showProducts(data) {

  //etape 4, parcourt des produits dans le data//
  for (products of data){
      //créé un element <a> pour le lien du produit//
    const lienElement = document.createElement("a"); 
    lienElement.href = "./product.html?id=" + products._id; 
      //Récupère l'élément avec l'ID "items" et ajoute le lien en tant qu'enfant//
    const appendArticle = document.getElementById('items').appendChild(lienElement);
    //Crée un élément <article> pour contenir les informations du produit//
    const articleElement = document.createElement("article"); 
    //Ajoute l'élément <article> en tant qu'enfant de l'élément <a>//
    appendArticle.appendChild(articleElement);
    //Crée un élément <img> pour afficher l'image du produit//
    const imageElement = document.createElement("img"); 
    //Crée un élément <img> pour afficher l'image du produit//
    imageElement.src = products.imageUrl;
    //Définit la largeur et la hauteur de l'image//
    imageElement.width="300";
    imageElement.height = "200";
    //Ajoute l'élément <img> en tant qu'enfant de l'élément <article>//
    articleElement.appendChild(imageElement);
    //Crée un élément <h3> pour afficher le nom du produit//
    const productNameElement = document.createElement("h3"); 
    //Définit le texte du titre en utilisant le nom du produit dans les données//
    productNameElement.innerText = products.name; 
    // Ajoute l'élément <h3> en tant qu'enfant de l'élément <article>//
    articleElement.appendChild(productNameElement);
    //Crée un élément <p> pour afficher la description du produit//
    const productDescriptionElement = document.createElement("p");
    // Définit le texte de la description en utilisant la description du produit dans les données//
    productDescriptionElement.innerText = products.description;
    // Ajoute l'élément <p> en tant qu'enfant de l'élément <article>//
    articleElement.appendChild(productDescriptionElement);
  }
 }

 






