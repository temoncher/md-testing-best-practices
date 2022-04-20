const checkItems = [
  { position: 'Apples', pricePerKg: 120, weight: 456 },
  { position: 'Milk', pricePerKg: 71, weight: 1000 },
  { position: 'Bananas', pricePerKg: 120, weight: 366 },
  { position: 'Tomatoes', pricePerKg: 85, weight: 399 },
  { position: 'Cheese', pricePerKg: 625, weigth: 212 },
  { position: 'Sausages', pricePerKg: 1000, weight: 325 },
  { position: 'Potatoes', pricePerKg: 60, weigth: 1232 },
];

const calculateItemCost = (item) => item.weight / 1000 * item.pricePerKg;

const filteredItems = checkItems.filter((item) => item.pricPerKg < 500);
const sum = filteredItems.reduce((acc, item) => acc + calculateItemCost(item), 0)

console.log(sum);