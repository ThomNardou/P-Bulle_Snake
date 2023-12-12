let products = [
  {
    photo: "img/big-mac.png",
    name: "Big Mac",
    price: 5.99,
    active: false,
    quantity: 0,
  },
  {
    photo: "img/mc-chicken.png",
    name: "Mc Chicken",
    price: 4.99,
    active: false,
    quantity: 0,
  },
  {
    photo: "img/double-cb.png",
    name: "Double Cheese Burger",
    price: 2.99,
    active: false,
    quantity: 0,
  },
  {
    photo: "img/fries.png",
    name: "Fries",
    price: 2.99,
    active: false,
    quantity: 0,
  },
  {
    photo: "img/nuggets.png",
    name: "Mc Nuggets",
    price: 3.49,
    active: false,
    quantity: 0,
  },
  {
    photo: "img/salad.png",
    name: "Salad",
    price: 2.79,
    active: false,
    quantity: 0,
  },
  {
    photo: "img/cola.png",
    name: "Coke",
    price: 1.99,
    active: false,
    quantity: 0,
  },
  {
    photo: "img/lipton.png",
    name: "Ice Tea",
    price: 1.99,
    active: false,
    quantity: 0,
  },
  {
    photo: "img/water.png",
    name: "Water",
    price: 1.49,
    active: false,
    quantity: 0,
  },
];

let total = 0;

function CheckName(node, haveToRemove) {

  let description = node.closest('.description');
  let name = description.querySelector('.name');

  name = name.textContent || node.innerText;

  AddProductQuantity(name, haveToRemove, description)

}

function AddProductQuantity(productName, remove, description) {
  products.forEach((element) => {
    if (element.name == productName) {

      if (!remove) {
        element.quantity += 1;

      }

      else if (remove && element.quantity > 0) {
        element.quantity -= 1;
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
      quantityBox = quantityBox.querySelector(".quantity");

      quantityBox.textContent = element.quantity;

      MakeTotal(element.quantity, element.price, remove);

    }
  });

}

function MakeTotal(quantity, price, musstRemove) {
  if (!musstRemove) {
    total += price;
  }
  else if (musstRemove) {
    total -= price;
  }

  if (total <= 0) total = 0;

  total = Math.round(total * 100) / 100;

  let totalBox = document.getElementById("total");
  totalBox.textContent = total;
}
