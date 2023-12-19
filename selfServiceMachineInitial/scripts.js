let products = [
  {
    photo: "img/big-mac.png",
    name: "Big Mac",
    price: 5.99,
    active: false,
    quantity: 0,
    id: "BigMac",
  },
  {
    photo: "img/mc-chicken.png",
    name: "Mc Chicken",
    price: 4.99,
    active: false,
    quantity: 0,
    id: "McChicken",
  },
  {
    photo: "img/double-cb.png",
    name: "Double Cheese Burger",
    price: 2.99,
    active: false,
    quantity: 0,
    id: "DoubleCheeseBurger",
  },
  {
    photo: "img/fries.png",
    name: "Fries",
    price: 2.99,
    active: false,
    quantity: 0,
    id: "Fries",
  },
  {
    photo: "img/nuggets.png",
    name: "Mc Nuggets",
    price: 3.49,
    active: false,
    quantity: 0,
    id: "McNuggets",
  },
  {
    photo: "img/salad.png",
    name: "Salad",
    price: 2.79,
    active: false,
    quantity: 0,
    id: "Salad",
  },
  {
    photo: "img/cola.png",
    name: "Coke",
    price: 1.99,
    active: false,
    quantity: 0,
    id: "Coke",
  },
  {
    photo: "img/lipton.png",
    name: "Ice Tea",
    price: 1.99,
    active: false,
    quantity: 0,
    id: "IceTea",
  },
  {
    photo: "img/water.png",
    name: "Water",
    price: 1.49,
    active: false,
    quantity: 0,
    id: "Water",
  },
];

let total = 0;

let product = document.getElementsByClassName("photo");

Array.from(product).forEach(function (element) {
  element.addEventListener('click', function () {
    let productDiv = element.closest(".product")
    console.log(productDiv);
    let description = productDiv.querySelector(".description");
    let name = description.querySelector('.name');

    name = name.textContent || node.innerText;
    
    AddProductQuantity(name, false, description);
  });
});

function CheckName(node, haveToRemove) {

  let description = node.closest('.description');
  let name = description.querySelector('.name');

  name = name.textContent || node.innerText;

  AddProductQuantity(name, haveToRemove, description);

}

function AddProductQuantity(productName, remove, description) {
  products.forEach((element) => {
    if (element.name == productName) {

      let checkProductIfExist = document.getElementById(element.id);

      if (!remove) {
        element.quantity += 1;
        element.active = true;

      }

      if (element.quantity > 0) {
        MakeTotal(element.price, remove);
      }

      if (remove && element.quantity > 0) {
        element.quantity -= 1;
      }

      if (element.quantity == 0) {
        element.active = false;
        document.getElementById("productList").removeChild(checkProductIfExist);

      }

      let lunchList = document.getElementsByClassName("product");

      Array.from(lunchList).forEach(function (elements) {
        elements.addEventListener('click', function () {
          if (element.quantity <= 0) {
            elements.setAttribute("class", "product");
          }
          else {
            elements.setAttribute("class", "product selected");
          }
        });

      });

      let quantityBox = description.querySelector(".quantity-area");
      if (element.active) {
        quantityBox.style.display = "block";
      }
      else {
        quantityBox.style.display = "none";
      }
      quantityBox = quantityBox.querySelector(".quantity");
      quantityBox.textContent = element.quantity;



      if (checkProductIfExist == null) {
        addHTMLelement(element.name, element.id, element.quantity);
      }

      if (element.active) {
        let priceElement = document.getElementById(element.id).lastChild;
        let productTot = Math.round((element.price * element.quantity) * 100) / 100;
        priceElement.textContent = (productTot).toString();
      }
    }
  });

}

let MakeTotal = (price, musstRemove) => {
  if (!musstRemove) {
    total += price;
  }
  else if (musstRemove) {
    total -= price;
  }

  total = Math.round(total * 100) / 100;

  let totalBox = document.getElementById("total");
  totalBox.textContent = total;
}


let addHTMLelement = (name, id) => {
  let product = document.createElement("tr");
  let productName = document.createElement("th");
  let productTotalPrice = document.createElement("th");


  product.setAttribute('id', `${id}`)

  productName.textContent = `${name}`;

  document.getElementById("productList").appendChild(product);
  document.getElementById(id).appendChild(productName);
  document.getElementById(id).appendChild(productTotalPrice);
  document.getElementById('productList').appendChild(document.getElementById('TotalPrice'));
}