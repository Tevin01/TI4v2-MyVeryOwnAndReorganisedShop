fetch('produits.json')
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(data => {
        afficherProduits(data); // Appeler une fonction pour afficher les produits
    })
    .catch(error => console.error('Erreur lors du chargement des produits:', error));