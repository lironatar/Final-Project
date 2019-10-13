(function(){
    const cartInfo = document.getElementById('cart-info');//cart-info id will be returned to cartInfo
    const cart = document.getElementById('cart');

    cartInfo.addEventListener('click', function(){ //click event and a callback function which will be executed once the event fires
        cart.classList.toggle('show-cart'); // for the toggle we choose class show-cart 
    })

})(); 