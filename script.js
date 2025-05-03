let cartCount = 0;

// Fonction pour ajouter au panier
function addToCart(productName, productPrice) {
    cartCount++;
    updateCartDisplay();
    //alert(productName + " a été ajouté au panier !");
    qte = document.getElementById('qte');
    quantit= parseInt(qte.textContent,10);
    quantit++;
    qte.textContent = quantit;

    
    // Ici vous pourriez aussi stocker les articles dans un tableau
    // console.log("Article ajouté :", productName, productPrice);
}

// Fonction pour mettre à jour l'affichage du compteur
function updateCartDisplay() {
    const cartElement = document.querySelector('.Logo a');
    if (cartElement) {
        cartElement.textContent = "Card:" + cartCount;
    }
}