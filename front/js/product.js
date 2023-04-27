const paramsProduct = new URL (document.location).searchParams // creation new url avec search params
const id = paramsProduct.get("id")//cree une variable id, jenvoie ma constante paramproducts vers id pour recupere id de ma page//

const url = `http://localhost:3000/api/products/${id}` // on cree une variable url on y met le lien de api avec ${id}, id varie en fonction des produits//
//console.log(url) // on constate url de la page avec le id a cote 

const fetchArticle = () => {     //**variable pour recuperer un seul produit en faisant appel a api */
    fetch(url)        //on fait appel a api//
    .then (function(response) { // on utilise then pour avoir une reponse //

     return response.json()   //on fait un retour a la reponse en json//
    })  // on utilise une deuxieme fois then pour acceder au data de api //
    .then(function(data)  {
      imageKanap(data)
      optionColorskanap(data)
      
      
      
const appendProduct = document.getElementsByClassName('item') //on cree une variable afin de recuperer emplacement des elements//
      
const articleTitle = (document.getElementById("title").innerText = data.name) //on cree une variable pour recuperer le titre qui est appele title en html et data.name, dans le date il est appele name//
const articlePrice = (document.getElementById("price").innerText = data.price)  //on cree une variable pour recup le prix//

//on doit crée la balise de image qui n'existe pas//
function imageKanap(){
    const articleImg = document.createElement("img");//on créé image elle n'existe pas//
      document.querySelector(".item__img").appendChild(articleImg);//on va chercher le parent de articleImg pour savoir ou le positionner//
      articleImg.src = data.imageUrl;//on recupere la source de api//
      articleImg.alt = data.altTxt; //on recup le alt de api//
        console.log(articleImg)//on verifie//
}
const articleDescription = (document.getElementById("description").innerText = data.description) //on cree une variable pour recuperer la description//

function optionColorskanap() {
      //on va cree une variable avec les differentes options de couleurs//
      const articleOptionsColors = document.getElementById("colors")
        for (color in data.colors){ //on utilise la boucle for in pour recuperer les couleurs dans le data //
        //je reprend la constance articleOptionsColors ou je lui ajoute du html , on reprend le code html ou on y integre une possibilité de couleurs dans les couleurs du data//
          articleOptionsColors.innerHTML += `<option value = "${data.colors[color]}">${data.colors[color]}</option>`
      }
  console.log(articleOptionsColors)
} 
})
}

fetchArticle()

localStorageToCart()




function localStorageToCart (){
  //on créé une variable pour acceder au bouton du panier // 
  const addToCart = document.getElementById("addToCart")
  //des on clique sur le bouton ca enregistre les evenment//
  addToCart.addEventListener ("click",() =>{
    const productsToCart = {
      quantity : document.getElementById("quantity").value , //on veut recup la valeur renseigner dans le panier par utilisateur du nombre de canape en recuperant id du html//
      colors : document.getElementById("colors").value, //on veut recup la valeur renseigner dans le panier par utilisateur de la couleur du canape//
      id : id //on veut recup id du produit//
    }
    console.log(productsToCart);

    //variable fenetre pop up pour la confirmation de la commande afin acceder a la page panier//
  
productsLocalStorage = []//on a cree un tableau productsLocalStorage//
if(localStorage.getItem("addToCart") !==null)
  //si ce qu'on recupere par le bouton dans le,localstorage est nul //
  {
    productsLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
    //on recuperera dans le localstorage en transformant le bouton du panier en ojet json//
    productsLocalStorage.push(productsToCart);
    //on rajoute dans le tableau la quantité la couleur et id afin de pouvoir ajouter un nouvel evenment au nouveau click //
    localStorage.setItem("addToCart", JSON.stringify(productsLocalStorage))
    //on ajoute au localstorage une ligne au tableau a partir du bouton panier, on veut transformer objet javascript en chaine JSON a partir du tableau//
  }
else{
  productsLocalStorage.push(productsToCart);
  //alors on va rajouter dans le tableau les produits avec la variable qui définis la quantité, id et la couleur//
  localStorage.setItem("addToCart", JSON.stringify(productsLocalStorage))
  //et on va ajouter une ligne au tableau du localstorage a partir du bouton addToCart, on veut transformer objet javascript en chaine JSON a partir du tableau//



  //getItem = obtenir ce qu'il y a dans le localStorage//
  //setItem = ajouter une nouvelle ligne(produit) dans le localStorage//
  //local.push() = rajouter dans un tableau//
  //JSON.stringify = transformer un objet javascript en chaine json//
  //JSON.parse = transformer un chaine JSON en objet JSON//
  //parse()=>objet// 
}
console.log(productsLocalStorage);
window.location.href="cart.html";// acceder a la page panier//
})
}

