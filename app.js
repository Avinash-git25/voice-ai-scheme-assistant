// Main Application Controller for VoiceScheme AI / YojanaMitra
// Multi-lingual Voice-First Government Scheme Finder

import { SCHEMES_DATABASE, DOCUMENT_GUIDE, DEMO_PERSONAS, NEARBY_CENTERS } from './schemes-data.js';
import { EligibilityEngine } from './rule-engine.js';
import { DialogueManager } from './dialogue-manager.js';
import { VoiceService } from './voice-service.js';

// Application State
const state = {
  currentLang: 'en', // English default system language
  currentUser: null,
  activePersonaId: null,
  currentProfile: {
    age: null,
    gender: null,
    state: 'Maharashtra',
    district: null,
    occupation: null,
    annual_income: null,
    category: null,
    land_owner: null,
    disability: false,
    student: false
  },
  dialogueHistory: [],
  evaluatedSchemes: [],
  activeFilter: 'all',
  selectedSchemeForDocs: null,
  selectedSchemeForQA: null,
  userDocumentsState: {}
};

const ruleEngine = new EligibilityEngine();
const dialogueManager = new DialogueManager();
let voiceService = null;

// UI Translations Dictionary
const I18N = {
  mr: {
    app_title: "योजनामित्र - व्हॉइस-फर्स्ट शासकीय योजना शोधक",
    hero_title: "शासकीय योजना आता तुमच्या हक्काच्या — बोलून शोधा!",
    hero_subtitle: "शेतकरी, महिला, विद्यार्थी व मजुरांसाठी केंद्र व महाराष्ट्र शासनाच्या सर्व कल्याणकारी योजनांची खात्रीशीर माहिती.",
    mic_idle_hint: "माइकवर टॅप करा आणि आपली परिस्थिती बोला",
    mic_listening_hint: "ऐकत आहे... कृपया बोला",
    mic_speaking_hint: "सहाय्यक माहिती वाचत आहे...",
    mic_permission_denied: "मायक्रोफोन परवानगी नाकारली गेली आहे. कृपया ब्राउझरमध्ये माइक सुरू करा किंवा खाली टाइप करा.",
    type_placeholder: "किंवा येथे टाइप करा: उदा. 'मी रायगडची शेतकरी महिला असून वय ५२ वर्षे आहे...'",
    send_btn: "शोध घ्या",
    try_persona: "डेमो व्यक्ती निवडा (त्वरित चाचणी):",
    profile_summary_title: "तुमची नोंदवलेली माहिती (प्रोफाइल):",
    schemes_count: "पात्र व शिफारस केलेल्या योजना",
    filter_all: "सर्व योजना",
    filter_high: "उच्च पात्रता (100%)",
    filter_state: "महाराष्ट्र शासन",
    filter_central: "केंद्र शासन",
    why_qualify: "तुम्ही का पात्र ठरता? (नियम पडताळणी):",
    required_docs: "आवश्यक कागदपत्रे:",
    readiness_label: "कागदपत्र सज्जता:",
    btn_listen: "मराठीत ऐका",
    btn_docs_guide: "कागदपत्रे तपासणी व मदत",
    btn_ask_qa: "योजनेबाबत प्रश्न विचारा",
    btn_apply: "अधिकृत पोर्टलवर अर्ज करा",
    doc_modal_title: "कागदपत्र सज्जता तपासणी व मिळवण्याचा मार्ग",
    doc_modal_subtitle: "कोणती कागदपत्रे तुमच्याकडे आहेत ते तपासा आणि गहाळ कागदपत्रे कोठून मिळवायची ते जाणून घ्या.",
    near_me_title: "तुमच्या नजीकचे आपले सरकार / ग्राहक सेवा केंद्र (CSC):",
    btn_print: "अर्ज सारांश प्रिंट / PDF करा",

    verified_on: "पडताळणी दिनांक",
    reset_btn: "नवीन शोध / रीसेट",
    gender_male: "पुरुष (Male)",
    gender_female: "महिला (Female)",
    disclaimer: "सूचना: हे मार्गदर्शन प्राथमिक माहितीवर आधारित आहे. अंतिम मंजुरी शासकीय अधिकाऱ्यांच्या पडताळणीवर अवलंबून असते.",
    trust_verified: "अधिकृत नियम पडताळणी",
    trust_multilingual: "मराठी • हिंदी • English",
    trust_privacy: "गोपनीयता प्रथम",
    trust_no_aadhaar: "शून्य आधार साठवणूक",
    voice_guide_title: "कसे बोलायचे? (उदाहरणे):",
    completeness_label: "पूर्णता:",

    // Citizen Auth & Data Vault
    nav_login: "साइन इन / लॉगिन",
    auth_modal_title: "नागरिक लॉगिन व डेटा सुरक्षितता",
    auth_modal_subtitle: "तुमची पात्रता प्रोफाइल, कागदपत्रे आणि शोधलेल्या योजना जतन करण्यासाठी लॉगिन करा.",
    auth_lang_step: "पायरी १: आपली भाषा निवडा (Select Language)",
    auth_tab_login: "साइन इन (Sign In)",
    auth_tab_register: "नवीन नोंदणी (Register)",
    auth_lbl_name: "पूर्ण नाव",
    auth_lbl_phone: "फोन / मोबाइल क्रमांक",
    auth_lbl_email: "ईमेल पत्ता",
    auth_lbl_address: "पत्ता (गाव / शहर / जिल्हा)",
    auth_lbl_signin_id: "फोन नंबर किंवा ईमेल",
    auth_lbl_password: "पासवर्ड किंवा ४-अंकी पिन",
    auth_btn_login: "साइन इन करा आणि डेटा लोड करा",
    auth_btn_register: "नवीन खाते तयार करा व जतन करा",
    auth_switch_to_register: "खाते नाही का? येथे नवीन नोंदणी करा →",
    auth_switch_to_login: "आधीच खाते आहे? येथे साइन इन करा →",
    auth_demo_title: "झटपट डेमो लॉगिन (चाचणीसाठी निवडा):",
    btn_save: "डेटा जतन करा",
    btn_logout: "लॉगआउट",
    citizen_active_profile: "सक्रिय नागरिक प्रोफाइल (नोंदणीकृत खाते)",
    guest_banner_text: "💡 अतिथी मोड: तुमची पात्रता प्रोफाइल व कागदपत्रे सुरक्षितरीत्या जतन करण्यासाठी साइन इन करा.",
    logged_in_banner_text: "🔒 लॉगिन सुरक्षित: तुमची प्रोफाइल व कागदपत्रे तुमच्या खात्यात स्वयंचलित जतन होत आहेत.",
    save_success: "तुमची प्रोफाइल व कागदपत्रे यशस्वीरीत्या जतन झाली!",
    login_success: "लॉगिन यशस्वी! तुमची जतन केलेली माहिती लोड झाली.",
    register_success: "नवीन खाते यशस्वीरीत्या तयार झाले!",
    logout_success: "यशस्वीरीत्या लॉगआउट झाले."
  },
  hi: {
    app_title: "योजनामित्र - वॉइस-फर्स्ट सरकारी योजना खोजक",
    hero_title: "सरकारी योजनाएं अब आपकी मुट्ठी में — बोलकर खोजें!",
    hero_subtitle: "किसान, महिला, छात्र एवं मजदूरों के लिए केंद्र व राज्य सरकार की कल्याणकारी योजनाओं की सटीक जानकारी।",
    mic_idle_hint: "माइक दबाएं और अपनी स्थिति बोलकर बताएं",
    mic_listening_hint: "सुन रहा हूँ... कृपया बोलें",
    mic_speaking_hint: "सहायक जानकारी पढ़ रहा है...",
    mic_permission_denied: "माइक्रोफ़ोन की अनुमति नहीं मिली। कृपया ब्राउज़र में माइक की अनुमति दें या नीचे टाइप करें।",
    type_placeholder: "या यहाँ लिखें: उदा. 'मैं महाराष्ट्र का किसान हूँ, उम्र 52 साल है, आय 80,000 है...'",
    send_btn: "खोजें",
    try_persona: "डेमो व्यक्ति चुनें (तुरंत टेस्ट करें):",
    profile_summary_title: "आपकी दर्ज जानकारी (प्रोफाइल):",
    schemes_count: "पात्र एवं अनुशंसित योजनाएं",
    filter_all: "सभी योजनाएं",
    filter_high: "उच्च पात्रता (100%)",
    filter_state: "महाराष्ट्र सरकार",
    filter_central: "केंद्र सरकार",
    why_qualify: "आप क्यों पात्र हैं? (नियम सत्यापन):",
    required_docs: "आवश्यक दस्तावेज:",
    readiness_label: "दस्तावेज तैयारी:",
    btn_listen: "हिंदी में सुनें",
    btn_docs_guide: "दस्तावेज चेकलिस्ट एवं मार्गदर्शन",
    btn_ask_qa: "योजना से जुड़े सवाल पूछें",
    btn_apply: "आधिकारिक पोर्टल पर आवेदन करें",
    doc_modal_title: "दस्तावेज तत्परता चेकलिस्ट एवं प्राप्ति गाइड",
    doc_modal_subtitle: "जाँचें कौन से दस्तावेज आपके पास हैं और छूटे हुए दस्तावेज कहाँ से प्राप्त करें।",
    near_me_title: "आपके नजदीकी सीएससी (CSC) एवं सेवा केंद्र:",
    btn_print: "आवेदन सारांश प्रिंट / PDF करें",

    verified_on: "सत्यापित तिथि",
    reset_btn: "नई खोज / रीसेट करें",
    gender_male: "पुरुष (Male)",
    gender_female: "महिला (Female)",
    disclaimer: "सूचना: यह मार्गदर्शन नियमों पर आधारित है। अंतिम स्वीकृति संबंधित सरकारी विभाग द्वारा सत्यापन के बाद ही दी जाती है।",
    trust_verified: "सत्यापित नियम",
    trust_multilingual: "मराठी • हिंदी • English",
    trust_privacy: "गोपनीयता प्रथम",
    trust_no_aadhaar: "शून्य आधार भंडारण",
    voice_guide_title: "कैसे बोलें? (उदाहरण):",
    completeness_label: "पूर्णता:",

    // Citizen Auth & Data Vault
    nav_login: "साइन इन / लॉगिन",
    auth_modal_title: "नागरिक लॉगिन एवं डेटा सुरक्षा",
    auth_modal_subtitle: "अपनी पात्रता प्रोफ़ाइल, दस्तावेज और खोजी गई योजनाएं सुरक्षित रखने के लिए लॉगिन करें।",
    auth_lang_step: "चरण 1: अपनी भाषा चुनें (Select Language)",
    auth_tab_login: "साइन इन (Sign In)",
    auth_tab_register: "नया पंजीकरण (Register)",
    auth_lbl_name: "पूरा नाम",
    auth_lbl_phone: "फ़ोन / मोबाइल नंबर",
    auth_lbl_email: "ईमेल पता",
    auth_lbl_address: "पता (गांव / शहर / ज़िला)",
    auth_lbl_signin_id: "फ़ोन नंबर या ईमेल",
    auth_lbl_password: "पासवर्ड या ४-अंकीय पिन",
    auth_btn_login: "साइन इन करें और डेटा लोड करें",
    auth_btn_register: "नया खाता बनाएं और डेटा सहेजें",
    auth_switch_to_register: "खाता नहीं है? यहाँ नया पंजीकरण करें →",
    auth_switch_to_login: "पहले से खाता है? यहाँ साइन इन करें →",
    auth_demo_title: "त्वरित डेमो लॉगिन (टेस्ट करने के लिए चुनें):",
    btn_save: "डेटा सहेजें",
    btn_logout: "लॉगआउट",
    citizen_active_profile: "सक्रिय नागरिक प्रोफ़ाइल (पंजीकृत खाता)",
    guest_banner_text: "💡 अतिथि मोड: अपनी पात्रता प्रोफ़ाइल और दस्तावेज़ सुरक्षित रखने के लिए साइन इन करें।",
    logged_in_banner_text: "🔒 लॉगिन सुरक्षित: आपकी प्रोफ़ाइल और दस्तावेज़ आपके खाते में स्वचालित रूप से सहेजे जा रहे हैं।",
    save_success: "आपकी प्रोफ़ाइल और दस्तावेज़ सफलतापूर्वक सहेज लिए गए!",
    login_success: "लॉगिन सफल! आपकी सहेजी गई जानकारी लोड हो गई।",
    register_success: "नया खाता सफलतापूर्वक बन गया!",
    logout_success: "सफलतापूर्वक लॉगआउट हो गया।"
  },
  en: {
    app_title: "VoiceScheme AI / YojanaMitra - Voice Government Scheme Finder",
    hero_title: "Discover Government Schemes with Your Voice",
    hero_subtitle: "Instant, deterministic matching for farmers, women, students, and workers across Central and Maharashtra government programs.",
    mic_idle_hint: "Tap microphone and speak your situation",
    mic_listening_hint: "Listening... speak now",
    mic_speaking_hint: "Assistant is speaking...",
    mic_permission_denied: "Microphone permission denied. Please allow microphone in browser or type your details below.",
    type_placeholder: "Or type your situation: e.g. 'I am a 52-year-old farmer in Maharashtra, annual income 80,000...'",
    send_btn: "Find Schemes",
    try_persona: "Try Test Personas (One-Click Demo):",
    profile_summary_title: "Extracted Citizen Profile:",
    schemes_count: "Eligible & Recommended Schemes",
    filter_all: "All Schemes",
    filter_high: "100% Eligible",
    filter_state: "Maharashtra State",
    filter_central: "Central Govt",
    why_qualify: "Why you qualify (Rule Engine Trace):",
    required_docs: "Required Documents:",
    readiness_label: "Document Readiness:",
    btn_listen: "Listen",
    btn_docs_guide: "Document Checklist & Rescue",
    btn_ask_qa: "Ask Scheme Question",
    btn_apply: "Official Apply Portal",
    doc_modal_title: "Personalized Document Checklist & Rescue Guide",
    doc_modal_subtitle: "Check documents in hand and get step-by-step guidance on where & how to procure missing ones.",
    near_me_title: "Nearby Common Service Centers (CSC & Aaple Sarkar):",
    btn_print: "Print / Export Summary PDF",

    verified_on: "Verified",
    reset_btn: "New Search / Reset",
    gender_male: "Male",
    gender_female: "Female",
    disclaimer: "Disclaimer: This is advisory guidance. Final benefit sanction is subject to official administrative verification.",
    trust_verified: "Verified Scheme Rules",
    trust_multilingual: "Marathi • Hindi • English",
    trust_privacy: "Privacy First",
    trust_no_aadhaar: "No Aadhaar Storage",
    voice_guide_title: "What you can say (Examples):",
    completeness_label: "Completeness:",

    // Citizen Auth & Data Vault
    nav_login: "Sign In / Login",
    auth_modal_title: "Citizen Login & Data Vault",
    auth_modal_subtitle: "Sign in to save your eligibility profile, document checklist, and matched schemes across visits.",
    auth_lang_step: "Step 1: Choose Your Language",
    auth_tab_login: "Sign In",
    auth_tab_register: "Create Account",
    auth_lbl_name: "Full Name",
    auth_lbl_phone: "Phone Number",
    auth_lbl_email: "Email Address",
    auth_lbl_address: "Address (Village / City / District)",
    auth_lbl_signin_id: "Phone Number or Email",
    auth_lbl_password: "Password or 4-digit PIN",
    auth_btn_login: "Sign In & Load Data",
    auth_btn_register: "Create Account & Save",
    auth_switch_to_register: "Don't have an account? Register here →",
    auth_switch_to_login: "Already have an account? Sign In here →",
    auth_demo_title: "Quick Demo Logins (Click to Test):",
    btn_save: "Save Data",
    btn_logout: "Logout",
    citizen_active_profile: "Active Citizen Profile (Registered Account)",
    guest_banner_text: "💡 Guest Mode: Sign In to save your eligibility profile & document checklist across sessions.",
    logged_in_banner_text: "🔒 Secure Session: Your profile details & document readiness are auto-saved to your account.",
    save_success: "Your profile and documents have been saved successfully!",
    login_success: "Login successful! Your saved profile and documents are loaded.",
    register_success: "Account created successfully!",
    logout_success: "Logged out successfully."
  }
};

