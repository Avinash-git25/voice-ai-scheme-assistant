import { SCHEMES_DATABASE } from './schemes-data.js';

// Conversational Slot-Filling and Missing Information Manager
// Implements TRD Section 3 (FR-04, FR-05) & PRD Section 8.2 (Amazon Bedrock Slot-Extraction simulation)

export class DialogueManager {
  constructor() {
    this.requiredSlots = ['occupation', 'annual_income', 'age', 'gender', 'state'];
  }

  /**
   * Match user text against known schemes by ID, localized names, or common keywords
   */
  findMatchingScheme(raw) {
    if (!raw || raw.length < 3) return null;
    const lower = raw.toLowerCase().trim();

    // Direct scheme ID or name checks
    for (const s of SCHEMES_DATABASE) {
      const en = (s.name.en || '').toLowerCase();
      const hi = (s.name.hi || '').toLowerCase();
      const mr = (s.name.mr || '').toLowerCase();
      const idClean = s.id.replace(/_/g, ' ');

      if (lower.includes(idClean) || lower.includes(s.id)) return s;
      if (en && lower.includes(en)) return s;
      if (hi && lower.includes(hi)) return s;
      if (mr && lower.includes(mr)) return s;
    }

    // Keyword mapping for popular schemes
    const keywordMap = [
      { keys: ['ladki bahin', 'ladli behna', 'लाडकी बहीण', 'लाडली बहना', 'majhi ladki'], id: 'majhi_ladki_bahin' },
      { keys: ['pm kisan', 'pm-kisan', 'पीएम किसान', 'kisan samman', 'सन्मान निधी', 'सम्मान निधि'], id: 'pm_kisan' },
      { keys: ['namo shetkari', 'नमो शेतकरी'], id: 'namo_shetkari' },
      { keys: ['ayushman', 'आयुष्मान', 'pmjay', 'pm-jay', 'golden card', 'आरोग्य कार्ड'], id: 'ayushman_bharat' },
      { keys: ['awas', 'आवास', 'gharkul', 'घरकुल', 'pmay'], id: 'pm_awas_gramin' },
      { keys: ['sanjay gandhi', 'niradhar', 'संजय गांधी', 'निराधार'], id: 'sanjay_gandhi_niradhar' },
      { keys: ['shravanbal', 'shravan bal', 'श्रवणबाळ', 'श्रवण बाळ'], id: 'shravanbal_yojana' },
      { keys: ['scholarship', 'शिष्यवृत्ती', 'छात्रवृत्ति', 'post matric', 'mahadbt'], id: 'post_matric_scholarship' },
      { keys: ['mudra', 'मुद्रा लोन', 'mudra loan'], id: 'pm_mudra_yojana' },
      { keys: ['vishwakarma', 'विश्वकर्मा'], id: 'pm_vishwakarma' },
      { keys: ['atal pension', 'apy', 'अटल पेन्शन', 'अटल पेंशन'], id: 'atal_pension_yojana' },
      { keys: ['sukanya', 'सुकन्या समृद्धी', 'सुकन्या'], id: 'sukanya_samriddhi' },
      { keys: ['matru vandana', 'pmmvy', 'मातृ वंदना'], id: 'pm_matru_vandana' },
      { keys: ['lakhpati', 'लखपती दीदी', 'lakhpati didi'], id: 'lakhpati_didi' },
      { keys: ['kisan credit', 'kcc', 'किसान क्रेडिट'], id: 'kisan_credit_card' },
      { keys: ['e-shram', 'eshram', 'ई-श्रम', 'ई श्रम'], id: 'e_shram_card' },
      { keys: ['annapurna', 'अन्नपूर्णा', 'free gas', 'मोफत सिलिंडर', 'गॅस सिलिंडर'], id: 'mukhyamantri_annapurna' },
      { keys: ['yuva karya', 'लाडका भाऊ', 'ladka bhau', 'युवा कार्य', 'प्रशिक्षण', 'stipend'], id: 'mukhyamantri_yuva_prashikshan' },
      { keys: ['mjpjay', 'महात्मा फुले', 'जन आरोग्य', 'phule arogya', 'jeevandayee', '५ लाख आरोग्य'], id: 'mjpjay_health' },
      { keys: ['vayoshri', 'वयोश्री', 'vayo shri', 'senior device', 'चष्मा'], id: 'mukhyamantri_vayoshri' },
      { keys: ['सौर पंप', 'solar pump', 'सौर कृषी', 'saur pump', 'kusum', 'कुसूम'], id: 'saur_krushi_pump' },
      { keys: ['पीक विमा', 'crop insurance', '१ रुपयात पीक विमा', 'pik vima', 'fasal bima'], id: 'one_rupee_crop_insurance' },
      { keys: ['लेक लाडकी', 'lek ladki', '१ लाख मुलगी'], id: 'lek_ladki_yojana' },
      { keys: ['स्वाधार', 'swadhar', 'ambedkar swadhar'], id: 'ambedkar_swadhar_yojana' },
      { keys: ['बळीराजा', 'मोफत वीज', 'free electricity', 'baliraja', 'वीजबिल माफी'], id: 'baliraja_vij_savlat' },
      { keys: ['मुलींना मोफत शिक्षण', 'free higher education', 'girls free education', 'मुलींना मोफत उच्च'], id: 'free_higher_education_girls' },
      { keys: ['गोपीनाथ मुंडे', 'शेतकरी अपघात', 'apghat anudan', 'apghat vima'], id: 'shetkari_apghat_vima' },
      { keys: ['mahajyoti', 'महाज्योती'], id: 'maha_jyoti_coaching' },
      { keys: ['sarathi', 'सारथी'], id: 'sarathi_fellowship' }
    ];

    for (const item of keywordMap) {
      if (item.keys.some(k => lower.includes(k))) {
        const found = SCHEMES_DATABASE.find(s => s.id === item.id);
        if (found) return found;
      }
    }

    return null;
  }

