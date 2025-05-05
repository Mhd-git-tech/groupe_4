class ShoppingCart {
    constructor() {
        this.items = [];
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupCartHover();
        });
    }

    addItem(productName, productPrice) {
        const existingItem = this.items.find(item => item.name === productName);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }
        
        this.updateCartDisplay();
    }

    updateCartDisplay() {
        const qteElement = document.getElementById('qte');
        const totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
        
        if (totalItems > 0) {
            qteElement.textContent = totalItems;
        } else {
            qteElement.textContent = '';
        }
    }

    renderCartItems() {
        const tooltip = document.querySelector('.cart-tooltip');
        
        if (this.items.length === 0) {
            tooltip.innerHTML = '<p>Votre panier est vide</p>';
            return;
        }

        let html = '<h4>Votre Panier</h4>';

        this.items.forEach(item => {
            html += `
                <div class="cart-item">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">${item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ')} FCFA</span>
                    <span class="cart-item-qty">x${item.quantity}</span>
                </div>
            `;
        });

        tooltip.innerHTML = html;
    }

    setupCartHover() {
        const cartElement = document.querySelector('.Logo');
        const tooltip = document.querySelector('.cart-tooltip');
        
        cartElement.addEventListener('mouseenter', () => {
            this.renderCartItems();
            tooltip.classList.add('show');
        });
        
        cartElement.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });
    }
}

// Initialisation du panier
const cart = new ShoppingCart();

// Fonction globale pour ajouter au panier
function addToCart(productName, productPrice) {
    cart.addItem(productName, productPrice);
}
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
let index = 0;

function showNextSlide() {
    index = (index + 1) % slides.length;
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Défile toutes les 3 secondes
setInterval(showNextSlide, 3000);