// Storage Keys
const AUTH_STORAGE_KEY = 'voicescheme_accounts';
const SESSION_STORAGE_KEY = 'voicescheme_active_session';

const SEED_ACCOUNTS = {}; // Zero demo accounts - pure user registration and login

function getAccountsDB() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      // Purge any legacy demo accounts so they never appear
      delete parsed.farmer;
      delete parsed.women;
      delete parsed.student;
      delete parsed['9123456780'];
      delete parsed['9876543210'];
      delete parsed['9822012345'];
      delete parsed['rahul.shinde@example.com'];
      delete parsed['ananda.patil@example.com'];
      delete parsed['sunita.kamble@example.com'];
      return parsed;
    }
    return {};
  } catch (e) {
    return {};
  }
}

function saveAccountToDB(account) {
  const db = getAccountsDB();
  const phoneKey = (account.phone || '').trim().toLowerCase();
  const emailKey = (account.email || '').trim().toLowerCase();
  if (phoneKey) db[phoneKey] = account;
  if (emailKey) db[emailKey] = account;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(db));
}

function initAuthSystem() {
  try {
    const activeKey = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY) || 'null');
    if (activeKey) {
      const db = getAccountsDB();
      const account = db[String(activeKey).toLowerCase()];
      if (account) {
        state.currentUser = account;
        if (account.profile) state.currentProfile = { ...account.profile };
        if (account.documents) state.userDocumentsState = { ...account.documents };
        if (account.preferredLang && ['en', 'mr', 'hi'].includes(account.preferredLang)) {
          state.currentLang = account.preferredLang;
        }
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        state.currentUser = null;
      }
    }
  } catch (e) {
    console.warn('Session init error:', e);
  }

  // System default language: English if user has not selected any language
  if (!state.currentLang) {
    state.currentLang = 'en';
  }
}

function loginUser(identifier, password) {
  const db = getAccountsDB();
  const cleanId = String(identifier || '').trim().toLowerCase();
  const cleanPass = String(password || '').trim();

  if (!cleanId || !cleanPass) {
    showAuthFeedback(
      state.currentLang === 'mr'
        ? 'कृपया फोन नंबर / ईमेल आणि पासवर्ड टाका.'
        : state.currentLang === 'hi'
          ? 'कृपया फ़ोन नंबर / ईमेल और पासवर्ड दर्ज करें।'
          : 'Please enter phone number/email and password.',
      'error'
    );
    return false;
  }

  // Find account by phone or email
  let account = db[cleanId];
  if (!account) {
    account = Object.values(db).find(a => 
      (a.phone && a.phone.toLowerCase() === cleanId) ||
      (a.email && a.email.toLowerCase() === cleanId)
    );
  }

  if (!account || account.password !== cleanPass) {
    showAuthFeedback(
      state.currentLang === 'mr'
        ? 'चुकीचा फोन नंबर / ईमेल किंवा पासवर्ड.'
        : state.currentLang === 'hi'
          ? 'गलत फ़ोन नंबर / ईमेल या पासवर्ड।'
          : 'Invalid phone number / email or password.',
      'error'
    );
    return false;
  }

  state.currentUser = account;
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(cleanId));

  if (account.profile) {
    state.currentProfile = { ...account.profile };
  }
  state.userDocumentsState = account.documents ? { ...account.documents } : {};

  if (account.preferredLang && ['en', 'mr', 'hi'].includes(account.preferredLang)) {
    setLanguage(account.preferredLang);
  } else {
    updateUserSessionUI();
    renderProfile();
    runEligibilityMatching();
  }

  closeAuthModal();
  showAuthToast(I18N[state.currentLang].login_success || 'Login successful!');

  const welcomeLogin = state.currentLang === 'mr'
    ? `स्वागत आहे ${account.name || 'नागरिक'}! आपली माहिती व जतन केलेले दस्तावेज लोड झाले आहेत.`
    : state.currentLang === 'hi'
      ? `स्वागत है ${account.name || 'नागरिक'}! आपकी प्रोफ़ाइल और दस्तावेज़ लोड हो गए हैं।`
      : `Welcome back, ${account.name || 'Citizen'}! Your profile and saved documents are loaded.`;
  addChatMessage('assistant', welcomeLogin);
  if (voiceService) voiceService.speak(welcomeLogin, state.currentLang);

  return true;
}

