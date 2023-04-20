const paramsProduct = new URL (document.location).searchParams // creation new url avec search params
const id = paramsProduct.get("id")//cree une onstance id, jenvoie ma constante paramproducts vers id pour recupere id de ma page//

const url = `http://localhost:3000/api/products/${id}` // on cree une constante url on y met le lien de api avec ${id}, id varie en fonction des produits//
//console.log(url) // on constate url de la page avec le id a cote 

const fetchArticle = () => {     //**constance pour recuperer un seul produit en faisant appel a api */
    fetch(url)        //on fait appel a api//
    .then (function(response) { // on utilise then pour avoir une reponse //

     return response.json()   //on fait un retour a la reponse en json//
    })  // on utilise une deuxieme fois then pour acceder au data de api //
    .then(function(data)  {

      const appendProduct = document.getElementsByClassName('item')
      
      const articleTitle = (document.getElementById("title").innerText = data.name) //on cree une constante pour recuperer le titre qui est appele title en html et data.name, dans le date il est appele name//
      const articlePrice = (document.getElementById("price").innerText = data.price)
      //on doit crée la balise de image qui n'existe pas//
      const articleImg = document.createElement("img")
      articleImg.src = data.imageUrl
      console.log(articleImg)
      //on selection avec queryselector ou image doit est positionné en fonction prodcut;html, qui est enfant de la const image articleImg//
      //document.querySelector(".item_img").appendProduct(articleImg)
      //ajoute url de image //
      //articleImg.setAttribute("src",`$'{data.imageUrl}`)
      
      const articleDescription = (document.getElementById("description").innerText = data.description)
    
      //on va cree une constance avec les differentes options de couleurs//
      const articleOptionsColors = document.getElementById("colors")
      for (color in data.colors){ //on utilise la boucle for in pour recuperer les couleurs dans le data //
        //je reprend la constance articleOptionsColors ou je lui ajoute du html , on reprend le code html ou on y integre une possibilité de couleurs dans les couleurs du data//
        articleOptionsColors.innerHTML += `<option value = "${data.colors[color]}">${data.colors[color]}</option>`
      }
    
    })

}

fetchArticle()


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


    