export interface MandiRate {
  id: string;
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  date: string;
  lat?: number;
  lng?: number;
}

export const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir"
];

export const mandiRates: MandiRate[] = [
  // ANDHRA PRADESH
  { id: "ap1", state: "Andhra Pradesh", district: "Guntur", market: "Guntur", commodity: "Chilli", variety: "Teja", minPrice: 12000, maxPrice: 18000, modalPrice: 15000, unit: "Quintal", date: "2026-03-08", lat: 16.3067, lng: 80.4365 },
  { id: "ap2", state: "Andhra Pradesh", district: "Kurnool", market: "Kurnool", commodity: "Cotton", variety: "Hybrid", minPrice: 6500, maxPrice: 7200, modalPrice: 6800, unit: "Quintal", date: "2026-03-08", lat: 15.8281, lng: 78.0373 },
  { id: "ap3", state: "Andhra Pradesh", district: "Krishna", market: "Vijayawada", commodity: "Rice", variety: "BPT-5204", minPrice: 2200, maxPrice: 2800, modalPrice: 2500, unit: "Quintal", date: "2026-03-08", lat: 16.5062, lng: 80.6480 },
  { id: "ap4", state: "Andhra Pradesh", district: "Anantapur", market: "Anantapur", commodity: "Groundnut", variety: "TMV-2", minPrice: 5500, maxPrice: 6800, modalPrice: 6200, unit: "Quintal", date: "2026-03-08", lat: 14.6819, lng: 77.6006 },
  { id: "ap5", state: "Andhra Pradesh", district: "West Godavari", market: "Eluru", commodity: "Banana", variety: "Cavendish", minPrice: 800, maxPrice: 1500, modalPrice: 1100, unit: "Quintal", date: "2026-03-08", lat: 16.7107, lng: 81.0952 },
  { id: "ap6", state: "Andhra Pradesh", district: "East Godavari", market: "Kakinada", commodity: "Coconut", variety: "Tall", minPrice: 12000, maxPrice: 15000, modalPrice: 13500, unit: "1000 Nuts", date: "2026-03-08", lat: 16.9891, lng: 82.2475 },
  { id: "ap7", state: "Andhra Pradesh", district: "Chittoor", market: "Madanapalle", commodity: "Tomato", variety: "Local", minPrice: 800, maxPrice: 2500, modalPrice: 1500, unit: "Quintal", date: "2026-03-08", lat: 13.5500, lng: 78.5000 },
  { id: "ap8", state: "Andhra Pradesh", district: "Prakasam", market: "Ongole", commodity: "Chilli", variety: "Wonder Hot", minPrice: 11000, maxPrice: 16000, modalPrice: 13500, unit: "Quintal", date: "2026-03-08", lat: 15.5057, lng: 80.0499 },

  // TELANGANA
  { id: "ts1", state: "Telangana", district: "Hyderabad", market: "Bowenpally", commodity: "Vegetables", variety: "Mixed", minPrice: 500, maxPrice: 3000, modalPrice: 1500, unit: "Quintal", date: "2026-03-08", lat: 17.4700, lng: 78.4800 },
  { id: "ts2", state: "Telangana", district: "Nizamabad", market: "Nizamabad", commodity: "Turmeric", variety: "Rajapuri", minPrice: 8000, maxPrice: 12000, modalPrice: 10000, unit: "Quintal", date: "2026-03-08", lat: 18.6725, lng: 78.0943 },
  { id: "ts3", state: "Telangana", district: "Warangal", market: "Warangal", commodity: "Cotton", variety: "Hybrid", minPrice: 6200, maxPrice: 7000, modalPrice: 6600, unit: "Quintal", date: "2026-03-08", lat: 17.9689, lng: 79.5941 },
  { id: "ts4", state: "Telangana", district: "Karimnagar", market: "Karimnagar", commodity: "Rice", variety: "HMT", minPrice: 2300, maxPrice: 2900, modalPrice: 2600, unit: "Quintal", date: "2026-03-08", lat: 18.4386, lng: 79.1288 },
  { id: "ts5", state: "Telangana", district: "Khammam", market: "Khammam", commodity: "Chilli", variety: "S4", minPrice: 10000, maxPrice: 15000, modalPrice: 12500, unit: "Quintal", date: "2026-03-08", lat: 17.2473, lng: 80.1514 },
  { id: "ts6", state: "Telangana", district: "Adilabad", market: "Adilabad", commodity: "Soybean", variety: "JS-335", minPrice: 4200, maxPrice: 5000, modalPrice: 4600, unit: "Quintal", date: "2026-03-08", lat: 19.6641, lng: 78.5320 },

  // TAMIL NADU
  { id: "tn1", state: "Tamil Nadu", district: "Coimbatore", market: "Coimbatore", commodity: "Coconut", variety: "Tall", minPrice: 13000, maxPrice: 16000, modalPrice: 14500, unit: "1000 Nuts", date: "2026-03-08", lat: 11.0168, lng: 76.9558 },
  { id: "tn2", state: "Tamil Nadu", district: "Salem", market: "Salem", commodity: "Turmeric", variety: "Erode Local", minPrice: 9000, maxPrice: 13000, modalPrice: 11000, unit: "Quintal", date: "2026-03-08", lat: 11.6643, lng: 78.1460 },
  { id: "tn3", state: "Tamil Nadu", district: "Madurai", market: "Madurai", commodity: "Banana", variety: "Poovan", minPrice: 700, maxPrice: 1200, modalPrice: 950, unit: "Quintal", date: "2026-03-08", lat: 9.9252, lng: 78.1198 },
  { id: "tn4", state: "Tamil Nadu", district: "Thanjavur", market: "Thanjavur", commodity: "Rice", variety: "Ponni", minPrice: 2400, maxPrice: 3000, modalPrice: 2700, unit: "Quintal", date: "2026-03-08", lat: 10.7870, lng: 79.1378 },
  { id: "tn5", state: "Tamil Nadu", district: "Dindigul", market: "Dindigul", commodity: "Garlic", variety: "Local", minPrice: 8000, maxPrice: 12000, modalPrice: 10000, unit: "Quintal", date: "2026-03-08", lat: 10.3673, lng: 77.9803 },

  // KARNATAKA
  { id: "ka1", state: "Karnataka", district: "Bengaluru", market: "Yeshwanthpur", commodity: "Tomato", variety: "Hybrid", minPrice: 600, maxPrice: 2000, modalPrice: 1200, unit: "Quintal", date: "2026-03-08", lat: 13.0206, lng: 77.5352 },
  { id: "ka2", state: "Karnataka", district: "Hassan", market: "Hassan", commodity: "Arecanut", variety: "Local", minPrice: 42000, maxPrice: 52000, modalPrice: 47000, unit: "Quintal", date: "2026-03-08", lat: 13.0033, lng: 76.0961 },
  { id: "ka3", state: "Karnataka", district: "Dharwad", market: "Hubli", commodity: "Cotton", variety: "MCU-5", minPrice: 6000, maxPrice: 7000, modalPrice: 6500, unit: "Quintal", date: "2026-03-08", lat: 15.3647, lng: 75.1240 },
  { id: "ka4", state: "Karnataka", district: "Belgaum", market: "Belgaum", commodity: "Sugarcane", variety: "Co-86032", minPrice: 300, maxPrice: 350, modalPrice: 325, unit: "Quintal", date: "2026-03-08", lat: 15.8497, lng: 74.4977 },
  { id: "ka5", state: "Karnataka", district: "Shimoga", market: "Shimoga", commodity: "Rice", variety: "Sona Masuri", minPrice: 2500, maxPrice: 3200, modalPrice: 2850, unit: "Quintal", date: "2026-03-08", lat: 13.9299, lng: 75.5681 },

  // MAHARASHTRA
  { id: "mh1", state: "Maharashtra", district: "Nashik", market: "Lasalgaon", commodity: "Onion", variety: "Local Red", minPrice: 800, maxPrice: 2500, modalPrice: 1600, unit: "Quintal", date: "2026-03-08", lat: 20.1437, lng: 74.2375 },
  { id: "mh2", state: "Maharashtra", district: "Pune", market: "Pune", commodity: "Tomato", variety: "Hybrid", minPrice: 700, maxPrice: 2200, modalPrice: 1400, unit: "Quintal", date: "2026-03-08", lat: 18.5204, lng: 73.8567 },
  { id: "mh3", state: "Maharashtra", district: "Nagpur", market: "Nagpur", commodity: "Orange", variety: "Nagpur Mandarin", minPrice: 3000, maxPrice: 5000, modalPrice: 4000, unit: "Quintal", date: "2026-03-08", lat: 21.1458, lng: 79.0882 },
  { id: "mh4", state: "Maharashtra", district: "Solapur", market: "Solapur", commodity: "Pomegranate", variety: "Bhagwa", minPrice: 5000, maxPrice: 12000, modalPrice: 8000, unit: "Quintal", date: "2026-03-08", lat: 17.6599, lng: 75.9064 },
  { id: "mh5", state: "Maharashtra", district: "Sangli", market: "Sangli", commodity: "Turmeric", variety: "Sangli Local", minPrice: 8500, maxPrice: 11500, modalPrice: 10000, unit: "Quintal", date: "2026-03-08", lat: 16.8524, lng: 74.5815 },
  { id: "mh6", state: "Maharashtra", district: "Kolhapur", market: "Kolhapur", commodity: "Sugarcane", variety: "Co-86032", minPrice: 310, maxPrice: 360, modalPrice: 335, unit: "Quintal", date: "2026-03-08", lat: 16.7050, lng: 74.2433 },

  // GUJARAT
  { id: "gj1", state: "Gujarat", district: "Rajkot", market: "Rajkot", commodity: "Groundnut", variety: "GG-20", minPrice: 5800, maxPrice: 7000, modalPrice: 6400, unit: "Quintal", date: "2026-03-08", lat: 22.3039, lng: 70.8022 },
  { id: "gj2", state: "Gujarat", district: "Junagadh", market: "Junagadh", commodity: "Groundnut", variety: "TJ-37", minPrice: 5500, maxPrice: 6800, modalPrice: 6100, unit: "Quintal", date: "2026-03-08", lat: 21.5222, lng: 70.4579 },
  { id: "gj3", state: "Gujarat", district: "Unjha", market: "Unjha", commodity: "Cumin", variety: "Local", minPrice: 32000, maxPrice: 42000, modalPrice: 37000, unit: "Quintal", date: "2026-03-08", lat: 23.8000, lng: 72.3833 },
  { id: "gj4", state: "Gujarat", district: "Ahmedabad", market: "Ahmedabad", commodity: "Cotton", variety: "Shankar-6", minPrice: 6200, maxPrice: 7100, modalPrice: 6650, unit: "Quintal", date: "2026-03-08", lat: 23.0225, lng: 72.5714 },
  { id: "gj5", state: "Gujarat", district: "Bhavnagar", market: "Bhavnagar", commodity: "Castor", variety: "GCH-7", minPrice: 5500, maxPrice: 6200, modalPrice: 5850, unit: "Quintal", date: "2026-03-08", lat: 21.7645, lng: 72.1519 },

  // RAJASTHAN
  { id: "rj1", state: "Rajasthan", district: "Jodhpur", market: "Jodhpur", commodity: "Cumin", variety: "Local", minPrice: 33000, maxPrice: 43000, modalPrice: 38000, unit: "Quintal", date: "2026-03-08", lat: 26.2389, lng: 73.0243 },
  { id: "rj2", state: "Rajasthan", district: "Kota", market: "Kota", commodity: "Soybean", variety: "JS-335", minPrice: 4000, maxPrice: 5200, modalPrice: 4600, unit: "Quintal", date: "2026-03-08", lat: 25.2138, lng: 75.8648 },
  { id: "rj3", state: "Rajasthan", district: "Alwar", market: "Alwar", commodity: "Mustard", variety: "Local", minPrice: 5000, maxPrice: 5800, modalPrice: 5400, unit: "Quintal", date: "2026-03-08", lat: 27.5530, lng: 76.6346 },
  { id: "rj4", state: "Rajasthan", district: "Jaipur", market: "Jaipur", commodity: "Wheat", variety: "Lok-1", minPrice: 2200, maxPrice: 2600, modalPrice: 2400, unit: "Quintal", date: "2026-03-08", lat: 26.9124, lng: 75.7873 },
  { id: "rj5", state: "Rajasthan", district: "Nagaur", market: "Nagaur", commodity: "Coriander", variety: "Local", minPrice: 7000, maxPrice: 9000, modalPrice: 8000, unit: "Quintal", date: "2026-03-08", lat: 27.2024, lng: 73.7339 },

  // MADHYA PRADESH
  { id: "mp1", state: "Madhya Pradesh", district: "Indore", market: "Indore", commodity: "Soybean", variety: "JS-335", minPrice: 4100, maxPrice: 5300, modalPrice: 4700, unit: "Quintal", date: "2026-03-08", lat: 22.7196, lng: 75.8577 },
  { id: "mp2", state: "Madhya Pradesh", district: "Bhopal", market: "Bhopal", commodity: "Wheat", variety: "Sehore", minPrice: 2300, maxPrice: 2700, modalPrice: 2500, unit: "Quintal", date: "2026-03-08", lat: 23.2599, lng: 77.4126 },
  { id: "mp3", state: "Madhya Pradesh", district: "Ujjain", market: "Ujjain", commodity: "Garlic", variety: "Local", minPrice: 7500, maxPrice: 11000, modalPrice: 9200, unit: "Quintal", date: "2026-03-08", lat: 23.1765, lng: 75.7885 },
  { id: "mp4", state: "Madhya Pradesh", district: "Neemuch", market: "Neemuch", commodity: "Coriander", variety: "Eagle", minPrice: 7500, maxPrice: 9500, modalPrice: 8500, unit: "Quintal", date: "2026-03-08", lat: 24.4710, lng: 74.8670 },

  // UTTAR PRADESH
  { id: "up1", state: "Uttar Pradesh", district: "Agra", market: "Agra", commodity: "Potato", variety: "Kufri Pukhraj", minPrice: 500, maxPrice: 1200, modalPrice: 800, unit: "Quintal", date: "2026-03-08", lat: 27.1767, lng: 78.0081 },
  { id: "up2", state: "Uttar Pradesh", district: "Lucknow", market: "Lucknow", commodity: "Wheat", variety: "PBW-343", minPrice: 2200, maxPrice: 2650, modalPrice: 2425, unit: "Quintal", date: "2026-03-08", lat: 26.8467, lng: 80.9462 },
  { id: "up3", state: "Uttar Pradesh", district: "Meerut", market: "Meerut", commodity: "Sugarcane", variety: "CoS-767", minPrice: 315, maxPrice: 355, modalPrice: 335, unit: "Quintal", date: "2026-03-08", lat: 28.9845, lng: 77.7064 },
  { id: "up4", state: "Uttar Pradesh", district: "Varanasi", market: "Varanasi", commodity: "Rice", variety: "BPT", minPrice: 2100, maxPrice: 2700, modalPrice: 2400, unit: "Quintal", date: "2026-03-08", lat: 25.3176, lng: 82.9739 },
  { id: "up5", state: "Uttar Pradesh", district: "Allahabad", market: "Prayagraj", commodity: "Potato", variety: "Kufri Badshah", minPrice: 450, maxPrice: 1100, modalPrice: 750, unit: "Quintal", date: "2026-03-08", lat: 25.4358, lng: 81.8463 },

  // PUNJAB
  { id: "pb1", state: "Punjab", district: "Ludhiana", market: "Ludhiana", commodity: "Wheat", variety: "PBW-725", minPrice: 2275, maxPrice: 2600, modalPrice: 2450, unit: "Quintal", date: "2026-03-08", lat: 30.9010, lng: 75.8573 },
  { id: "pb2", state: "Punjab", district: "Amritsar", market: "Amritsar", commodity: "Rice", variety: "Pusa Basmati", minPrice: 3500, maxPrice: 4500, modalPrice: 4000, unit: "Quintal", date: "2026-03-08", lat: 31.6340, lng: 74.8723 },
  { id: "pb3", state: "Punjab", district: "Bathinda", market: "Bathinda", commodity: "Cotton", variety: "Hybrid", minPrice: 6300, maxPrice: 7200, modalPrice: 6750, unit: "Quintal", date: "2026-03-08", lat: 30.2110, lng: 74.9455 },
  { id: "pb4", state: "Punjab", district: "Abohar", market: "Abohar", commodity: "Kinnow", variety: "Kinnow", minPrice: 1500, maxPrice: 3000, modalPrice: 2200, unit: "Quintal", date: "2026-03-08", lat: 30.1453, lng: 74.1950 },

  // HARYANA
  { id: "hr1", state: "Haryana", district: "Karnal", market: "Karnal", commodity: "Wheat", variety: "WH-1105", minPrice: 2275, maxPrice: 2600, modalPrice: 2450, unit: "Quintal", date: "2026-03-08", lat: 29.6857, lng: 76.9905 },
  { id: "hr2", state: "Haryana", district: "Hisar", market: "Hisar", commodity: "Mustard", variety: "RH-749", minPrice: 5100, maxPrice: 5700, modalPrice: 5400, unit: "Quintal", date: "2026-03-08", lat: 29.1492, lng: 75.7217 },
  { id: "hr3", state: "Haryana", district: "Sonipat", market: "Sonipat", commodity: "Rice", variety: "1121 Basmati", minPrice: 3800, maxPrice: 4800, modalPrice: 4300, unit: "Quintal", date: "2026-03-08", lat: 28.9931, lng: 77.0151 },
  { id: "hr4", state: "Haryana", district: "Sirsa", market: "Sirsa", commodity: "Cotton", variety: "Desi", minPrice: 6000, maxPrice: 6800, modalPrice: 6400, unit: "Quintal", date: "2026-03-08", lat: 29.5349, lng: 75.0280 },

  // WEST BENGAL
  { id: "wb1", state: "West Bengal", district: "Kolkata", market: "Kolkata", commodity: "Rice", variety: "Gobindobhog", minPrice: 3000, maxPrice: 4000, modalPrice: 3500, unit: "Quintal", date: "2026-03-08", lat: 22.5726, lng: 88.3639 },
  { id: "wb2", state: "West Bengal", district: "Hooghly", market: "Hooghly", commodity: "Potato", variety: "Jyoti", minPrice: 500, maxPrice: 1000, modalPrice: 750, unit: "Quintal", date: "2026-03-08", lat: 22.9086, lng: 88.3967 },
  { id: "wb3", state: "West Bengal", district: "Murshidabad", market: "Murshidabad", commodity: "Jute", variety: "JRO-524", minPrice: 4500, maxPrice: 5500, modalPrice: 5000, unit: "Quintal", date: "2026-03-08", lat: 24.1700, lng: 88.2700 },

  // BIHAR
  { id: "br1", state: "Bihar", district: "Patna", market: "Patna", commodity: "Wheat", variety: "HD-2967", minPrice: 2200, maxPrice: 2600, modalPrice: 2400, unit: "Quintal", date: "2026-03-08", lat: 25.6093, lng: 85.1376 },
  { id: "br2", state: "Bihar", district: "Muzaffarpur", market: "Muzaffarpur", commodity: "Banana", variety: "Malbhog", minPrice: 600, maxPrice: 1200, modalPrice: 900, unit: "Quintal", date: "2026-03-08", lat: 26.1209, lng: 85.3647 },
  { id: "br3", state: "Bihar", district: "Nalanda", market: "Nalanda", commodity: "Rice", variety: "Swarna", minPrice: 2000, maxPrice: 2500, modalPrice: 2250, unit: "Quintal", date: "2026-03-08", lat: 25.1200, lng: 85.4500 },

  // ODISHA
  { id: "od1", state: "Odisha", district: "Bhubaneswar", market: "Bhubaneswar", commodity: "Rice", variety: "Swarna", minPrice: 1900, maxPrice: 2400, modalPrice: 2150, unit: "Quintal", date: "2026-03-08", lat: 20.2961, lng: 85.8245 },
  { id: "od2", state: "Odisha", district: "Sambalpur", market: "Sambalpur", commodity: "Cotton", variety: "Hybrid", minPrice: 5800, maxPrice: 6600, modalPrice: 6200, unit: "Quintal", date: "2026-03-08", lat: 21.4669, lng: 83.9756 },

  // KERALA
  { id: "kl1", state: "Kerala", district: "Ernakulam", market: "Kochi", commodity: "Coconut", variety: "Tall", minPrice: 14000, maxPrice: 18000, modalPrice: 16000, unit: "1000 Nuts", date: "2026-03-08", lat: 9.9312, lng: 76.2673 },
  { id: "kl2", state: "Kerala", district: "Wayanad", market: "Wayanad", commodity: "Coffee", variety: "Robusta", minPrice: 9000, maxPrice: 12000, modalPrice: 10500, unit: "Quintal", date: "2026-03-08", lat: 11.6854, lng: 76.1320 },
  { id: "kl3", state: "Kerala", district: "Idukki", market: "Idukki", commodity: "Cardamom", variety: "Alleppey Green", minPrice: 100000, maxPrice: 150000, modalPrice: 125000, unit: "Quintal", date: "2026-03-08", lat: 9.8494, lng: 76.9720 },

  // CHHATTISGARH
  { id: "cg1", state: "Chhattisgarh", district: "Raipur", market: "Raipur", commodity: "Rice", variety: "MTU-1010", minPrice: 2000, maxPrice: 2500, modalPrice: 2250, unit: "Quintal", date: "2026-03-08", lat: 21.2514, lng: 81.6296 },
  { id: "cg2", state: "Chhattisgarh", district: "Durg", market: "Durg", commodity: "Soybean", variety: "JS-9560", minPrice: 4000, maxPrice: 5000, modalPrice: 4500, unit: "Quintal", date: "2026-03-08", lat: 21.1904, lng: 81.2849 },

  // JHARKHAND
  { id: "jh1", state: "Jharkhand", district: "Ranchi", market: "Ranchi", commodity: "Vegetables", variety: "Mixed", minPrice: 500, maxPrice: 2500, modalPrice: 1500, unit: "Quintal", date: "2026-03-08", lat: 23.3441, lng: 85.3096 },
  { id: "jh2", state: "Jharkhand", district: "Dumka", market: "Dumka", commodity: "Rice", variety: "MTU-7029", minPrice: 1900, maxPrice: 2400, modalPrice: 2150, unit: "Quintal", date: "2026-03-08", lat: 24.2686, lng: 87.2492 },

  // ASSAM
  { id: "as1", state: "Assam", district: "Guwahati", market: "Guwahati", commodity: "Tea", variety: "CTC", minPrice: 15000, maxPrice: 25000, modalPrice: 20000, unit: "Quintal", date: "2026-03-08", lat: 26.1445, lng: 91.7362 },
  { id: "as2", state: "Assam", district: "Jorhat", market: "Jorhat", commodity: "Rice", variety: "Joha", minPrice: 3000, maxPrice: 4000, modalPrice: 3500, unit: "Quintal", date: "2026-03-08", lat: 26.7509, lng: 94.2037 },

  // HIMACHAL PRADESH
  { id: "hp1", state: "Himachal Pradesh", district: "Shimla", market: "Shimla", commodity: "Apple", variety: "Royal Delicious", minPrice: 4000, maxPrice: 8000, modalPrice: 6000, unit: "Quintal", date: "2026-03-08", lat: 31.1048, lng: 77.1734 },
  { id: "hp2", state: "Himachal Pradesh", district: "Kullu", market: "Kullu", commodity: "Apple", variety: "Golden Delicious", minPrice: 3500, maxPrice: 7000, modalPrice: 5500, unit: "Quintal", date: "2026-03-08", lat: 31.9579, lng: 77.1095 },

  // UTTARAKHAND
  { id: "uk1", state: "Uttarakhand", district: "Dehradun", market: "Dehradun", commodity: "Rice", variety: "Basmati", minPrice: 3200, maxPrice: 4200, modalPrice: 3700, unit: "Quintal", date: "2026-03-08", lat: 30.3165, lng: 78.0322 },
  { id: "uk2", state: "Uttarakhand", district: "Haldwani", market: "Haldwani", commodity: "Wheat", variety: "UP-2338", minPrice: 2200, maxPrice: 2600, modalPrice: 2400, unit: "Quintal", date: "2026-03-08", lat: 29.2183, lng: 79.5130 },

  // GOA
  { id: "ga1", state: "Goa", district: "North Goa", market: "Mapusa", commodity: "Coconut", variety: "Tall", minPrice: 13000, maxPrice: 16000, modalPrice: 14500, unit: "1000 Nuts", date: "2026-03-08", lat: 15.5938, lng: 73.8106 },

  // DELHI
  { id: "dl1", state: "Delhi", district: "New Delhi", market: "Azadpur", commodity: "Onion", variety: "Nashik Red", minPrice: 900, maxPrice: 2800, modalPrice: 1800, unit: "Quintal", date: "2026-03-08", lat: 28.7167, lng: 77.1833 },
  { id: "dl2", state: "Delhi", district: "New Delhi", market: "Azadpur", commodity: "Tomato", variety: "Hybrid", minPrice: 600, maxPrice: 2200, modalPrice: 1400, unit: "Quintal", date: "2026-03-08", lat: 28.7167, lng: 77.1833 },
  { id: "dl3", state: "Delhi", district: "New Delhi", market: "Azadpur", commodity: "Potato", variety: "Agra", minPrice: 500, maxPrice: 1100, modalPrice: 800, unit: "Quintal", date: "2026-03-08", lat: 28.7167, lng: 77.1833 },

  // JAMMU & KASHMIR
  { id: "jk1", state: "Jammu & Kashmir", district: "Srinagar", market: "Srinagar", commodity: "Apple", variety: "Delicious", minPrice: 5000, maxPrice: 10000, modalPrice: 7500, unit: "Quintal", date: "2026-03-08", lat: 34.0837, lng: 74.7973 },
  { id: "jk2", state: "Jammu & Kashmir", district: "Shopian", market: "Shopian", commodity: "Apple", variety: "Ambri", minPrice: 4000, maxPrice: 8000, modalPrice: 6000, unit: "Quintal", date: "2026-03-08", lat: 33.7159, lng: 74.8291 },

  // MANIPUR
  { id: "mn1", state: "Manipur", district: "Imphal", market: "Imphal", commodity: "Rice", variety: "Chakhao", minPrice: 4000, maxPrice: 6000, modalPrice: 5000, unit: "Quintal", date: "2026-03-08", lat: 24.8170, lng: 93.9368 },

  // MEGHALAYA
  { id: "ml1", state: "Meghalaya", district: "Shillong", market: "Shillong", commodity: "Potato", variety: "Local", minPrice: 600, maxPrice: 1200, modalPrice: 900, unit: "Quintal", date: "2026-03-08", lat: 25.5788, lng: 91.8933 },

  // TRIPURA
  { id: "tr1", state: "Tripura", district: "Agartala", market: "Agartala", commodity: "Rice", variety: "Local", minPrice: 1800, maxPrice: 2300, modalPrice: 2050, unit: "Quintal", date: "2026-03-08", lat: 23.8315, lng: 91.2868 },

  // NAGALAND
  { id: "nl1", state: "Nagaland", district: "Dimapur", market: "Dimapur", commodity: "Rice", variety: "Local", minPrice: 2500, maxPrice: 3500, modalPrice: 3000, unit: "Quintal", date: "2026-03-08", lat: 25.9042, lng: 93.7270 },

  // MIZORAM
  { id: "mz1", state: "Mizoram", district: "Aizawl", market: "Aizawl", commodity: "Ginger", variety: "Nadia", minPrice: 3000, maxPrice: 5000, modalPrice: 4000, unit: "Quintal", date: "2026-03-08", lat: 23.7271, lng: 92.7176 },

  // ARUNACHAL PRADESH
  { id: "ar1", state: "Arunachal Pradesh", district: "Itanagar", market: "Itanagar", commodity: "Rice", variety: "Local", minPrice: 2500, maxPrice: 3500, modalPrice: 3000, unit: "Quintal", date: "2026-03-08", lat: 27.0844, lng: 93.6053 },

  // SIKKIM
  { id: "sk1", state: "Sikkim", district: "Gangtok", market: "Gangtok", commodity: "Cardamom", variety: "Large", minPrice: 90000, maxPrice: 140000, modalPrice: 115000, unit: "Quintal", date: "2026-03-08", lat: 27.3389, lng: 88.6065 },
];
