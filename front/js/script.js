fetch('http://localhost:3000/api/products');

const obj={
    "name": "kanap-backend",
    "version": "1.0.0",
    "description": "",
    "main": "server.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "express": "^4.16.4",
      "uuid": "^3.3.2"
    }
  }

  
fetch('http://localhost:3000/api/products') 
.then(function(response){
    if(response.ok){
        return response.json();
    }
})
.then(function(value){
    console.log(value);
})
.catch(function(err){
});

/***etape 3** */
/* tableau des donnees json */
 const kanaps = [
  {
    "colors":["Blue","White","Black"],
    "_id":"107fb5b75607497b96722bda5b504926",
    "name":"Kanap Sinopé",
    "price":1849,
    "imageUrl":"http://localhost:3000/images/kanap01.jpeg",
    "description":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "altTxt":"Photo d'un canapé bleu, deux places"
  },
  {
    "colors":["Black/Yellow","Black/Red"],
    "_id":"415b7cacb65d43b2b5c1ff70f3393ad1",
    "name":"Kanap Cyllène",
    "price":4499,
    "imageUrl":"http://localhost:3000/images/kanap02.jpeg",
    "description":"Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.",
    "altTxt":"Photo d'un canapé jaune et noir, quattre places"
  },
  {
    "colors":["Green","Red","Orange"],
    "_id":"055743915a544fde83cfdfc904935ee7",
    "name":"Kanap Calycé",
    "price":3199,
    "imageUrl":"http://localhost:3000/images/kanap03.jpeg",
    "description":"Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.",
    "altTxt":"Photo d'un canapé d'angle, vert, trois places"
  },
  {
    "colors":["Pink","White"],
    "_id":"a557292fe5814ea2b15c6ef4bd73ed83",
    "name":"Kanap Autonoé",
    "price":1499,
    "imageUrl":"http://localhost:3000/images/kanap04.jpeg",
    "description":"Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.",
    "altTxt":"Photo d'un canapé rose, une à deux place"
  },
  {
    "colors":["Grey","Purple","Blue"],
    "_id":"8906dfda133f4c20a9d0e34f18adcf06",
    "name":"Kanap Eurydomé",
    "price":2249,
    "imageUrl":"http://localhost:3000/images/kanap05.jpeg",
    "description":"Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis. Donec hendrerit purus at congue aliquam.",
    "altTxt":"Photo d'un canapé gris, trois places"
  },
  {
    "colors":["Grey","Navy"],
    "_id":"77711f0e466b4ddf953f677d30b0efc9",
    "name":"Kanap Hélicé",
    "price":999,
    "imageUrl":"http://localhost:3000/images/kanap06.jpeg",
    "description":"Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi. Morbi nec vehicula mi, sit amet vestibulum.",
    "altTxt":"Photo d'un canapé gris, deux places"
  },
  {
    "colors":["Red","Silver"],
    "_id":"034707184e8e4eefb46400b5a3774b5f",
    "name":"Kanap Thyoné",
    "price":1999,
    "imageUrl":"http://localhost:3000/images/kanap07.jpeg",
    "description":"EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu. Vestibulum et egestas eros. Vestibulum non lacus orci.",
    "altTxt":"Photo d'un canapé rouge, deux places"
  },
  {
    "colors":["Pink","Brown","Yellow","White"],
    "_id":"a6ec5b49bd164d7fbe10f37b6363f9fb",
    "name":"Kanap orthosie",
    "price":3999,
    "imageUrl":"http://localhost:3000/images/kanap08.jpeg",
    "description":"Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus. Morbi imperdiet enim metus rhoncus.",
    "altTxt":"Photo d'un canapé rose, trois places"
  }
]

//recupération des canapés depuis le fichier JSON//
const reponse = await fetch('.../back/models/Product.js');
const kanap = await reponse.json();

for (let kanap of kanaps) {
  console.log ('couleur du canape'+ kanaps.colors + 'ajout de identifiant' + kanaps._id + 'ajout du nom du canape' + kanaps.name + 'ajout du prix' + kanaps.price + "lien de l'image" + kanaps.imageUrl + 'description' + kanaps.description + 'description pour SEO' + kanaps.altTxt );}
//Création d'une balise dédie aux canape//
const kanapsElement= createElement("article")
//création des balises //
const article = kanap[i];

const imageUrlElement = document.createElement("img");
imageUrlElement.src = article.imageUrl;

const nameElement = document.createElement("h3");
nameElement.innerText = article.name;

const descriptionElement = document.createElement ("p");
descriptionElement.innerText = article.description;

//Rattachement de nos balises au DOM//
const sectionItems = document.querySelector(".items");
//rattachement de la balise article a la section items//
sectionItems.appendChild (kanapsElement);

kanapsElement.appendChild(imageUrlElement);
kanapsElement.appendChild(nameElement);
kanapsElement.appendChild(descriptionElement);

