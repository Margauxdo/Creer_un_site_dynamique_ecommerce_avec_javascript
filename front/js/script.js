//* fonction fetchAPI avec fetch et uen promise then  -etape 2-*//
function fetchAPI() {
fetch("http://localhost:3000/api/products")
.then ((response) => response.json())
.then((data) => {
  showProducts(data)
})
}

fetchAPI();
 //*fonction qui relie les produits au data -etape 3-*//
 function showProducts(data) {
  for (products of data){


    const lienElement = document.createElement("a"); //**ajout du lien qui englobe les infos */
    lienElement.href = "./product.html?id=" + products._id; //* url du lien du produit + _id pcq id varie *//
    const appendArticle = document.getElementById('items').appendChild(lienElement);/*items est enfant du lien a */
    console.log(products._id);

    


    const articleElement = document.createElement("article"); /*cree article */
    appendArticle.appendChild(articleElement);/*article est enfant de apenarticle*/
   
    const imageElement = document.createElement("img"); /* creation de image */
    imageElement.src = products.imageUrl;/*on relie la source de image */
    imageElement.width="300";/*on modifie la largeur de image*/
    imageElement.height = "200";
    /*on modifie la hauteur de image*/
 


    articleElement.appendChild(imageElement);/*image est enfant de article*/
    console.log(products.imageUrl);

    const productNameElement = document.createElement("h3"); /* creation du titre */
    productNameElement.innerText = products.name; 
    articleElement.appendChild(productNameElement);/*le titre est enfant de article*/

    const productDescriptionElement = document.createElement("p");/*creation de la description*/
    productDescriptionElement.innerText = products.description;
    articleElement.appendChild(productDescriptionElement);/* la description est enfant de article*/


  }
 }

 






