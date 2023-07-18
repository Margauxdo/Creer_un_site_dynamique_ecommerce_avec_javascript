    //obtenir l'ID de commande à partir de l'url//
const urlParams = new URLSearchParams(window.location.search);
    //je recupere id de la commande dans url//
const orderId = urlParams.get('id');
    //Je selectionne emplacement ou j'affiche le numero de commande//
const numberCommande = document.getElementById('orderId');
    //Afficher le numero de confirmation dans un element HTML //
numberCommande.textContent = orderId;