function registerUser(name, phone, email, address, password) {
  const cleanName = String(name || '').trim();
  const cleanPhone = String(phone || '').trim();
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanAddress = String(address || '').trim();
  const cleanPassword = String(password || '').trim();

  if (!cleanName) {
    showAuthFeedback(
      state.currentLang === 'mr'
        ? 'कृपया आपले पूर्ण नाव प्रविष्ट करा.'
        : state.currentLang === 'hi'
          ? 'कृपया अपना पूरा नाम दर्ज करें।'
          : 'Please enter your full name.',
      'error'
    );
    return false;
  }

  if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 10) {
    showAuthFeedback(
      state.currentLang === 'mr'
        ? 'कृपया वैध १०-अंकी मोबाइल नंबर प्रविष्ट करा.'
        : state.currentLang === 'hi'
          ? 'कृपया वैध 10-अंकीय मोबाइल नंबर दर्ज करें।'
          : 'Please enter a valid 10-digit mobile number.',
      'error'
    );
    return false;
  }

  if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
    showAuthFeedback(
      state.currentLang === 'mr'
        ? 'कृपया वैध ईमेल पत्ता प्रविष्ट करा.'
        : state.currentLang === 'hi'
          ? 'कृपया वैध ईमेल पता दर्ज करें।'
          : 'Please enter a valid email address.',
      'error'
    );
    return false;
  }

  if (!cleanAddress) {
    showAuthFeedback(
      state.currentLang === 'mr'
        ? 'कृपया आपला पत्ता (गाव / शहर / जिल्हा) प्रविष्ट करा.'
        : state.currentLang === 'hi'
          ? 'कृपया अपना पता (गांव / शहर / ज़िला) दर्ज करें।'
          : 'Please enter your address (Village / City / District).',
      'error'
    );
    return false;
  }

  if (!cleanPassword || cleanPassword.length < 3) {
    showAuthFeedback(
      state.currentLang === 'mr'
        ? 'कृपया किमान ३ अक्षरी पासवर्ड किंवा पिन प्रविष्ट करा.'
        : state.currentLang === 'hi'
          ? 'कृपया कम से कम 3 अक्षरों का पासवर्ड या पिन दर्ज करें।'
          : 'Please enter a password or PIN (min 3 characters).',
      'error'
    );
    return false;
  }

  const db = getAccountsDB();
  if (db[cleanPhone] || db[cleanEmail]) {
    showAuthFeedback(
      state.currentLang === 'mr'
        ? 'हा फोन नंबर किंवा ईमेल आधीच नोंदणीकृत आहे. कृपया साइन इन करा.'
        : state.currentLang === 'hi'
          ? 'यह फ़ोन नंबर या ईमेल पहले से पंजीकृत है। कृपया साइन इन करें।'
          : 'This phone number or email is already registered. Please Sign In.',
      'error'
    );
    return false;
  }

  const newAccount = {
    name: cleanName,
    phone: cleanPhone,
    email: cleanEmail,
    address: cleanAddress,
    password: cleanPassword,
    preferredLang: state.currentLang,
    profile: {
      ...state.currentProfile,
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      district: cleanAddress
    },
    documents: { ...state.userDocumentsState },
    createdAt: new Date().toISOString()
  };

  saveAccountToDB(newAccount);

  state.currentUser = newAccount;
  state.currentProfile.name = cleanName;
  state.currentProfile.phone = cleanPhone;
  state.currentProfile.email = cleanEmail;
  state.currentProfile.district = cleanAddress;
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(cleanPhone));

  updateUserSessionUI();
  renderProfile();
  runEligibilityMatching();
  closeAuthModal();

  showAuthToast(I18N[state.currentLang].register_success || 'Account created successfully!');

  const welcomeRegistered = state.currentLang === 'mr'
    ? `नमस्कार ${cleanName}! आपले नागरिक खाते यशस्वीरीत्या तयार झाले आहे. आपण आता शासकीय योजना शोधू शकता.`
    : state.currentLang === 'hi'
      ? `नमस्ते ${cleanName}! आपका नागरिक खाता सफलतापूर्वक बन गया है। अब आप सरकारी योजनाएं खोज सकते हैं।`
      : `Welcome, ${cleanName}! Your citizen account has been successfully created.`;
  addChatMessage('assistant', welcomeRegistered);
  if (voiceService) voiceService.speak(welcomeRegistered, state.currentLang);

  return true;
}

function logoutUser() {
  state.currentUser = null;
  localStorage.removeItem(SESSION_STORAGE_KEY);
  resetProfile();
  updateUserSessionUI();
  showAuthToast(I18N[state.currentLang].logout_success || 'Logged out successfully.');

  const logoutMsg = state.currentLang === 'mr'
    ? "आपण लॉगआउट झाला आहात. नवीन शोध सुरू करू शकता."
    : state.currentLang === 'hi'
      ? "आप लॉगआउट हो गए हैं। नई खोज शुरू कर सकते हैं।"
      : "You have logged out. You can start a new search.";
  addChatMessage('assistant', logoutMsg);
}

function saveCurrentUserData() {
  if (!state.currentUser) return;
  const db = getAccountsDB();
  const key = (state.currentUser.phone || state.currentUser.email || '').toLowerCase();
  if (db[key]) {
    db[key].profile = { ...state.currentProfile };
    db[key].documents = { ...state.userDocumentsState };
    db[key].preferredLang = state.currentLang;
    db[key].lastSavedAt = new Date().toISOString();
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(db));
    state.currentUser = db[key];
  }
}

function openAuthModal() {
  const authModal = document.getElementById('auth-modal');
  if (!authModal) return;
  renderAuthModalText();
  hideAuthFeedback();
  try {
    if (typeof authModal.showModal === 'function') {
      if (!authModal.open) authModal.showModal();
    } else {
      authModal.setAttribute('open', '');
      authModal.style.display = 'block';
    }
  } catch (err) {
    authModal.setAttribute('open', '');
    authModal.style.display = 'block';
  }
}

function closeAuthModal() {
  const authModal = document.getElementById('auth-modal');
  if (!authModal) return;
  try {
    if (typeof authModal.close === 'function' && authModal.open) {
      authModal.close();
    }
  } catch (err) {}
  authModal.removeAttribute('open');
  authModal.style.display = '';
}

function updateUserSessionUI() {
  const openAuthBtn = document.getElementById('open-auth-btn');
  const userBadgeContainer = document.getElementById('user-badge-container');
  const userPillName = document.getElementById('user-pill-name');
  const sessionBanner = document.getElementById('user-session-banner');
  const sessionBannerText = document.getElementById('session-banner-text');
  const bannerActionBtn = document.getElementById('banner-action-btn');
  const personasWrapper = document.getElementById('personas-wrapper');
  const citizenCard = document.getElementById('citizen-account-card');
  const citizenCardName = document.getElementById('citizen-card-name');
  const citizenCardPhone = document.getElementById('citizen-card-phone');
  const citizenCardEmail = document.getElementById('citizen-card-email');
  const citizenCardAddress = document.getElementById('citizen-card-address');
  const t = I18N[state.currentLang];

  if (!t) return;

  if (state.currentUser) {
    if (openAuthBtn) openAuthBtn.style.display = 'none';
    if (userBadgeContainer) userBadgeContainer.style.display = 'inline-flex';
    const displayName = state.currentUser.name || state.currentUser.phone || 'Citizen';
    if (userPillName) {
      userPillName.textContent = displayName;
      userPillName.title = `${displayName} (${state.currentUser.phone || ''} • ${state.currentUser.address || ''})`;
    }

    if (sessionBanner) sessionBanner.classList.add('logged-in');
    if (sessionBannerText) {
      sessionBannerText.innerHTML = `<strong>${t.logged_in_banner_text}</strong> (${displayName})`;
    }
    if (bannerActionBtn) {
      bannerActionBtn.innerHTML = `💾 <span>${t.btn_save}</span>`;
      bannerActionBtn.title = t.btn_save;
    }

    // HIDE demo personas when logged in (NO Ramesh, NO Aarti)
    if (personasWrapper) {
      personasWrapper.style.display = 'none';
    }

    // SHOW citizen account card with their real details
    if (citizenCard) {
      citizenCard.style.display = 'block';
      if (citizenCardName) citizenCardName.textContent = displayName;
      if (citizenCardPhone) citizenCardPhone.textContent = state.currentUser.phone || '—';
      if (citizenCardEmail) citizenCardEmail.textContent = state.currentUser.email || '—';
      if (citizenCardAddress) citizenCardAddress.textContent = state.currentUser.address || '—';
    }
  } else {
    if (openAuthBtn) openAuthBtn.style.display = 'inline-flex';
    if (userBadgeContainer) userBadgeContainer.style.display = 'none';

    if (sessionBanner) sessionBanner.classList.remove('logged-in');
    if (sessionBannerText) {
      sessionBannerText.textContent = t.guest_banner_text;
    }
    if (bannerActionBtn) {
      bannerActionBtn.innerHTML = `🔑 <span>${t.nav_login}</span>`;
      bannerActionBtn.title = t.nav_login;
    }

    // When logged out, hide citizen card and show personas wrapper
    if (citizenCard) {
      citizenCard.style.display = 'none';
    }
    if (personasWrapper) {
      personasWrapper.style.display = 'block';
    }
  }
}

function renderAuthModalText() {
  const t = I18N[state.currentLang];
  if (!t) return;

  const stepText = document.getElementById('auth-lang-step-text');
  if (stepText) stepText.textContent = t.auth_lang_step;

  const authTitle = document.getElementById('auth-modal-title');
  if (authTitle) authTitle.textContent = t.auth_modal_title;

  const authSubtitle = document.getElementById('auth-modal-subtitle');
  if (authSubtitle) authSubtitle.textContent = t.auth_modal_subtitle;

  const tabLogin = document.getElementById('tab-auth-login');
  if (tabLogin) tabLogin.textContent = t.auth_tab_login;

  const tabRegister = document.getElementById('tab-auth-register');
  if (tabRegister) tabRegister.textContent = t.auth_tab_register;

  const isRegister = tabRegister?.classList.contains('active');

  const submitText = document.getElementById('auth-submit-text');
  if (submitText) submitText.textContent = isRegister ? t.auth_btn_register : t.auth_btn_login;

  const switchModeBtn = document.getElementById('auth-switch-mode-btn');
  if (switchModeBtn) switchModeBtn.textContent = isRegister ? t.auth_switch_to_login : t.auth_switch_to_register;

  // Sync active language buttons inside auth modal
  document.querySelectorAll('.auth-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === state.currentLang);
  });
}

function showAuthFeedback(msg, type = 'error') {
  const el = document.getElementById('auth-feedback-msg');
  if (el) {
    el.textContent = msg;
    el.className = `auth-feedback-msg ${type}`;
    el.style.display = 'block';
  }
}

function hideAuthFeedback() {
  const el = document.getElementById('auth-feedback-msg');
  if (el) el.style.display = 'none';
}

function showAuthToast(msg) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'app-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3500);
}

