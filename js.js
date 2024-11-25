fetch('RealGoods.json')
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(data => {
        afficherProduits(data); // Appeler une fonction pour afficher les produits
    })
    .catch(error => console.error('Erreur lors du chargement des produits:', error));

// Ajouter des produits au panier lorsque l'utilisateur clique sur un bouton
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-cart')) {
        const produitId = event.target.getAttribute('data-id'); // Récupérer l'ID du produit
        ajouterAuPanier(produitId); // Appeler la fonction pour ajouter le produit au panier
    }
});

let panier = [];

function ajouterAuPanier(produitId) {
    const produit = produits.find(p => p.id == produitId); // Trouver le produit correspondant à l'ID
    const produitExistant = panier.find(item => item.id == produitId); // Vérifier si le produit est déjà dans le panier

    if (produitExistant) {
        produitExistant.quantite++; // Si déjà présent, augmenter la quantité
    } else {
        panier.push({ ...produit, quantite: 1 }); // Sinon, ajouter le produit au panier
    }

    afficherPanier(); // Mettre à jour l'affichage du panier
}

function afficherPanier() {
    const panierElement = document.getElementById('cart-items');
    panierElement.innerHTML = ''; // Vider l'affichage précédent

    panier.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `<p>${item.nom} - ${item.prix}€ x ${item.quantite}</p>`;
        panierElement.appendChild(itemElement);
    });

    const total = panier.reduce((sum, item) => sum + item.prix * item.quantite, 0);
    document.getElementById('total-price').textContent = total.toFixed(2);
}