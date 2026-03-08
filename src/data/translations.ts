export const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "as", name: "Assamese", native: "অসমীয়া" },
  { code: "ur", name: "Urdu", native: "اردو" },
  { code: "sd", name: "Sindhi", native: "سنڌي" },
  { code: "ne", name: "Nepali", native: "नेपाली" },
  { code: "mai", name: "Maithili", native: "मैथिली" },
  { code: "sat", name: "Santali", native: "ᱥᱟᱱᱛᱟᱲᱤ" },
  { code: "ks", name: "Kashmiri", native: "کٲشُر" },
  { code: "doi", name: "Dogri", native: "डोगरी" },
  { code: "kok", name: "Konkani", native: "कोंकणी" },
  { code: "mni", name: "Manipuri", native: "মৈতৈলোন্" },
  { code: "bo", name: "Bodo", native: "बड़ो" },
  { code: "sa", name: "Sanskrit", native: "संस्कृतम्" },
  { code: "raj", name: "Rajasthani", native: "राजस्थानी" },
  { code: "bh", name: "Bhojpuri", native: "भोजपुरी" },
  { code: "chh", name: "Chhattisgarhi", native: "छत्तीसगढ़ी" },
  { code: "gon", name: "Gondi", native: "गोंडी" },
  { code: "tu", name: "Tulu", native: "ತುಳು" },
  { code: "kha", name: "Khasi", native: "Ka Ktien Khasi" },
  { code: "miz", name: "Mizo", native: "Mizo ṭawng" },
  { code: "nag", name: "Nagamese", native: "Nagamese" },
];

type TranslationKeys = {
  nav: { home: string; crops: string; community: string; mandi: string; transport: string; diagnosis: string; recommendations: string };
  hero: { title: string; subtitle: string; cta: string };
  crops: { title: string; search: string; allCategories: string; season: string; soil: string; irrigation: string; pests: string; fertilizer: string; bestPractices: string };
  community: { title: string; askQuestion: string; placeholder: string; post: string; answer: string; answers: string; share: string; upvote: string; category: string };
  mandi: { title: string; search: string; state: string; commodity: string; minPrice: string; maxPrice: string; modalPrice: string; nearby: string };
  transport: { title: string; cropType: string; quantity: string; pickup: string; destination: string; submit: string; whatsapp: string; call: string };
  diagnosis: { title: string; upload: string; analyze: string; result: string; disease: string; treatment: string; prevention: string; severity: string };
  recommendations: { title: string; soilBased: string; locationBased: string; seasonBased: string; selectSoil: string; selectRegion: string; currentSeason: string; expertTips: string };
  common: { loading: string; noResults: string; viewDetails: string; back: string; whatsappHelp: string; selectLanguage: string };
};