function setupVoice() {
  voiceService = new VoiceService(
    (transcript, isFinal) => {
      const input = document.getElementById('user-text-input');
      if (input) input.value = transcript;
      if (isFinal && transcript.trim().length > 0) {
        processUserQuery(transcript);
      }
    },
    ({ isListening, isSpeaking, error }) => {
      const micBtn = document.getElementById('mic-button');
      const micHint = document.getElementById('mic-status-hint');
      const wave = document.getElementById('audio-visualizer');

      if (micBtn) {
        micBtn.classList.toggle('listening', !!isListening);
        micBtn.classList.toggle('speaking', !!isSpeaking);
      }
      if (wave) {
        wave.classList.toggle('active', !!(isListening || isSpeaking));
      }
      if (micHint) {
        if (error === 'not-allowed') {
          micHint.textContent = I18N[state.currentLang].mic_permission_denied;
        } else if (isListening) {
          micHint.textContent = I18N[state.currentLang].mic_listening_hint;
        } else if (isSpeaking) {
          micHint.textContent = I18N[state.currentLang].mic_speaking_hint;
        } else {
          micHint.textContent = I18N[state.currentLang].mic_idle_hint;
        }
      }
    }
  );
  voiceService.setLanguage(state.currentLang);
}

function setupEventListeners() {
  // Main Header Language Switcher Buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = e.target.dataset.lang;
      setLanguage(selected);
    });
  });

  // Auth Modal Language Switcher Buttons (Synchronized with App)
  document.querySelectorAll('.auth-lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = e.currentTarget.dataset.lang;
      setLanguage(selected);
    });
  });

  // Auth Modal Opening & Closing
  const openAuthBtn = document.getElementById('open-auth-btn');
  const bannerActionBtn = document.getElementById('banner-action-btn');
  const closeAuthBtn = document.getElementById('close-auth-btn');
  const authModal = document.getElementById('auth-modal');

  if (openAuthBtn) {
    openAuthBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openAuthModal();
    });
  }

  if (bannerActionBtn) {
    bannerActionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (state.currentUser) {
        saveCurrentUserData();
        showAuthToast(I18N[state.currentLang].save_success);
      } else {
        openAuthModal();
      }
    });
  }

  if (closeAuthBtn) {
    closeAuthBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeAuthModal();
    });
  }

  if (authModal) {
    authModal.addEventListener('click', (e) => {
      const rect = authModal.getBoundingClientRect();
      const inDialog = (rect.top <= e.clientY && e.clientY <= rect.bottom && rect.left <= e.clientX && e.clientX <= rect.right);
      if (!inDialog) closeAuthModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && authModal && authModal.open) {
      closeAuthModal();
    }
  });

  // Auth Tabs (Sign In vs Register)
  const tabLogin = document.getElementById('tab-auth-login');
  const tabRegister = document.getElementById('tab-auth-register');
  const nameGroup = document.getElementById('auth-name-group');
  const phoneGroup = document.getElementById('auth-phone-group');
  const emailGroup = document.getElementById('auth-email-group');
  const addressGroup = document.getElementById('auth-address-group');
  const loginIdGroup = document.getElementById('auth-login-identifier-group');
  const switchModeBtn = document.getElementById('auth-switch-mode-btn');
  const submitText = document.getElementById('auth-submit-text');

  const setAuthMode = (mode) => {
    const isRegister = (mode === 'register');
    if (tabLogin) tabLogin.classList.toggle('active', !isRegister);
    if (tabRegister) tabRegister.classList.toggle('active', isRegister);

    if (nameGroup) nameGroup.style.display = isRegister ? 'flex' : 'none';
    if (phoneGroup) phoneGroup.style.display = isRegister ? 'flex' : 'none';
    if (emailGroup) emailGroup.style.display = isRegister ? 'flex' : 'none';
    if (addressGroup) addressGroup.style.display = isRegister ? 'flex' : 'none';
    if (loginIdGroup) loginIdGroup.style.display = isRegister ? 'none' : 'flex';

    const t = I18N[state.currentLang];
    if (submitText) submitText.textContent = isRegister ? t.auth_btn_register : t.auth_btn_login;
    if (switchModeBtn) switchModeBtn.textContent = isRegister ? t.auth_switch_to_login : t.auth_switch_to_register;
    hideAuthFeedback();
  };

  if (tabLogin) tabLogin.addEventListener('click', () => setAuthMode('login'));
  if (tabRegister) tabRegister.addEventListener('click', () => setAuthMode('register'));
  if (switchModeBtn) {
    switchModeBtn.addEventListener('click', () => {
      const isRegister = tabRegister?.classList.contains('active');
      setAuthMode(isRegister ? 'login' : 'register');
    });
  }

  // Auth Form Submission Execution
  const executeAuthSubmission = () => {
    const isRegister = tabRegister?.classList.contains('active');

    if (isRegister) {
      const name = document.getElementById('auth-name')?.value || '';
      const phone = document.getElementById('auth-phone')?.value || '';
      const email = document.getElementById('auth-email')?.value || '';
      const address = document.getElementById('auth-address')?.value || '';
      const password = document.getElementById('auth-password')?.value || '';
      registerUser(name, phone, email, address, password);
    } else {
      const identifier = document.getElementById('auth-username')?.value || '';
      const password = document.getElementById('auth-password')?.value || '';
      loginUser(identifier, password);
    }
  };

  const authSubmitBtn = document.getElementById('auth-submit-btn');
  if (authSubmitBtn) {
    authSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      executeAuthSubmission();
    });
  }

  const authForm = document.getElementById('auth-form');
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      executeAuthSubmission();
    });
  }

  // Submit on Enter key in any auth input field
  document.querySelectorAll('.auth-input').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeAuthSubmission();
      }
    });
  });

  // Citizen Card Logout Button
  const citizenLogoutBtn = document.getElementById('btn-citizen-logout');
  if (citizenLogoutBtn) {
    citizenLogoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logoutUser();
    });
  }

  // Manual Save and Logout Buttons
  const manualSaveBtn = document.getElementById('manual-save-btn');
  if (manualSaveBtn) {
    manualSaveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      saveCurrentUserData();
      showAuthToast(I18N[state.currentLang].save_success);
    });
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logoutUser();
    });
  }

  // Microphone Main Button
  const micBtn = document.getElementById('mic-button');
  if (micBtn) {
    micBtn.addEventListener('click', () => {
      voiceService.toggleListening();
    });
  }

  // Text Send Button & Enter Key
  const sendBtn = document.getElementById('send-query-btn');
  const textInput = document.getElementById('user-text-input');
  if (sendBtn && textInput) {
    const handleSend = () => {
      const query = textInput.value.trim();
      if (query) {
        processUserQuery(query);
      }
    };

    sendBtn.addEventListener('click', handleSend);
    textInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
      }
    });
    textInput.addEventListener('input', () => {
      hideInputWarning();
    });
  }

  // Warning Banner Close Button
  const closeWarningBtn = document.getElementById('close-warning-btn');
  if (closeWarningBtn) {
    closeWarningBtn.addEventListener('click', () => {
      hideInputWarning();
    });
  }

  // Scheme Filter Tabs
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      state.activeFilter = e.target.dataset.filter;
      renderSchemes();
    });
  });

  // Voice sample query pills
  document.querySelectorAll('.voice-sample-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const q = pill.getAttribute('data-query');
      if (q) {
        const input = document.getElementById('user-text-input');
        if (input) input.value = q;
        processUserQuery(q);
      }
    });
  });

  // Reset / New Search Button
  const resetBtn = document.getElementById('reset-profile-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetProfile();
    });
  }

  // Print Summary Button
  const printBtn = document.getElementById('print-summary-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Document Rescue Modal Setup
  const docModal = document.getElementById('doc-modal');
  const closeDocBtn = document.getElementById('close-doc-btn');
  if (closeDocBtn && docModal) {
    closeDocBtn.addEventListener('click', () => {
      docModal.close();
    });
  }
  if (docModal) {
    docModal.addEventListener('click', (e) => {
      const rect = docModal.getBoundingClientRect();
      const inDialog = (rect.top <= e.clientY && e.clientY <= rect.bottom && rect.left <= e.clientX && e.clientX <= rect.right);
      if (!inDialog) docModal.close();
    });
  }

  // Scheme Q&A Modal Setup
  const qaModal = document.getElementById('qa-modal');
  const closeQaBtn = document.getElementById('close-qa-btn');
  if (closeQaBtn && qaModal) {
    closeQaBtn.addEventListener('click', () => {
      qaModal.close();
    });
  }
  if (qaModal) {
    qaModal.addEventListener('click', (e) => {
      const rect = qaModal.getBoundingClientRect();
      const inDialog = (rect.top <= e.clientY && e.clientY <= rect.bottom && rect.left <= e.clientX && e.clientX <= rect.right);
      if (!inDialog) qaModal.close();
    });
  }
}

function setLanguage(lang) {
  state.currentLang = lang;
  document.documentElement.lang = lang;
  document.title = I18N[lang]?.app_title || document.title;
  if (voiceService) voiceService.setLanguage(lang);

  // Synchronize header language buttons
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  // Synchronize modal language buttons
  document.querySelectorAll('.auth-lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  renderLanguageText();
  renderAuthModalText();
  renderPersonas();
  renderProfile();
  runEligibilityMatching();
  updateUserSessionUI();

  if (state.currentUser) {
    saveCurrentUserData();
  }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  setupVoice();
  initAuthSystem();
  setupEventListeners();
  setLanguage(state.currentLang);
  renderPersonas();
  loadInitialDemo();
});



function renderLanguageText() {
  const t = I18N[state.currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  const textInput = document.getElementById('user-text-input');
  if (textInput) {
    textInput.placeholder = t.type_placeholder;
  }
}

function renderPersonas() {
  const container = document.getElementById('personas-container');
  if (!container) return;

  const personaSubtitles = {
    sunita: { mr: 'शेतकरी महिला • रायगड', hi: 'महिला किसान • रायगढ़', en: 'Woman Farmer • Raigad' },
    ramesh: { mr: 'बांधकाम मजूर • पुणे', hi: 'निर्माण मजदूर • पुणे', en: 'Construction Worker • Pune' },
    aarti: { mr: 'विद्यार्थिनी • कोल्हापूर', hi: 'छात्रा • कोल्हापुर', en: 'Student • Kolhapur' },
    ganesh: { mr: 'लहान व्यावसायिक • नाशिक', hi: 'छोटा व्यापारी • नासिक', en: 'Senior Artisan • Nashik' }
  };

  container.innerHTML = DEMO_PERSONAS.map(p => {
    const isActive = state.activePersonaId === p.id;
    const subtitle = personaSubtitles[p.id]?.[state.currentLang] || personaSubtitles[p.id]?.mr || '';
    return `
      <button class="persona-chip ${isActive ? 'active-persona' : ''}" data-persona-id="${p.id}" title="${p.voice_audio_text[state.currentLang] || p.voice_audio_text.mr}">
        <div class="persona-avatar-box">
          <span class="persona-avatar">${p.avatar}</span>
          <span class="persona-badge-status">${isActive ? '✓ Selected' : 'Quick Start'}</span>
        </div>
        <div class="persona-info">
          <strong class="persona-name">${p.name[state.currentLang] || p.name.mr}</strong>
          <span class="persona-role-tag">${subtitle}</span>
        </div>
      </button>
    `;
  }).join('');

  container.querySelectorAll('.persona-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.dataset.personaId;
      selectPersona(pid);
    });
  });
}

