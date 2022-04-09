
theme.cart = {
  cart_mini: document.querySelector("#cart-mini"),

  getCart: function() {
    var url = ''.concat(theme.routes.cart, '?t=').concat(Date.now());
    return fetch(url, {
      credentials: 'same-origin',
      method: 'GET'
    }).then(response => response.json());
  },

  changeItem: function(key, qty) {
    return this._updateCart({
      url: ''.concat(theme.routes.cartChange, '?t=').concat(Date.now()),
      data: JSON.stringify({
        'id': key + "",
        'quantity': qty
      })
    });
  },

  _updateCart: function(params) {
    return fetch(params.url, {
      method: 'POST',
      body: params.data,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest'
      } 
    })
      .then(response => response.json())
      .then(function (cart) {
        document.dispatchEvent(new CustomEvent('cart:updated', {
          detail: {
            cart: cart
          }
        }));
        return cart;
      });
  },

  addItem: function(button) {
    if(button.tagName == "svg") {
      button = button.parentElement;
    }
    button.classList.add("ajax-loading");
    let form = button.closest("form");
    let data = '';
    let quantity = 1;
    if(form) {
      // add item from the form on product page
      data = theme.utils.serialize(form);
      if(form.querySelector(".product-qty__input")) {
        quantity = parseInt(form.querySelector(".product-qty__input").value);
      }
      else {
        quantity = 1;
      }
    }
    else {
      // collection grid items
      let product_id = button.getAttribute("data-product-id");
      data = `id=${product_id}&quantity=1`;
    }
    fetch(theme.routes.cartAdd, {
      method: 'POST',
      body: data,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => response.json())
    .then(function(data) {
      if (data.status === 422) {
        console.log(data);
        alert(`Error adding cart product.\r\n${data.description}`);
      } else {
        document.dispatchEvent(new CustomEvent('cart:added', {
          detail: {
            product: data,
            quantity: quantity
          }
        }));
        theme.cart.updateAjaxCart().then(() => {
          window.Modals['ajax-cart'].open();
        });
      }
      setTimeout(function() {
        button.classList.remove("ajax-loading");
      }, 2000);
    });
  },
  updateAjaxCart: async (cart = null) => {
    if(!cart) {
      await fetch("/cart.json").then(res => {
        return res.json();
      }).then(data => {
        cart = data;
      });
    }
    
    // Update cart heading counter
    const cartHeading = document.getElementById("cartHeading");
    if(cartHeading) {
      cartHeading.innerHTML = cartHeading.innerHTML.replace("[count]", `<span>${cart.item_count}</span>`);
      cartHeading.innerHTML = cartHeading.innerHTML.replace(/\<span\>[0-9]+\<\/span\>/i, `<span>${cart.item_count}</span>`);
    }

    // Update sustainability
    const sustainabilityText = document.getElementById("cartSustainabilityText");
    if(sustainabilityText) {
      //const kg_multiplier = parseFloat(theme.settings.cart_sust_kg.replace(",", "."));
      //const kg_value = Math.round(cart.item_count * kg_multiplier * 10) / 10; // round to 1 digit
      let kg_value = 0; // value based on product meta fields
      let trees_add = 0; // additional trees value (if defined in product meta fields)

      // get products meta fields
      await (async () => {
        for(const cart_item of cart.items) {
          await fetch(cart_item.url).then(res => res.text()).then(data => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(data, "text/html");
            let container = htmlDocument.documentElement.querySelector("#productMetafieldsJson");
            let metafields = JSON.parse(container.innerHTML);
            if(metafields.general.kg_multiplier) {
              kg_value += parseFloat(metafields.general.kg_multiplier) * cart_item.quantity;
            }
            if(metafields.general.trees_extra_value) {
              trees_add += parseFloat(metafields.general.trees_extra_value) * cart_item.quantity;
            }
          });
        }
      })();

      sustainabilityText.innerHTML = sustainabilityText.innerHTML.replace("[kg]", `<kg>${kg_value}kg CO2</kg>`);
      sustainabilityText.innerHTML = sustainabilityText.innerHTML.replace(/\<kg\>.*\<\/kg\>/i, `<kg>${kg_value}kg CO2</kg>`);

      const tree_multiplier = theme.settings.cart_sust_tree;
      const tree_value = trees_add + Math.round(cart.item_count * tree_multiplier * 10) / 10; // round to 1 digit
      sustainabilityText.innerHTML = sustainabilityText.innerHTML.replace("[trees]", `<trees>${tree_value} trees</trees>`);
      sustainabilityText.innerHTML = sustainabilityText.innerHTML.replace(/\<trees\>.*\<\/trees\>/i, `<trees>${tree_value} trees</trees>`);        
    }

    // Update sub-total
    const subTotal = document.getElementById("cartSubTotal");
    if(subTotal) {
      subTotal.innerHTML = theme.Currency.formatMoney(cart.total_price);
    }

    // Update total
    const cartTotal = document.getElementById("cartTotal");
    if(cartTotal) {
      cartTotal.innerHTML = theme.Currency.formatMoney(cart.total_price);
    }

    // Update products list
    window.vueComponents['cart-products']?.$refs?.cartProducts?.refresh(cart.items);
    console.log("Cart updated:", cart);
  },
  buildCartPopup: function (product, quantity) {
    let cartpopup = document.getElementById("cartPopup");
    let products = cartpopup.querySelector(".cartpopup__products");
    let subtotal = cartpopup.querySelector(".cartpopup__subtotal_price");
    products.classList.add("loading");
    // fill product
    let layout = '';
    let product_price = theme.Currency.formatMoney(product.price, theme.settings.moneyFormat);
    let total_price = theme.Currency.formatMoney(product.price * quantity, theme.settings.moneyFormat);
    layout += `
          <div class="cartpopup__product">
            <div class="cartpopup__product-image">
              <img loading="lazy" src="${product.featured_image.url.replace(".jpg", "_x220.jpg")}" />
            </div>
            <div class="cartpopup__product-data">
              <div class="cartpopup__product-title">
                ${product.product_title}
              </div>
              <div class="d-flex">
                <div class="cartpopup__product-price">
                  <span class="">${quantity}x</span>
                  <span class="">${product_price}</span>
                </div>
              </div>
            </div>
          </div>
        `;
    products.innerHTML = layout;
    subtotal.innerHTML = total_price;
    products.classList.remove("loading");
  },

  checkElement: (e) => {
    const el = e.target;
    const input = el.parentElement.querySelector("input");
    if(el.classList.contains("product-qty__plus")) {
      if(parseInt(input.value) < parseInt(input.getAttribute("max"))) {
        input.value = parseInt(input.value) + 1;
      }
      else {
        alert(theme.strings.qty_limit_reached);
        return false;
      }
    }
    else {
      if(parseInt(input.value) > parseInt(input.getAttribute("min"))) {
        input.value = parseInt(input.value) - 1;
      }
    }

    // Cart page
    if(window.location.pathname.includes("/cart")) {
      const variant_id = input.getAttribute("data-product-id");
      document.getElementsByTagName("body")[0].classList.add("loading");
      theme.cart.changeItem(variant_id, input.value).then((cart) => {
        window.location.reload();
      });
    }
  }
};

  // Remove Cart Item
  document.querySelectorAll('.remove-cart-item').forEach((el => {
    el.addEventListener('click', (e) => {
      theme.cart.changeItem(e.target.closest('tr').getAttribute('data-id'), 0)
      .then(() => e.target.closest('tr').remove())
      .then(() => window.location.reload())
    });
  }));

// Product Qty
document.addEventListener('page:loaded', () => {
  setTimeout(() => {
    let $plusButtons, $minusButtons;
    $plusButtons = [...document.querySelectorAll('.product-qty__plus')];
    $minusButtons = [...document.querySelectorAll('.product-qty__minus')];
    if ($plusButtons.length > 0 && $minusButtons.length > 0) {
      $plusButtons.forEach(el => el.addEventListener('click', theme.cart.checkElement));
      $minusButtons.forEach(el => el.addEventListener('click', theme.cart.checkElement));
    }
  }, 1500);
});

// Cart page Product Qty
document.querySelectorAll(".product-qty__input").forEach(function(el) {
  el.addEventListener("keyup", function(e) {
    if(!window.location.pathname.includes("/cart")) return;
    input = e.target;
    let variant_id = input.getAttribute("data-product-id");
    document.getElementsByTagName("body")[0].classList.add("loading");
    theme.cart.changeItem(variant_id, input.value).then((cart) => {
      window.location.reload();
    });
  });
});

export default theme.cart;