  /**
   * Check if text contains generic government scheme/welfare terms
   */
  isGeneralSchemeTerm(raw) {
    if (!raw) return false;
    const lower = raw.toLowerCase();
    const schemeTerms = [
      'yojana', 'योजना', 'योजनांची', 'योजनांचे', 'scheme', 'schemes',
      'subsidy', 'अनुदान', 'loan', 'कर्ज', 'pension', 'पेंशन', 'पेन्शन',
      'sarkari', 'सरकारी', 'shasan', 'शासन',
      'dbt', 'कागदपत्रे', 'कागदपत्र', 'दस्तावेज', 'documents',
      'form', 'फॉर्म', 'अर्ज', 'apply', 'पात्रता', 'eligibility',
      'benefit', 'लाभ', 'फायदा'
    ];
    return schemeTerms.some(term => lower.includes(term));
  }

  /**
   * Check if text is a greeting or general help request
   */
  isGreetingOrHelp(raw) {
    if (!raw) return false;
    const lower = raw.toLowerCase().trim();
    const greetings = [
      'hello', 'hi', 'hey', 'namaste', 'नमस्ते', 'नमस्कार',
      'pranam', 'प्रणाम', 'ram ram', 'राम राम', 'जय महाराष्ट्र',
      'help', 'मदत', 'सहायता', 'start', 'सुरु', 'शुरू', 'reset'
    ];
    return greetings.some(g => lower === g || lower.startsWith(g + ' ') || lower.endsWith(' ' + g));
  }

  /**
   * Check if text has words signifying occupation, work, or livelihood
   */
  hasWorkOrLivelihoodWords(raw) {
    if (!raw) return false;
    const lower = raw.toLowerCase();
    const workWords = [
      'work', 'job', 'occupation', 'profession', 'livelihood',
      'काम', 'धंदा', 'व्यवसाय', 'रोजगार', 'आजीविका',
      'नोकरी', 'नौकरी', 'मजुरी', 'मजदूरी', 'service', 'उद्योग'
    ];
    return workWords.some(w => lower.includes(w));
  }

  /**
   * Convert any Devanagari digits (०, १, २, ३, ४, ५, ६, ७, ८, ९) to standard ASCII (0-9)
   */
  normalizeDevanagariDigits(str) {
    if (!str) return '';
    const devanagariMap = {
      '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
      '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
    };
    return str.replace(/[०-९]/g, d => devanagariMap[d] || d);
  }

