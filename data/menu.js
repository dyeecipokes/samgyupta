/* ==========================================================
   SamgyupTa — SITE CONTENT
   Edit this file to change prices, menu items, promos, hours
   and contact details. Every page reads from here.
   Source: SamgyupTa Facebook page & Google Maps listing (Oct 2026).
   ========================================================== */
window.SAMGYUPTA = {
  info: {
    name: "SamgyupTa",
    tagline: "Ta, Samgyup, Ta!",
    motto: "Chill, Grill, Fill",
    since: 2021,
    phone: "+639053407378",
    phoneDisplay: "0905 340 7378",
    landline: "447 7462",
    facebook: "https://www.facebook.com/samgyupta.silay",
    messenger: "https://m.me/samgyupta.silay",
    mapsLink: "https://maps.app.goo.gl/HUWaJsYM136KcAYy6",
    mapsEmbed: "https://maps.google.com/maps?q=10.797449,122.9760374&z=17&output=embed",
    address: "J. Pitong Ledesma St., cor. McKinley Bukid & Gomez St., Silay City, Negros Occidental 6116",
    landmark: "Near Michael's Patahan · on the way to Silay Airport",
    googleRating: 4.3,
    googleReviews: 39,
    // 24-hour clock, Philippine time. Sunday = 0 ... Saturday = 6
    hours: { open: "11:00", close: "21:00", lastSeating: "20:00", days: [0, 1, 2, 3, 4, 5, 6] },
    // Specific dates the restaurant is closed (YYYY-MM-DD)
    closedDates: ["2026-11-01"]
  },

  // Thin announcement bar on every page. It hides itself after "until".
  notice: {
    text: "Heads up: we're CLOSED on Sunday, November 1, 2026. Back to normal on Monday, November 2!",
    until: "2026-11-01"
  },

  // The main offers shown as cards on the Home and Menu pages
  sets: [
    {
      id: "samgyupsal",
      name: "Unli Samgyupsal",
      kr: "무한 삼겹살",
      price: 349,
      per: "/ head",
      sub: "Minimum of 2 · Solo diner ₱449",
      tag: "Best seller",
      featured: true,
      image: "images/set-samgyupsal.jpg",
      emoji: "🥓",
      includes: ["Unlimited pork samgyupsal", "Unlimited side dishes", "Unlimited rice & lettuce", "Dip sauces", "No time limit"]
    },
    {
      id: "wings",
      name: "Unli Chicken Wings",
      kr: "무한 닭날개",
      price: 249,
      per: "/ head",
      sub: "Mon–Thu only · 11 AM – 8 PM",
      image: "images/set-wings.jpg",
      emoji: "🍗",
      includes: ["Unlimited wings: Classic, Teriyaki, Buffalo, Parmesan", "Unlimited java rice", "Thousand Island, mustard & signature dip"]
    },
    {
      id: "sets",
      name: "Samgyupsal Sets",
      kr: "세트",
      price: 599,
      from: true,
      per: "",
      sub: "Fixed portions for 2 to 10 people",
      image: "images/set-sets.jpg",
      emoji: "🔥",
      includes: ["Set A: 500g pork, good for 2–3", "Set B: 1kg pork, good for 4–5", "Set C: 2kg pork, good for 6–8", "Barkada sets with ramyeon & more"]
    }
  ],

  // Full menu (from SamgyupTa's posted menu). price: 0 shows "₱ —".
  menu: [
    {
      category: "Samgyupsal Sets",
      note: "Each set includes side dishes, lettuce, rice and dip sauces.",
      items: [
        { name: "Set A", desc: "Good for 2–3 · 500g pork, 5 side dishes, 250g lettuce, 2 cups rice", price: 599 },
        { name: "Set B", desc: "Good for 4–5 · 1kg pork, 5 side dishes, 500g lettuce, 4 cups rice", price: 1049 },
        { name: "Set C", desc: "Good for 6–8 · 2kg pork, 5 side dishes, 1kg lettuce, 6 cups rice", price: 1949 },
        { name: "Bepue Set", desc: "Good for 4–5 · Set A + 1 ramyeon or tteokbokki + 1 dakgangjeong + 5 cups rice", price: 969 },
        { name: "Chingu Set", kr: "친구", desc: "Good for 6–8 · Set A + 2 ramyeon or tteokbokki + 2 dakgangjeong + large bowl of rice", price: 1369 },
        { name: "Bundae Set", desc: "Good for 8–10 · Set B + 2 ramyeon or tteokbokki + 2 dakgangjeong + 2 large bowls of rice", price: 2369 }
      ]
    },
    {
      category: "Korean Mains",
      items: [
        { name: "Tteokbokki", kr: "떡볶이", price: 199 },
        { name: "Rabokki", kr: "라볶이", price: 219 },
        { name: "Pork Ramyeon", kr: "라면", price: 199 },
        { name: "Dakgangjeong", kr: "닭강정", price: 219 },
        { name: "Yang Nyeom", kr: "양념치킨", price: 219 },
        { name: "Pork Stew", price: 199 },
        { name: "Beef Stew", price: 249 },
        { name: "Beef Bulgogi", kr: "불고기", price: 299 },
        { name: "Bento Box", price: 199 },
        { name: "Bibimbap", kr: "비빔밥", price: 199 },
        { name: "Dosirak", kr: "도시락", price: 299 }
      ]
    },
    {
      category: "New Add-ons",
      note: "Most requested! Dine-in or take-out.",
      items: [
        { name: "Kimchi Jjigae", kr: "김치찌개", desc: "Good for sharing", price: 179 },
        { name: "Sarang Noodles", desc: "Good for sharing", price: 189 },
        { name: "Chicken Chicharron", desc: "K-style", price: 109 },
        { name: "K-Nuggets", price: 99 },
        { name: "K-Dog", price: 69 },
        { name: "Sarang Browns", price: 59 }
      ]
    },
    {
      category: "Chicken Wings Ala Carte",
      note: "Flavors: Classic, Teriyaki, Buffalo, Parmesan",
      items: [
        { name: "Wings Solo", desc: "4 pcs + java rice", price: 119 },
        { name: "Wings with Fries", desc: "4 pcs", price: 139 },
        { name: "Wings Basket", desc: "8 pcs", price: 199 },
        { name: "Box of Wings", desc: "24 pcs", price: 569 },
        { name: "Java Rice", price: 25 }
      ]
    },
    {
      category: "Rice Toppings & Sides",
      items: [
        { name: "Spam Rice Topping", price: 179 },
        { name: "Pork Rice Topping", price: 179 },
        { name: "Kimchi Rice", price: 199 },
        { name: "Kimchi", desc: "500g", price: 170 },
        { name: "Kimchi", desc: "1kg", price: 270 },
        { name: "Plain Steamed Rice", price: 20 }
      ]
    },
    {
      category: "Snacks & Coffee",
      items: [
        { name: "Cheese Burger", price: 109 },
        { name: "Bacon Cheese Burger", price: 129 },
        { name: "French Fries", price: 80 },
        { name: "Spanish Iced Coffee", price: 69 },
        { name: "Brewed Coffee", price: 35 }
      ]
    }
  ],

  drinks: [
    { name: "Soft drinks", desc: "Pepsi, Mountain Dew, 7-Up, Mirinda, Lipton Iced Tea, Tropicana", price: 55 },
    { name: "Bottled Water", price: 25 },
    { name: "Hot Tea", price: 35 },
    { name: "Calamansi Juice", price: 30 },
    { name: "Soju", kr: "소주", price: 180 },
    { name: "Smirnoff Mule", price: 70 },
    { name: "Red Horse (Stallion)", price: 55 },
    { name: "San Miguel Pale Pilsen", price: 55 },
    { name: "San Miguel Light", price: 65 },
    { name: "San Miguel Apple", price: 65 }
  ],

  houseRules: [
    { title: "Kids rate", text: "Ages 1–3 eat FREE. Ages 4–7 pay ₱175. Ages 8 and up pay the regular rate." },
    { title: "All unli or no unli", text: "Everyone at the table orders the same type of meal: regular or unlimited." },
    { title: "No sharing", text: "Unlimited meals can't be shared with non-unli diners. Charges apply when caught sharing." },
    { title: "We cook as you order", text: "Food is best eaten hot. Allow 15–20 minutes for food and refills." },
    { title: "No leftovers", text: "For unli wings, order only what you can finish. Leftovers are charged ₱30 per wing and ₱25 per cup of rice." }
  ],

  // Promo shown on Home and Promos pages. Set active: false to hide it.
  promo: {
    active: true,
    title: "4 + 1 Free Samgyup",
    big: "4+1",
    bigCaption: "1 eats free",
    text: "Bring the barkada! For every 4 full-paying adults, 1 eats FREE. Unlimited pork, sides, rice & lettuce, with no time limit.",
    period: "Our recurring barkada promo. Message us to check if it's running this month.",
    terms: [
      "Dine-in only (walk-in or reserved).",
      "A full-paying adult is a guest paying the regular ₱349 rate. Kids' rates are not counted.",
      "The free diner must be claimed during the same visit and cannot be transferred.",
      "Cannot be combined with other promos or Senior Citizen / PWD discounts.",
      "One promo per table per visit."
    ]
  },

  // Latest photos from SamgyupTa's Facebook page (2026)
  gallery: [
    { src: "images/gallery-1.jpg", alt: "Samgyupsal spread with side dishes", emoji: "🥓" },
    { src: "images/gallery-2.jpg", alt: "Grill tables in the garden dining area", emoji: "🔥" },
    { src: "images/gallery-3.jpg", alt: "Indoor dining area", emoji: "🏮" },
    { src: "images/gallery-4.jpg", alt: "Open-air garden seating", emoji: "🌿" },
    { src: "images/gallery-5.jpg", alt: "Table grill ready to go", emoji: "♨️" },
    { src: "images/gallery-6.jpg", alt: "Birthday party setup", emoji: "🎈" },
    { src: "images/gallery-7.jpg", alt: "Evening event setup", emoji: "✨" },
    { src: "images/gallery-8.jpg", alt: "Party backdrop with balloon arch", emoji: "🎂" }
  ],

  // Short excerpts from public Google reviews
  reviews: [
    { text: "Highly recommended! Unlimited at affordable price, service is great, delicious food esp the side dishes.", who: "Aileen M., Google review" },
    { text: "Meat was fresh, side dishes YUM. Staff provided quick service and allowed us to bring a birthday cake.", who: "Althea M., Google review" },
    { text: "Very much recommended! The pork and the side dishes are delish!", who: "Bea R., Google review" }
  ]
};
