
/*====================ShowCartWindow================================*/
/*==================================================================*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')


/*=====================ShopPaint===========================================*/
/*=========================================================================*/


const addShopping= document.querySelectorAll('.shopping-btn');

addShopping.forEach(addToCartButton => {
    addToCartButton.addEventListener('click',addTocartClicked)
});


const buyButton = document.querySelector('.buyButton');
buyButton.addEventListener('click',buyButtonCLick)
const shoppingCartItemsContainer=document.querySelector('.shoppingCartItemsContainer');





function addTocartClicked(event){
    const button=event.target;
    const item =button.closest('.box-artist')
    
    const itemTittle= item.querySelector('.artist').textContent;
    const itemPrice= item.querySelector('.precio').textContent;
    const itemImage= item.querySelector('.photo').src;

    addItemToShoppingCart(itemTittle,itemPrice,itemImage)
}

function addItemToShoppingCart(itemTittle,itemPrice,itemImage){
    const elementsTittle=shoppingCartItemsContainer.getElementsByTagName('shoppingCartItemTittle');
    console.log(itemTittle !==elementsTittle)
    for(i=0; i < elementsTittle.length; i++){
        if(elementsTittle[i].innerText === itemTittle){
            let elementQuantity  = elementsTittle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
                 elementQuantity.value++;

                 return;
        }
    }
    

   const shoppingCartRow=document.createElement('div');
   const shoppingCartContent= `
         
<div class="row shoppingCartItem">
    <div class="col-6"> 
         <div id="shopping-cart-items1" class="shopping-cart-items1">
          <img src=${itemImage} class="shopping-cart-image">
          <h6 class="shopping-cart-item-tittle text shoppingCartItemTittle">${itemTittle}</h6>

         </div>
    </div>            


<div class="col-2">
     <div class="shopping-cart-price d-flex-align-items-center">
          <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
     </div>
</div>

<div class="col-4">
      <div class="shopping-cart-quantity">
          <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1">
          <button class="btn btn-danger buttonDelete" type="button">X</button>


     </div>
   </div>


</div>`;
   shoppingCartRow.innerHTML = shoppingCartContent;
   shoppingCartItemsContainer.append(shoppingCartRow);


   /*Event to ear click on delete button*/
   shoppingCartRow
                .querySelector('.buttonDelete')
                .addEventListener('click',removeShoppingCartItem);

 /* Ear the change in the box of quantity*/
    shoppingCartRow
             .querySelector('.shoppingCartItemQuantity')
              .addEventListener('change', quantityChanged)               






   updateShoppingCartTotal()
}

/*=========================MainFunctions==============================================*/
/*=====================SumItems================================================================*/

function updateShoppingCartTotal() {
    let total=0;
    const shoppingCartTotal = document.querySelector(".shoppingCartTotal");


    const shoppingCartItems= document.querySelectorAll(".shoppingCartItem")
    shoppingCartItems.forEach(shoppingCartItem=> {
     const shoppingCartItemPriceElement =  shoppingCartItem.querySelector(".shoppingCartItemPrice");
     const shoppingCartItemPrice =Number (shoppingCartItemPriceElement.textContent.replace('$',''));
    const shoppingCartItemQuantityElement=shoppingCartItem.querySelector('.shoppingCartItemQuantity')
     const shoppingCarItemQuantity= Number(shoppingCartItemQuantityElement.value);
    

    total= total+shoppingCartItemPrice*shoppingCarItemQuantity;
  
    });
    shoppingCartTotal.innerHTML=(`${total}`)
}


/*==================================================================================================*/
/*===================================RemoveItems====================================================*/

function removeShoppingCartItem(event){
    const buttonClicked= event.target;
     buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();

} 

/*================================================================================================0*/
/*=============================QuantityCounter===================================================*/

function quantityChanged(event){
   const input= event.target;
   if(input.value <= 0){
       input.value=1;
   };
   updateShoppingCartTotal();
   }



   function buyButtonCLick(event){
       shoppingCartItemsContainer.innerHTML = '';
       updateShoppingCartTotal()
    //    alert('Gracias por apoyar a tu artista.')
    swal("Gracias por tu pago!", "Tu contenido extra esta listo para descargar!", "success");
   }