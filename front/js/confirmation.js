//obtenir l'ID de commande à partir de l'url//
const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
//je recupere id de la commande dans url//
const orderId = urlParams.get('id');
console.log(orderId);

//Je selectionne emplacement ou j'affiche le numero de commande//
const numberCommande = document.getElementById('orderId');
console.log(numberCommande);
//Afficher le numero de confirmation dans un element HTML //
numberCommande.textContent = orderId;
console.log(orderId);