  /**
   * Extract slots from free-form speech/text in Hindi, Marathi, or English
   * @param {string} text - Spoken user sentence
   * @param {Object} currentProfile - Existing profile state
   * @param {string} lang - 'en' | 'hi' | 'mr'
   * @returns {Object} { updatedProfile, newlyExtracted, missingSlots, nextQuestion, isProfileComplete }
   */
  extractSlots(text, currentProfile = {}, lang = 'mr') {
    // Normalize Devanagari numerals to ASCII so all regexes match seamlessly
    const normalizedInput = this.normalizeDevanagariDigits(text || '');
    const raw = normalizedInput.toLowerCase();
    const updated = { ...currentProfile };
    const newlyExtracted = {};

    // 1. Extract Age
    // Matches patterns like "52 वर्ष", "52 साल", "52 years", "वय 52", "age 19", "उम्र 38", "I am 25", "25.", "२५."
    const agePatterns = [
      /(?:वय|उम्र|age|साल|वर्ष)\s*(?:आहे|is|mein|की|का)?\s*[:\s]?\s*(\d{1,2})/i,
      /(\d{1,2})\s*(?:वर्ष|साल|years?|yr|वयाचा|वयाची|वर्षांचा|वर्षांची|वर्षांचे|old)/i,
      /\b(?:age|वय|उम्र)\s*[:=]\s*(\d{1,2})\b/i,
      /\b(?:i\s+am|i'm|im|am|मी|माझे\s*वय|मेरी\s*उम्र)\s*(?:is)?\s*[:\s]?\s*(\d{1,2})\b/i
    ];

    for (const pat of agePatterns) {
      const m = normalizedInput.match(pat);
      if (m && m[1]) {
        const val = parseInt(m[1], 10);
        if (val >= 1 && val <= 105) {
          updated.age = val;
          newlyExtracted.age = val;
          break;
        }
      }
    }

    // Fallback 1: Extract any standalone 1-2 digit number between 14 and 99 (cleans WebSpeech trailing periods like "25.")
    if (updated.age === null || updated.age === undefined) {
      const tokens = normalizedInput.replace(/[^\d\s]/g, ' ').trim().split(/\s+/);
      for (const tok of tokens) {
        if (/^\d{1,2}$/.test(tok)) {
          const val = parseInt(tok, 10);
          if (val >= 14 && val <= 99) {
            updated.age = val;
            newlyExtracted.age = val;
            break;
          }
        }
      }
    }

    // Fallback 2: Word-based numbers in English, Hindi, and Marathi
    if (updated.age === null || updated.age === undefined) {
      const wordMap = [
        ['twenty five', 25], ['thirty five', 35], ['forty five', 45], ['fifty two', 52], ['sixty five', 65],
        ['twenty', 20], ['thirty', 30], ['forty', 40], ['fifty', 50], ['sixty', 60], ['seventy', 70],
        ['पंचवीस', 25], ['पस्तीस', 35], ['चाळीस', 40], ['पंचेचाळीस', 45], ['पन्नास', 50], ['बावन्न', 52], ['पासष्ट', 65],
        ['पच्चीस', 25], ['पैंतीस', 35], ['चालीस', 40], ['पैंतालीस', 45], ['पचास', 50], ['बावन', 52], ['पैंसठ', 65],
        ['वीस', 20], ['तीस', 30], ['साठ', 60], ['सत्तर', 70]
      ];
      for (const [w, val] of wordMap) {
        if (raw.includes(w)) {
          updated.age = val;
          newlyExtracted.age = val;
          break;
        }
      }
    }

    // 2. Extract Gender
    // Filter out known scheme names or generic references so searching for a scheme doesn't falsely flip gender
    const textWithoutSchemeNames = raw
      .replace(/लाडकी\s*बहीण/gi, '')
      .replace(/माझी\s*लाडकी\s*बहीण/gi, '')
      .replace(/ladki\s*bahin/gi, '')
      .replace(/लाडली\s*बहना/gi, '')
      .replace(/ladli\s*behna/gi, '')
      .replace(/सुकन्या\s*समृद्धी/gi, '')
      .replace(/sukanya\s*samriddhi/gi, '')
      .replace(/मातृ\s*वंदना/gi, '')
      .replace(/matru\s*vandana/gi, '')
      .replace(/\b(?:ईमेल|इमेल|e-?mail)\b/gi, '');

    // Check explicit male signals
    const explicitMalePatterns = [
      /\b(?:i\s+am|i'm|im|am|gender\s*(?:is|:)?)\s*(?:a\s+)?male\b/i,
      /\b(?:i\s+am|i'm|im|am)\s*(?:a\s+)?man\b/i,
      /(?:मी|आम्ही|माझे\s*लिंग)?\s*(?:पुरुष|पुल्लिंग)\s*(?:आहे|हूँ)?/i,
      /(?:मैं|मेरा\s*लिंग)?\s*(?:पुरुष|पुल्लिंग|आदमी)\s*(?:हूँ|है)?/i,
      /\b(male|man|boy|gentleman|guy)\b/i,
      /(?:पुरुष|पुल्लिंग|मर्द|आदमी|मुलगा|लड़का|युवक|छात्र|भाऊ|भाई|पती|नवरा|पिता|वडील|बाप)/i
    ];

    // Check explicit female signals
    const explicitFemalePatterns = [
      /\b(?:i\s+am|i'm|im|am|gender\s*(?:is|:)?)\s*(?:a\s+)?female\b/i,
      /\b(?:i\s+am|i'm|im|am)\s*(?:a\s+)?woman\b/i,
      /\bfarmer'?s\s+wife\b/i,
      /(?:मी|आम्ही|माझे\s*लिंग)?\s*(?:महिला|स्त्री)\s*(?:आहे|हूँ)?/i,
      /(?:मैं|मेरा\s*लिंग)?\s*(?:महिला|स्त्री|औरत)\s*(?:हूँ|है)?/i,
      /\b(female|woman|women|girl|lady)\b/i,
      /(?:महिला|औरत|स्त्री|स्त्रीलिंग|मुलगी|लड़की|युवती|गृहिणी|विद्यार्थिनी|छात्रा|कन्या|बेटी|बहीण|बहन|पत्नी|बायको)/i
    ];

    const isMale = explicitMalePatterns.some(p => p.test(textWithoutSchemeNames));
    const isFemale = explicitFemalePatterns.some(p => p.test(textWithoutSchemeNames));

    if (isMale && !isFemale) {
      updated.gender = 'male';
      newlyExtracted.gender = 'male';
    } else if (isFemale && !isMale) {
      updated.gender = 'female';
      newlyExtracted.gender = 'female';
    } else if (isMale && isFemale) {
      // Prioritize direct first-person self-declaration
      if (/\b(?:i\s+am|i'm|im|am|gender\s*(?:is|:)?)\s*(?:a\s+)?male\b/i.test(textWithoutSchemeNames) ||
        /(?:मी|मैं)\s*(?:एक\s*)?पुरुष/i.test(textWithoutSchemeNames) ||
        /(?:लिंग|gender)\s*[:\s]?\s*(?:पुरुष|male)/i.test(textWithoutSchemeNames)) {
        updated.gender = 'male';
        newlyExtracted.gender = 'male';
      } else if (/\b(?:i\s+am|i'm|im|am|gender\s*(?:is|:)?)\s*(?:a\s+)?female\b/i.test(textWithoutSchemeNames) ||
        /(?:मी|मैं)\s*(?:एक\s*)?(?:महिला|स्त्री|औरत)/i.test(textWithoutSchemeNames) ||
        /(?:लिंग|gender)\s*[:\s]?\s*(?:महिला|female)/i.test(textWithoutSchemeNames)) {
        updated.gender = 'female';
        newlyExtracted.gender = 'female';
      } else {
        updated.gender = 'male';
        newlyExtracted.gender = 'male';
      }
    }

    // 3. Extract Occupation
    if (raw.includes('farmer') || raw.includes('किसान') || raw.includes('शेतकरी') || raw.includes('शेती') || raw.includes('खेती') || raw.includes('कास्तकार') || raw.includes('शेतमजूर') || raw.includes('agriculture')) {
      updated.occupation = 'farmer';
      newlyExtracted.occupation = 'farmer';
    } else if (raw.includes('student') || raw.includes('छात्र') || raw.includes('छात्रा') || raw.includes('विद्यार्थी') || raw.includes('विद्यार्थिनी') || raw.includes('college') || raw.includes('engineering') || raw.includes('अभियांत्रिकी') || raw.includes('शाळा') || raw.includes('school') || raw.includes('शिक्षण') || raw.includes('शिकतो') || raw.includes('शिकत आहे') || raw.includes('अभ्यास')) {
      updated.occupation = 'student';
      updated.student = true;
      newlyExtracted.occupation = 'student';
    } else if (raw.includes('मजदूर') || raw.includes('मजूर') || raw.includes('daily wage') || raw.includes('कामगार') || raw.includes('लेबर') || raw.includes('बांधकाम') || raw.includes('मजुरी') || raw.includes('मजदूरी') || raw.includes('labor') || raw.includes('labour') || raw.includes('हमाली') || raw.includes('driver') || raw.includes('ड्रायव्हर') || raw.includes('चालक') || raw.includes('रिक्षा') || raw.includes('auto') || raw.includes('taxi') || raw.includes('सफाई') || raw.includes('चौकीदार') || raw.includes('security') || raw.includes('guard') || raw.includes('peon') || raw.includes('कामवाली') || raw.includes('maid') || raw.includes('cook') || raw.includes('आचारी')) {
      updated.occupation = 'daily_wage';
      newlyExtracted.occupation = 'daily_wage';
    } else if (raw.includes('गृहिणी') || raw.includes('homemaker') || raw.includes('housewife') || raw.includes('घरकाम')) {
      updated.occupation = 'homemaker';
      newlyExtracted.occupation = 'homemaker';
      if (!updated.gender) {
        updated.gender = 'female';
        newlyExtracted.gender = 'female';
      }
    } else if (raw.includes('दुकान') || raw.includes('टपरी') || raw.includes('कारीगर') || raw.includes('कारागीर') || raw.includes('व्यापारी') || raw.includes('artisan') || raw.includes('shop') || raw.includes('chay') || raw.includes('चहा') || raw.includes('व्यवसाय') || raw.includes('सुतार') || raw.includes('carpenter') || raw.includes('लोहार') || raw.includes('blacksmith') || raw.includes('कुंभार') || raw.includes('potter') || raw.includes('शिंपी') || raw.includes('टेलर') || raw.includes('tailor') || raw.includes('चांभार') || raw.includes('मोची') || raw.includes('नाविक') || raw.includes('barber') || raw.includes('नाभीक') || raw.includes('नाई') || raw.includes('electrician') || raw.includes('plumber') || raw.includes('mechanic') || raw.includes('मेकॅनिक') || raw.includes('गवंडी') || raw.includes('mason') || raw.includes('painter') || raw.includes('business') || raw.includes('self employed') || raw.includes('व्यापार') || raw.includes('विक्रेता') || raw.includes('vendor') || raw.includes('hawker')) {
      updated.occupation = 'artisan';
      newlyExtracted.occupation = 'artisan';
    } else if (raw.includes('बेरोजगार') || raw.includes('unemployed') || raw.includes('नोकरी नाही') || raw.includes('job seeker') || raw.includes('बेकार')) {
      updated.occupation = 'unemployed';
      newlyExtracted.occupation = 'unemployed';
    } else if (raw.includes('निवृत्त') || raw.includes('retired') || raw.includes('ज्येष्ठ') || raw.includes('senior') || raw.includes('पेन्शनर') || raw.includes('pensioner')) {
      updated.occupation = 'retired';
      newlyExtracted.occupation = 'retired';
    } else if (raw.includes('नोकरी') || raw.includes('नौकरी') || raw.includes('service') || raw.includes('नोकरदार') || raw.includes('teacher') || raw.includes('शिक्षक') || raw.includes('clerk') || raw.includes('कारकून') || raw.includes('कंपनी') || raw.includes('salaried') || raw.includes('डॉक्टर') || raw.includes('doctor') || raw.includes('nurse') || raw.includes('engineer') || raw.includes('इंजिनिअर')) {
      updated.occupation = 'daily_wage';
      newlyExtracted.occupation = 'daily_wage';
    }

    // 4. Extract State and District
    if (raw.includes('maharashtra') || raw.includes('महाराष्ट्र')) {
      updated.state = 'Maharashtra';
      newlyExtracted.state = 'Maharashtra';
    }
    const districts = ['Raigad', 'रायगड', 'Pune', 'पुणे', 'Nashik', 'नासिक', 'नाशिक', 'Kolhapur', 'कोल्हापूर', 'Nagpur', 'नागपूर', 'Thane', 'ठाणे', 'Solapur', 'सोलापूर', 'Amravati', 'अमरावती', 'Chhatrapati Sambhajinagar', 'औरंगाबाद', 'Nanded', 'नांदेड', 'Satara', 'सातारा', 'Sangli', 'सांगली'];
    for (const d of districts) {
      if (raw.includes(d.toLowerCase())) {
        updated.district = d;
        updated.state = 'Maharashtra';
        newlyExtracted.district = d;
        break;
      }
    }
    if (!updated.state) {
      updated.state = 'Maharashtra'; // Default state as per TRD
    }

    // 5. Extract Annual Income
    // Support words ("one lakh", "two lakh", "family income one lakh", "ek lakh", "एक लाख", "80 thousand", "अस्सी हजार")
    // as well as digits ("1 lakh", "80000", "1.5 lakh", "1.2L", "80k")
    const parseIncome = (inputStr) => {
      if (!inputStr) return null;
      const text = inputStr.toLowerCase();

      // Word to number mappings for lakh multiplier
      const lakhWordMap = {
        'one and a half': 1.5, 'one point five': 1.5, 'two and a half': 2.5, 'two point five': 2.5,
        'three point five': 3.5, 'four point five': 4.5,
        'डेढ़': 1.5, 'दीड': 1.5, 'dedh': 1.5, 'deed': 1.5,
        'ढाई': 2.5, 'अडीच': 2.5, 'dhai': 2.5, 'adich': 2.5,
        'one': 1, 'a': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
        'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
        'एक': 1, 'दोन': 2, 'दो': 2, 'तीन': 3, 'चार': 4, 'पाच': 5, 'पाँच': 5,
        'सहा': 6, 'छह': 6, 'सात': 7, 'आठ': 8, 'नऊ': 9, 'नौ': 9, 'दहा': 10, 'दस': 10,
        'ek': 1, 'do': 2, 'don': 2, 'teen': 3, 'char': 4, 'panch': 5, 'pach': 5
      };

      // Check lakh word patterns: "family income one lakh", "one lakh", "ek lakh", "एक लाख", "दोन लाख", etc.
      for (const [w, num] of Object.entries(lakhWordMap)) {
        const regex = new RegExp('(?:\\b|\\s|^)' + w + '\\s*(?:lakhs?|lac|lacs?|लाख|लाखांपर्यंत|लाखांची|लाखांचे)(?:\\b|\\s|$)', 'i');
        if (regex.test(text)) {
          let extraThousands = 0;
          const thousandCompound = text.match(/(?:lakhs?|lac|लाख)\s*(?:and\s*)?(\d{1,2}|twenty|thirty|forty|fifty|वीस|तीस|चाळीस|पन्नास|बीस|पचास)\s*(?:thousand|k|हजार|हज़ार)/i);
          if (thousandCompound && thousandCompound[1]) {
            const tWord = thousandCompound[1].toLowerCase();
            const tMap = {
              'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50, 'sixty': 60,
              'वीस': 20, 'तीस': 30, 'चाळीस': 40, 'पन्नास': 50,
              'बीस': 20, 'पचास': 50
            };
            const tVal = tMap[tWord] || parseInt(tWord, 10);
            if (!isNaN(tVal)) extraThousands = tVal * 1000;
          }
          return Math.round(num * 100000) + extraThousands;
        }
      }

      // Check numeric lakh patterns: "1.5 lakh", "2.4 lakh", "1 lakh", "2.5L", "1L", "2lac", "१ लाख"
      const numLakhMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:lakhs?|lac|lacs?|l\b|लाख|लाखांपर्यंत|लाखांची)/i);
      if (numLakhMatch && numLakhMatch[1]) {
        let val = Math.round(parseFloat(numLakhMatch[1]) * 100000);
        const extraMatch = text.match(/(?:lakhs?|lac|l\b|लाख)\s*(?:and\s*)?(\d{1,2})\s*(?:thousand|k|हजार|हज़ार)/i);
        if (extraMatch && extraMatch[1]) {
          val += parseInt(extraMatch[1], 10) * 1000;
        }
        return val;
      }

      // Word thousands patterns: "eighty thousand", "अस्सी हजार", "ऐंशी हजार", "fifty thousand", "पचास हजार", "पन्नास हजार"
      const thousandWordMap = {
        'twenty': 20000, 'thirty': 30000, 'forty': 40000, 'fifty': 50000,
        'sixty': 60000, 'seventy': 70000, 'eighty': 80000, 'ninety': 90000,
        'one hundred': 100000,
        'वीस': 20000, 'तीस': 30000, 'चाळीस': 40000, 'पन्नास': 50000,
        'साठ': 60000, 'सत्तर': 70000, 'ऐंशी': 80000, 'नव्वद': 90000,
        'बीस': 20000, 'पचास': 50000, 'अस्सी': 80000, 'नब्बे': 90000,
        'assi': 80000, 'pachas': 50000, 'sattar': 70000, 'ainshi': 80000, 'pannas': 50000
      };

      for (const [w, amount] of Object.entries(thousandWordMap)) {
        const regex = new RegExp('(?:\\b|\\s|^)' + w + '\\s*(?:thousand|k|हजार|हज़ार|हजारों)(?:\\b|\\s|$)', 'i');
        if (regex.test(text)) return amount;
      }

      // Numeric thousands pattern: "80 thousand", "80k", "50k", "80 हजार", "120k"
      const numThousandMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:k\b|thousand|हजार|हज़ार)/i);
      if (numThousandMatch && numThousandMatch[1]) {
        return Math.round(parseFloat(numThousandMatch[1]) * 1000);
      }

      // Standard numeric currency expressions: "₹80,000", "80000", "100000", "1,20,000", "rs 80000"
      const cleanNums = text.match(/(?:income|आय|कमाई|उत्पन्न|पगार|वार्षिक|family)?\s*[:\s]?\s*(?:₹|rs\.?|inr)?\s*(\d{2,3}[,.]?\d{3})/i);
      if (cleanNums && cleanNums[1]) {
        const val = parseInt(cleanNums[1].replace(/[,.]/g, ''), 10);
        if (val >= 10000 && val <= 5000000) return val;
      }

      // Standalone numbers between 15000 and 5000000 (e.g. typing "80000" or "100000")
      const tokens = text.replace(/[^\d\s]/g, ' ').trim().split(/\s+/);
      for (const tok of tokens) {
        if (/^\d{5,7}$/.test(tok)) {
          const val = parseInt(tok, 10);
          if (val >= 10000 && val <= 5000000) return val;
        }
      }

      return null;
    };

    const extractedIncome = parseIncome(normalizedInput);
    if (extractedIncome !== null) {
      updated.annual_income = extractedIncome;
      newlyExtracted.annual_income = extractedIncome;
    }

    // 6. Extract Social Category (SC / ST / OBC / General)
    if (raw.includes('अनुसूचित जाती') || raw.includes('sc category') || raw.includes('sc प्रवर्ग') || /\bsc\b/i.test(raw)) {
      updated.category = 'SC';
      newlyExtracted.category = 'SC';
    } else if (raw.includes('अनुसूचित जमाती') || raw.includes('st category') || /\bst\b/i.test(raw)) {
      updated.category = 'ST';
      newlyExtracted.category = 'ST';
    } else if (raw.includes('obc') || raw.includes('ओबीसी') || raw.includes('इतर मागास')) {
      updated.category = 'OBC';
      newlyExtracted.category = 'OBC';
    } else if (raw.includes('general') || raw.includes('खुला') || raw.includes('सामान्य') || raw.includes('open category')) {
      updated.category = 'General';
      newlyExtracted.category = 'General';
    }

    // 7. Extract Land Ownership (Check NEGATIVE FIRST to avoid false positives)
    const hasNegativeLand = raw.includes('जमीन नाही') ||
      raw.includes('भूमीहीन') ||
      raw.includes('भूमिहीन') ||
      raw.includes('no land') ||
      raw.includes('landless') ||
      raw.includes('किराएदार') ||
      raw.includes('बटाईदार') ||
      raw.includes('शेतमजूर');

    const hasPositiveLand = raw.includes('जमीन आहे') ||
      raw.includes('जमीनधारक') ||
      raw.includes('अपनी जमीन') ||
      raw.includes('भूमीधारक') ||
      raw.includes('land owner') ||
      raw.includes('own land') ||
      raw.includes('7/12') ||
      raw.includes('७/१२');

    if (hasNegativeLand) {
      updated.land_owner = false;
      newlyExtracted.land_owner = false;
    } else if (hasPositiveLand) {
      updated.land_owner = true;
      newlyExtracted.land_owner = true;
    } else if (updated.occupation === 'farmer' && updated.land_owner === undefined) {
      // Default for farmers when not explicitly negated
      updated.land_owner = true;
      newlyExtracted.land_owner = true;
    }

    // Identify Missing Slots
    const missing = [];
    if (!updated.occupation) missing.push('occupation');
    if (updated.annual_income === undefined || updated.annual_income === null) missing.push('annual_income');
    if (!updated.age) missing.push('age');
    if (!updated.gender) missing.push('gender');
    if (updated.occupation === 'farmer' && updated.land_owner === undefined) missing.push('land_owner');
    if (updated.occupation === 'student' && !updated.category) missing.push('category');

    // Next Question Generation based on priority
    const nextQuestion = this.generateNextQuestion(missing, updated, lang);

    // Check relevance of user's query
    const hasExtractedSlots = Object.keys(newlyExtracted).length > 0;
    const matchedScheme = this.findMatchingScheme(raw);
    const isGeneralSchemeInquiry = this.isGeneralSchemeTerm(raw);
    const isGreeting = this.isGreetingOrHelp(raw);
    const hasWorkWords = this.hasWorkOrLivelihoodWords(raw);

    // Empty text (e.g. initial load or quick-chip click) is treated as valid
    const isEmptyInput = !text || text.trim().length === 0;

    const isRelevant = isEmptyInput || hasExtractedSlots || !!matchedScheme || isGeneralSchemeInquiry || isGreeting || hasWorkWords;

    let warningMessage = null;
    if (!isRelevant) {
      const firstMissing = missing[0] || 'occupation';
      if (firstMissing === 'occupation') {
        warningMessage = lang === 'mr'
          ? "⚠️ मला तुमचे म्हणणे समजले नाही. कृपया तुमच्या कामाशी किंवा उपजीविकेशी (उदा: शेतकरी, मजूर, विद्यार्थी, लहान व्यावसायिक, गृहिणी) संबंधित माहिती सांगा किंवा सरकारी योजना शोधा."
          : lang === 'hi'
            ? "⚠️ मैं आपकी बात समझ नहीं पाया। कृपया अपने काम/व्यवसाय (जैसे: किसान, मजदूर, छात्र, छोटा दुकानदार, गृहिणी) से संबंधित जानकारी बताएं या सरकारी योजना खोजें।"
            : "⚠️ I don't recognize what you are saying. Please provide information related to your occupation (e.g., Farmer, Daily wage worker, Student, Small shop owner, Homemaker) or government schemes.";
      } else if (firstMissing === 'annual_income') {
        warningMessage = lang === 'mr'
          ? "⚠️ मला तुमचे म्हणणे समजले नाही. कृपया तुमच्या कुटुंबाचे अंदाजे वार्षिक उत्पन्न (उदा. ८०,००० किंवा १ लाख) सांगा."
          : lang === 'hi'
            ? "⚠️ मैं आपकी बात समझ नहीं पाया। कृपया अपने परिवार की कुल वार्षिक आय (जैसे: 80,000 या 1 लाख) बताएं।"
            : "⚠️ I don't recognize what you are saying. Please state your approximate annual family income (e.g., 80,000 or 1 Lakh).";
      } else if (firstMissing === 'age') {
        warningMessage = lang === 'mr'
          ? "⚠️ मला तुमचे म्हणणे समजले नाही. कृपया तुमचे वय (उदा. २५ वर्षे) सांगा."
          : lang === 'hi'
            ? "⚠️ मैं आपकी बात समझ नहीं पाया। कृपया अपनी वर्तमान उम्र (जैसे: 25 वर्ष) बताएं।"
            : "⚠️ I don't recognize what you are saying. Please state your current age in years (e.g., 25 years).";
      } else if (firstMissing === 'gender') {
        warningMessage = lang === 'mr'
          ? "⚠️ मला तुमचे म्हणणे समजले नाही. कृपया तुमचे लिंग (पुरुष / महिला) स्पष्ट करा."
          : lang === 'hi'
            ? "⚠️ मैं आपकी बात समझ नहीं पाया। कृपया अपना लिंग (पुरुष / महिला) बताएं।"
            : "⚠️ I don't recognize what you are saying. Please specify your gender (Male / Female).";
      } else {
        warningMessage = lang === 'mr'
          ? "⚠️ मला तुमचे म्हणणे समजले नाही. कृपया तुमच्या कामाशी, उत्पन्नाशी किंवा सरकारी योजनांशी संबंधित माहिती सांगा."
          : lang === 'hi'
            ? "⚠️ मैं आपकी बात समझ नहीं पाया। कृपया अपने काम, आय या सरकारी योजनाओं से संबंधित जानकारी बताएं।"
            : "⚠️ I don't recognize what you are saying. Please provide information related to your work, income, or government schemes.";
      }
    }

    return {
      updatedProfile: updated,
      newlyExtracted,
      missingSlots: missing,
      nextQuestion,
      isProfileComplete: missing.length === 0,
      isRelevant,
      isGreeting,
      isSchemeInquiry: !!matchedScheme || isGeneralSchemeInquiry,
      matchedScheme,
      warningMessage
    };
  }

  generateNextQuestion(missing, profile, lang) {
    if (missing.length === 0) {
      return null;
    }

    const firstMissing = missing[0];

    const questions = {
      occupation: {
        en: "What is your main occupation or source of livelihood? (For example: Farmer, Daily wage worker, Student, Small shop owner, or Homemaker)",
        hi: "आपका मुख्य व्यवसाय या आजीविका का साधन क्या है? (जैसे: किसान, मजदूर, छात्र, छोटा दुकानदार, या गृहिणी)",
        mr: "तुमचा मुख्य व्यवसाय किंवा उपजीविकेचे साधन कोणते आहे? (उदा: शेतकरी, बांधकाम मजूर, विद्यार्थी, लहान दुकानदार, किंवा गृहिणी)"
      },
      annual_income: {
        en: "Approximately what is your total annual family income?",
        hi: "आपके परिवार की कुल वार्षिक आय (सालाना कमाई) लगभग कितनी है?",
        mr: "तुमच्या कुटुंबाचे अंदाजे वार्षिक उत्पन्न (सालाना कमाई) किती आहे?"
      },
      age: {
        en: "What is your current age in years?",
        hi: "आपकी वर्तमान आयु (उम्र) कितने वर्ष है?",
        mr: "तुमचे सध्याचे वय किती वर्षे आहे?"
      },
      gender: {
        en: "Could you specify your gender so we can check exclusive women and child welfare schemes?",
        hi: "क्या आप अपना लिंग बता सकते हैं ताकि हम महिला कल्याण योजनाओं की जाँच कर सकें?",
        mr: "महिला व बाल कल्याण योजनांची पडताळणी करण्यासाठी तुमचे लिंग स्पष्ट कराल का?"
      },
      land_owner: {
        en: "Do you own agricultural land in your name or family's name?",
        hi: "क्या आपके या आपके परिवार के नाम पर स्वयं की कृषि भूमि (खेती की जमीन) है?",
        mr: "तुमच्या किंवा कुटुंबाच्या नावावर स्वतःची शेतजमीन (७/१२ उतारा) आहे का?"
      },
      category: {
        en: "Which social category do you belong to? (General, OBC, SC, ST)",
        hi: "आप किस सामाजिक वर्ग से संबंधित हैं? (सामान्य, ओबीसी, एससी, एसटी)",
        mr: "तुम्ही कोणत्या सामाजिक प्रवर्गाशी संबंधित आहात? (खुला, ओबीसी, एससी, एसटी)"
      }
    };

    return questions[firstMissing]?.[lang] || questions[firstMissing]?.en || null;
  }
}
