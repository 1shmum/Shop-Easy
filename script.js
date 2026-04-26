const products=[
 {id:1,name:'iPhone 16 Pro',category:'Electronics',price:159999,img:'images/pro1.png',rating:5},
 {id:2,name:'AirPods Max',category:'Electronics',price:69999,img:'images/pro2.png',rating:4},
 {id:3,name:'Apple Watch Collection',category:'Electronics',price:89999,img:'images/pro3.png',rating:5},
 {id:4,name:'MacBook Air',category:'Electronics',price:134999,img:'images/pro4.png',rating:5},
 {id:5,name:'Apple Vision Pro',category:'Electronics',price:399999,img:'images/pro5.png',rating:5},
 {id:6,name:'iPad Pro Set',category:'Electronics',price:179999,img:'images/pro6.png',rating:4},
 {id:7,name:'Sony Alpha 7 Camera',category:'Electronics',price:219999,img:'images/pro7.png',rating:4},
 {id:8,name:'Smart Watch',category:'Electronics',price:12999,img:'images/pro8.png',rating:4},
 {id:9,name:'PlayStation 5',category:'Electronics',price:74999,img:'images/pro9.png',rating:5}
];
let cart=[];let discount=0;let currentSlide=0;let selectedProduct=null;
const grid=document.querySelector('.product-grid'),cartCount=document.querySelector('.cart-count'),cartModal=document.querySelector('.cart-modal'),cartItems=document.querySelector('.cart-items');
function money(n){return '৳'+n.toLocaleString('en-BD',{minimumFractionDigits:2,maximumFractionDigits:2});}
function renderProducts(list=products){grid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-img"><img src="${p.img}" alt="${p.name}"></div><div class="product-info"><h3>${p.name}</h3><div class="stars">${'★'.repeat(p.rating)}${'☆'.repeat(5-p.rating)}</div><div class="product-meta"><span class="price">৳${p.price.toLocaleString('en-BD')}</span><span class="category">${p.category}</span></div><div class="card-actions"><button class="add-cart" onclick="addToCart(${p.id})">Add to Cart</button><button class="review-btn" onclick="openReview(${p.id})">Review</button></div></div></article>`).join('');}
function addToCart(id){const product=products.find(p=>p.id===id);const item=cart.find(i=>i.id===id);item?item.qty++:cart.push({...product,qty:1});updateCart();toast(`${product.name} added to cart`);}
function updateCart(){cartCount.textContent=cart.reduce((s,i)=>s+i.qty,0);cartItems.innerHTML=cart.length?cart.map(i=>`<div class="cart-item"><img src="${i.img}" alt="${i.name}"><div><strong>${i.name}</strong><p>${money(i.price)}</p><div class="qty-controls"><button onclick="changeQty(${i.id},-1)">-</button><span>${i.qty}</span><button onclick="changeQty(${i.id},1)">+</button></div></div><button class="remove-item" onclick="removeItem(${i.id})">Remove</button></div>`).join(''):'<p>Your cart is empty.</p>';const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);const shipping=subtotal>0?(subtotal>=5000?0:250):0;const disc=subtotal*discount;document.querySelector('.subtotal').textContent=money(subtotal);document.querySelector('.shipping').textContent=money(shipping);document.querySelector('.discount').textContent='-'+money(disc);document.querySelector('.discount-row').style.display=disc?'flex':'none';document.querySelector('.total').textContent=money(subtotal+shipping-disc);}
function changeQty(id,delta){const item=cart.find(i=>i.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)removeItem(id);else updateCart();}
function removeItem(id){cart=cart.filter(i=>i.id!==id);updateCart();}
document.querySelector('.cart-icon').onclick=()=>cartModal.classList.add('show');document.querySelector('.close-cart').onclick=()=>cartModal.classList.remove('show');
document.getElementById('apply-coupon').onclick=()=>{const code=document.getElementById('coupon-code').value.trim().toUpperCase();discount=code==='SAVE10'?0.10:code==='APPLE20'?0.20:0;toast(discount?'Coupon applied!':'Invalid coupon. Try SAVE10');updateCart();};
document.querySelector('.checkout-btn').onclick=()=>toast(cart.length?'Checkout demo completed!':'Your cart is empty.');
const slides=[...document.querySelectorAll('.banner-slide')],dots=[...document.querySelectorAll('.dot')];function showSlide(n){currentSlide=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===currentSlide));dots.forEach((d,i)=>d.classList.toggle('active',i===currentSlide));}
document.querySelector('.banner-next').onclick=()=>showSlide(currentSlide+1);document.querySelector('.banner-prev').onclick=()=>showSlide(currentSlide-1);dots.forEach((d,i)=>d.onclick=()=>showSlide(i));setInterval(()=>showSlide(currentSlide+1),4500);
document.querySelectorAll('.categories a').forEach(a=>a.onclick=e=>{e.preventDefault();document.querySelectorAll('.categories a').forEach(x=>x.classList.remove('active'));a.classList.add('active');const cat=a.textContent;renderProducts(cat==='All Products'?products:products.filter(p=>p.category===cat));});
document.getElementById('price-range').oninput=e=>{const max=+e.target.value;renderProducts(products.filter(p=>p.price<=max));document.querySelector('.price-values span:last-child').textContent='৳'+max.toLocaleString('en-BD');};
function openReview(id){selectedProduct=products.find(p=>p.id===id);document.querySelector('.review-modal').classList.add('show');}
document.querySelector('.close-review').onclick=()=>document.querySelector('.review-modal').classList.remove('show');document.querySelectorAll('.rating-stars i').forEach(star=>star.onclick=()=>{const r=+star.dataset.rating;document.getElementById('review-rating').value=r;document.querySelectorAll('.rating-stars i').forEach(s=>s.classList.toggle('selected',+s.dataset.rating<=r));});
document.querySelector('.review-form').onsubmit=e=>{e.preventDefault();toast(`Thanks for reviewing ${selectedProduct?.name||'this product'}!`);e.target.reset();document.querySelectorAll('.rating-stars i').forEach(s=>s.classList.remove('selected'));document.querySelector('.review-modal').classList.remove('show');};
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2200);}
renderProducts();updateCart();
