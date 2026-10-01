const products = [
  { name: 'Keyboard', price: 45 },
  { name: 'Monitor', price: 320 },
  { name: 'Mouse', price: 25 }
];

// 1. Object destructuring
const { name, price } = products[0];
console.log(name, price);

// 2. Find the Mouse product
const mouse = products.find((product) => product.name === 'Mouse');
console.log(mouse.price);

// 3. Filter products priced below 100
const affordableProducts = products.filter((product) => product.price < 100);
console.log(affordableProducts);

// 4. Arrow function applying a 10% discount
const withDiscount = (originalPrice) => originalPrice * 0.9;
console.log(withDiscount(320));
