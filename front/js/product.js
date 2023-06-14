const paramsProduct = new URL (document.location).searchParams // creation new url avec search params
const id = paramsProduct.get("id")//cree une variable id, jenvoie ma constante paramproducts vers id pour recupere id de ma page//
const url = `http://localhost:3000/api/products/${id}` // on cree une variable url on y met le lien de api avec ${id}, id varie en fonction des produits//
//console.log(url) // on constate url de la page avec le id a cote 

const  fetchArticle = () => {     //**variable pour recuperer un seul produit en faisant appel a api */
    fetch(url)        //on fait appel a api//
    .then (function(response) { // on utilise then pour avoir une reponse //

     return response.json();   //on fait un retour a la reponse en json//
    })  // on utilise une deuxieme fois then pour acceder au data de api //
    .then(function(data)  {
      imageKanap(data);
      optionColorskanap(data);
      
      
      
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
  
let productsLocalStorage = [];//on a cree un tableau productsLocalStorage//
if(localStorage.getItem("addToCart") !==null )
  //si ce qu'on recupere par le bouton dans le,localstorage est nul //
  {
    productsLocalStorage = JSON.parse(localStorage.getItem("addToCart"));
    //si le localstorage contient deja des produits on le recupere dans un tableau//
  }
  let productFind = false;
    //on initialise une variable pour savoir si il est deja dans le tableau du localstorage //
  
  productsLocalStorage.forEach(function(productsLocalStorage){
    if(
      productsLocalStorage.id === productsToCart.id && //id du tableau du local est egal a id du panier//
      productsLocalStorage.colors === productsToCart.colors
    ){
      //si un produit avec la meme id et l meme couleur dans le localstorage dans le tableau//
      let quantityToAdd = parseInt(productsToCart.quantity) + parseInt(productsLocalStorage.quantity);
      //on a une variable qui additionne la quantoté du panier + la quantité du tableau du localstorage / parseInt il s'agit de nombre et pas de lettre//
      productsLocalStorage.quantity = quantityToAdd.toString();
      //la quantite du tableau du localstorage = la variable quantityToAdd on a tranforme en chaine de caractere//
      console.log(quantityToAdd);
      productsLocalStorage.quantity = quantityToAdd;
      console.log(productsLocalStorage.quantity);
      localStorage.setItem('addToCart',JSON.stringify(productsLocalStorage));
      //on ajoute une ligne "addtocart"dans  le tableau du localstorage//
      productFind=true;
      //setitem addtocart//
  }
});
if(!productFind){
  //si le produit n'a pas été trouve dans le localstorage on l'ajoute au tableau//
productsLocalStorage.push(productsToCart);
}

localStorage.setItem('addToCart', JSON.stringify(productsLocalStorage));
//on ajoute une ligne dans  le tableau du localstorage//
console.log(localStorage);


  })
  
  }
   




   //getItem = obtenir ce qu'il y a dans le localStorage//
  //setItem = ajouter une nouvelle ligne(produit) dans le localStorage//
  //local.push() = rajouter dans un tableau//
  //JSON.stringify = transformer un objet javascript en chaine json//
  //JSON.parse = transformer un chaine JSON en objet JSON//
  //parse()=>objet// 
  //parseInt = transformer en chiffre pour un calcul//

  //quand on clique sur le bouton panier on acceder directement a la page panier//
  //window.location.href ="cart.html";