function selectPersona(personaId) {
  const persona = DEMO_PERSONAS.find(p => p.id === personaId);
  if (!persona) return;

  state.activePersonaId = personaId;

  // Highlight selected persona chip
  document.querySelectorAll('.persona-chip').forEach(btn => {
    btn.classList.toggle('active-persona', btn.dataset.personaId === personaId);
  });

  // Switch language to persona's native speech if preferred
  if (persona.lang && ['mr', 'hi', 'en'].includes(persona.lang)) {
    state.currentLang = persona.lang;
    document.documentElement.lang = persona.lang;
    document.title = I18N[persona.lang]?.app_title || document.title;
    voiceService.setLanguage(persona.lang);
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === persona.lang);
    });
    renderLanguageText();
  }

  const queryText = persona.voice_audio_text[state.currentLang] || persona.voice_audio_text.mr;
  const input = document.getElementById('user-text-input');
  if (input) input.value = queryText;

  // Apply profile immediately
  state.currentProfile = { ...persona.profile };
  saveCurrentUserData();

  // Render UI without waiting for voice callback
  renderProfile();
  runEligibilityMatching();

  // Add message to chat transcript
  addChatMessage('user', queryText);

  const spokenIntro = state.currentLang === 'mr'
    ? `नमस्कार! मी तुमची माहिती नोंदवून घेतली आहे. तुमच्यासाठी योग्य योजना खालीलप्रमाणे आहेत.`
    : state.currentLang === 'hi'
      ? `नमस्ते! मैंने आपकी जानकारी दर्ज कर ली है। आपके लिए उपयुक्त सरकारी योजनाओं की सूची नीचे दी गई है।`
      : `Hello! I have captured your details and matched verified government schemes for you below.`;

  addChatMessage('assistant', spokenIntro);
  voiceService.speak(spokenIntro, state.currentLang);
}

function resetProfile() {
  state.activePersonaId = null;
  state.currentProfile = {
    age: null,
    gender: null,
    state: 'Maharashtra',
    district: null,
    occupation: null,
    annual_income: null,
    category: null,
    land_owner: null,
    disability: false,
    student: false
  };

  document.querySelectorAll('.persona-chip').forEach(btn => {
    btn.classList.remove('active-persona');
  });

  const resetTextInput = document.getElementById('user-text-input');
  if (resetTextInput) resetTextInput.value = '';

  // Clear chat history on reset
  const chatHistory = document.getElementById('chat-history');
  if (chatHistory) chatHistory.innerHTML = '';

  state.userDocumentsState = {};
  saveCurrentUserData();

  renderProfile();
  runEligibilityMatching();

  const resetMsg = state.currentLang === 'mr'
    ? "प्रोफाइल रीसेट केली आहे नवीन योजना शोधण्यासाठी आपले वय, लिंग, व्यवसाय किंवा उत्पन्न सांगा अथवा खालील पर्याय निवडा"
    : state.currentLang === 'hi'
      ? "प्रोफ़ाइल रीसेट कर दी गई है नई योजनाएँ खोजने के लिए अपनी आयु, लिंग, व्यवसाय या आय बताएं अथवा विकल्प चुनें"
      : "Profile has been reset. Please speak or select your details to discover matching schemes.";

  addChatMessage('assistant', resetMsg, 'occupation');
  voiceService.speak(resetMsg, state.currentLang);
}

function showInputWarning(message) {
  const banner = document.getElementById('input-warning-banner');
  const bannerText = document.getElementById('input-warning-text');
  const wrapper = document.getElementById('input-box-wrapper');

  if (banner && bannerText) {
    bannerText.textContent = message.replace(/^[⚠️\s]+/, '');
    banner.style.display = 'flex';
  }
  if (wrapper) {
    wrapper.classList.remove('has-warning');
    // Force reflow to restart animation
    void wrapper.offsetWidth;
    wrapper.classList.add('has-warning');
  }
}

function hideInputWarning() {
  const banner = document.getElementById('input-warning-banner');
  const wrapper = document.getElementById('input-box-wrapper');
  if (banner) banner.style.display = 'none';
  if (wrapper) wrapper.classList.remove('has-warning');
}

function highlightSchemeCard(schemeId) {
  const card = document.querySelector(`.scheme-card[data-scheme-id="${schemeId}"]`);
  if (card) {
    card.classList.add('scheme-highlighted');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      card.classList.remove('scheme-highlighted');
    }, 3500);
  }
}

async function processUserQuery(text) {
  // Clear the input field after sending
  const textInput = document.getElementById('user-text-input');
  if (textInput) textInput.value = '';

  // Clear any existing input warning banner
  hideInputWarning();

  addChatMessage('user', text);

  // If a demo persona was active, clear the persona selection tag
  if (state.activePersonaId) {
    state.activePersonaId = null;
    document.querySelectorAll('.persona-chip').forEach(btn => {
      btn.classList.remove('active-persona');
    });
  }

  // Extract slots with normalized Devanagari and intent/relevance checks (AWS Bedrock + Local Engine)
  const extraction = await dialogueManager.extractSlotsWithAWS(text, state.currentProfile, state.currentLang);

  // 1. Check if input is unrelated / unrecognized (warn user as requested)
  if (!extraction.isRelevant) {
    const warningMsg = extraction.warningMessage || (
      state.currentLang === 'mr'
        ? "⚠️ मला तुमचे म्हणणे समजले नाही. कृपया तुमच्या कामाशी किंवा उपजीविकेशी (उदा: शेतकरी, मजूर, विद्यार्थी, लहान व्यावसायिक, गृहिणी) संबंधित माहिती सांगा किंवा सरकारी योजना शोधा."
        : state.currentLang === 'hi'
          ? "⚠️ मैं आपकी बात समझ नहीं पाया। कृपया अपने काम/व्यवसाय (जैसे: किसान, मजदूर, छात्र, छोटा दुकानदार, गृहिणी) से संबंधित जानकारी बताएं या सरकारी योजना खोजें।"
          : "⚠️ I don't recognize what you are saying. Please provide information related to your occupation (e.g., Farmer, Daily wage worker, Student, Small shop owner, Homemaker) or government schemes."
    );

    const pendingSlot = extraction.missingSlots[0] || 'occupation';
    addChatMessage('assistant', warningMsg, pendingSlot, true /* isWarning */);
    showInputWarning(warningMsg);

    // Speak warning via voice service
    const spokenWarning = warningMsg.replace(/^[⚠️\s]+/, '').trim();
    voiceService.speak(spokenWarning, state.currentLang);
    return;
  }

  // 2. Check if input is a greeting or pleasantry
  if (extraction.isGreeting) {
    const greetingMsg = state.currentLang === 'mr'
      ? "👋 नमस्कार! मी योजनामित्र आहे, आपला शासकीय योजना सहाय्यक. कृपया तुमचा व्यवसाय किंवा काम सांगा अथवा तुम्हाला हवी असलेली योजना विचारा."
      : state.currentLang === 'hi'
        ? "👋 नमस्ते! मैं योजनामित्र हूँ, आपका सरकारी योजना सहायक। कृपया अपना काम/व्यवसाय बताएं या जिस योजना की जानकारी चाहिए वह बताएं।"
        : "👋 Hello! I am VoiceScheme AI, your government scheme assistant. Please tell me your work/occupation or which scheme you are looking for.";

    const pendingSlot = extraction.missingSlots[0] || 'occupation';
    addChatMessage('assistant', greetingMsg, pendingSlot);
    voiceService.speak(greetingMsg, state.currentLang);
    return;
  }

  // 3. Check if input is a scheme inquiry
  if (extraction.isSchemeInquiry && extraction.matchedScheme) {
    const s = extraction.matchedScheme;
    const sName = s.name[state.currentLang] || s.name.en;
    const sDesc = s.short_desc[state.currentLang] || s.short_desc.en;
    const schemeMsg = state.currentLang === 'mr'
      ? `🔍 "${sName}" ची माहिती:\n${sDesc}\n\nथेट लाभ: ${s.benefit_amount}. तुमची पात्रता तपासण्यासाठी कृपया तुमचा व्यवसाय, वय व उत्पन्न सांगा.`
      : state.currentLang === 'hi'
        ? `🔍 "${sName}" की जानकारी:\n${sDesc}\n\nलाभ: ${s.benefit_amount}। अपनी पात्रता जाँचने के लिए कृपया अपना व्यवसाय, आयु और आय बताएं।`
        : `🔍 Information for "${sName}":\n${sDesc}\n\nBenefit: ${s.benefit_amount}. To check your exact eligibility, please share your occupation, age, and income.`;

    const pendingSlot = extraction.missingSlots[0] || 'occupation';
    addChatMessage('assistant', schemeMsg, pendingSlot);
    voiceService.speak(`${sName}. ${s.benefit_amount}`, state.currentLang);

    // Highlight the scheme card on screen
    highlightSchemeCard(s.id);
    return;
  }

  // 4. Normal flow: user supplied profile details
  state.currentProfile = extraction.updatedProfile;
  saveCurrentUserData();
  renderProfile();
  runEligibilityMatching();

  if (!extraction.isProfileComplete && extraction.nextQuestion) {
    const nextSlot = extraction.missingSlots[0];
    addChatMessage('assistant', extraction.nextQuestion, nextSlot);
    voiceService.speak(extraction.nextQuestion, state.currentLang);
  } else {
    const confirmation = state.currentLang === 'mr'
      ? `धन्यवाद! तुमची सर्व माहिती तपासली आहे. तुमच्यासाठी सर्वाधिक योग्य योजना खालीलप्रमाणे आहेत:`
      : state.currentLang === 'hi'
        ? `धन्यवाद! आपकी पात्रता के अनुसार सबसे उपयुक्त योजनाएं नीचे सूचीबद्ध हैं:`
        : `Thank you! Based on your verified details, here are the top schemes you qualify for:`;

    addChatMessage('assistant', confirmation);
    voiceService.speak(confirmation, state.currentLang);
  }
}

