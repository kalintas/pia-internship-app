const fs = require('fs');
const crypto = require('crypto');

const categories = [
  'Electronics', 'Home & Living', 'Sports', 'Books', 'Toys', 'Beauty', 'Tools', 'Outdoor', 'Office', 'Clothing', 'Automotive', 'Garden', 'Music', 'Health', 'Grocery', 'Pet Supplies', 'Baby', 'Jewelry', 'Shoes', 'Bags', 'Watches', 'Kitchen', 'Art', 'Stationery', 'Games', 'Fitness', 'Travel', 'Photography', 'Crafts', 'Appliances'
];

const sampleNames = [
  'UltraSoft Memory Foam Pillow', 'EcoBrew Stainless Steel Coffee Maker', 'Summit Trekking Backpack', 'AeroLite Wireless Earbuds', 'PureGlow Himalayan Salt Lamp',
  'Velocity Pro Soccer Ball', 'Starlite LED Desk Lamp', 'ChefMaster Nonstick Frying Pan', 'AquaPure Glass Water Bottle', 'PixelCraft 3D Puzzle Set',
  'SmartHome WiFi Plug', 'ComfyCotton Bath Towel', 'PowerMax Cordless Drill', 'ZenGarden Tabletop Fountain', 'FlexiYoga Resistance Bands',
  'Gourmet Spice Rack', 'PetPal Automatic Feeder', 'BabyDreams Night Light', 'Artisan Sketchbook', 'TravelPro Luggage Set',
  'SoundWave Bluetooth Speaker', 'FreshBrew Tea Infuser', 'GardenEase Pruning Shears', 'FitTrack Smart Scale', 'PhotoPro Tripod',
  'Classic Leather Wallet', 'CrystalClear Water Filter', 'Speedster RC Car', 'Harmony Essential Oil Diffuser', 'ChefPro Knife Set',
  'SolarGlow Path Lights', 'BreezeBox Fan', 'QuickCharge Power Bank', 'SafeGuard Bike Helmet', 'BookNook Reading Lamp',
  'SculptEase Clay Kit', 'GamerX Wireless Mouse', 'AquaFun Pool Float', 'NatureView Bird Feeder', 'UrbanStyle Backpack',
  'ChillMate Ice Cream Maker', 'ProBake Muffin Pan', 'SonicClean Electric Toothbrush', 'VividColor Marker Set', 'ComfyPet Dog Bed',
  'BabyJoy Play Mat', 'Sparkle Diamond Earrings', 'TimeMaster Wristwatch', 'UrbanStep Sneakers', 'ChefMate Apron',
  'PowerDrive Car Charger', 'GardenFresh Herb Planter', 'MusicFlow Headphones', 'ActiveLife Yoga Mat', 'PhotoSnap Camera',
  'CraftyKids Art Set', 'HomeGuard Smoke Detector', 'FitFlex Dumbbells', 'TravelEase Neck Pillow', 'AromaBliss Candle',
  'QuickFix Tool Kit', 'PetSafe Collar', 'BabySnuggle Blanket', 'ArtPro Paint Brushes', 'OfficeMate Organizer',
  'Speedy Blender', 'Glamour Lipstick', 'AutoShine Car Wax', 'GreenLeaf Compost Bin', 'Melody Acoustic Guitar',
  'HealthPlus Vitamin C', 'SnackBox Variety Pack', 'Purrfect Cat Tree', 'InfantCare Bottle Warmer', 'Gemstone Pendant',
  'TrailBlazer Hiking Boots', 'UrbanChic Handbag', 'ChefElite Cutting Board', 'SolarCharge Lantern', 'BreezeCool Air Purifier',
  'QuickNote Sticky Pads', 'GameMaster Chess Set', 'PowerLift Kettlebell', 'TravelBuddy Adapter', 'PhotoFrame Digital Frame',
  'CraftMaster Glue Gun', 'HomeChef Stand Mixer', 'FitStep Pedometer', 'PetPlay Chew Toy', 'BabySteps Walker',
  'ShineBright Necklace', 'TimeKeeper Wall Clock', 'UrbanRun Sports Shoes', 'ChefSelect Measuring Cups', 'AutoGuard Dash Cam',
  'GardenJoy Watering Can', 'MusicStar Keyboard', 'HealthGuard Thermometer', 'SnackTime Popcorn Maker', 'PawPal Dog Leash'
];

