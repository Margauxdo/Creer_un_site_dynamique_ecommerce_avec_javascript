/**ajout de la fonction fecth pour connecter api a la page produit */
function fetchAPI() {
    fetch("http://localhost:3000/api/products")
    .then ((response) => response.json())
    .then((data)=> {
        showKanap(data)
      } )
    }

    fetchAPI();

   // const lienElement = document.createElement("a"); 
    //lienElement.href = "./product.html?id=" + products._id;

/*recupere id de chaque page produits*/
    function showKanap(data){ //*on creer une fonction pour recuperer ide de chque page*//
    for (products of data){//*faire une boucle pour recuperer ensemble des id pour chaque page */
const queryStr = 'id=' + products._id /*mon id renommer*/
const productKanap = new URLSearchParams(queryStr)/*constance pour construire la nouvelle chaine de caractere avec searchparams */

const productId = productKanap.get('id=') 
console.log("Value for 'id': ${productId}")
    

for(const [key , value] of productKanap) {
    console.log('${key} => ${value') /**on a definit la cle et la valeur qui est id et kanap01 */
}

console.log(productKanap.toString())
    }
}




    //**-etape 4 et 5- faire un lien entre un produit de la page acceuil et la page produit */


    //*recup de id dans url */
//(async function (){
   // const productsId = getProductsId()
    //console.log(products)
    //const products = Products(productsId)
    //hydrateProducts(products)
//})
    //*recuperer la clé de la newURL*//
    //function getproductsId(){
        //return new URL (location.href).searchParams.get("id")
    //}
