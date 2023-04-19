const paramsProduct = new URL (document.location).searchParams // creation new url avec search params
const id = paramsProduct.get("id")//cree une onstance id, jenvoie ma constante paramproducts vers id pour recupere id de ma page//

console.log(id)


/**ajout de la fonction fecth pour connecter api a la page produit */
// function fetchAPI() {
 //    fetch("http://localhost:3000/api/products")
 //    .then ((response) => response.json())
   //  .then((data)=> {
//         showKanap(data)
// //         getKanapId(data)
//       } )
//     }

//     fetchAPI();

   // const lienElement = document.createElement("a"); 
    //lienElement.href = "./product.html?id=" + products._id;

/* -etape 4-  lien entre les produits d el apage acceuil et les pages produits*/
//     function showKanap(data){ //*on creer une fonction pour recuperer id de chaque page*//
//     for (products of data){//*faire une boucle pour recuperer ensemble des id pour chaque page */
// const queryStr = 'id=' + products._id /*mon id renommer*/
// const productKanap = new URLSearchParams(queryStr)/*constance pour construire la nouvelle chaine de caractere avec searchparams */

// const productId = productKanap.get('id=') 
// console.log("Value for 'id': ${productId}") /**je verifie la valeur par id **/
    

// for(const [key , value] of productKanap) {
 //    console.log('${key} => ${value') /**on a definit la cle et la valeur qui est id et kanap01 */
// }

//console.log(productKanap.toString())
//     }
// }

//** etape 5 recupere id du produit a afficher**//
// function getKanapId(data){
 //    new URL (location.href).searchParams.get("id")
// }

//**etape 6 Inserer un produit et details dans*/


    