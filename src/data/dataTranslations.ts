// Data-level translations for crop names, categories, plant parts, community categories etc.

type DataTranslations = {
  cropCategories: Record<string, string>;
  cropNames: Record<string, string>;
  communityCategories: Record<string, string>;
  plantParts: Record<string, string>;
};

const dataTranslations: Record<string, DataTranslations> = {
  en: {
    cropCategories: { All: "All", Cereals: "Cereals", Pulses: "Pulses", Oilseeds: "Oilseeds", Vegetables: "Vegetables", Fruits: "Fruits", Spices: "Spices", Commercial: "Commercial", Plantation: "Plantation" },
    cropNames: {
      Rice: "Rice", Wheat: "Wheat", "Maize (Corn)": "Maize (Corn)", "Bajra (Pearl Millet)": "Bajra (Pearl Millet)", "Jowar (Sorghum)": "Jowar (Sorghum)", "Ragi (Finger Millet)": "Ragi (Finger Millet)", Barley: "Barley", Oats: "Oats",
      "Foxtail Millet (Kangni)": "Foxtail Millet (Kangni)", "Kodo Millet": "Kodo Millet", "Barnyard Millet (Sanwa)": "Barnyard Millet (Sanwa)", "Proso Millet (Cheena)": "Proso Millet (Cheena)",
      "Chickpea (Chana)": "Chickpea (Chana)", "Pigeon Pea (Arhar/Tur)": "Pigeon Pea (Arhar/Tur)", "Lentil (Masoor)": "Lentil (Masoor)", "Moong (Green Gram)": "Moong (Green Gram)", "Urad (Black Gram)": "Urad (Black Gram)", "Field Pea (Matar)": "Field Pea (Matar)", "Horse Gram (Kulthi)": "Horse Gram (Kulthi)",
      "Cowpea (Lobia)": "Cowpea (Lobia)", "Moth Bean": "Moth Bean", "Rajma (Kidney Bean)": "Rajma (Kidney Bean)",
      "Groundnut (Peanut)": "Groundnut (Peanut)", Soybean: "Soybean", "Mustard (Sarson)": "Mustard (Sarson)", Sunflower: "Sunflower", "Sesame (Til)": "Sesame (Til)", Castor: "Castor", "Linseed (Flax)": "Linseed (Flax)",
      "Safflower (Kusum)": "Safflower (Kusum)", "Niger Seed (Ramtil)": "Niger Seed (Ramtil)",
      Tomato: "Tomato", Potato: "Potato", Onion: "Onion", "Brinjal (Eggplant)": "Brinjal (Eggplant)", "Chilli (Green & Red)": "Chilli (Green & Red)", "Okra (Bhindi/Lady Finger)": "Okra (Bhindi/Lady Finger)", Cabbage: "Cabbage", Cauliflower: "Cauliflower", Carrot: "Carrot", Radish: "Radish", "Spinach (Palak)": "Spinach (Palak)", "Bottle Gourd (Lauki)": "Bottle Gourd (Lauki)", "Bitter Gourd (Karela)": "Bitter Gourd (Karela)", "Ridge Gourd (Turai)": "Ridge Gourd (Turai)", Pumpkin: "Pumpkin", Cucumber: "Cucumber", "French Beans": "French Beans", "Drumstick (Moringa)": "Drumstick (Moringa)", "Sweet Potato": "Sweet Potato", Lettuce: "Lettuce", Broccoli: "Broccoli", "Capsicum (Bell Pepper)": "Capsicum (Bell Pepper)", Beetroot: "Beetroot", "Snake Gourd (Chichinda)": "Snake Gourd (Chichinda)", "Ash Gourd (Petha)": "Ash Gourd (Petha)", "Cluster Bean (Guar)": "Cluster Bean (Guar)", "Taro (Arbi)": "Taro (Arbi)", "Tapioca (Cassava)": "Tapioca (Cassava)",
      Mango: "Mango", Banana: "Banana", Papaya: "Papaya", Guava: "Guava", Pomegranate: "Pomegranate", Grapes: "Grapes", Apple: "Apple", "Orange (Nagpur/Kinnow)": "Orange (Nagpur/Kinnow)", "Lemon/Lime": "Lemon/Lime", Watermelon: "Watermelon", "Sapota (Chikoo)": "Sapota (Chikoo)", Jackfruit: "Jackfruit", Pineapple: "Pineapple", Strawberry: "Strawberry", Litchi: "Litchi", "Amla (Indian Gooseberry)": "Amla (Indian Gooseberry)", "Dragon Fruit (Kamalam)": "Dragon Fruit (Kamalam)",
      "Turmeric (Haldi)": "Turmeric (Haldi)", "Ginger (Adrak)": "Ginger (Adrak)", "Garlic (Lehsun)": "Garlic (Lehsun)", "Coriander (Dhaniya)": "Coriander (Dhaniya)", "Cumin (Jeera)": "Cumin (Jeera)", "Fenugreek (Methi)": "Fenugreek (Methi)", "Black Pepper": "Black Pepper", Cardamom: "Cardamom", "Clove (Laung)": "Clove (Laung)", "Cinnamon (Dalchini)": "Cinnamon (Dalchini)", "Fennel (Saunf)": "Fennel (Saunf)", "Saffron (Kesar)": "Saffron (Kesar)",
      "Cotton (Kapas)": "Cotton (Kapas)", Sugarcane: "Sugarcane", Tobacco: "Tobacco", Jute: "Jute",
      Tea: "Tea", Coffee: "Coffee", Rubber: "Rubber", Coconut: "Coconut", "Oil Palm": "Oil Palm", "Arecanut (Betel Nut)": "Arecanut (Betel Nut)", Cocoa: "Cocoa", Cashew: "Cashew", Vanilla: "Vanilla", "Betel Vine (Paan)": "Betel Vine (Paan)",
    },
    communityCategories: { All: "All", "Pest Control": "Pest Control", Irrigation: "Irrigation", Soil: "Soil", Market: "Market", Seeds: "Seeds", Fertilizer: "Fertilizer", Organic: "Organic", Equipment: "Equipment", Weather: "Weather" },
    plantParts: { Leaf: "Leaf", Stem: "Stem", Root: "Root", Fruit: "Fruit", "Pod/Seed": "Pod/Seed", Flower: "Flower", Insect: "Insect", "Full Plant": "Full Plant" },
  },
  hi: {
    cropCategories: { All: "सभी", Cereals: "अनाज", Pulses: "दालें", Oilseeds: "तिलहन", Vegetables: "सब्जियाँ", Fruits: "फल", Spices: "मसाले", Commercial: "व्यावसायिक", Plantation: "बागान" },
    cropNames: {
      Rice: "चावल", Wheat: "गेहूं", "Maize (Corn)": "मक्का", "Bajra (Pearl Millet)": "बाजरा", "Jowar (Sorghum)": "ज्वार", "Ragi (Finger Millet)": "रागी (मडुआ)", Barley: "जौ", Oats: "जई",
      "Foxtail Millet (Kangni)": "कंगनी (काकुन)", "Kodo Millet": "कोदो", "Barnyard Millet (Sanwa)": "सांवा (झंगोरा)", "Proso Millet (Cheena)": "चीना (बर्री)",
      "Chickpea (Chana)": "चना", "Pigeon Pea (Arhar/Tur)": "अरहर/तूर दाल", "Lentil (Masoor)": "मसूर दाल", "Moong (Green Gram)": "मूंग", "Urad (Black Gram)": "उड़द", "Field Pea (Matar)": "मटर", "Horse Gram (Kulthi)": "कुल्थी",
      "Cowpea (Lobia)": "लोबिया", "Moth Bean": "मोठ", "Rajma (Kidney Bean)": "राजमा",
      "Groundnut (Peanut)": "मूंगफली", Soybean: "सोयाबीन", "Mustard (Sarson)": "सरसों", Sunflower: "सूरजमुखी", "Sesame (Til)": "तिल", Castor: "अरंडी", "Linseed (Flax)": "अलसी",
      "Safflower (Kusum)": "कुसुम", "Niger Seed (Ramtil)": "रामतिल",
      Tomato: "टमाटर", Potato: "आलू", Onion: "प्याज", "Brinjal (Eggplant)": "बैंगन", "Chilli (Green & Red)": "मिर्च", "Okra (Bhindi/Lady Finger)": "भिंडी", Cabbage: "पत्तागोभी", Cauliflower: "फूलगोभी", Carrot: "गाजर", Radish: "मूली", "Spinach (Palak)": "पालक", "Bottle Gourd (Lauki)": "लौकी", "Bitter Gourd (Karela)": "करेला", "Ridge Gourd (Turai)": "तोरई", Pumpkin: "कद्दू", Cucumber: "खीरा", "French Beans": "फ्रेंच बीन्स", "Drumstick (Moringa)": "सहजन (मोरिंगा)", "Sweet Potato": "शकरकंद", Lettuce: "सलाद पत्ता", Broccoli: "ब्रोकली", "Capsicum (Bell Pepper)": "शिमला मिर्च", Beetroot: "चुकंदर", "Snake Gourd (Chichinda)": "चचिंडा", "Ash Gourd (Petha)": "पेठा", "Cluster Bean (Guar)": "ग्वार फली", "Taro (Arbi)": "अरबी", "Tapioca (Cassava)": "टैपिओका (कसावा)",
      Mango: "आम", Banana: "केला", Papaya: "पपीता", Guava: "अमरूद", Pomegranate: "अनार", Grapes: "अंगूर", Apple: "सेब", "Orange (Nagpur/Kinnow)": "संतरा (नागपुर/किन्नू)", "Lemon/Lime": "नींबू", Watermelon: "तरबूज", "Sapota (Chikoo)": "चीकू", Jackfruit: "कटहल", Pineapple: "अनानास", Strawberry: "स्ट्रॉबेरी", Litchi: "लीची", "Amla (Indian Gooseberry)": "आंवला", "Dragon Fruit (Kamalam)": "ड्रैगन फ्रूट (कमलम)",
      "Turmeric (Haldi)": "हल्दी", "Ginger (Adrak)": "अदरक", "Garlic (Lehsun)": "लहसुन", "Coriander (Dhaniya)": "धनिया", "Cumin (Jeera)": "जीरा", "Fenugreek (Methi)": "मेथी", "Black Pepper": "काली मिर्च", Cardamom: "इलायची", "Clove (Laung)": "लौंग", "Cinnamon (Dalchini)": "दालचीनी", "Fennel (Saunf)": "सौंफ", "Saffron (Kesar)": "केसर",
      "Cotton (Kapas)": "कपास", Sugarcane: "गन्ना", Tobacco: "तम्बाकू", Jute: "जूट/पटसन",
      Tea: "चाय", Coffee: "कॉफी", Rubber: "रबड़", Coconut: "नारियल", "Oil Palm": "ऑयल पाम", "Arecanut (Betel Nut)": "सुपारी", Cocoa: "कोको", Cashew: "काजू", Vanilla: "वनीला", "Betel Vine (Paan)": "पान",
    },
    communityCategories: { All: "सभी", "Pest Control": "कीट नियंत्रण", Irrigation: "सिंचाई", Soil: "मिट्टी", Market: "बाजार", Seeds: "बीज", Fertilizer: "उर्वरक", Organic: "जैविक", Equipment: "उपकरण", Weather: "मौसम" },
    plantParts: { Leaf: "पत्ती", Stem: "तना", Root: "जड़", Fruit: "फल", "Pod/Seed": "फली/बीज", Flower: "फूल", Insect: "कीट", "Full Plant": "पूरा पौधा" },
  },
  te: {
    cropCategories: { All: "అన్ని", Cereals: "ధాన్యాలు", Pulses: "పప్పులు", Oilseeds: "నూనెగింజలు", Vegetables: "కూరగాయలు", Fruits: "పండ్లు", Spices: "సుగంధ ద్రవ్యాలు", Commercial: "వాణిజ్య", Plantation: "తోటపంటలు" },
    cropNames: {
      Rice: "వరి (బియ్యం)", Wheat: "గోధుమ", "Maize (Corn)": "మొక్కజొన్న", "Bajra (Pearl Millet)": "సజ్జ", "Jowar (Sorghum)": "జొన్న", "Ragi (Finger Millet)": "రాగి", Barley: "బార్లీ", Oats: "ఓట్స్",
      "Foxtail Millet (Kangni)": "కొర్రలు", "Kodo Millet": "అరికెలు", "Barnyard Millet (Sanwa)": "ఊదలు", "Proso Millet (Cheena)": "వరిగెలు",
      "Chickpea (Chana)": "శనగ", "Pigeon Pea (Arhar/Tur)": "కందిపప్పు", "Lentil (Masoor)": "మసూర్ పప్పు", "Moong (Green Gram)": "పెసర", "Urad (Black Gram)": "మినుము", "Field Pea (Matar)": "బఠానీ", "Horse Gram (Kulthi)": "ఉలవలు",
      "Cowpea (Lobia)": "అలసందలు", "Moth Bean": "పెసలు", "Rajma (Kidney Bean)": "రాజ్మా",
      "Groundnut (Peanut)": "వేరుశనగ", Soybean: "సోయాబీన్", "Mustard (Sarson)": "ఆవాలు", Sunflower: "పొద్దుతిరుగుడు", "Sesame (Til)": "నువ్వులు", Castor: "ఆముదం", "Linseed (Flax)": "అవిసె",
      "Safflower (Kusum)": "కుసుమ", "Niger Seed (Ramtil)": "వెర్రి నువ్వులు",
      Tomato: "టమాటా", Potato: "బంగాళాదుంప", Onion: "ఉల్లిపాయ", "Brinjal (Eggplant)": "వంకాయ", "Chilli (Green & Red)": "మిరపకాయ", "Okra (Bhindi/Lady Finger)": "బెండకాయ", Cabbage: "క్యాబేజీ", Cauliflower: "గోబీ", Carrot: "క్యారెట్", Radish: "ముల్లంగి", "Spinach (Palak)": "పాలకూర", "Bottle Gourd (Lauki)": "సొరకాయ", "Bitter Gourd (Karela)": "కాకరకాయ", "Ridge Gourd (Turai)": "బీరకాయ", Pumpkin: "గుమ్మడికాయ", Cucumber: "దోసకాయ", "French Beans": "ఫ్రెంచ్ బీన్స్", "Drumstick (Moringa)": "మునగ", "Sweet Potato": "చిలగడదుంప", Lettuce: "లెట్యూస్", Broccoli: "బ్రోకోలి", "Capsicum (Bell Pepper)": "క్యాప్సికం", Beetroot: "బీట్‌రూట్", "Snake Gourd (Chichinda)": "పొట్లకాయ", "Ash Gourd (Petha)": "బూడిదగుమ్మడి", "Cluster Bean (Guar)": "గోరుచిక్కుడు", "Taro (Arbi)": "చామదుంప", "Tapioca (Cassava)": "టాపియోకా",
      Mango: "మామిడి", Banana: "అరటి", Papaya: "బొప్పాయి", Guava: "జామ", Pomegranate: "దానిమ్మ", Grapes: "ద్రాక్ష", Apple: "ఆపిల్", "Orange (Nagpur/Kinnow)": "నారింజ", "Lemon/Lime": "నిమ్మ", Watermelon: "పుచ్చకాయ", "Sapota (Chikoo)": "సపోట", Jackfruit: "పనస", Pineapple: "అనాస", Strawberry: "స్ట్రాబెర్రీ", Litchi: "లీచీ", "Amla (Indian Gooseberry)": "ఉసిరి", "Dragon Fruit (Kamalam)": "డ్రాగన్ ఫ్రూట్ (కమలం)",
      "Turmeric (Haldi)": "పసుపు", "Ginger (Adrak)": "అల్లం", "Garlic (Lehsun)": "వెల్లుల్లి", "Coriander (Dhaniya)": "ధనియాలు", "Cumin (Jeera)": "జీలకర్ర", "Fenugreek (Methi)": "మెంతులు", "Black Pepper": "నల్లమిరియాలు", Cardamom: "ఏలకులు", "Clove (Laung)": "లవంగాలు", "Cinnamon (Dalchini)": "దాల్చిన", "Fennel (Saunf)": "సోంపు", "Saffron (Kesar)": "కుంకుమపువ్వు",
      "Cotton (Kapas)": "పత్తి", Sugarcane: "చెరకు", Tobacco: "పొగాకు", Jute: "జనపనార",
      Tea: "తేయాకు", Coffee: "కాఫీ", Rubber: "రబ్బరు", Coconut: "కొబ్బరి", "Oil Palm": "ఆయిల్ పామ్", "Arecanut (Betel Nut)": "పోక", Cocoa: "కోకో", Cashew: "జీడిపప్పు", Vanilla: "వెనిల్లా", "Betel Vine (Paan)": "తమలపాకు",
    },
    communityCategories: { All: "అన్ని", "Pest Control": "చీడపీడల నియంత్రణ", Irrigation: "నీటిపారుదల", Soil: "నేల", Market: "మార్కెట్", Seeds: "విత్తనాలు", Fertilizer: "ఎరువులు", Organic: "సేంద్రియ", Equipment: "పరికరాలు", Weather: "వాతావరణం" },
    plantParts: { Leaf: "ఆకు", Stem: "కాండం", Root: "వేరు", Fruit: "పండు", "Pod/Seed": "కాయ/విత్తనం", Flower: "పువ్వు", Insect: "పురుగు", "Full Plant": "మొత్తం మొక్క" },
  },
  ta: {
    cropCategories: { All: "அனைத்தும்", Cereals: "தானியங்கள்", Pulses: "பருப்புகள்", Oilseeds: "எண்ணெய் வித்துக்கள்", Vegetables: "காய்கறிகள்", Fruits: "பழங்கள்", Spices: "மசாலா பொருட்கள்", Commercial: "வணிகப் பயிர்கள்", Plantation: "தோட்டப் பயிர்கள்" },
    cropNames: {
      Rice: "அரிசி (நெல்)", Wheat: "கோதுமை", "Maize (Corn)": "சோளம்", "Bajra (Pearl Millet)": "கம்பு", "Jowar (Sorghum)": "சோளம்", "Ragi (Finger Millet)": "கேழ்வரகு", Barley: "வாற்கோதுமை", Oats: "ஓட்ஸ்",
      "Foxtail Millet (Kangni)": "தினை", "Kodo Millet": "வரகு", "Barnyard Millet (Sanwa)": "குதிரைவாலி", "Proso Millet (Cheena)": "பனிவரகு",
      "Chickpea (Chana)": "கொண்டைக்கடலை", "Pigeon Pea (Arhar/Tur)": "துவரை", "Lentil (Masoor)": "மசூர் பருப்பு", "Moong (Green Gram)": "பாசிப்பயறு", "Urad (Black Gram)": "உளுந்து", "Field Pea (Matar)": "பட்டாணி", "Horse Gram (Kulthi)": "கொள்ளு",
      "Cowpea (Lobia)": "காராமணி", "Moth Bean": "துவரை பயறு", "Rajma (Kidney Bean)": "ராஜ்மா",
      "Groundnut (Peanut)": "நிலக்கடலை", Soybean: "சோயா", "Mustard (Sarson)": "கடுகு", Sunflower: "சூரியகாந்தி", "Sesame (Til)": "எள்", Castor: "ஆமணக்கு", "Linseed (Flax)": "ஆளி விதை",
      "Safflower (Kusum)": "குசும்பா", "Niger Seed (Ramtil)": "உசிலி எள்",
      Tomato: "தக்காளி", Potato: "உருளைக்கிழங்கு", Onion: "வெங்காயம்", "Brinjal (Eggplant)": "கத்தரிக்காய்", "Chilli (Green & Red)": "மிளகாய்", "Okra (Bhindi/Lady Finger)": "வெண்டைக்காய்", Cabbage: "முட்டைகோஸ்", Cauliflower: "காலிஃப்ளவர்", Carrot: "கேரட்", Radish: "முள்ளங்கி", "Spinach (Palak)": "பசலைக்கீரை", "Bottle Gourd (Lauki)": "சுரைக்காய்", "Bitter Gourd (Karela)": "பாகற்காய்", "Ridge Gourd (Turai)": "பீர்க்கங்காய்", Pumpkin: "பூசணிக்காய்", Cucumber: "வெள்ளரிக்காய்", "French Beans": "பீன்ஸ்", "Drumstick (Moringa)": "முருங்கை", "Sweet Potato": "சர்க்கரைவள்ளிக் கிழங்கு",
      Lettuce: "லெட்யூஸ்", Broccoli: "ப்ரோக்கோலி", "Capsicum (Bell Pepper)": "குடைமிளகாய்", Beetroot: "பீட்ரூட்", "Snake Gourd (Chichinda)": "புடலங்காய்", "Ash Gourd (Petha)": "சுரைக்காய் (வெள்ளை)", "Cluster Bean (Guar)": "கொத்தவரங்காய்", "Taro (Arbi)": "சேப்பங்கிழங்கு", "Tapioca (Cassava)": "மரவள்ளிக்கிழங்கு",
      Mango: "மாம்பழம்", Banana: "வாழைப்பழம்", Papaya: "பப்பாளி", Guava: "கொய்யா", Pomegranate: "மாதுளை", Grapes: "திராட்சை", Apple: "ஆப்பிள்", "Orange (Nagpur/Kinnow)": "ஆரஞ்சு", "Lemon/Lime": "எலுமிச்சை", Watermelon: "தர்பூசணி", "Sapota (Chikoo)": "சப்போட்டா", Jackfruit: "பலாப்பழம்", Pineapple: "அன்னாசிப்பழம்", Strawberry: "ஸ்ட்ராபெர்ரி", Litchi: "லிச்சி", "Amla (Indian Gooseberry)": "நெல்லிக்காய்", "Dragon Fruit (Kamalam)": "டிராகன் ஃப்ரூட்",
      "Turmeric (Haldi)": "மஞ்சள்", "Ginger (Adrak)": "இஞ்சி", "Garlic (Lehsun)": "பூண்டு", "Coriander (Dhaniya)": "கொத்தமல்லி", "Cumin (Jeera)": "சீரகம்", "Fenugreek (Methi)": "வெந்தயம்", "Black Pepper": "மிளகு", Cardamom: "ஏலக்காய்", "Clove (Laung)": "கிராம்பு", "Cinnamon (Dalchini)": "பட்டை", "Fennel (Saunf)": "பெருஞ்சீரகம்", "Saffron (Kesar)": "குங்குமப்பூ",
      "Cotton (Kapas)": "பருத்தி", Sugarcane: "கரும்பு", Tobacco: "புகையிலை", Jute: "சணல்",
      Tea: "தேயிலை", Coffee: "காபி", Rubber: "ரப்பர்", Coconut: "தேங்காய்", "Oil Palm": "எண்ணெய் பனை", "Arecanut (Betel Nut)": "பாக்கு", Cocoa: "கோகோ", Cashew: "முந்திரி", Vanilla: "வெனிலா", "Betel Vine (Paan)": "வெற்றிலை",
    },
    communityCategories: { All: "அனைத்தும்", "Pest Control": "பூச்சி கட்டுப்பாடு", Irrigation: "நீர்ப்பாசனம்", Soil: "மண்", Market: "சந்தை", Seeds: "விதைகள்", Fertilizer: "உரம்", Organic: "இயற்கை", Equipment: "கருவிகள்", Weather: "வானிலை" },
    plantParts: { Leaf: "இலை", Stem: "தண்டு", Root: "வேர்", Fruit: "பழம்", "Pod/Seed": "காய்/விதை", Flower: "பூ", Insect: "பூச்சி", "Full Plant": "முழு செடி" },
  },
  kn: {
    cropCategories: { All: "ಎಲ್ಲಾ", Cereals: "ಧಾನ್ಯಗಳು", Pulses: "ಬೇಳೆಕಾಳುಗಳು", Oilseeds: "ಎಣ್ಣೆಕಾಳುಗಳು", Vegetables: "ತರಕಾರಿಗಳು", Fruits: "ಹಣ್ಣುಗಳು", Spices: "ಸಂಬಾರ ಪದಾರ್ಥಗಳು", Commercial: "ವಾಣಿಜ್ಯ", Plantation: "ತೋಟಗಾರಿಕೆ" },
    cropNames: {
      Rice: "ಭತ್ತ (ಅಕ್ಕಿ)", Wheat: "ಗೋಧಿ", "Maize (Corn)": "ಮೆಕ್ಕೆಜೋಳ", "Bajra (Pearl Millet)": "ಸಜ್ಜೆ", "Jowar (Sorghum)": "ಜೋಳ", "Ragi (Finger Millet)": "ರಾಗಿ", Barley: "ಬಾರ್ಲಿ", Oats: "ಓಟ್ಸ್",
      "Foxtail Millet (Kangni)": "ನವಣೆ", "Kodo Millet": "ಹಾರಕ", "Barnyard Millet (Sanwa)": "ಊದಲು", "Proso Millet (Cheena)": "ಬರಗು",
      "Chickpea (Chana)": "ಕಡಲೆ", "Pigeon Pea (Arhar/Tur)": "ತೊಗರಿ", "Lentil (Masoor)": "ಮಸೂರ ಬೇಳೆ", "Moong (Green Gram)": "ಹೆಸರು", "Urad (Black Gram)": "ಉದ್ದು", "Field Pea (Matar)": "ಬಟಾಣಿ", "Horse Gram (Kulthi)": "ಹುರುಳಿ",
      "Cowpea (Lobia)": "ಅಲಸಂದೆ", "Moth Bean": "ಮಟ್ಕಿ", "Rajma (Kidney Bean)": "ರಾಜ್ಮಾ",
      "Groundnut (Peanut)": "ಕಡಲೆಕಾಯಿ", Soybean: "ಸೋಯಾಬೀನ್", "Mustard (Sarson)": "ಸಾಸಿವೆ", Sunflower: "ಸೂರ್ಯಕಾಂತಿ", "Sesame (Til)": "ಎಳ್ಳು", Castor: "ಹರಳು",
      "Safflower (Kusum)": "ಕುಸುಮೆ", "Niger Seed (Ramtil)": "ಗುರೆಳ್ಳು",
      Tomato: "ಟೊಮೊಟೊ", Potato: "ಆಲೂಗಡ್ಡೆ", Onion: "ಈರುಳ್ಳಿ", "Brinjal (Eggplant)": "ಬದನೆಕಾಯಿ", "Chilli (Green & Red)": "ಮೆಣಸಿನಕಾಯಿ", "Okra (Bhindi/Lady Finger)": "ಬೆಂಡೆಕಾಯಿ", Cabbage: "ಎಲೆಕೋಸು", Cauliflower: "ಹೂಕೋಸು", Carrot: "ಕ್ಯಾರೆಟ್", Radish: "ಮೂಲಂಗಿ", "Spinach (Palak)": "ಪಾಲಕ್",
      "Snake Gourd (Chichinda)": "ಪಡವಲಕಾಯಿ", "Ash Gourd (Petha)": "ಬೂದುಗುಂಬಳ", "Cluster Bean (Guar)": "ಗೋರಿಕಾಯಿ", "Taro (Arbi)": "ಕೆಸುವಿನ ಗಡ್ಡೆ",
      Mango: "ಮಾವಿನಹಣ್ಣು", Banana: "ಬಾಳೆಹಣ್ಣು", Papaya: "ಪಪ್ಪಾಯ", Guava: "ಸೀಬೆಹಣ್ಣು", Pomegranate: "ದಾಳಿಂಬೆ", Grapes: "ದ್ರಾಕ್ಷಿ", Apple: "ಸೇಬು", "Dragon Fruit (Kamalam)": "ಡ್ರ್ಯಾಗನ್ ಫ್ರೂಟ್",
      "Turmeric (Haldi)": "ಅರಿಶಿನ", "Ginger (Adrak)": "ಶುಂಠಿ", "Garlic (Lehsun)": "ಬೆಳ್ಳುಳ್ಳಿ", "Coriander (Dhaniya)": "ಕೊತ್ತಂಬರಿ", "Cumin (Jeera)": "ಜೀರಿಗೆ", "Clove (Laung)": "ಲವಂಗ", "Cinnamon (Dalchini)": "ದಾಲ್ಚಿನ್ನಿ", "Saffron (Kesar)": "ಕೇಸರಿ",
      "Cotton (Kapas)": "ಹತ್ತಿ", Sugarcane: "ಕಬ್ಬು", Tea: "ಚಹಾ", Coffee: "ಕಾಫಿ", Coconut: "ತೆಂಗಿನಕಾಯಿ", "Arecanut (Betel Nut)": "ಅಡಿಕೆ",
    },
    communityCategories: { All: "ಎಲ್ಲಾ", "Pest Control": "ಕೀಟ ನಿಯಂತ್ರಣ", Irrigation: "ನೀರಾವರಿ", Soil: "ಮಣ್ಣು", Market: "ಮಾರುಕಟ್ಟೆ", Seeds: "ಬೀಜಗಳು", Fertilizer: "ಗೊಬ್ಬರ", Organic: "ಸಾವಯವ", Equipment: "ಉಪಕರಣ", Weather: "ಹವಾಮಾನ" },
    plantParts: { Leaf: "ಎಲೆ", Stem: "ಕಾಂಡ", Root: "ಬೇರು", Fruit: "ಹಣ್ಣು", "Pod/Seed": "ಕಾಯಿ/ಬೀಜ", Flower: "ಹೂವು", Insect: "ಕೀಟ", "Full Plant": "ಪೂರ್ಣ ಗಿಡ" },
  },
  ml: {
    cropCategories: { All: "എല്ലാം", Cereals: "ധാന്യങ്ങൾ", Pulses: "പയർ വർഗങ്ങൾ", Oilseeds: "എണ്ണക്കുരു", Vegetables: "പച്ചക്കറികൾ", Fruits: "പഴങ്ങൾ", Spices: "സുഗന്ധ വ്യഞ്ജനങ്ങൾ", Commercial: "വാണിജ്യ", Plantation: "തോട്ടവിളകൾ" },
    cropNames: {
      Rice: "അരി (നെല്ല്)", Wheat: "ഗോതമ്പ്", "Maize (Corn)": "ചോളം", Tomato: "തക്കാളി", Potato: "ഉരുളക്കിഴങ്ങ്", Onion: "ഉള്ളി", "Brinjal (Eggplant)": "വഴുതന", "Chilli (Green & Red)": "മുളക്",
      "Foxtail Millet (Kangni)": "തിന", "Kodo Millet": "വരക്", "Barnyard Millet (Sanwa)": "കുതിരവാലി", "Proso Millet (Cheena)": "പനിവരക്",
      "Cowpea (Lobia)": "പയർ", "Moth Bean": "മോത്ത് ബീൻ", "Rajma (Kidney Bean)": "രാജ്മ",
      "Safflower (Kusum)": "കുസുംബ", "Niger Seed (Ramtil)": "നൈജർ വിത്ത്",
      "Snake Gourd (Chichinda)": "പടവലം", "Ash Gourd (Petha)": "കുമ്പളം", "Cluster Bean (Guar)": "കൊത്തമര", "Taro (Arbi)": "ചേമ്പ്", "Tapioca (Cassava)": "കപ്പ",
      Mango: "മാങ്ങ", Banana: "വാഴപ്പഴം", Coconut: "തേങ്ങ", "Turmeric (Haldi)": "മഞ്ഞൾ", "Ginger (Adrak)": "ഇഞ്ചി", "Black Pepper": "കുരുമുളക്", Cardamom: "ഏലക്ക", "Clove (Laung)": "ഗ്രാമ്പൂ", "Cinnamon (Dalchini)": "കറുവപ്പട്ട", "Saffron (Kesar)": "കുങ്കുമം",
      Tea: "ചായ", Coffee: "കാപ്പി", Rubber: "റബ്ബർ", "Arecanut (Betel Nut)": "അടയ്ക്ക", "Dragon Fruit (Kamalam)": "ഡ്രാഗൺ ഫ്രൂട്ട്",
      Cashew: "കശുവണ്ടി", Vanilla: "വാനില", "Betel Vine (Paan)": "വെറ്റില", Cocoa: "കൊക്കോ",
    },
    communityCategories: { All: "എല്ലാം", "Pest Control": "കീട നിയന്ത്രണം", Irrigation: "ജലസേചനം", Soil: "മണ്ണ്", Market: "വിപണി", Seeds: "വിത്തുകൾ", Fertilizer: "വളം", Organic: "ജൈവ", Equipment: "ഉപകരണങ്ങൾ", Weather: "കാലാവസ്ഥ" },
    plantParts: { Leaf: "ഇല", Stem: "തണ്ട്", Root: "വേര്", Fruit: "പഴം", "Pod/Seed": "കായ/വിത്ത്", Flower: "പൂവ്", Insect: "കീടം", "Full Plant": "മുഴുവൻ ചെടി" },
  },
  mr: {
    cropCategories: { All: "सर्व", Cereals: "धान्ये", Pulses: "कडधान्ये", Oilseeds: "तेलबिया", Vegetables: "भाजीपाला", Fruits: "फळे", Spices: "मसाले", Commercial: "व्यावसायिक", Plantation: "बागायती" },
    cropNames: {
      Rice: "भात (तांदूळ)", Wheat: "गहू", "Maize (Corn)": "मका", "Bajra (Pearl Millet)": "बाजरी", "Jowar (Sorghum)": "ज्वारी", "Ragi (Finger Millet)": "नाचणी",
      "Foxtail Millet (Kangni)": "राळा", "Kodo Millet": "कोद्रा", "Barnyard Millet (Sanwa)": "भगर", "Proso Millet (Cheena)": "वरी",
      "Chickpea (Chana)": "हरभरा", "Pigeon Pea (Arhar/Tur)": "तूर डाळ", "Groundnut (Peanut)": "भुईमूग", Soybean: "सोयाबीन", "Mustard (Sarson)": "मोहरी",
      "Cowpea (Lobia)": "चवळी", "Moth Bean": "मटकी", "Rajma (Kidney Bean)": "राजमा",
      "Safflower (Kusum)": "करडई", "Niger Seed (Ramtil)": "खुरसणी",
      Tomato: "टोमॅटो", Potato: "बटाटा", Onion: "कांदा", "Brinjal (Eggplant)": "वांगे", "Chilli (Green & Red)": "मिरची", "Okra (Bhindi/Lady Finger)": "भेंडी",
      "Snake Gourd (Chichinda)": "पडवळ", "Ash Gourd (Petha)": "कोहळा", "Cluster Bean (Guar)": "गवार", "Taro (Arbi)": "अळू",
      Mango: "आंबा", Banana: "केळे", "Turmeric (Haldi)": "हळद", "Ginger (Adrak)": "आले", "Garlic (Lehsun)": "लसूण", "Clove (Laung)": "लवंग", "Cinnamon (Dalchini)": "दालचिनी", "Saffron (Kesar)": "केशर",
      "Cotton (Kapas)": "कापूस", Sugarcane: "ऊस", Tea: "चहा", Coffee: "कॉफी", Coconut: "नारळ", "Arecanut (Betel Nut)": "सुपारी", "Dragon Fruit (Kamalam)": "ड्रॅगन फ्रूट",
    },
    communityCategories: { All: "सर्व", "Pest Control": "कीड नियंत्रण", Irrigation: "सिंचन", Soil: "माती", Market: "बाजार", Seeds: "बियाणे", Fertilizer: "खत", Organic: "सेंद्रिय", Equipment: "साधने", Weather: "हवामान" },
    plantParts: { Leaf: "पान", Stem: "खोड", Root: "मूळ", Fruit: "फळ", "Pod/Seed": "शेंग/बी", Flower: "फूल", Insect: "कीड", "Full Plant": "संपूर्ण झाड" },
  },
  bn: {
    cropCategories: { All: "সব", Cereals: "শস্য", Pulses: "ডাল", Oilseeds: "তৈলবীজ", Vegetables: "শাকসবজি", Fruits: "ফল", Spices: "মশলা", Commercial: "বাণিজ্যিক", Plantation: "বাগান" },
    cropNames: {
      Rice: "ধান (চাল)", Wheat: "গম", "Maize (Corn)": "ভুট্টা", Tomato: "টমেটো", Potato: "আলু", Onion: "পেঁয়াজ", "Brinjal (Eggplant)": "বেগুন",
      "Foxtail Millet (Kangni)": "কাউন", "Kodo Millet": "কোদো", "Barnyard Millet (Sanwa)": "শ্যামা", "Proso Millet (Cheena)": "চিনা",
      "Cowpea (Lobia)": "বরবটি", "Moth Bean": "মোঠ ডাল", "Rajma (Kidney Bean)": "রাজমা",
      "Safflower (Kusum)": "কুসুম", "Niger Seed (Ramtil)": "রামতিল",
      "Snake Gourd (Chichinda)": "চিচিঙ্গা", "Ash Gourd (Petha)": "চালকুমড়ো", "Cluster Bean (Guar)": "গুয়ার", "Taro (Arbi)": "কচু",
      Mango: "আম", Banana: "কলা", "Turmeric (Haldi)": "হলুদ", "Ginger (Adrak)": "আদা", "Clove (Laung)": "লবঙ্গ", "Cinnamon (Dalchini)": "দারচিনি", "Saffron (Kesar)": "জাফরান",
      Jute: "পাট", Tea: "চা", Sugarcane: "আখ", "Arecanut (Betel Nut)": "সুপারি", "Dragon Fruit (Kamalam)": "ড্রাগন ফল",
    },
    communityCategories: { All: "সব", "Pest Control": "কীট নিয়ন্ত্রণ", Irrigation: "সেচ", Soil: "মাটি", Market: "বাজার", Seeds: "বীজ", Fertilizer: "সার", Organic: "জৈব", Equipment: "যন্ত্রপাতি", Weather: "আবহাওয়া" },
    plantParts: { Leaf: "পাতা", Stem: "কাণ্ড", Root: "শিকড়", Fruit: "ফল", "Pod/Seed": "শুঁটি/বীজ", Flower: "ফুল", Insect: "পোকা", "Full Plant": "সম্পূর্ণ গাছ" },
  },
  gu: {
    cropCategories: { All: "બધા", Cereals: "અનાજ", Pulses: "કઠોળ", Oilseeds: "તેલીબિયાં", Vegetables: "શાકભાજી", Fruits: "ફળ", Spices: "મસાલા", Commercial: "વ્યાપારી", Plantation: "વાવેતર" },
    cropNames: {
      Rice: "ચોખા (ડાંગર)", Wheat: "ઘઉં", "Maize (Corn)": "મકાઈ", "Bajra (Pearl Millet)": "બાજરી", "Groundnut (Peanut)": "મગફળી",
      "Foxtail Millet (Kangni)": "કાંગ", "Kodo Millet": "કોદરા", "Barnyard Millet (Sanwa)": "સામો", "Proso Millet (Cheena)": "ચીનો",
      "Cowpea (Lobia)": "ચોળા", "Moth Bean": "મઠ", "Rajma (Kidney Bean)": "રાજમા",
      "Safflower (Kusum)": "કુસુમ", "Niger Seed (Ramtil)": "રામતલ",
      Tomato: "ટામેટા", Potato: "બટાટા", Onion: "ડુંગળી", "Cotton (Kapas)": "કપાસ", Sugarcane: "શેરડી",
      "Snake Gourd (Chichinda)": "પડવળ", "Ash Gourd (Petha)": "કોળું", "Cluster Bean (Guar)": "ગુવાર", "Taro (Arbi)": "અળવી",
      Mango: "કેરી", Banana: "કેળા", "Turmeric (Haldi)": "હળદર", "Ginger (Adrak)": "આદું", Coconut: "નાળિયેર", "Clove (Laung)": "લવિંગ", "Cinnamon (Dalchini)": "તજ", "Saffron (Kesar)": "કેસર",
      "Arecanut (Betel Nut)": "સોપારી", "Dragon Fruit (Kamalam)": "ડ્રેગન ફ્રૂટ",
    },
    communityCategories: { All: "બધા", "Pest Control": "જીવાત નિયંત્રણ", Irrigation: "સિંચાઈ", Soil: "માટી", Market: "બજાર", Seeds: "બીજ", Fertilizer: "ખાતર", Organic: "જૈવિક", Equipment: "સાધનો", Weather: "હવામાન" },
    plantParts: { Leaf: "પાન", Stem: "દાંડી", Root: "મૂળ", Fruit: "ફળ", "Pod/Seed": "શીંગ/બીજ", Flower: "ફૂલ", Insect: "જીવાત", "Full Plant": "આખો છોડ" },
  },
  pa: {
    cropCategories: { All: "ਸਾਰੇ", Cereals: "ਅਨਾਜ", Pulses: "ਦਾਲਾਂ", Oilseeds: "ਤੇਲ ਬੀਜ", Vegetables: "ਸਬਜ਼ੀਆਂ", Fruits: "ਫਲ", Spices: "ਮਸਾਲੇ", Commercial: "ਵਪਾਰਕ", Plantation: "ਬਾਗਬਾਨੀ" },
    cropNames: {
      Rice: "ਚਾਵਲ (ਝੋਨਾ)", Wheat: "ਕਣਕ", "Maize (Corn)": "ਮੱਕੀ", "Bajra (Pearl Millet)": "ਬਾਜਰਾ", "Chickpea (Chana)": "ਛੋਲੇ", "Mustard (Sarson)": "ਸਰ੍ਹੋਂ",
      "Foxtail Millet (Kangni)": "ਕੰਗਣੀ", "Kodo Millet": "ਕੋਦੋ", "Barnyard Millet (Sanwa)": "ਸਾਂਵਾ", "Proso Millet (Cheena)": "ਚੀਨਾ",
      "Cowpea (Lobia)": "ਲੋਬੀਆ", "Moth Bean": "ਮੋਠ", "Rajma (Kidney Bean)": "ਰਾਜਮਾਂਹ",
      Tomato: "ਟਮਾਟਰ", Potato: "ਆਲੂ", Onion: "ਪਿਆਜ਼", "Cotton (Kapas)": "ਕਪਾਹ", Sugarcane: "ਗੰਨਾ",
      Mango: "ਅੰਬ", Banana: "ਕੇਲਾ", "Clove (Laung)": "ਲੌਂਗ", "Cinnamon (Dalchini)": "ਦਾਲਚੀਨੀ", "Saffron (Kesar)": "ਕੇਸਰ",
      "Arecanut (Betel Nut)": "ਸੁਪਾਰੀ", "Dragon Fruit (Kamalam)": "ਡ੍ਰੈਗਨ ਫਰੂਟ",
    },
    communityCategories: { All: "ਸਾਰੇ", "Pest Control": "ਕੀੜੇ ਕੰਟਰੋਲ", Irrigation: "ਸਿੰਚਾਈ", Soil: "ਮਿੱਟੀ", Market: "ਬਜ਼ਾਰ", Seeds: "ਬੀਜ", Fertilizer: "ਖਾਦ", Organic: "ਜੈਵਿਕ", Equipment: "ਸਾਜ਼-ਸਾਮਾਨ", Weather: "ਮੌਸਮ" },
    plantParts: { Leaf: "ਪੱਤਾ", Stem: "ਤਣਾ", Root: "ਜੜ੍ਹ", Fruit: "ਫਲ", "Pod/Seed": "ਫਲੀ/ਬੀਜ", Flower: "ਫੁੱਲ", Insect: "ਕੀੜਾ", "Full Plant": "ਪੂਰਾ ਪੌਦਾ" },
  },
};

// Helper: get translated name with fallback to English (original name)
export function getDataTranslation(lang: string): DataTranslations {
  return dataTranslations[lang] || dataTranslations.en;
}

export function translateCropName(name: string, lang: string): string {
  const dt = dataTranslations[lang];
  return dt?.cropNames?.[name] || name;
}

export function translateCategory(category: string, lang: string): string {
  const dt = dataTranslations[lang];
  return dt?.cropCategories?.[category] || category;
}

export function translateCommunityCategory(category: string, lang: string): string {
  const dt = dataTranslations[lang];
  return dt?.communityCategories?.[category] || category;
}

export function translatePlantPart(part: string, lang: string): string {
  const dt = dataTranslations[lang];
  return dt?.plantParts?.[part] || part;
}