const sampleImages = {
  'Electronics': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
  'Home & Living': 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  'Sports': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
  'Books': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
  'Toys': 'https://images.unsplash.com/photo-1511453673005-6b5a3c1e0c49?auto=format&fit=crop&w=800&q=80',
  'Beauty': 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
  'Tools': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'Outdoor': 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  'Office': 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
  'Clothing': 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
  'Automotive': 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',
  'Garden': 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
  'Music': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  'Health': 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  'Grocery': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
  'Pet Supplies': 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80',
  'Baby': 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80',
  'Jewelry': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  'Shoes': 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
  'Bags': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  'Watches': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  'Kitchen': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
  'Art': 'https://images.unsplash.com/photo-1511453673005-6b5a3c1e0c49?auto=format&fit=crop&w=800&q=80',
  'Stationery': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
  'Games': 'https://images.unsplash.com/photo-1511453673005-6b5a3c1e0c49?auto=format&fit=crop&w=800&q=80',
  'Fitness': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
  'Travel': 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  'Photography': 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
  'Crafts': 'https://images.unsplash.com/photo-1511453673005-6b5a3c1e0c49?auto=format&fit=crop&w=800&q=80',
  'Appliances': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCategory() {
  return categories[getRandomInt(0, categories.length - 1)];
}

function getRandomName(i) {
  const base = sampleNames[getRandomInt(0, sampleNames.length - 1)];
  return base;
}

function getRandomDescription(name, category) {
  const adjectives = ['Amazing', 'Premium', 'Eco-friendly', 'Durable', 'Compact', 'Versatile', 'Innovative', 'Stylish', 'Modern', 'Classic', 'Essential', 'Advanced', 'Portable', 'Lightweight', 'Elegant', 'Smart', 'Customizable', 'Handcrafted', 'Limited Edition', 'Exclusive'];
  const features = ['for everyday use', 'for professionals', 'for families', 'for outdoor adventures', 'for your home', 'for travel', 'for kids', 'for pet lovers', 'for tech enthusiasts', 'for creative minds', 'for fitness fans', 'for music lovers', 'for bookworms', 'for artists', 'for chefs', 'for gamers', 'for students', 'for office', 'for relaxation', 'for fun'];
  return `${adjectives[getRandomInt(0, adjectives.length - 1)]} ${name} in the ${category} category, ${features[getRandomInt(0, features.length - 1)]}.`;
}

function getRandomPrice(category) {
  // Set price ranges by category
  const priceRanges = {
    'Electronics': [20, 500],
    'Home & Living': [10, 200],
    'Sports': [10, 300],
    'Books': [5, 50],
    'Toys': [5, 100],
    'Beauty': [5, 150],
    'Tools': [10, 250],
    'Outdoor': [15, 400],
    'Office': [5, 150],
    'Clothing': [10, 200],
    'Automotive': [15, 400],
    'Garden': [5, 150],
    'Music': [10, 300],
    'Health': [5, 100],
    'Grocery': [2, 50],
    'Pet Supplies': [5, 120],
    'Baby': [5, 150],
    'Jewelry': [20, 1000],
    'Shoes': [20, 300],
    'Bags': [15, 400],
    'Watches': [20, 800],
    'Kitchen': [5, 200],
    'Art': [5, 200],
    'Stationery': [2, 50],
    'Games': [10, 120],
    'Fitness': [10, 250],
    'Travel': [10, 300],
    'Photography': [20, 800],
    'Crafts': [5, 100],
    'Appliances': [20, 600]
  };
  const [min, max] = priceRanges[category] || [10, 100];
  return +(Math.random() * (max - min) + min).toFixed(2);
}

function getImageUrl(name, category) {
  // Use Unsplash search for the product name for more relevant images
  const searchTerm = encodeURIComponent(name.split(' ')[0]);
  return `https://source.unsplash.com/800x800/?${searchTerm},${encodeURIComponent(category)}`;
}

const products = [];
const usedNames = new Set();

for (let i = 0; i < 1000; i++) {
  let category = getRandomCategory();
  let name;
  do {
    name = getRandomName(i);
  } while (usedNames.has(name));
  usedNames.add(name);
  const description = getRandomDescription(name, category);
  const price = getRandomPrice(category);
  const imageurl = getImageUrl(name, category);
  const id = crypto.createHash('sha1').update(name + description + price + category).digest('hex');
  products.push({ id, name, category, description, imageurl, price });
}

const output = 'const ProductDatabase = ' + JSON.stringify(products, null, 2) + ';\n';
fs.writeFileSync('product_database.js', output);
console.log('Generated 1000 products in product_database.js'); 