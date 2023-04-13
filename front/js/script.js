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

    const lienElement = document.createElement("a");
    lienElement.href = "./product.html?id=" + products._id; //* url du lien du produit + _id pcq id varie *//
    const appendArticle = document.getElementById('items').appendChild(lienElement);
    console.log(products._id);

    const articleElement = document.createElement("article");
    appendArticle.appendChild(articleElement);
  }
 }
