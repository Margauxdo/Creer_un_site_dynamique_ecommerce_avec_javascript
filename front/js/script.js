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
    appendArticle.appendChild(articleElement);

    const imageElement = document.createElement("img"); /* creation de image */
    imageElement.src = products.imageUrl;
    imageElement.width="300";
    imageElement.height = "200";
    appendArticle.appendChild(imageElement);
    console.log(products.imageUrl);

    const productNameElement = document.createElement("h3"); /* creation du titre */
    productNameElement.innerText = products.name;
    appendArticle.appendChild(productNameElement);

    const productDescriptionElement = document.createElement("p");/*creation de la description*/
    productDescriptionElement.innerText = products.description;
    appendArticle.appendChild(productDescriptionElement);

  }
 }

 //**-etape 4 - faire un lien entre un produit de la page acceuil et la page produit */

//*recup de id dans url */

function queryStringProduct(){

  const queryString_url_id = window.location.search;
  console.log(queryString_url_id);

  //*extraire id*/
  const urlSearchParams = new URLSearchParams (queryString_url_id);
  console.log(urlSearchParams);

  const kanap01Id = urlSearchParams.get("id");
  console.log(kanap01Id);

}

function displayKanapArticle(article){
  cloneElt.getElementById("items").href +="?id" + article.displayKanapArticle
  console.log(article)
}

function getArticleId(){
  return new URL (location.href).searchParams.get("id")

}