//* fonction fetchAPI avec fetch et uen promise then *//
function fetchAPI() {
fetch("http://localhost:3000/api/products")
.then ((response) => response.json())
.then((data) => {
  showProducts(data)
})
}

fetchAPI();
 //*fonction qui relie les produits au data*//
 function showProducts(data) {
  for (products of data){

    const lienElement = document.createElement("a"); //**ajout du lien qui englobe les infos */
    lienElement.href = "./product.html?id=" + products._id; //* url du lien du produit + _id pcq id varie *//
    const appendArticle = document.getElementById('items').appendChild(lienElement);/*items est enfant du lien a */
    console.log(products._id);

    const articleElement = document.createElement("article"); /*cree article */
    appendArticle.appendChild(articleElement);

    const imageElement = document.createElement("img"); /* creation de image */
    imageElement.src = products.imageUrl;
    appendArticle.appendChild(imageElement);

    const productNameElement = document.createElement("h3"); /* creation du titre */
    productNameElement.innerText = products.name;
    appendArticle.appendChild(productNameElement);

    const productDescriptionElement = document.createElement("p");/*creation de la description*/
    productDescriptionElement.innerText = products.description;
    appendArticle.appendChild(productDescriptionElement);



    
  }
 }