export const translations: Record<string, TranslationKeys> = {
  en: {
    nav: { home: "Home", crops: "Crop Library", community: "Community", mandi: "Mandi Rates", transport: "Transport", diagnosis: "Diagnosis", recommendations: "Recommendations" },
    hero: { title: "AgriLink — Farmer Crop Intelligence", subtitle: "Your complete farming companion: crop info, community Q&A, mandi rates, transport, and AI-powered disease diagnosis", cta: "Explore Crops" },
    crops: { title: "Crop Library", search: "Search crops...", allCategories: "All Categories", season: "Season", soil: "Soil Type", irrigation: "Irrigation", pests: "Common Pests", fertilizer: "Fertilizer Schedule", bestPractices: "Best Practices" },
    community: { title: "Community Q&A", askQuestion: "Ask a Question", placeholder: "What's your farming question?", post: "Post Question", answer: "Write your answer...", answers: "Answers", share: "Share via WhatsApp", upvote: "Upvote", category: "Category" },
    mandi: { title: "Mandi Rates", search: "Search by village, district, or market...", state: "State", commodity: "Commodity", minPrice: "Min Price", maxPrice: "Max Price", modalPrice: "Modal Price", nearby: "My Surroundings" },
    transport: { title: "Transport & Logistics", cropType: "Crop Type", quantity: "Quantity (Quintals)", pickup: "Pickup Location", destination: "Destination", submit: "Send via WhatsApp", whatsapp: "Chat on WhatsApp", call: "Call Now" },
    diagnosis: { title: "Crop Disease Diagnosis", upload: "Upload Plant Photo", analyze: "Analyze with AI", result: "Diagnosis Result", disease: "Disease", treatment: "Treatment", prevention: "Prevention", severity: "Severity" },
    recommendations: { title: "Crop Recommendations", soilBased: "Soil-Based", locationBased: "Location-Based", seasonBased: "Season-Based", selectSoil: "Select Soil Type", selectRegion: "Select Region", currentSeason: "Current Season", expertTips: "Expert Tips" },
    common: { loading: "Loading...", noResults: "No results found", viewDetails: "View Details", back: "Back", whatsappHelp: "Need help? Chat on WhatsApp", selectLanguage: "Select Language" },
  },
  hi: {
    nav: { home: "होम", crops: "फसल पुस्तकालय", community: "समुदाय", mandi: "मंडी भाव", transport: "परिवहन", diagnosis: "रोग निदान", recommendations: "सिफारिशें" },
    hero: { title: "एग्रीलिंक — किसान फसल बुद्धिमत्ता", subtitle: "आपका पूर्ण कृषि साथी: फसल जानकारी, समुदाय प्रश्नोत्तर, मंडी भाव, परिवहन, और AI रोग निदान", cta: "फसलें देखें" },
    crops: { title: "फसल पुस्तकालय", search: "फसल खोजें...", allCategories: "सभी श्रेणियाँ", season: "मौसम", soil: "मिट्टी का प्रकार", irrigation: "सिंचाई", pests: "प्रमुख कीट", fertilizer: "उर्वरक अनुसूची", bestPractices: "सर्वोत्तम अभ्यास" },
    community: { title: "समुदाय प्रश्नोत्तर", askQuestion: "प्रश्न पूछें", placeholder: "आपका कृषि प्रश्न क्या है?", post: "प्रश्न पोस्ट करें", answer: "अपना उत्तर लिखें...", answers: "उत्तर", share: "WhatsApp पर शेयर करें", upvote: "अपवोट", category: "श्रेणी" },
    mandi: { title: "मंडी भाव", search: "गाँव, जिला, या मंडी खोजें...", state: "राज्य", commodity: "फसल", minPrice: "न्यूनतम मूल्य", maxPrice: "अधिकतम मूल्य", modalPrice: "मॉडल मूल्य", nearby: "मेरे आसपास" },
    transport: { title: "परिवहन और लॉजिस्टिक्स", cropType: "फसल का प्रकार", quantity: "मात्रा (क्विंटल)", pickup: "पिकअप स्थान", destination: "गंतव्य", submit: "WhatsApp पर भेजें", whatsapp: "WhatsApp पर बात करें", call: "अभी कॉल करें" },
    diagnosis: { title: "फसल रोग निदान", upload: "पौधे की फोटो अपलोड करें", analyze: "AI से विश्लेषण करें", result: "निदान परिणाम", disease: "रोग", treatment: "उपचार", prevention: "रोकथाम", severity: "गंभीरता" },
    recommendations: { title: "फसल सिफारिशें", soilBased: "मिट्टी आधारित", locationBased: "स्थान आधारित", seasonBased: "मौसम आधारित", selectSoil: "मिट्टी का प्रकार चुनें", selectRegion: "क्षेत्र चुनें", currentSeason: "वर्तमान मौसम", expertTips: "विशेषज्ञ सुझाव" },
    common: { loading: "लोड हो रहा है...", noResults: "कोई परिणाम नहीं मिला", viewDetails: "विवरण देखें", back: "वापस", whatsappHelp: "मदद चाहिए? WhatsApp पर बात करें", selectLanguage: "भाषा चुनें" },
  },
  te: {
    nav: { home: "హోమ్", crops: "పంట గ్రంథాలయం", community: "సమాజం", mandi: "మండి ధరలు", transport: "రవాణా", diagnosis: "రోగ నిర్ధారణ", recommendations: "సిఫార్సులు" },
    hero: { title: "ఆగ్రీలింక్ — రైతు పంట మేధస్సు", subtitle: "మీ పూర్తి వ్యవసాయ సహచరుడు: పంట సమాచారం, సమాజ Q&A, మండి ధరలు, రవాణా, మరియు AI రోగ నిర్ధారణ", cta: "పంటలు చూడండి" },
    crops: { title: "పంట గ్రంథాలయం", search: "పంటలు వెతకండి...", allCategories: "అన్ని వర్గాలు", season: "సీజన్", soil: "నేల రకం", irrigation: "నీటిపారుదల", pests: "ప్రధాన పురుగులు", fertilizer: "ఎరువుల షెడ్యూల్", bestPractices: "ఉత్తమ పద్ధతులు" },
    community: { title: "సమాజ Q&A", askQuestion: "ప్రశ్న అడగండి", placeholder: "మీ వ్యవసాయ ప్రశ్న ఏమిటి?", post: "ప్రశ్న పోస్ట్ చేయండి", answer: "మీ సమాధానం రాయండి...", answers: "సమాధానాలు", share: "WhatsApp ద్వారా షేర్ చేయండి", upvote: "అప్‌వోట్", category: "వర్గం" },
    mandi: { title: "మండి ధరలు", search: "గ్రామం, జిల్లా, లేదా మార్కెట్ వెతకండి...", state: "రాష్ట్రం", commodity: "పంట", minPrice: "కనిష్ట ధర", maxPrice: "గరిష్ట ధర", modalPrice: "మోడల్ ధర", nearby: "నా చుట్టుపక్కల" },
    transport: { title: "రవాణా & లాజిస్టిక్స్", cropType: "పంట రకం", quantity: "పరిమాణం (క్వింటాళ్లు)", pickup: "పికప్ స్థానం", destination: "గమ్యస్థానం", submit: "WhatsApp ద్వారా పంపండి", whatsapp: "WhatsApp లో చాట్ చేయండి", call: "ఇప్పుడు కాల్ చేయండి" },
    diagnosis: { title: "పంట రోగ నిర్ధారణ", upload: "మొక్క ఫోటో అప్‌లోడ్ చేయండి", analyze: "AI తో విశ్లేషించండి", result: "నిర్ధారణ ఫలితం", disease: "రోగం", treatment: "చికిత్స", prevention: "నివారణ", severity: "తీవ్రత" },
    recommendations: { title: "పంట సిఫార్సులు", soilBased: "నేల ఆధారిత", locationBased: "ప్రదేశ ఆధారిత", seasonBased: "సీజన్ ఆధారిత", selectSoil: "నేల రకం ఎంచుకోండి", selectRegion: "ప్రాంతం ఎంచుకోండి", currentSeason: "ప్రస్తుత సీజన్", expertTips: "నిపుణుల సూచనలు" },
    common: { loading: "లోడ్ అవుతోంది...", noResults: "ఫలితాలు కనుగొనబడలేదు", viewDetails: "వివరాలు చూడండి", back: "వెనక్కి", whatsappHelp: "సహాయం కావాలా? WhatsApp లో చాట్ చేయండి", selectLanguage: "భాష ఎంచుకోండి" },
  },
  ta: {
    nav: { home: "முகப்பு", crops: "பயிர் நூலகம்", community: "சமூகம்", mandi: "மண்டி விலைகள்", transport: "போக்குவரத்து", diagnosis: "நோய் கண்டறிதல்", recommendations: "பரிந்துரைகள்" },
    hero: { title: "அக்ரிலிங்க் — விவசாயி பயிர் நுண்ணறிவு", subtitle: "உங்கள் முழுமையான விவசாய தோழன்", cta: "பயிர்களைக் காண" },
    crops: { title: "பயிர் நூலகம்", search: "பயிர்களைத் தேடு...", allCategories: "அனைத்து வகைகள்", season: "பருவம்", soil: "மண் வகை", irrigation: "நீர்ப்பாசனம்", pests: "பூச்சிகள்", fertilizer: "உரம் அட்டவணை", bestPractices: "சிறந்த நடைமுறைகள்" },
    community: { title: "சமூக கேள்வி பதில்", askQuestion: "கேள்வி கேளுங்கள்", placeholder: "உங்கள் விவசாய கேள்வி என்ன?", post: "கேள்வி இடு", answer: "உங்கள் பதிலை எழுதுங்கள்...", answers: "பதில்கள்", share: "WhatsApp இல் பகிர்", upvote: "அப்வோட்", category: "வகை" },
    mandi: { title: "மண்டி விலைகள்", search: "கிராமம், மாவட்டம் தேடு...", state: "மாநிலம்", commodity: "பொருள்", minPrice: "குறைந்த விலை", maxPrice: "அதிக விலை", modalPrice: "சராசரி விலை", nearby: "அருகிலுள்ள" },
    transport: { title: "போக்குவரத்து", cropType: "பயிர் வகை", quantity: "அளவு", pickup: "பிக்அப்", destination: "இலக்கு", submit: "WhatsApp இல் அனுப்பு", whatsapp: "WhatsApp அரட்டை", call: "இப்போது அழை" },
    diagnosis: { title: "பயிர் நோய் கண்டறிதல்", upload: "தாவர புகைப்படம் பதிவேற்று", analyze: "AI உடன் பகுப்பாய்வு", result: "முடிவு", disease: "நோய்", treatment: "சிகிச்சை", prevention: "தடுப்பு", severity: "தீவிரம்" },
    recommendations: { title: "பயிர் பரிந்துரைகள்", soilBased: "மண் அடிப்படை", locationBased: "இடம் அடிப்படை", seasonBased: "பருவம் அடிப்படை", selectSoil: "மண் தேர்வு", selectRegion: "பகுதி தேர்வு", currentSeason: "நடப்பு பருவம்", expertTips: "நிபுணர் குறிப்புகள்" },
    common: { loading: "ஏற்றுகிறது...", noResults: "முடிவுகள் இல்லை", viewDetails: "விவரங்கள்", back: "பின்", whatsappHelp: "உதவி? WhatsApp", selectLanguage: "மொழி தேர்வு" },
  },
  kn: {
    nav: { home: "ಮುಖಪುಟ", crops: "ಬೆಳೆ ಗ್ರಂಥಾಲಯ", community: "ಸಮುದಾಯ", mandi: "ಮಂಡಿ ದರಗಳು", transport: "ಸಾರಿಗೆ", diagnosis: "ರೋಗ ನಿರ್ಣಯ", recommendations: "ಶಿಫಾರಸುಗಳು" },
    hero: { title: "ಆಗ್ರಿಲಿಂಕ್ — ರೈತ ಬೆಳೆ ಬುದ್ಧಿಮತ್ತೆ", subtitle: "ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಕೃಷಿ ಸಂಗಾತಿ", cta: "ಬೆಳೆಗಳನ್ನು ನೋಡಿ" },
    crops: { title: "ಬೆಳೆ ಗ್ರಂಥಾಲಯ", search: "ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ...", allCategories: "ಎಲ್ಲಾ ವರ್ಗಗಳು", season: "ಋತು", soil: "ಮಣ್ಣಿನ ಪ್ರಕಾರ", irrigation: "ನೀರಾವರಿ", pests: "ಕೀಟಗಳು", fertilizer: "ಗೊಬ್ಬರ ವೇಳಾಪಟ್ಟಿ", bestPractices: "ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು" },
    community: { title: "ಸಮುದಾಯ Q&A", askQuestion: "ಪ್ರಶ್ನೆ ಕೇಳಿ", placeholder: "ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆ?", post: "ಪೋಸ್ಟ್", answer: "ಉತ್ತರ ಬರೆಯಿರಿ...", answers: "ಉತ್ತರಗಳು", share: "WhatsApp ನಲ್ಲಿ ಹಂಚಿ", upvote: "ಅಪ್‌ವೋಟ್", category: "ವರ್ಗ" },
    mandi: { title: "ಮಂಡಿ ದರಗಳು", search: "ಹಳ್ಳಿ, ಜಿಲ್ಲೆ ಹುಡುಕಿ...", state: "ರಾಜ್ಯ", commodity: "ಸರಕು", minPrice: "ಕನಿಷ್ಠ ಬೆಲೆ", maxPrice: "ಗರಿಷ್ಠ ಬೆಲೆ", modalPrice: "ಸರಾಸರಿ ಬೆಲೆ", nearby: "ಹತ್ತಿರದ" },
    transport: { title: "ಸಾರಿಗೆ", cropType: "ಬೆಳೆ ಪ್ರಕಾರ", quantity: "ಪ್ರಮಾಣ", pickup: "ಪಿಕಪ್", destination: "ಗಮ್ಯಸ್ಥಾನ", submit: "WhatsApp ಮೂಲಕ ಕಳುಹಿಸಿ", whatsapp: "WhatsApp ಚಾಟ್", call: "ಈಗ ಕರೆ ಮಾಡಿ" },
    diagnosis: { title: "ಬೆಳೆ ರೋಗ ನಿರ್ಣಯ", upload: "ಸಸ್ಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್", analyze: "AI ವಿಶ್ಲೇಷಣೆ", result: "ಫಲಿತಾಂಶ", disease: "ರೋಗ", treatment: "ಚಿಕಿತ್ಸೆ", prevention: "ತಡೆಗಟ್ಟುವಿಕೆ", severity: "ತೀವ್ರತೆ" },
    recommendations: { title: "ಬೆಳೆ ಶಿಫಾರಸುಗಳು", soilBased: "ಮಣ್ಣು ಆಧಾರಿತ", locationBased: "ಸ್ಥಳ ಆಧಾರಿತ", seasonBased: "ಋತು ಆಧಾರಿತ", selectSoil: "ಮಣ್ಣು ಆಯ್ಕೆ", selectRegion: "ಪ್ರದೇಶ ಆಯ್ಕೆ", currentSeason: "ಪ್ರಸ್ತುತ ಋತು", expertTips: "ತಜ್ಞರ ಸಲಹೆ" },
    common: { loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...", noResults: "ಫಲಿತಾಂಶ ಸಿಗಲಿಲ್ಲ", viewDetails: "ವಿವರಗಳು", back: "ಹಿಂದೆ", whatsappHelp: "ಸಹಾಯ? WhatsApp", selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆ" },
  },
  ml: {
    nav: { home: "ഹോം", crops: "വിള ലൈബ്രറി", community: "സമൂഹം", mandi: "മണ്ടി വിലകൾ", transport: "ഗതാഗതം", diagnosis: "രോഗ നിർണയം", recommendations: "ശുപാർശകൾ" },
    hero: { title: "ആഗ്രിലിങ്ക് — കർഷക വിള ബുദ്ധിമത്ത", subtitle: "നിങ്ങളുടെ സമ്പൂർണ കൃഷി സഹായി", cta: "വിളകൾ കാണുക" },
    crops: { title: "വിള ലൈബ്രറി", search: "വിളകൾ തിരയുക...", allCategories: "എല്ലാ വിഭാഗങ്ങളും", season: "സീസൺ", soil: "മണ്ണ് തരം", irrigation: "ജലസേചനം", pests: "കീടങ്ങൾ", fertilizer: "വളം ഷെഡ്യൂൾ", bestPractices: "മികച്ച രീതികൾ" },
    community: { title: "സമൂഹ Q&A", askQuestion: "ചോദ്യം ചോദിക്കുക", placeholder: "നിങ്ങളുടെ കൃഷി ചോദ്യം?", post: "പോസ്റ്റ്", answer: "ഉത്തരം എഴുതുക...", answers: "ഉത്തരങ്ങൾ", share: "WhatsApp ഷെയർ", upvote: "അപ്‌വോട്ട്", category: "വിഭാഗം" },
    mandi: { title: "മണ്ടി വിലകൾ", search: "ഗ്രാമം, ജില്ല തിരയുക...", state: "സംസ്ഥാനം", commodity: "ചരക്ക്", minPrice: "കുറഞ്ഞ വില", maxPrice: "കൂടിയ വില", modalPrice: "ശരാശരി വില", nearby: "സമീപത്ത്" },
    transport: { title: "ഗതാഗതം", cropType: "വിള തരം", quantity: "അളവ്", pickup: "പിക്കപ്പ്", destination: "ലക്ഷ്യസ്ഥാനം", submit: "WhatsApp അയയ്ക്കുക", whatsapp: "WhatsApp ചാറ്റ്", call: "ഇപ്പോൾ വിളിക്കുക" },
    diagnosis: { title: "വിള രോഗ നിർണയം", upload: "സസ്യ ഫോട്ടോ അപ്‌ലോഡ്", analyze: "AI വിശകലനം", result: "ഫലം", disease: "രോഗം", treatment: "ചികിത്സ", prevention: "പ്രതിരോധം", severity: "തീവ്രത" },
    recommendations: { title: "വിള ശുപാർശകൾ", soilBased: "മണ്ണ് അടിസ്ഥാനം", locationBased: "സ്ഥലം അടിസ്ഥാനം", seasonBased: "സീസൺ അടിസ്ഥാനം", selectSoil: "മണ്ണ് തിരഞ്ഞെടുക്കുക", selectRegion: "പ്രദേശം തിരഞ്ഞെടുക്കുക", currentSeason: "നിലവിലെ സീസൺ", expertTips: "വിദഗ്ധ നിർദ്ദേശങ്ങൾ" },
    common: { loading: "ലോഡ് ചെയ്യുന്നു...", noResults: "ഫലങ്ങൾ ഇല്ല", viewDetails: "വിശദാംശങ്ങൾ", back: "മടങ്ങുക", whatsappHelp: "സഹായം? WhatsApp", selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക" },
  },
  mr: {
    nav: { home: "मुखपृष्ठ", crops: "पीक ग्रंथालय", community: "समुदाय", mandi: "मंडी भाव", transport: "वाहतूक", diagnosis: "रोग निदान", recommendations: "शिफारसी" },
    hero: { title: "अॅग्रीलिंक — शेतकरी पीक बुद्धिमत्ता", subtitle: "तुमचा पूर्ण शेती सोबती", cta: "पिके पहा" },
    crops: { title: "पीक ग्रंथालय", search: "पिके शोधा...", allCategories: "सर्व वर्ग", season: "हंगाम", soil: "जमिनीचा प्रकार", irrigation: "सिंचन", pests: "किडी", fertilizer: "खत वेळापत्रक", bestPractices: "सर्वोत्तम पद्धती" },
    community: { title: "समुदाय प्रश्नोत्तर", askQuestion: "प्रश्न विचारा", placeholder: "तुमचा शेती प्रश्न?", post: "पोस्ट करा", answer: "उत्तर लिहा...", answers: "उत्तरे", share: "WhatsApp वर शेअर", upvote: "अपवोट", category: "वर्ग" },
    mandi: { title: "मंडी भाव", search: "गाव, जिल्हा शोधा...", state: "राज्य", commodity: "माल", minPrice: "किमान भाव", maxPrice: "कमाल भाव", modalPrice: "सरासरी भाव", nearby: "जवळचे" },
    transport: { title: "वाहतूक", cropType: "पीक प्रकार", quantity: "प्रमाण", pickup: "पिकअप", destination: "गंतव्य", submit: "WhatsApp वर पाठवा", whatsapp: "WhatsApp चॅट", call: "आता कॉल करा" },
    diagnosis: { title: "पीक रोग निदान", upload: "वनस्पती फोटो अपलोड", analyze: "AI विश्लेषण", result: "निकाल", disease: "रोग", treatment: "उपचार", prevention: "प्रतिबंध", severity: "तीव्रता" },
    recommendations: { title: "पीक शिफारसी", soilBased: "माती आधारित", locationBased: "ठिकाण आधारित", seasonBased: "हंगाम आधारित", selectSoil: "माती निवडा", selectRegion: "प्रदेश निवडा", currentSeason: "सध्याचा हंगाम", expertTips: "तज्ञ टिप्स" },
    common: { loading: "लोड होत आहे...", noResults: "निकाल सापडले नाहीत", viewDetails: "तपशील पहा", back: "मागे", whatsappHelp: "मदत? WhatsApp", selectLanguage: "भाषा निवडा" },
  },
  bn: {
    nav: { home: "হোম", crops: "ফসল গ্রন্থাগার", community: "সম্প্রদায়", mandi: "মান্ডি দর", transport: "পরিবহন", diagnosis: "রোগ নির্ণয়", recommendations: "সুপারিশ" },
    hero: { title: "অ্যাগ্রিলিংক — কৃষক ফসল বুদ্ধিমত্তা", subtitle: "আপনার সম্পূর্ণ কৃষি সঙ্গী", cta: "ফসল দেখুন" },
    crops: { title: "ফসল গ্রন্থাগার", search: "ফসল খুঁজুন...", allCategories: "সমস্ত বিভাগ", season: "মৌসুম", soil: "মাটির ধরন", irrigation: "সেচ", pests: "কীটপতঙ্গ", fertilizer: "সার তালিকা", bestPractices: "সর্বোত্তম পদ্ধতি" },
    community: { title: "সম্প্রদায় প্রশ্নোত্তর", askQuestion: "প্রশ্ন করুন", placeholder: "আপনার কৃষি প্রশ্ন?", post: "পোস্ট", answer: "উত্তর লিখুন...", answers: "উত্তর", share: "WhatsApp শেয়ার", upvote: "আপভোট", category: "বিভাগ" },
    mandi: { title: "মান্ডি দর", search: "গ্রাম, জেলা খুঁজুন...", state: "রাজ্য", commodity: "পণ্য", minPrice: "সর্বনিম্ন দাম", maxPrice: "সর্বোচ্চ দাম", modalPrice: "গড় দাম", nearby: "কাছাকাছি" },
    transport: { title: "পরিবহন", cropType: "ফসলের ধরন", quantity: "পরিমাণ", pickup: "পিকআপ", destination: "গন্তব্য", submit: "WhatsApp পাঠান", whatsapp: "WhatsApp চ্যাট", call: "এখন কল করুন" },
    diagnosis: { title: "ফসল রোগ নির্ণয়", upload: "গাছের ছবি আপলোড", analyze: "AI বিশ্লেষণ", result: "ফলাফল", disease: "রোগ", treatment: "চিকিৎসা", prevention: "প্রতিরোধ", severity: "তীব্রতা" },
    recommendations: { title: "ফসল সুপারিশ", soilBased: "মাটি ভিত্তিক", locationBased: "অবস্থান ভিত্তিক", seasonBased: "মৌসুম ভিত্তিক", selectSoil: "মাটি নির্বাচন", selectRegion: "অঞ্চল নির্বাচন", currentSeason: "বর্তমান মৌসুম", expertTips: "বিশেষজ্ঞ পরামর্শ" },
    common: { loading: "লোড হচ্ছে...", noResults: "ফলাফল নেই", viewDetails: "বিস্তারিত", back: "পিছনে", whatsappHelp: "সাহায্য? WhatsApp", selectLanguage: "ভাষা নির্বাচন" },
  },
  gu: {
    nav: { home: "હોમ", crops: "પાક પુસ્તકાલય", community: "સમુદાય", mandi: "મંડી ભાવ", transport: "પરિવહન", diagnosis: "રોગ નિદાન", recommendations: "ભલામણો" },
    hero: { title: "એગ્રીલિંક — ખેડૂત પાક બુદ્ધિમત્તા", subtitle: "તમારો સંપૂર્ણ ખેતી સાથી", cta: "પાક જુઓ" },
    crops: { title: "પાક પુસ્તકાલય", search: "પાક શોધો...", allCategories: "બધી શ્રેણીઓ", season: "ઋતુ", soil: "માટીનો પ્રકાર", irrigation: "સિંચાઈ", pests: "જીવાતો", fertilizer: "ખાતર", bestPractices: "શ્રેષ્ઠ પદ્ધતિઓ" },
    community: { title: "સમુદાય Q&A", askQuestion: "પ્રશ્ન પૂછો", placeholder: "તમારો ખેતી પ્રશ્ન?", post: "પોસ્ટ", answer: "જવાબ લખો...", answers: "જવાબો", share: "WhatsApp શેર", upvote: "અપવોટ", category: "શ્રેણી" },
    mandi: { title: "મંડી ભાવ", search: "ગામ, જિલ્લો શોધો...", state: "રાજ્ય", commodity: "માલ", minPrice: "ન્યૂનતમ ભાવ", maxPrice: "મહત્તમ ભાવ", modalPrice: "સરેરાશ ભાવ", nearby: "નજીકના" },
    transport: { title: "પરિવહન", cropType: "પાક પ્રકાર", quantity: "જથ્થો", pickup: "પિકઅપ", destination: "ગંતવ્ય", submit: "WhatsApp મોકલો", whatsapp: "WhatsApp ચેટ", call: "હવે કૉલ કરો" },
    diagnosis: { title: "પાક રોગ નિદાન", upload: "છોડનો ફોટો અપલોડ", analyze: "AI વિશ્લેષણ", result: "પરિણામ", disease: "રોગ", treatment: "સારવાર", prevention: "નિવારણ", severity: "ગંભીરતા" },
    recommendations: { title: "પાક ભલામણો", soilBased: "માટી આધારિત", locationBased: "સ્થાન આધારિત", seasonBased: "ઋતુ આધારિત", selectSoil: "માટી પસંદ કરો", selectRegion: "પ્રદેશ પસંદ કરો", currentSeason: "વર્તમાન ઋતુ", expertTips: "નિષ્ણાત ટિપ્સ" },
    common: { loading: "લોડ થઈ રહ્યું છે...", noResults: "પરિણામ મળ્યા નથી", viewDetails: "વિગતો", back: "પાછળ", whatsappHelp: "મદદ? WhatsApp", selectLanguage: "ભાષા પસંદ કરો" },
  },
  pa: {
    nav: { home: "ਹੋਮ", crops: "ਫਸਲ ਲਾਇਬ੍ਰੇਰੀ", community: "ਭਾਈਚਾਰਾ", mandi: "ਮੰਡੀ ਰੇਟ", transport: "ਟ੍ਰਾਂਸਪੋਰਟ", diagnosis: "ਰੋਗ ਨਿਦਾਨ", recommendations: "ਸਿਫਾਰਸ਼ਾਂ" },
    hero: { title: "ਐਗਰੀਲਿੰਕ — ਕਿਸਾਨ ਫਸਲ ਬੁੱਧੀ", subtitle: "ਤੁਹਾਡਾ ਪੂਰਾ ਖੇਤੀ ਸਾਥੀ", cta: "ਫਸਲਾਂ ਵੇਖੋ" },
    crops: { title: "ਫਸਲ ਲਾਇਬ੍ਰੇਰੀ", search: "ਫਸਲਾਂ ਖੋਜੋ...", allCategories: "ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ", season: "ਮੌਸਮ", soil: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ", irrigation: "ਸਿੰਚਾਈ", pests: "ਕੀੜੇ", fertilizer: "ਖਾਦ", bestPractices: "ਵਧੀਆ ਤਰੀਕੇ" },
    community: { title: "ਭਾਈਚਾਰਾ Q&A", askQuestion: "ਸਵਾਲ ਪੁੱਛੋ", placeholder: "ਤੁਹਾਡਾ ਖੇਤੀ ਸਵਾਲ?", post: "ਪੋਸਟ", answer: "ਜਵਾਬ ਲਿਖੋ...", answers: "ਜਵਾਬ", share: "WhatsApp ਸ਼ੇਅਰ", upvote: "ਅਪਵੋਟ", category: "ਸ਼੍ਰੇਣੀ" },
    mandi: { title: "ਮੰਡੀ ਰੇਟ", search: "ਪਿੰਡ, ਜ਼ਿਲ੍ਹਾ ਖੋਜੋ...", state: "ਰਾਜ", commodity: "ਫਸਲ", minPrice: "ਘੱਟੋ-ਘੱਟ ਕੀਮਤ", maxPrice: "ਵੱਧ ਤੋਂ ਵੱਧ ਕੀਮਤ", modalPrice: "ਔਸਤ ਕੀਮਤ", nearby: "ਨੇੜੇ ਦੇ" },
    transport: { title: "ਟ੍ਰਾਂਸਪੋਰਟ", cropType: "ਫਸਲ ਕਿਸਮ", quantity: "ਮਾਤਰਾ", pickup: "ਪਿੱਕਅੱਪ", destination: "ਮੰਜ਼ਿਲ", submit: "WhatsApp ਭੇਜੋ", whatsapp: "WhatsApp ਚੈਟ", call: "ਹੁਣ ਕਾਲ ਕਰੋ" },
    diagnosis: { title: "ਫਸਲ ਰੋਗ ਨਿਦਾਨ", upload: "ਪੌਦੇ ਦੀ ਫੋਟੋ ਅਪਲੋਡ", analyze: "AI ਵਿਸ਼ਲੇਸ਼ਣ", result: "ਨਤੀਜਾ", disease: "ਰੋਗ", treatment: "ਇਲਾਜ", prevention: "ਰੋਕਥਾਮ", severity: "ਗੰਭੀਰਤਾ" },
    recommendations: { title: "ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ", soilBased: "ਮਿੱਟੀ ਅਧਾਰਿਤ", locationBased: "ਸਥਾਨ ਅਧਾਰਿਤ", seasonBased: "ਮੌਸਮ ਅਧਾਰਿਤ", selectSoil: "ਮਿੱਟੀ ਚੁਣੋ", selectRegion: "ਖੇਤਰ ਚੁਣੋ", currentSeason: "ਮੌਜੂਦਾ ਮੌਸਮ", expertTips: "ਮਾਹਿਰ ਸੁਝਾਅ" },
    common: { loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...", noResults: "ਨਤੀਜੇ ਨਹੀਂ ਮਿਲੇ", viewDetails: "ਵੇਰਵੇ", back: "ਵਾਪਸ", whatsappHelp: "ਮਦਦ? WhatsApp", selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ" },
  },
};

// For languages without full translations, fallback to English
export function getTranslation(lang: string): TranslationKeys {
  return translations[lang] || translations.en;
}