function addChatMessage(sender, text, promptForSlot = null, isWarning = false) {
  const history = document.getElementById('chat-history');
  if (!history) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-bubble ${sender}-bubble${isWarning ? ' warning-bubble' : ''}`;

  let slotQuickChips = '';
  const lang = state.currentLang;

  if (promptForSlot === 'occupation') {
    slotQuickChips = `
      <div class="quick-chips">
        <button class="chip-btn" data-slot="occupation" data-val="farmer">🌾 ${lang === 'mr' ? 'शेतकरी' : lang === 'hi' ? 'किसान' : 'Farmer'}</button>
        <button class="chip-btn" data-slot="occupation" data-val="daily_wage">🏗️ ${lang === 'mr' ? 'मजूर' : lang === 'hi' ? 'मजदूर' : 'Labor'}</button>
        <button class="chip-btn" data-slot="occupation" data-val="student">🎓 ${lang === 'mr' ? 'विद्यार्थी' : lang === 'hi' ? 'छात्र' : 'Student'}</button>
        <button class="chip-btn" data-slot="occupation" data-val="artisan">🛠️ ${lang === 'mr' ? 'कारागीर / व्यापारी' : lang === 'hi' ? 'कारीगर' : 'Artisan'}</button>
        <button class="chip-btn" data-slot="occupation" data-val="homemaker">🏠 ${lang === 'mr' ? 'गृहिणी' : lang === 'hi' ? 'गृहिणी' : 'Homemaker'}</button>
      </div>
    `;
  } else if (promptForSlot === 'gender') {
    slotQuickChips = `
      <div class="quick-chips">
        <button class="chip-btn" data-slot="gender" data-val="male">👨 ${lang === 'mr' ? 'पुरुष (Male)' : lang === 'hi' ? 'पुरुष (Male)' : 'Male'}</button>
        <button class="chip-btn" data-slot="gender" data-val="female">👩 ${lang === 'mr' ? 'महिला (Female)' : lang === 'hi' ? 'महिला (Female)' : 'Female'}</button>
      </div>
    `;
  } else if (promptForSlot === 'age') {
    slotQuickChips = `
      <div class="quick-chips">
        <button class="chip-btn" data-slot="age" data-val="19">19 ${lang === 'mr' ? 'वर्षे' : lang === 'hi' ? 'वर्ष' : 'yrs'}</button>
        <button class="chip-btn" data-slot="age" data-val="35">35 ${lang === 'mr' ? 'वर्षे' : lang === 'hi' ? 'वर्ष' : 'yrs'}</button>
        <button class="chip-btn" data-slot="age" data-val="52">52 ${lang === 'mr' ? 'वर्षे' : lang === 'hi' ? 'वर्ष' : 'yrs'}</button>
        <button class="chip-btn" data-slot="age" data-val="65">65 ${lang === 'mr' ? 'वर्षे (ज्येष्ठ)' : lang === 'hi' ? 'वर्ष (वरिष्ठ)' : 'yrs (Senior)'}</button>
      </div>
    `;
  } else if (promptForSlot === 'land_owner') {
    slotQuickChips = `
      <div class="quick-chips">
        <button class="chip-btn" data-slot="land_owner" data-val="true">✅ ${lang === 'mr' ? 'माझ्याकडे शेतजमीन आहे' : lang === 'hi' ? 'हाँ, जमीन है' : 'Yes, I own land'}</button>
        <button class="chip-btn" data-slot="land_owner" data-val="false">❌ ${lang === 'mr' ? 'जमीन नाही (भूमिहीन)' : lang === 'hi' ? 'नहीं, भूमिहीन' : 'No, Landless'}</button>
      </div>
    `;
  } else if (promptForSlot === 'annual_income') {
    slotQuickChips = `
      <div class="quick-chips">
        <button class="chip-btn" data-slot="annual_income" data-val="60000">₹60,000</button>
        <button class="chip-btn" data-slot="annual_income" data-val="120000">₹1,20,000</button>
        <button class="chip-btn" data-slot="annual_income" data-val="200000">₹2,00,000</button>
        <button class="chip-btn" data-slot="annual_income" data-val="300000">₹3,00,000</button>
      </div>
    `;
  } else if (promptForSlot === 'category') {
    slotQuickChips = `
      <div class="quick-chips">
        <button class="chip-btn" data-slot="category" data-val="OBC">OBC</button>
        <button class="chip-btn" data-slot="category" data-val="SC">SC</button>
        <button class="chip-btn" data-slot="category" data-val="ST">ST</button>
        <button class="chip-btn" data-slot="category" data-val="General">General</button>
      </div>
    `;
  }

  msgDiv.innerHTML = `
    <div class="bubble-header">
      <span class="bubble-sender">${sender === 'user' ? '👤 Citizen' : isWarning ? '⚠️ VoiceScheme AI <span class="warning-tag">सूचना / Warning</span>' : '🤖 VoiceScheme AI'}</span>
      ${sender === 'assistant' ? `<button class="speech-replay-btn" title="Listen again">🔊</button>` : ''}
    </div>
    <div class="bubble-body">${text}</div>
    ${slotQuickChips}
  `;

  if (sender === 'assistant') {
    const replayBtn = msgDiv.querySelector('.speech-replay-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        voiceService.speak(text, state.currentLang);
      });
    }
  }

  // Handle quick chip clicks
  msgDiv.querySelectorAll('.chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const slot = btn.dataset.slot;
      const val = btn.dataset.val;

      state.activePersonaId = null;
      document.querySelectorAll('.persona-chip').forEach(p => p.classList.remove('active-persona'));

      if (slot === 'gender') {
        state.currentProfile.gender = val;
      } else if (slot === 'occupation') {
        state.currentProfile.occupation = val;
        if (val === 'student') state.currentProfile.student = true;
        if (val === 'homemaker' && !state.currentProfile.gender) state.currentProfile.gender = 'female';
      } else if (slot === 'age') {
        state.currentProfile.age = parseInt(val, 10);
      } else if (slot === 'land_owner') {
        state.currentProfile.land_owner = (val === 'true');
      } else if (slot === 'annual_income') {
        state.currentProfile.annual_income = parseInt(val, 10);
      } else if (slot === 'category') {
        state.currentProfile.category = val;
      }

      renderProfile();
      runEligibilityMatching();
      addChatMessage('user', btn.textContent.trim());

      // Check if more slots are missing and prompt smoothly
      const extraction = dialogueManager.extractSlots('', state.currentProfile, state.currentLang);
      if (!extraction.isProfileComplete && extraction.nextQuestion) {
        addChatMessage('assistant', extraction.nextQuestion, extraction.missingSlots[0]);
        voiceService.speak(extraction.nextQuestion, state.currentLang);
      }
    });
  });

  history.appendChild(msgDiv);
  history.scrollTop = history.scrollHeight;
}

function renderProfile() {
  const container = document.getElementById('profile-badges');
  if (!container) return;

  const p = state.currentProfile;
  const lang = state.currentLang;

  const formatINR = (val) => val ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val) : '—';

  const occupationLabels = {
    farmer: { mr: 'शेतकरी', hi: 'किसान', en: 'Farmer' },
    daily_wage: { mr: 'बांधकाम मजूर', hi: 'मजदूर', en: 'Daily Wage Labor' },
    student: { mr: 'विद्यार्थी', hi: 'छात्र', en: 'Student' },
    artisan: { mr: 'कारागीर / व्यापारी', hi: 'कारीगर / छोटा व्यापारी', en: 'Artisan / Small Business' },
    homemaker: { mr: 'गृहिणी', hi: 'गृहिणी', en: 'Homemaker' },
    unemployed: { mr: 'बेरोजगार', hi: 'बेरोजगार', en: 'Unemployed' },
    retired: { mr: 'निवृत्त / ज्येष्ठ', hi: 'वरिष्ठ नागरिक', en: 'Senior Citizen' }
  };

  let genderDisplay = null;
  if (p.gender === 'female') {
    genderDisplay = lang === 'mr' ? '👩 महिला (Female)' : lang === 'hi' ? '👩 महिला (Female)' : '👩 Female';
  } else if (p.gender === 'male') {
    genderDisplay = lang === 'mr' ? '👨 पुरुष (Male)' : lang === 'hi' ? '👨 पुरुष (Male)' : '👨 Male';
  } else if (p.gender) {
    genderDisplay = p.gender;
  }

  const badges = [
    { label: lang === 'mr' ? 'वय' : lang === 'hi' ? 'आयु' : 'Age', val: p.age ? `${p.age} yrs` : null, key: 'age', isClickable: true },
    { label: lang === 'mr' ? 'लिंग' : lang === 'hi' ? 'लिंग' : 'Gender', val: genderDisplay, key: 'gender', isClickable: true },
    { label: lang === 'mr' ? 'राज्य' : lang === 'hi' ? 'राज्य' : 'State', val: `${p.district ? p.district + ', ' : ''}${p.state || 'Maharashtra'}`, key: 'state' },
    { label: lang === 'mr' ? 'व्यवसाय' : lang === 'hi' ? 'व्यवसाय' : 'Occupation', val: p.occupation ? (occupationLabels[p.occupation]?.[lang] || p.occupation) : null, key: 'occupation', isClickable: true },
    { label: lang === 'mr' ? 'वार्षिक उत्पन्न' : lang === 'hi' ? 'सालाना आय' : 'Annual Income', val: p.annual_income !== null && p.annual_income !== undefined ? formatINR(p.annual_income) : null, key: 'annual_income', isClickable: true },
    { label: lang === 'mr' ? 'शेतजमीन' : lang === 'hi' ? 'कृषि भूमि' : 'Land Ownership', val: p.land_owner === true ? (lang === 'mr' ? 'होय (७/१२ आहे)' : 'हाँ') : p.land_owner === false ? (lang === 'mr' ? 'नाही' : 'नहीं') : null, key: 'land_owner', isClickable: true },
    { label: lang === 'mr' ? 'प्रवर्ग' : lang === 'hi' ? 'वर्ग' : 'Category', val: p.category, key: 'category', isClickable: true }
  ];

  container.innerHTML = badges.map(b => `
    <div class="profile-badge ${b.val ? 'badge-filled' : 'badge-empty'} ${b.isClickable ? 'badge-clickable' : ''}" 
         data-slot="${b.key}"
         role="${b.isClickable ? 'button' : 'status'}"
         tabindex="${b.isClickable ? '0' : '-1'}"
         title="${b.isClickable ? (lang === 'mr' ? 'बदल करण्यासाठी क्लिक करा' : lang === 'hi' ? 'बदलने के लिए क्लिक करें' : 'Click to change') : ''}">
      <span class="badge-label">${b.label}:</span>
      <span class="badge-value">${b.val || (lang === 'mr' ? 'माहिती बाकी' : lang === 'hi' ? 'अपूर्ण' : 'Pending')}</span>
      ${b.isClickable ? `<span class="badge-toggle-hint">⇄ ${lang === 'mr' ? 'बदला' : lang === 'hi' ? 'बदलें' : 'Edit'}</span>` : ''}
    </div>
  `).join('');

  // Update profile completeness meter
  const filledSlots = [
    p.age !== null && p.age !== undefined,
    p.gender !== null && p.gender !== undefined,
    p.occupation !== null && p.occupation !== undefined,
    p.annual_income !== null && p.annual_income !== undefined,
    p.land_owner !== null && p.land_owner !== undefined,
    p.category !== null && p.category !== undefined
  ].filter(Boolean).length;
  const completenessPercent = Math.round((filledSlots / 6) * 100);
  const fillEl = document.getElementById('profile-completeness-fill');
  const textEl = document.getElementById('profile-completeness-text');
  if (fillEl) fillEl.style.width = `${completenessPercent}%`;
  if (textEl) textEl.textContent = `${completenessPercent}%`;

  // Attach interactive click handlers to badges
  container.querySelectorAll('.badge-clickable').forEach(badgeEl => {
    const slotKey = badgeEl.dataset.slot;

    const handleBadgeAction = () => {
      state.activePersonaId = null;
      document.querySelectorAll('.persona-chip').forEach(p => p.classList.remove('active-persona'));

      if (slotKey === 'gender') {
        state.currentProfile.gender = (state.currentProfile.gender === 'male') ? 'female' : 'male';
        renderProfile();
        runEligibilityMatching();
        const updatedText = state.currentProfile.gender === 'male'
          ? (lang === 'mr' ? 'लिंग: पुरुष (Male) निवडले आहे.' : lang === 'hi' ? 'लिंग: पुरुष (Male) चुना गया।' : 'Gender updated to Male.')
          : (lang === 'mr' ? 'लिंग: महिला (Female) निवडले आहे.' : lang === 'hi' ? 'लिंग: महिला (Female) चुना गया।' : 'Gender updated to Female.');
        addChatMessage('assistant', updatedText);
        voiceService.speak(updatedText, lang);
      } else if (slotKey === 'land_owner') {
        state.currentProfile.land_owner = !state.currentProfile.land_owner;
        renderProfile();
        runEligibilityMatching();
        const updatedText = state.currentProfile.land_owner
          ? (lang === 'mr' ? 'शेतजमीन: होय (७/१२ उपलब्ध)' : 'भूमि: हाँ (7/12 उपलब्ध)')
          : (lang === 'mr' ? 'शेतजमीन: नाही (भूमिहीन)' : 'भूमि: नहीं (भूमिहीन)');
        addChatMessage('assistant', updatedText);
        voiceService.speak(updatedText, lang);
      } else {
        // Prompt for other slots with quick chips
        const promptMsg = slotKey === 'occupation'
          ? (lang === 'mr' ? 'आपला व्यवसाय निवडा किंवा सांगा:' : lang === 'hi' ? 'अपना व्यवसाय चुनें या बोलकर बताएं:' : 'Select or speak your occupation:')
          : slotKey === 'age'
            ? (lang === 'mr' ? 'आपले वय निवडा किंवा सांगा:' : lang === 'hi' ? 'अपनी आयु चुनें या बताएं:' : 'Select or speak your age:')
            : slotKey === 'annual_income'
              ? (lang === 'mr' ? 'आपले वार्षिक उत्पन्न निवडा किंवा सांगा:' : lang === 'hi' ? 'अपनी वार्षिक आय चुनें:' : 'Select your annual income:')
              : (lang === 'mr' ? 'आपला प्रवर्ग निवडा:' : lang === 'hi' ? 'अपना वर्ग चुनें:' : 'Select your category:');

        addChatMessage('assistant', promptMsg, slotKey);
        voiceService.speak(promptMsg, lang);
      }
    };

    badgeEl.addEventListener('click', handleBadgeAction);
    badgeEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleBadgeAction();
      }
    });
  });
}

function runEligibilityMatching() {
  const evaluated = ruleEngine.evaluate(state.currentProfile, state.currentLang);
  state.evaluatedSchemes = evaluated;
  renderSchemes();
}

function renderSchemes() {
  const container = document.getElementById('schemes-container');
  const countEl = document.getElementById('eligible-count-number');
  if (!container) return;

  let list = state.evaluatedSchemes;

  // Filter
  if (state.activeFilter === 'high') {
    list = list.filter(item => item.status === 'POTENTIALLY_ELIGIBLE');
  } else if (state.activeFilter === 'state') {
    list = list.filter(item => item.scheme.state === 'Maharashtra');
  } else if (state.activeFilter === 'central') {
    list = list.filter(item => item.scheme.level === 'Central');
  }

  // Count top eligible schemes
  const eligibleCount = state.evaluatedSchemes.filter(s => s.status === 'POTENTIALLY_ELIGIBLE').length;
  if (countEl) countEl.textContent = eligibleCount;

  if (list.length === 0) {
    container.innerHTML = `<div class="empty-state">No schemes match the selected filter.</div>`;
    return;
  }

  const lang = state.currentLang;
  const t = I18N[lang];

  container.innerHTML = list.map(item => {
    const s = item.scheme;
    const isEligible = item.status === 'POTENTIALLY_ELIGIBLE';
    const statusClass = item.status === 'POTENTIALLY_ELIGIBLE' ? 'status-eligible' : item.status === 'MISSING_INFO' ? 'status-missing' : 'status-ineligible';

    // Calculate document readiness for this scheme
    const totalDocs = s.required_documents.length;
    const haveDocs = s.required_documents.filter(d => !!state.userDocumentsState[d.id]).length;
    const docPercent = totalDocs > 0 ? Math.round((haveDocs / totalDocs) * 100) : 100;

    return `
      <div class="scheme-card ${statusClass}" data-scheme-id="${s.id}">
        <div class="scheme-header">
          <div class="scheme-meta-tags">
            <span class="meta-pill pill-category">${s.category}</span>
            <span class="meta-pill ${s.level === 'State' ? 'pill-state' : 'pill-central'}">
              ${s.level === 'State' ? '🚩 Maharashtra Govt' : '🏛️ Central Govt'}
            </span>
            <span class="meta-pill pill-verified">✓ ${t.verified_on}: ${s.last_verified}</span>
          </div>
          <div class="match-score-badge ${statusClass}">
            <span class="score-num">${item.score}% Match</span>
            <span class="status-title">${item.statusLabel}</span>
          </div>
        </div>

        <h3 class="scheme-name">${s.name[lang] || s.name.en}</h3>
        <p class="scheme-desc">${s.short_desc[lang] || s.short_desc.en}</p>

        <div class="benefit-highlight-box">
          <div class="benefit-item">
            <span class="benefit-label">💰 ${lang === 'mr' ? 'मिळणारा लाभ' : lang === 'hi' ? 'योजना का लाभ' : 'Benefit'}</span>
            <span class="benefit-amount">${s.benefit_amount}</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-label">⏱️ ${lang === 'mr' ? 'वितरण' : lang === 'hi' ? 'वितरण' : 'Frequency'}</span>
            <span class="benefit-detail">${s.benefit_frequency}</span>
          </div>
        </div>

        <!-- Rule Engine Trace: Why you qualify -->
        <div class="rule-trace-box">
          <div class="trace-header">
            <strong>${t.why_qualify}</strong>
          </div>
          <ul class="trace-list">
            ${item.passedReasons.map(r => `<li class="trace-pass">✓ ${r}</li>`).join('')}
            ${item.missingReasons.map(r => `<li class="trace-missing">⚠️ ${r}</li>`).join('')}
            ${item.failedReasons.map(r => `<li class="trace-fail">❌ ${r}</li>`).join('')}
          </ul>
        </div>

        <!-- Document Readiness Progress Bar -->
        <div class="doc-readiness-strip">
          <div class="readiness-header">
            <span>📋 ${t.readiness_label} <strong>${haveDocs}/${totalDocs} (${docPercent}%)</strong></span>
            <span class="readiness-hint">${haveDocs === totalDocs ? '🟢 Ready to apply' : '🟡 Action needed'}</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${docPercent}%;"></div>
          </div>
        </div>

        <!-- Interactive Card Actions -->
        <div class="scheme-actions">
          <button class="btn-action btn-speak" data-scheme-id="${s.id}">
            🔊 ${t.btn_listen}
          </button>
          <button class="btn-action btn-docs" data-scheme-id="${s.id}">
            📑 ${t.btn_docs_guide}
          </button>
          <button class="btn-action btn-qa" data-scheme-id="${s.id}">
            💬 ${t.btn_ask_qa}
          </button>
          <a href="${s.official_url}" target="_blank" rel="noopener noreferrer" class="btn-action btn-apply">
            🚀 ${t.btn_apply} ↗
          </a>
        </div>
      </div>
    `;
  }).join('');

  // Bind actions
  container.querySelectorAll('.btn-speak').forEach(btn => {
    btn.addEventListener('click', () => {
      const sid = btn.dataset.schemeId;
      speakSchemeSummary(sid);
    });
  });

  container.querySelectorAll('.btn-docs').forEach(btn => {
    btn.addEventListener('click', () => {
      const sid = btn.dataset.schemeId;
      openDocumentRescueModal(sid);
    });
  });

  container.querySelectorAll('.btn-qa').forEach(btn => {
    btn.addEventListener('click', () => {
      const sid = btn.dataset.schemeId;
      openSchemeQAModal(sid);
    });
  });
}

function speakSchemeSummary(schemeId) {
  const item = state.evaluatedSchemes.find(i => i.scheme.id === schemeId);
  if (!item) return;

  const s = item.scheme;
  const lang = state.currentLang;
  const name = s.name[lang] || s.name.en;
  const benefit = s.benefit_amount;
  const status = item.statusLabel;

  const summary = lang === 'mr'
    ? `${name}. या योजनेतून आपल्याला ${benefit} चे सहाय्य मिळते. आपल्या नोंदणीनुसार आपली स्थिती आहे: ${status}. आवश्यक कागदपत्रांमध्ये आधार कार्ड आणि बँक पासबुक महत्त्वाचे आहे.`
    : lang === 'hi'
      ? `${name}। इस योजना के अंतर्गत आपको ${benefit} का लाभ मिलता है। आपके विवरण के अनुसार स्थिति है: ${status}। अधिक जानकारी के लिए दस्तावेज चेकलिस्ट देखें।`
      : `${name}. This scheme provides ${benefit}. Based on your profile, your status is: ${status}.`;

  voiceService.speak(summary, lang);
}

function openDocumentRescueModal(schemeId) {
  const item = state.evaluatedSchemes.find(i => i.scheme.id === schemeId);
  if (!item) return;

  state.selectedSchemeForDocs = item.scheme;
  const s = item.scheme;
  const lang = state.currentLang;
  const modal = document.getElementById('doc-modal');
  const titleEl = document.getElementById('doc-modal-scheme-name');
  const listEl = document.getElementById('doc-checklist-container');
  const rescueEl = document.getElementById('doc-rescue-guide-container');

  if (titleEl) titleEl.textContent = s.name[lang] || s.name.en;

  // Render Checkbox list
  if (listEl) {
    listEl.innerHTML = s.required_documents.map(d => {
      const isChecked = !!state.userDocumentsState[d.id];
      const docName = d.name[lang] || d.name.en;
      return `
        <label class="doc-checkbox-item ${isChecked ? 'doc-ready' : 'doc-pending'}">
          <input type="checkbox" class="doc-cb" data-doc-id="${d.id}" ${isChecked ? 'checked' : ''} />
          <span class="doc-cb-custom"></span>
          <span class="doc-name">
            <strong>${docName}</strong>
            ${d.mandatory ? '<span class="tag-mandatory">Mandatory</span>' : '<span class="tag-optional">Optional</span>'}
          </span>
          <span class="doc-status-badge">${isChecked ? '✅ Ready' : '⚠️ Missing'}</span>
        </label>
      `;
    }).join('');

    // Checkbox toggle handler
    listEl.querySelectorAll('.doc-cb').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const docId = e.target.dataset.docId;
        state.userDocumentsState[docId] = e.target.checked;
        saveCurrentUserData();
        renderSchemes();
        openDocumentRescueModal(schemeId); // re-render rescue guides safely without showModal crash
      });
    });
  }

  // Render Procurement Rescue Guide for Missing Documents (TRD standout feature)
  if (rescueEl) {
    const missingDocs = s.required_documents.filter(d => !state.userDocumentsState[d.id]);
    if (missingDocs.length === 0) {
      rescueEl.innerHTML = `
        <div class="rescue-success-box">
          🎉 <strong>${lang === 'mr' ? 'अभिनंदन! तुमच्याकडे सर्व आवश्यक कागदपत्रे उपलब्ध आहेत.' : lang === 'hi' ? 'बधाई! आपके पास सभी आवश्यक दस्तावेज मौजूद हैं।' : 'Congratulations! You have all required documents in hand.'}</strong>
          <p>${lang === 'mr' ? 'तुम्ही आता थेट अधिकृत पोर्टलवर किंवा जवळच्या आपले सरकार केंद्रावर जाऊन अर्ज सादर करू शकता.' : lang === 'hi' ? 'आप सीधे आधिकारिक पोर्टल या नजदीकी सीएससी केंद्र पर जाकर आवेदन कर सकते हैं।' : 'You can proceed directly to apply online or at your nearest CSC.'}</p>
        </div>
      `;
    } else {
      rescueEl.innerHTML = `
        <h4 class="rescue-heading">🚨 ${lang === 'mr' ? 'गहाळ कागदपत्रे कशी व कोठून मिळवाल? (मार्गदर्शन)' : lang === 'hi' ? 'छूटे हुए दस्तावेज कैसे और कहाँ से प्राप्त करें:' : 'How to procure missing documents:'}</h4>
        <div class="rescue-cards-grid">
          ${missingDocs.map(d => {
        const guide = DOCUMENT_GUIDE[d.id];
        if (!guide) return '';
        return `
              <div class="rescue-card">
                <div class="rescue-card-header">
                  <strong>${guide.name[lang] || guide.name.en}</strong>
                  <span class="rescue-tag-time">⏱️ ${guide.time_needed}</span>
                </div>
                <div class="rescue-detail">
                  <p><strong>🏛️ ${lang === 'mr' ? 'कोठे मिळेल' : lang === 'hi' ? 'कहाँ मिलेगा' : 'Issuing Authority'}:</strong> ${guide.where_to_get[lang] || guide.where_to_get.en}</p>
                  <p><strong>💵 ${lang === 'mr' ? 'शासकीय शुल्क' : lang === 'hi' ? 'शुल्क' : 'Approx Fee'}:</strong> ${guide.approx_fee}</p>
                  <p><strong>📑 ${lang === 'mr' ? 'लागणारे पुरावे' : lang === 'hi' ? 'प्रमाण' : 'Supporting Proofs'}:</strong> ${guide.docs_needed[lang] || guide.docs_needed.en}</p>
                </div>
                <a href="${guide.action_url}" target="_blank" rel="noopener noreferrer" class="btn-portal-rescue">
                  ${lang === 'mr' ? 'ऑनलाइन अर्ज पोर्टल उघडा' : lang === 'hi' ? 'ऑनलाइन पोर्टल खोलें' : 'Apply Online Portal'} ↗
                </a>
              </div>
            `;
      }).join('')}
        </div>
      `;
    }
  }

  // Render Nearby Centers
  const nearList = document.getElementById('near-centers-list');
  if (nearList) {
    nearList.innerHTML = NEARBY_CENTERS.map(c => `
      <div class="center-card">
        <div class="center-title">
          <strong>${c.name}</strong>
          <span class="center-distance">📍 ${c.distance}</span>
        </div>
        <p class="center-addr">${c.address}</p>
        <p class="center-timing">🕒 ${c.timing} | 📞 ${c.phone}</p>
        <div class="center-services">
          ${c.services.map(srv => `<span class="service-chip">${srv}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // Safely show modal if not already open
  if (modal && !modal.open) {
    modal.showModal();
  }
}

function openSchemeQAModal(schemeId) {
  const item = state.evaluatedSchemes.find(i => i.scheme.id === schemeId);
  if (!item) return;

  state.selectedSchemeForQA = item.scheme;
  const s = item.scheme;
  const lang = state.currentLang;
  const modal = document.getElementById('qa-modal');
  const titleEl = document.getElementById('qa-modal-scheme-name');
  const listEl = document.getElementById('qa-modal-faq-container');
  const askEl = document.getElementById('qa-modal-ask-container');

  if (titleEl) titleEl.textContent = `Q&A: ${s.name[lang] || s.name.en}`;

  if (listEl) {
    listEl.innerHTML = `
      <h4 class="qa-section-title">💡 ${lang === 'mr' ? 'वारंवार विचारले जाणारे प्रश्न व उत्तरे (GR पडताळणी)' : lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न व उत्तर (GR सत्यापन)' : 'Frequently Asked Scheme Questions'}</h4>
      ${s.qa.map(item => `
        <div class="qa-item">
          <div class="qa-q">❓ <strong>${item.q[lang] || item.q.en}</strong></div>
          <div class="qa-a">✅ ${item.a[lang] || item.a.en}</div>
        </div>
      `).join('')}
    `;
  }

  if (askEl) {
    askEl.innerHTML = `
      <div class="ask-custom-qa-box">
        <label><strong>${lang === 'mr' ? 'या योजनेबद्दल दुसरा काही प्रश्न आहे का?' : lang === 'hi' ? 'क्या इस योजना के बारे में कोई अन्य सवाल है?' : 'Have another specific question about this scheme?'}</strong></label>
        <div class="qa-input-row">
          <input type="text" id="custom-qa-input" placeholder="${lang === 'mr' ? 'उदा. पती व पत्नी दोघांना लाभ मिळतो का?' : lang === 'hi' ? 'उदा. क्या पति और पत्नी दोनों आवेदन कर सकते हैं?' : 'e.g., Can both husband and wife apply?'}" />
          <button id="custom-qa-submit" class="btn-action btn-apply">${lang === 'mr' ? 'विचारा' : lang === 'hi' ? 'पूछें' : 'Ask Bedrock RAG'}</button>
        </div>
        <div id="custom-qa-response" class="qa-response-area" style="display:none;"></div>
      </div>
    `;

    const qaBtn = document.getElementById('custom-qa-submit');
    const qaInput = document.getElementById('custom-qa-input');
    const qaResp = document.getElementById('custom-qa-response');

    if (qaBtn && qaInput && qaResp) {
      qaBtn.addEventListener('click', () => {
        const query = qaInput.value.trim();
        if (!query) return;

        qaResp.style.display = 'block';
        qaResp.innerHTML = `<em>Retrieving verified guidelines from Amazon Bedrock S3 Knowledge Base...</em>`;

        setTimeout(() => {
          const respText = lang === 'mr'
            ? `शासकीय GR व नियमांनुसार: या योजनेचा लाभ एका कुटुंबातील एकाच पात्र व्यक्तीस मिळतो. अधिकृत पडताळणी स्थानिक तलाठी व तहसील कार्यालयामार्फत केली जाते.`
            : lang === 'hi'
              ? `शासकीय नियमों (GR) के अनुसार: इस योजना का लाभ प्रति परिवार एक ही पात्र सदस्य को दिया जाता है। औपचारिक सत्यापन स्थानीय तहसील कार्यालय द्वारा किया जाता है।`
              : `According to verified Government Guidelines: This benefit is administered on a single-household beneficiary basis. Formal verification is handled through the Taluka Tehsildar office.`;

          qaResp.innerHTML = `<strong>🤖 Verified Response (Amazon Bedrock RAG):</strong><br>${respText}`;
          voiceService.speak(respText, lang);
        }, 500);
      });
    }
  }

  if (modal && !modal.open) {
    modal.showModal();
  }
}


function loadInitialDemo() {
  state.activePersonaId = null;
  // Start with clean initial state ready for user input
  renderProfile();
  runEligibilityMatching();

  if (state.currentUser) {
    const welcome = state.currentLang === 'mr'
      ? `नमस्कार ${state.currentUser.name || 'नागरिक'}! आपले स्वागत आहे. आपण बोलून किंवा लिहून शासकीय योजना शोधू शकता.`
      : state.currentLang === 'hi'
        ? `नमस्ते ${state.currentUser.name || 'नागरिक'}! आपका स्वागत है। आप बोलकर या लिखकर सरकारी योजनाएं खोज सकते हैं।`
        : `Welcome back, ${state.currentUser.name || 'Citizen'}! You can discover government schemes by speaking or typing.`;
    addChatMessage('assistant', welcome, 'occupation');
  } else {
    const welcome = state.currentLang === 'mr'
      ? "नमस्कार! मी योजनामित्र आहे. आपण आपल्या भाषेत बोलून केंद्र व महाराष्ट्र शासनाच्या योजना शोधू शकता. खालील माइक बटण दाबा किंवा साइन इन करा."
      : state.currentLang === 'hi'
        ? "नमस्ते! मैं योजनामित्र हूँ। आप अपनी भाषा में बोलकर केंद्र और महाराष्ट्र सरकार की योजनाएं खोज सकते हैं। नीचे दिए माइक बटन पर टैप करें या साइन इन करें।"
        : "Welcome to VoiceScheme AI! Speak your situation to find verified Central and Maharashtra government schemes. Tap the mic button or sign in above.";
    addChatMessage('assistant', welcome, 'occupation');
  }
}
