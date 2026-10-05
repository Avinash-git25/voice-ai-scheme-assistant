// Verified Government Schemes Database for VoiceScheme AI / YojanaMitra
// Compliant with TRD Section 4 & PRD Section 8.3 / Section 13

export const SCHEMES_DATABASE = [
  {
    id: "pm_kisan",
    category: "Farmer/Agriculture",
    level: "Central",
    state: "All",
    name: {
      en: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      hi: "पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)",
      mr: "पीएम-किसान (प्रधानमंत्री किसान सन्मान निधी)"
    },
    short_desc: {
      en: "Direct income support of ₹6,000 per year in 3 equal instalments to all landholding farmer families.",
      hi: "सभी भूमिधारक किसान परिवारों को ₹6,000 प्रति वर्ष 3 समान किस्तों में प्रत्यक्ष आय सहायता।",
      mr: "सर्व जमीनधारक शेतकरी कुटुंबांना दरवर्षी ₹६,००० चे थेट आर्थिक सहाय्य (३ हप्त्यांमध्ये)."
    },
    benefit_amount: "₹6,000 / year",
    benefit_frequency: "₹2,000 every 4 months",
    rules: {
      occupation: ["farmer"],
      land_owner: true,
      max_income: 1000000,
      min_age: 18,
      gender: ["all"]
    },
    required_documents: [
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "land_7_12", name: { en: "Land Record (7/12 Extract & 8A)", hi: "भूमि रिकॉर्ड (7/12 व 8A खतौनी)", mr: "जमीन महसूल नोंद (७/१२ आणि ८अ उतारा)" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Aadhaar-Linked Bank Account Passbook", hi: "आधार लिंक बैंक खाता पासबुक", mr: "आधार लिंक बँक खाते पासबुक" }, mandatory: true },
      { id: "ration_card", name: { en: "Ration Card", hi: "राशन कार्ड", mr: "रेशन कार्ड" }, mandatory: false }
    ],
    apply_mode: "Online & CSC",
    official_url: "https://pmkisan.gov.in",
    source_url: "https://pmkisan.gov.in/Documents_New/StandardOperatingProcedure.pdf",
    last_verified: "2024-09-15",
    qa: [
      {
        q: { en: "What if my Aadhaar is not seeded with my bank account?", hi: "यदि मेरा आधार बैंक खाते से लिंक नहीं है तो क्या होगा?", mr: "माझे आधार बँक खात्याशी लिंक नसल्यास काय करावे?" },
        a: { en: "Instalments cannot be released without Aadhaar NPCI seeding. Visit your local Post Office (IPPB) or bank branch to link Aadhaar in 24 hours.", hi: "आधार एनपीसीआई सीडिंग के बिना किस्त जारी नहीं की जा सकती। 24 घंटे में लिंक कराने के लिए नजदीकी डाकघर या बैंक जाएं।", mr: "आधार एनपीसीआय मॅपिंगशिवाय हप्ता जमा होणार नाही. २४ तासांत लिंक करण्यासाठी स्थानिक पोस्ट ऑफिस किंवा बँक शाखेस भेट द्या." }
      },
      {
        q: { en: "Can tenant or landless farmers apply?", hi: "क्या बटाईदार या भूमिहीन किसान आवेदन कर सकते हैं?", mr: "कूळ किंवा भूमिहीन शेतकरी अर्ज करू शकतात का?" },
        a: { en: "No, PM-KISAN requires cultivable land in the applicant's name as per state land revenue records.", hi: "नहीं, पीएम-किसान के लिए राज्य राजस्व रिकॉर्ड में आवेदक के नाम पर कृषि योग्य भूमि होना आवश्यक है।", mr: "नाही, महसूल नोंदीनुसार अर्जदाराच्या नावावर स्वतःची शेतीजमीन असणे बंधनकारक आहे." }
      }
    ]
  },
  {
    id: "namo_shetkari",
    category: "Farmer/Agriculture",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Namo Shetkari Mahasanman Nidhi Yojana",
      hi: "नमो शेतकरी महासन्मान निधि योजना (महाराष्ट्र)",
      mr: "नमो शेतकरी महासन्मान निधी योजना (महाराष्ट्र)"
    },
    short_desc: {
      en: "Additional financial assistance of ₹6,000 per year by Maharashtra Govt for farmers already enrolled in PM-KISAN (Total ₹12,000/yr).",
      hi: "महाराष्ट्र सरकार द्वारा पीएम-किसान लाभार्थियों को अतिरिक्त ₹6,000 प्रति वर्ष (कुल ₹12,000/वर्ष)।",
      mr: "पीएम-किसान योजनेच्या लाभार्थ्यांना महाराष्ट्र शासनाकडून अतिरिक्त ₹६,००० प्रति वर्ष (एकूण ₹१२,००० वार्षिक सहाय्य)."
    },
    benefit_amount: "₹6,000 / year (₹12,000 total with PM-KISAN)",
    benefit_frequency: "₹2,000 every 4 months",
    rules: {
      state: ["Maharashtra"],
      occupation: ["farmer"],
      land_owner: true,
      min_age: 18,
      gender: ["all"]
    },
    required_documents: [
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "land_7_12", name: { en: "7/12 Land Extract (Maharashtra)", hi: "7/12 भूलेख (महाराष्ट्र)", mr: "७/१२ व ८अ उतारा" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Bank Passbook with DBT active", hi: "डीबीटी सक्रिय बैंक पासबुक", mr: "डीबीटी सक्रिय बँक पासबुक" }, mandatory: true }
    ],
    apply_mode: "Automatic for PM-KISAN approved Maharashtra farmers",
    official_url: "https://krishi.maharashtra.gov.in",
    source_url: "https://gr.maharashtra.gov.in",
    last_verified: "2024-08-20",
    qa: [
      {
        q: { en: "Do I need to apply separately if I receive PM-KISAN?", hi: "क्या पीएम-किसान मिलने पर अलग से आवेदन करना होगा?", mr: "मला पीएम-किसान मिळत असल्यास वेगळा अर्ज करावा लागेल का?" },
        a: { en: "No separate application needed! Benefits are credited automatically based on PM-KISAN validation.", hi: "अलग से आवेदन की आवश्यकता नहीं है! पीएम-किसान सत्यापन के आधार पर राशि स्वतः खाते में जमा होती है।", mr: "वेगळा अर्ज करण्याची आवश्यकता नाही! पीएम-किसान पडताळणीच्या आधारे निधी आपोआप बँक खात्यात जमा होतो." }
      }
    ]
  },
  {
    id: "majhi_ladki_bahin",
    category: "Women & Child Welfare",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Mukhyamantri Majhi Ladki Bahin Yojana",
      hi: "मुख्यमंत्री माझी लाड़की बहिन योजना (महाराष्ट्र)",
      mr: "मुख्यमंत्री माझी लाडकी बहीण योजना (महाराष्ट्र)"
    },
    short_desc: {
      en: "Monthly direct cash transfer of ₹1,500 (₹18,000/year) to women aged 21-65 years residing in Maharashtra with annual family income up to ₹2.5 Lakh.",
      hi: "महाराष्ट्र की 21-65 वर्ष की महिलाओं को ₹1,500 मासिक (₹18,000/वर्ष) सीधी नकद सहायता (पारिवारिक आय ₹2.5 लाख तक)।",
      mr: "महाराष्ट्रातील २१ ते ६५ वयोगटातील पात्र महिलांना दरमहा ₹१,५०० (वार्षिक ₹१८,०००) थेट आर्थिक मदत (कौटुंबिक उत्पन्न ₹२.५ लाखांपर्यंत)."
    },
    benefit_amount: "₹1,500 / month (₹18,000 / year)",
    benefit_frequency: "Monthly Direct Bank Transfer (DBT)",
    rules: {
      state: ["Maharashtra"],
      gender: ["female"],
      min_age: 21,
      max_age: 65,
      max_income: 250000
    },
    required_documents: [
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "domicile", name: { en: "Maharashtra Domicile Certificate or 15-Yr Ration Card", hi: "महाराष्ट्र अधिवास प्रमाण पत्र या राशन कार्ड", mr: "महाराष्ट्र अधिवास प्रमाणपत्र किंवा १५ वर्षे जुने रेशन कार्ड" }, mandatory: true },
      { id: "income_cert", name: { en: "Income Certificate (< ₹2.5 Lakh) or Yellow/Orange Ration Card", hi: "आय प्रमाण पत्र (< 2.5 लाख) या पीला/नारंगी राशन कार्ड", mr: "उत्पन्नाचा दाखला (< २.५ लाख) किंवा पिवळे/केशरी रेशन कार्ड" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Self Bank Account linked with Aadhaar", hi: "आधार लिंक स्वयं बैंक खाता", mr: "स्वतःचे आधार लिंक बँक खाते" }, mandatory: true }
    ],
    apply_mode: "Online (Nari Shakti Doot App / Aaple Sarkar) & Anganwadi / Setu Kendra",
    official_url: "https://ladakibahin.maharashtra.gov.in",
    source_url: "https://womenchild.maharashtra.gov.in",
    last_verified: "2024-09-01",
    qa: [
      {
        q: { en: "Can married or widowed women apply?", hi: "क्या विवाहित, विधवा या तलाकशुदा महिलाएं आवेदन कर सकती हैं?", mr: "विवाहित, विधवा किंवा घटस्फोटित महिला अर्ज करू शकतात का?" },
        a: { en: "Yes! Married, unmarried, widowed, divorced, and destitute women between 21 and 65 are all eligible.", hi: "हाँ! 21 से 65 वर्ष की सभी विवाहित, अविवाहित, विधवा, परित्यक्ता महिलाएं पात्र हैं।", mr: "होय! २१ ते ६५ वयोगटातील विवाहित, अविवाहित, विधवा, घटस्फोटित आणि निराधार महिला सर्व पात्र आहेत." }
      },
      {
        q: { en: "If I don't have an income certificate, can I use a Ration Card?", hi: "यदि मेरे पास आय प्रमाण पत्र नहीं है, तो क्या राशन कार्ड चलेगा?", mr: "माझ्याकडे उत्पन्नाचा दाखला नसल्यास रेशन कार्ड चालेल का?" },
        a: { en: "Yes! Yellow or Orange Ration card holders do NOT require a separate Tehsildar income certificate.", hi: "हाँ! पीले या नारंगी राशन कार्ड धारकों को अलग से आय प्रमाण पत्र की आवश्यकता नहीं है।", mr: "होय! पिवळे किंवा केशरी रेशन कार्ड असल्यास स्वतंत्र उत्पन्नाच्या दाखल्याची गरज नाही." }
      }
    ]
  },
  {
    id: "ayushman_bharat",
    category: "Health & Medical Assistance",
    level: "Central",
    state: "All",
    name: {
      en: "Ayushman Bharat PM-JAY (Health Insurance)",
      hi: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (PM-JAY)",
      mr: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (PM-JAY)"
    },
    short_desc: {
      en: "Cashless health cover of up to ₹5 Lakh per family per year for secondary and tertiary hospitalization across empanelled private and public hospitals.",
      hi: "सूचीबद्ध सरकारी व निजी अस्पतालों में ₹5 लाख प्रति परिवार प्रति वर्ष तक का कैशलेस इलाज व स्वास्थ्य बीमा।",
      mr: "नोंदणीकृत सरकारी व खाजगी रुग्णालयांमध्ये दरवर्षी प्रति कुटुंब ₹५ लाखांपर्यंत मोफत व कॅशलेस आरोग्य उपचार."
    },
    benefit_amount: "₹5,00,000 / family / year",
    benefit_frequency: "Cashless in-patient treatment",
    rules: {
      max_income: 250000,
      gender: ["all"]
    },
    required_documents: [
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "ration_card", name: { en: "Ration Card or Family ID", hi: "राशन कार्ड या समग्र आईडी", mr: "रेशन कार्ड किंवा कुटुंब ओळखपत्र" }, mandatory: true }
    ],
    apply_mode: "Ayushman Mitra at Hospital / CSC / PMJAY Portal",
    official_url: "https://pmjay.gov.in",
    source_url: "https://nha.gov.in",
    last_verified: "2024-09-10",
    qa: [
      {
        q: { en: "Are senior citizens covered regardless of income?", hi: "क्या वरिष्ठ नागरिकों को आय सीमा के बिना कवर किया गया है?", mr: "ज्येष्ठ नागरिकांना उत्पन्न मर्यादेशिवाय संरक्षण मिळते का?" },
        a: { en: "Yes! As per the latest 2024 expansion, all senior citizens aged 70+ receive a dedicated ₹5 Lakh top-up cover irrespective of income.", hi: "हाँ! हाल ही के 2024 विस्तार के अनुसार 70 वर्ष से अधिक उम्र के सभी बुजुर्गों को बिना आय सीमा ₹5 लाख का कवर मिलता है।", mr: "होय! २०२४ च्या नवीन विस्तारानुसार ७० वर्षे व त्यावरील सर्व ज्येष्ठ नागरिकांना उत्पन्नाची अट न ठेवता ₹५ लाखांचे स्वतंत्र आरोग्य कवच मिळते." }
      }
    ]
  },
  {
    id: "pm_awas_gramin",
    category: "Housing",
    level: "Central",
    state: "All",
    name: {
      en: "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
      hi: "प्रधानमंत्री आवास योजना - ग्रामीण (PMAY-G)",
      mr: "प्रधानमंत्री आवास योजना - ग्रामीण (PMAY-G)"
    },
    short_desc: {
      en: "Financial assistance of ₹1.20 Lakh (plains) to ₹1.30 Lakh (hilly areas) + 90 days MGNREGA wages to construct a permanent pucca house with toilet.",
      hi: "ग्रामीण बेघर या कच्चे मकान वाले परिवारों को पक्का मकान निर्माण हेतु ₹1.20 लाख सहायता + मनरेगा मजदूरी।",
      mr: "ग्रामीण भागातील बेघर किंवा कच्च्या घरात राहणाऱ्या कुटुंबांना पक्के घर बांधण्यासाठी ₹१.२० लाख ते ₹१.३० लाख आर्थिक अनुदान."
    },
    benefit_amount: "₹1,20,000 + MGNREGA Wages + ₹12,000 for toilet",
    benefit_frequency: "Direct instalment on construction milestone",
    rules: {
      max_income: 200000,
      min_age: 18,
      occupation: ["daily_wage", "farmer", "unemployed", "artisan"],
      gender: ["all"]
    },
    required_documents: [
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Bank Passbook", hi: "बैंक पासबुक", mr: "बँक पासबुक" }, mandatory: true },
      { id: "job_card", name: { en: "MGNREGA Job Card (if available)", hi: "मनरेगा जॉब कार्ड", mr: "मनरेगा जॉब कार्ड" }, mandatory: false },
      { id: "land_docs", name: { en: "Proof of Land / Plot ownership or Gram Panchayat Certificate", hi: "भूमि या ग्राम पंचायत प्रमाण पत्र", mr: "जागेची मालकी किंवा ग्रामपंचायत नाहरकत दाखला" }, mandatory: true }
    ],
    apply_mode: "Gram Panchayat / Block Development Office / AwaasApp",
    official_url: "https://pmayg.nic.in",
    source_url: "https://rural.gov.in",
    last_verified: "2024-07-18",
    qa: [
      {
        q: { en: "Who decides the beneficiary list?", hi: "लाभार्थी सूची कौन तय करता है?", mr: "लाभार्थी यादी कोण ठरवते?" },
        a: { en: "Beneficiaries are identified using SECC data and verified in Gram Sabha meetings.", hi: "लाभार्थियों की पहचान SECC 2011 डेटा और ग्राम सभा द्वारा सत्यापन से की जाती है।", mr: "ग्रामसभेच्या बैठकीत दारिद्र्यरेषेखालील यादी व घराच्या स्थितीची प्रत्यक्ष पडताळणी करून यादी तयार होते." }
      }
    ]
  },
  {
    id: "sanjay_gandhi_niradhar",
    category: "Senior Citizen/Pension",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Sanjay Gandhi Niradhar Anudan Yojana",
      hi: "संजय गांधी निराधार अनुदान योजना (महाराष्ट्र)",
      mr: "संजय गांधी निराधार अनुदान योजना (महाराष्ट्र)"
    },
    short_desc: {
      en: "Monthly pension of ₹1,500 for destitute persons, disabled persons, widows, and persons suffering from major diseases with annual family income under ₹21,000.",
      hi: "निराधार, दिव्यांग, विधवा व गंभीर बीमारी से पीड़ित व्यक्तियों को ₹1,500 प्रति माह पेंशन (पारिवारिक आय ₹21,000 से कम)।",
      mr: "निराधार व्यक्ती, ६५ वर्षांखालील विधवा, अनाथ बालके व दिव्यांग व्यक्तींना दरमहा ₹१,५०० निवृत्तिवेतन (वार्षिक उत्पन्न मर्यादा ₹२१,०००)."
    },
    benefit_amount: "₹1,500 / month",
    benefit_frequency: "Monthly",
    rules: {
      state: ["Maharashtra"],
      max_income: 50000,
      gender: ["all"]
    },
    required_documents: [
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "income_cert", name: { en: "Income Certificate issued by Tehsildar", hi: "तहसीलदार द्वारा जारी आय प्रमाण पत्र", mr: "तहसीलदारांचा उत्पन्नाचा दाखला" }, mandatory: true },
      { id: "age_proof", name: { en: "Age Proof / School Leaving Certificate", hi: "आयु प्रमाण पत्र", mr: "वयाचा दाखला / शाळा सोडल्याचा दाखला" }, mandatory: true },
      { id: "domicile", name: { en: "15-year Maharashtra Domicile Certificate", hi: "15 वर्ष महाराष्ट्र अधिवास प्रमाण पत्र", mr: "किमान १५ वर्षे महाराष्ट्रात वास्तव्याचा दाखला" }, mandatory: true }
    ],
    apply_mode: "Tehsildar Office / Aaple Sarkar Kendra / Setu Kendra",
    official_url: "https://sjsa.maharashtra.gov.in",
    source_url: "https://aaplesarkar.mahaonline.gov.in",
    last_verified: "2024-06-30",
    qa: [
      {
        q: { en: "Where do I submit this application?", hi: "यह आवेदन कहाँ जमा करना होता है?", mr: "हा अर्ज कोठे सादर करावा लागतो?" },
        a: { en: "Submit at your local Taluka Tehsildar office (Sanjay Gandhi Yojana branch) or Aaple Sarkar Seva Kendra.", hi: "अपने स्थानीय तहसील कार्यालय की संजय गांधी शाखा या आपले सरकार केंद्र पर जमा करें।", mr: "आपल्या तालुक्यातील तहसील कार्यालयातील संजय गांधी योजना शाखेत किंवा नजीकच्या आपले सरकार केंद्रावर." }
      }
    ]
  },
  {
    id: "shravanbal_yojana",
    category: "Senior Citizen/Pension",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Shravanbal Seva Rajya Nivruttivetan Yojana",
      hi: "श्रावणबाळ सेवा राज्य निवृत्तीवेतन योजना (महाराष्ट्र)",
      mr: "श्रावणबाळ सेवा राज्य निवृत्तीवेतन योजना (महाराष्ट्र)"
    },
    short_desc: {
      en: "Monthly state pension of ₹1,500 for destitute senior citizens aged 65 years and above in Maharashtra.",
      hi: "महाराष्ट्र में 65 वर्ष या अधिक आयु के निराधार व गरीब वरिष्ठ नागरिकों को ₹1,500 प्रतिमाह पेंशन।",
      mr: "महाराष्ट्रातील ६५ वर्षे व त्याहून अधिक वयाच्या निराधार ज्येष्ठ नागरिकांना दरमहा ₹१,५०० राज्य निवृत्तिवेतन."
    },
    benefit_amount: "₹1,500 / month",
    benefit_frequency: "Monthly Direct Credit",
    rules: {
      state: ["Maharashtra"],
      min_age: 65,
      max_income: 50000,
      gender: ["all"]
    },
    required_documents: [
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "age_proof", name: { en: "Age Certificate (Doctor / Birth certificate)", hi: "आयु प्रमाण पत्र", mr: "वयाचा पुरावा" }, mandatory: true },
      { id: "income_cert", name: { en: "Income Certificate issued by Tehsildar (< ₹21,000)", hi: "तहसीलदार आय प्रमाण पत्र", mr: "तहसीलदारांचा उत्पन्नाचा दाखला" }, mandatory: true },
      { id: "domicile", name: { en: "Maharashtra Residence Proof (15 Years)", hi: "15 वर्ष निवास प्रमाण", mr: "१५ वर्षे महाराष्ट्रात वास्तव्याचा पुरावा" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Bank Passbook", hi: "बैंक पासबुक", mr: "बँक पासबुक" }, mandatory: true }
    ],
    apply_mode: "Tehsildar Office / Aaple Sarkar Portal",
    official_url: "https://sjsa.maharashtra.gov.in",
    source_url: "https://gr.maharashtra.gov.in",
    last_verified: "2024-07-12",
    qa: [
      {
        q: { en: "Can I receive both central old age pension and Shravanbal?", hi: "क्या मुझे केंद्रीय वृद्धावस्था पेंशन और श्रावणबाळ दोनों मिल सकते हैं?", mr: "मला केंद्रीय वृद्धापकाळ पेन्शन आणि श्रावणबाळ दोन्ही मिळतील का?" },
        a: { en: "BPL seniors get category A (Central + State combined = ₹1,500/mo), non-BPL with income < ₹21,000 get Category B solely from Maharashtra Govt (₹1,500/mo).", hi: "बीपीएल वृद्धों को केंद्र+राज्य मिलाकर ₹1500 मिलते हैं, और गैर-बीपीएल लेकिन 21,000 से कम आय वालों को राज्य सरकार से ₹1500 मिलते हैं।", mr: "बीपीएल वृद्धांना गट 'अ' अंतर्गत केंद्र+राज्य मिळून ₹१,५०० मिळतात, तर गट 'ब' मधील अल्प उत्पन्न वृद्धांना राज्य शासनाकडून ₹१,५०० मिळतात." }
      }
    ]
  },
  {
    id: "post_matric_scholarship",
    category: "Student/Scholarship/Education",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Post-Matric Scholarship for SC/ST/OBC/VJNT (MahaDBT)",
      hi: "मैट्रिकोत्तर छात्रवृत्ति योजना - एससी/एसटी/ओबीसी (महाडीबीटी)",
      mr: "मॅट्रिकोत्तर शिष्यवृत्ती योजना (MahaDBT)"
    },
    short_desc: {
      en: "100% Tuition fee & exam fee reimbursement + monthly hostel & maintenance allowance for students pursuing 11th, Degree, Diploma, Engineering, Medical.",
      hi: "11वीं, स्नातक, डिप्लोमा, इंजीनियरिंग या मेडिकल के छात्रों को 100% शिक्षण शुल्क प्रतिपूर्ति एवं मासिक निर्वाह भत्ता।",
      mr: "११ वी, १२ वी, पदवी, पदविका, अभियांत्रिकी व वैद्यकीय शिक्षण घेणाऱ्या आरक्षित व आर्थिक दुर्बल विद्यार्थ्यांना १००% शिक्षण शुल्क परतावा व निर्वाह भत्ता."
    },
    benefit_amount: "100% Tuition Fee + ₹5,000-₹12,000 Maintenance Allowance",
    benefit_frequency: "Annual / Per Semester",
    rules: {
      state: ["Maharashtra"],
      occupation: ["student"],
      category: ["SC", "ST", "OBC", "VJNT", "SBC", "EWS"],
      max_income: 250000,
      gender: ["all"]
    },
    required_documents: [
      { id: "caste_cert", name: { en: "Caste Certificate & Validity", hi: "जाति प्रमाण पत्र एवं वैधता", mr: "जात प्रमाणपत्र आणि जात पडताळणी प्रमाणपत्र" }, mandatory: true },
      { id: "income_cert", name: { en: "Income Certificate (< ₹2.5 Lakh from Tehsildar)", hi: "सक्षम प्राधिकारी आय प्रमाण पत्र", mr: "तहसीलदारांचा उत्पन्नाचा दाखला" }, mandatory: true },
      { id: "marksheet", name: { en: "10th / 12th / Previous Year Marksheet", hi: "पिछली कक्षा की अंकसूची", mr: "मागील वर्षाचे गुणपत्रक" }, mandatory: true },
      { id: "college_bonafide", name: { en: "College Fee Receipt & Bonafide Certificate", hi: "कॉलेज शुल्क रसीद एवं बोनाफाइड", mr: "कॉलेज प्रवेश पावती व बोनाफाईड प्रमाणपत्र" }, mandatory: true },
      { id: "aadhaar", name: { en: "Aadhaar Card linked to Bank Account", hi: "आधार कार्ड", mr: "बँक खात्याशी लिंक आधार कार्ड" }, mandatory: true }
    ],
    apply_mode: "MahaDBT Portal (Online)",
    official_url: "https://mahadbt.maharashtra.gov.in",
    source_url: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A467",
    last_verified: "2024-08-30",
    qa: [
      {
        q: { en: "What is the deadline for MahaDBT scholarship submission?", hi: "महाडीबीटी छात्रवृत्ति जमा करने की अंतिम तिथि क्या है?", mr: "महाडीबीटी शिष्यवृत्ती अर्ज करण्याची शेवटची मुदत कोणती?" },
        a: { en: "Usually applications run from August through December each academic year, with periodic extensions for verification.", hi: "आमतौर पर शैक्षणिक वर्ष में आवेदन अगस्त से दिसंबर तक स्वीकार किए जाते हैं।", mr: "प्रत्येक शैक्षणिक वर्षात साधारणपणे ऑगस्ट ते डिसेंबर दरम्यान अर्ज स्वीकारले जातात." }
      }
    ]
  },
  {
    id: "pm_mudra_yojana",
    category: "MSME/Business/Entrepreneurship",
    level: "Central",
    state: "All",
    name: {
      en: "PM Mudra Yojana (PMMY)",
      hi: "प्रधानमंत्री मुद्रा योजना (PMMY)",
      mr: "प्रधानमंत्री मुद्रा योजना (PMMY)"
    },
    short_desc: {
      en: "Collateral-free business loans up to ₹10 Lakh (Shishu: up to ₹50k, Kishore: ₹50k-5L, Tarun: ₹5L-10L) for small businesses, shops, and micro-enterprises.",
      hi: "छोटे व्यापारियों, दुकानों व कुटीर उद्योगों के लिए ₹10 लाख तक बिना गारंटी (कोलैटरल-फ्री) व्यापार ऋण।",
      mr: "लहान व्यावसायिक, दुकानदार, कारागीर यांच्यासाठी विनातारण (तारणमुक्त) ₹१० लाखांपर्यंत व्यवसाय कर्ज (शिशू, किशोर आणि तरुण श्रेणी)."
    },
    benefit_amount: "Loans from ₹50,000 up to ₹10,00,000",
    benefit_frequency: "Subsidized term loan / working capital",
    rules: {
      min_age: 18,
      occupation: ["artisan", "self_employed", "unemployed", "daily_wage"],
      gender: ["all"]
    },
    required_documents: [
      { id: "aadhaar", name: { en: "Aadhaar Card & PAN Card", hi: "आधार कार्ड एवं पैन कार्ड", mr: "आधार कार्ड आणि पॅन कार्ड" }, mandatory: true },
      { id: "business_proof", name: { en: "Business Registration / Udyam Certificate or Shop Act License", hi: "उद्यम पंजीकरण / दुकान लाइसेंस", mr: "उद्योग आधार / उद्यम नोंदणी किंवा शॉप अ‍ॅक्ट लायसन्स" }, mandatory: true },
      { id: "bank_statement", name: { en: "Last 6 Months Bank Statement", hi: "पिछले 6 महीने का बैंक स्टेटमेंट", mr: "मागील ६ महिन्यांचे बँक स्टेटमेंट" }, mandatory: true }
    ],
    apply_mode: "Any Bank Branch, NBFC, or Udyamimitra Portal",
    official_url: "https://www.mudra.org.in",
    source_url: "https://financialservices.gov.in/beta/en/pmmy",
    last_verified: "2024-09-05",
    qa: [
      {
        q: { en: "Is any guarantor or property collateral required for Mudra loans?", hi: "क्या मुद्रा ऋण के लिए कोई गारंटर या संपत्ति गिरवी रखनी पड़ती है?", mr: "मुद्रा कर्जासाठी गॅरेंटर किंवा मालमत्ता गहाण ठेवावी लागते का?" },
        a: { en: "No! Mudra loans are 100% collateral-free and backed by the Credit Guarantee Fund for Micro Units.", hi: "नहीं! मुद्रा लोन 100% संपार्श्विक-मुक्त (बिना गारंटी) होते हैं।", mr: "नाही! मुद्रा कर्ज पूर्णपणे तारणमुक्त असते व त्यास केंद्र शासनाची हमी असते." }
      }
    ]
  },
  {
    id: "pm_vishwakarma",
    category: "Livelihood & Development",
    level: "Central",
    state: "All",
    name: {
      en: "PM Vishwakarma Scheme",
      hi: "पीएम विश्वकर्मा योजना",
      mr: "पीएम विश्वकर्मा योजना"
    },
    short_desc: {
      en: "End-to-end support for 18 traditional artisans & craftspeople: ₹15,000 toolkit e-voucher, skill training with ₹500/day stipend, and 5% subsidized loan up to ₹3 Lakh.",
      hi: "18 पारंपरिक कारीगरों व शिल्पकारों हेतु ₹15,000 टूलकिट अनुदान, ₹500/दिन प्रशिक्षण भत्ता और 5% ब्याज पर ₹3 लाख तक आसान ऋण।",
      mr: "१८ पारंपारिक कारागीर व बलुतेदारांसाठी ₹१५,००० टूलकिट ई-व्हाउचर, मोफत कौशल्य प्रशिक्षण (रोज ₹५०० विद्यावेतन) व ५% सवलतीच्या दरात ₹३ लाखांपर्यंत विनातारण कर्ज."
    },
    benefit_amount: "₹15,00,000 max support (₹15,000 Toolkit + ₹3,00,000 Collateral-free loan @ 5%)",
    benefit_frequency: "One-time toolkit + 2 loan tranches",
    rules: {
      min_age: 18,
      occupation: ["artisan", "self_employed", "daily_wage"],
      gender: ["all"]
    },
    required_documents: [
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Bank Passbook", hi: "बैंक पासबुक", mr: "बँक पासबुक" }, mandatory: true },
      { id: "artisan_declaration", name: { en: "Trade / Craft Self-Declaration (Carpenter, Potter, Blacksmith, Cobbler, Tailor etc.)", hi: "पारंपरिक व्यवसाय स्व-घोषणा", mr: "पारंपारिक व्यवसायाचे स्वयं-घोषणापत्र (सुतार, कुंभार, लोहार, चांभार, शिंपी इ.)" }, mandatory: true }
    ],
    apply_mode: "CSC Center / PM Vishwakarma Portal",
    official_url: "https://pmvishwakarma.gov.in",
    source_url: "https://msme.gov.in/pm-vishwakarma",
    last_verified: "2024-08-10",
    qa: [
      {
        q: { en: "Which 18 trades are eligible?", hi: "कौन से 18 पारंपरिक व्यवसाय इसमें शामिल हैं?", mr: "यामध्ये कोणत्या १८ पारंपारिक व्यवसायांचा समावेश आहे?" },
        a: { en: "Carpenters, boat builders, armourers, blacksmiths, hammer makers, locksmiths, sculptors, goldsmiths, potters, cobblers, masons, basket weavers, doll/toy makers, barbers, garland makers, washermen, tailors, fishing net makers.", hi: "बढ़ई, लोहार, सुनार, कुम्हार, मूर्तिकार, मोची, राजमिस्त्री, नाई, धोबी, दर्जी आदि।", mr: "सुतार, लोहार, सोनार, कुंभार, मूर्तिकार, चांभार, गवंडी, नाभिक (न्हावी), धोबी, शिंपी, मासेमारी जाळे विणणारे इत्यादी." }
      }
    ]
  },
  {
    id: "atal_pension_yojana",
    category: "Senior Citizen/Pension",
    level: "Central",
    state: "All",
    name: {
      en: "Atal Pension Yojana (APY)",
      hi: "अटल पेंशन योजना (APY)",
      mr: "अटल पेन्शन योजना (APY)"
    },
    short_desc: {
      en: "Guaranteed monthly pension of ₹1,000 to ₹5,000 after reaching 60 years of age for citizens working in unorganized sectors.",
      hi: "असंगठित क्षेत्र के कामगारों को 60 वर्ष की आयु के बाद ₹1,000 से ₹5,000 तक की आजीवन मासिक गारंटीकृत पेंशन।",
      mr: "असंघटित क्षेत्रातील कामगारांना वयाच्या ६० वर्षांनंतर दरमहा ₹१,००० ते ₹५,००० ची खात्रीशीर आजन्म पेन्शन."
    },
    benefit_amount: "₹1,000 to ₹5,000 / month pension after age 60",
    benefit_frequency: "Monthly lifetime pension",
    rules: {
      min_age: 18,
      max_age: 40,
      gender: ["all"]
    },
    required_documents: [
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Savings Bank Account / Post Office Account", hi: "बैंक / डाकघर बचत खाता", mr: "बँक / पोस्ट ऑफिस बचत खाते" }, mandatory: true }
    ],
    apply_mode: "Any Bank Branch or NetBanking",
    official_url: "https://www.npscra.nsdl.co.in/scheme-details.php",
    source_url: "https://financialservices.gov.in/pension-reforms-divisions/Atal-Pension-Yojana",
    last_verified: "2024-06-15",
    qa: [
      {
        q: { en: "Can an income taxpayer join APY?", hi: "क्या आयकर दाता एपीवाई में शामिल हो सकते हैं?", mr: "आयकर भरणारे नागरिक या योजनेत सामील होऊ शकतात का?" },
        a: { en: "No, anyone who is or has been an income-tax payer is not eligible to join APY since Oct 2022.", hi: "नहीं, अक्टूबर 2022 से कोई भी व्यक्ति जो आयकर दाता है वह एपीवाई के लिए पात्र नहीं है।", mr: "नाही, ऑक्टोबर २०२२ पासून आयकर भरणाऱ्या व्यक्ती या योजनेसाठी पात्र नाहीत." }
      }
    ]
  },
  {
    id: "pmsby_insurance",
    category: "Insurance/Social Security",
    level: "Central",
    state: "All",
    name: {
      en: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
      hi: "प्रधानमंत्री सुरक्षा बीमा योजना (PMSBY)",
      mr: "प्रधानमंत्री सुरक्षा विमा योजना (PMSBY)"
    },
    short_desc: {
      en: "Accidental death and disability insurance cover of ₹2 Lakh for just ₹20 annual premium for anyone aged 18 to 70.",
      hi: "मात्र ₹20 वार्षिक प्रीमियम पर ₹2 लाख का दुर्घटना मृत्यु एवं दिव्यांगता बीमा कवर (आयु 18-70 वर्ष)।",
      mr: "केवळ ₹२० वार्षिक हप्त्यामध्ये ₹२ लाखांचे अपघाती मृत्यू व अपंगत्व विमा संरक्षण (वय १८ ते ७० वर्षे)."
    },
    benefit_amount: "₹2,00,000 for accidental death / total disability",
    benefit_frequency: "Annual auto-debit of ₹20",
    rules: {
      min_age: 18,
      max_age: 70,
      gender: ["all"]
    },
    required_documents: [
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Bank / Post Office Account with Auto-Debit Consent", hi: "ऑटो-डेबिट सहमति सहित बैंक खाता", mr: "ऑटो-डेबिट संमती असलेले बँक खाते" }, mandatory: true }
    ],
    apply_mode: "Bank Branch, Post Office, or Bank Mobile App",
    official_url: "https://www.jansuraksha.gov.in",
    source_url: "https://financialservices.gov.in",
    last_verified: "2024-07-01",
    qa: [
      {
        q: { en: "How is the premium paid?", hi: "प्रीमियम का भुगतान कैसे होता है?", mr: "विमा हप्ता कसा भरला जातो?" },
        a: { en: "The ₹20 premium is automatically debited every year in May from your savings account.", hi: "हर साल मई महीने में ₹20 का प्रीमियम आपके बचत खाते से स्वतः कट जाता है।", mr: "दरवर्षी मे महिन्यात ₹२० चा हप्ता तुमच्या बँक खात्यातून आपोआप वजा केला जातो." }
      }
    ]
  },
  {
    id: "pmjjby_life_insurance",
    category: "Insurance/Social Security",
    level: "Central",
    state: "All",
    name: {
      en: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
      hi: "प्रधानमंत्री जीवन ज्योति बीमा योजना (PMJJBY)",
      mr: "प्रधानमंत्री जीवन ज्योती विमा योजना (PMJJBY)"
    },
    short_desc: {
      en: "Life insurance cover of ₹2 Lakh on death due to any reason for persons aged 18 to 50 for a modest premium of ₹436/year.",
      hi: "किसी भी कारण से मृत्यु पर ₹2 लाख का जीवन बीमा कवर मात्र ₹436 प्रति वर्ष के प्रीमियम पर (आयु 18-50 वर्ष)।",
      mr: "कोणत्याही कारणाने मृत्यू झाल्यास ₹२ लाखांचे जीवन विमा संरक्षण (वय १८ ते ५० वर्षे, वार्षिक हप्ता फक्त ₹४३६)."
    },
    benefit_amount: "₹2,00,000 life risk cover",
    benefit_frequency: "Annual auto-debit of ₹436",
    rules: {
      min_age: 18,
      max_age: 50,
      gender: ["all"]
    },
    required_documents: [
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Savings Bank Account", hi: "बैंक बचत खाता", mr: "बँक बचत खाते" }, mandatory: true }
    ],
    apply_mode: "Bank Branch, Post Office, or NetBanking",
    official_url: "https://www.jansuraksha.gov.in",
    source_url: "https://financialservices.gov.in",
    last_verified: "2024-07-01",
    qa: [
      {
        q: { en: "Does it require a medical test?", hi: "क्या इसके लिए किसी मेडिकल जांच की आवश्यकता है?", mr: "यासाठी वैद्यकीय तपासणीची गरज आहे का?" },
        a: { en: "No medical examination required! Simple self-declaration of good health at enrolment.", hi: "किसी मेडिकल जांच की आवश्यकता नहीं है, केवल नामांकन पर सरल स्वास्थ्य घोषणा पर्याप्त है।", mr: "कोणत्याही वैद्यकीय तपासणीची आवश्यकता नाही, केवळ साध्या स्वयं-घोषणापत्रावर नोंदणी होते." }
      }
    ]
  },
  {
    id: "sukanya_samriddhi",
    category: "Women & Child Welfare",
    level: "Central",
    state: "All",
    name: {
      en: "Sukanya Samriddhi Yojana (SSY)",
      hi: "सुकन्या समृद्धि योजना (SSY)",
      mr: "सुकन्या समृद्धी योजना (SSY)"
    },
    short_desc: {
      en: "High-interest (8.2%) government-backed savings scheme for girl children below 10 years of age with complete tax exemption under 80C.",
      hi: "10 वर्ष से कम उम्र की बालिकाओं हेतु 8.2% ब्याज दर वाली सरकारी बचत योजना (धारा 80C के तहत पूर्ण कर छूट)।",
      mr: "१० वर्षांखालील मुलींच्या उज्ज्वल भविष्यासाठी ८.२% उच्च व्याजदर असलेली शासनमान्य बचत योजना (८०सी अंतर्गत करमुक्त)."
    },
    benefit_amount: "8.2% Guaranteed Interest + Tax Free compounding",
    benefit_frequency: "Deposits from ₹250 to ₹1,50,000 per financial year",
    rules: {
      gender: ["female"],
      max_age: 10
    },
    required_documents: [
      { id: "birth_cert", name: { en: "Girl Child Birth Certificate", hi: "बालिका का जन्म प्रमाण पत्र", mr: "मुलीचा जन्म दाखला" }, mandatory: true },
      { id: "guardian_aadhaar", name: { en: "Parent / Guardian Aadhaar & PAN", hi: "माता/पिता का आधार व पैन", mr: "पालकांचे आधार कार्ड व पॅन कार्ड" }, mandatory: true },
      { id: "address_proof", name: { en: "Address Proof", hi: "निवास प्रमाण पत्र", mr: "रहिवासी पुरावा" }, mandatory: true }
    ],
    apply_mode: "Any Post Office or Authorised Bank Branch",
    official_url: "https://www.indiapost.gov.in",
    source_url: "https://financialservices.gov.in",
    last_verified: "2024-08-01",
    qa: [
      {
        q: { en: "When can money be withdrawn?", hi: "पैसे कब निकाले जा सकते हैं?", mr: "पैसे कधी काढता येतात?" },
        a: { en: "50% for higher education after girl turns 18; full closure upon marriage after 18 or 21 years from account opening.", hi: "लड़की के 18 वर्ष का होने पर उच्च शिक्षा हेतु 50% तथा 21 वर्ष बाद या विवाह पर पूरा खाता बंद किया जा सकता है।", mr: "मुलगी १८ वर्षांची झाल्यावर उच्च शिक्षणासाठी ५०% रक्कम काढता येते, तर २१ वर्षांनंतर किंवा विवाहाच्या वेळी संपूर्ण रक्कम मिळते." }
      }
    ]
  },
  {
    id: "bal_sangopan",
    category: "Women & Child Welfare",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Bal Sangopan Yojana (Maharashtra)",
      hi: "बाल संगोपन योजना (महाराष्ट्र)",
      mr: "बाल संगोपन योजना (महाराष्ट्र)"
    },
    short_desc: {
      en: "Monthly financial aid of ₹2,250 for children of single mothers, widows, divorced women, or children facing extreme distress in Maharashtra.",
      hi: "महाराष्ट्र में एकल माताओं, विधवाओं अथवा संकटग्रस्त परिवारों के बच्चों की परवरिश व शिक्षा हेतु ₹2,250 मासिक सहायता।",
      mr: "एकल पालक, विधवा, घटस्फोटित महिला अथवा संकटग्रस्त कुटुंबातील बालकांच्या शिक्षण व संगोपनासाठी दरमहा ₹२,२५० आर्थिक मदत."
    },
    benefit_amount: "₹2,250 / month per child",
    benefit_frequency: "Monthly",
    rules: {
      state: ["Maharashtra"],
      max_income: 150000,
      gender: ["all"]
    },
    required_documents: [
      { id: "child_birth_cert", name: { en: "Child Birth Certificate & School Bonafide", hi: "बच्चे का जन्म प्रमाण पत्र व स्कूल बोनाफाइड", mr: "मुलाचा जन्म दाखला व शाळेचा बोनाफाईड दाखला" }, mandatory: true },
      { id: "income_cert", name: { en: "Income Certificate (< ₹1.5 Lakh)", hi: "तहसीलदार आय प्रमाण पत्र", mr: "तहसीलदारांचा उत्पन्नाचा दाखला" }, mandatory: true },
      { id: "mother_status", name: { en: "Death certificate of father / Divorce paper / Single status certificate", hi: "पिता का मृत्यु प्रमाण पत्र या विधिक दस्तावेज", mr: "वडिलांचा मृत्यू दाखला किंवा एकल पालकत्वाचा पुरावा" }, mandatory: true },
      { id: "aadhaar", name: { en: "Aadhaar of Mother & Child", hi: "माता व बच्चे का आधार", mr: "आई व पाल्याचे आधार कार्ड" }, mandatory: true }
    ],
    apply_mode: "District Women & Child Development Office (DWCDO) / Child Welfare Committee",
    official_url: "https://womenchild.maharashtra.gov.in",
    source_url: "https://gr.maharashtra.gov.in",
    last_verified: "2024-05-15",
    qa: [
      {
        q: { en: "Up to what age is the benefit provided?", hi: "यह लाभ बच्चे की किस उम्र तक मिलता है?", mr: "हा लाभ पाल्याच्या कोणत्या वयापर्यंत मिळतो?" },
        a: { en: "Until the child completes 18 years of age or completes education.", hi: "जब तक बच्चा 18 वर्ष का नहीं हो जाता या अपनी स्कूली शिक्षा पूरी नहीं कर लेता।", mr: "पाल्य १८ वर्षांचा होईपर्यंत किंवा शिक्षण पूर्ण होईपर्यंत दरमहा लाभ मिळतो." }
      }
    ]
  },
  {
    id: "ign_oaps",
    category: "Senior Citizen/Pension",
    level: "Central",
    state: "All",
    name: {
      en: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
      hi: "इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना (IGNOAPS)",
      mr: "इंदिरा गांधी राष्ट्रीय वृद्धापकाळ निवृत्तीवेतन योजना"
    },
    short_desc: {
      en: "Central social assistance monthly pension for BPL senior citizens aged 60 and above.",
      hi: "60 वर्ष या उससे अधिक आयु के बीपीएल परिवारों के बुजुर्गों के लिए केंद्र सरकार की मासिक पेंशन सहायता।",
      mr: "दारिद्र्यरेषेखालील ६० वर्षे व त्यावरील वयोवृद्ध नागरिकांसाठी केंद्र शासनाची राष्ट्रीय निवृत्तिवेतन योजना."
    },
    benefit_amount: "₹1,000 to ₹1,500 / month (with State top-up)",
    benefit_frequency: "Monthly",
    rules: {
      min_age: 60,
      max_income: 50000,
      gender: ["all"]
    },
    required_documents: [
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "bpl_card", name: { en: "BPL Ration Card / BPL Survey Number", hi: "बीपीएल राशन कार्ड", mr: "दारिद्र्यरेषेखालील (BPL) रेशन कार्ड" }, mandatory: true },
      { id: "age_proof", name: { en: "Age Proof Certificate", hi: "आयु प्रमाण पत्र", mr: "वयाचा पुरावा" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Bank Passbook", hi: "बैंक पासबुक", mr: "बँक पासबुक" }, mandatory: true }
    ],
    apply_mode: "Local Tahsildar / Block Development Office / NSAP Portal",
    official_url: "https://nsap.nic.in",
    source_url: "https://nsap.nic.in/Guidelines.pdf",
    last_verified: "2024-07-25",
    qa: [
      {
        q: { en: "Is BPL card mandatory?", hi: "क्या बीपीएल कार्ड अनिवार्य है?", mr: "बीपीएल कार्ड असणे बंधनकारक आहे का?" },
        a: { en: "Yes, applicant must belong to a household listed below the poverty line according to criteria prescribed by Govt of India.", hi: "हाँ, आवेदक भारत सरकार द्वारा निर्धारित मानदंडों के अनुसार गरीबी रेखा से नीचे होना चाहिए।", mr: "होय, केंद्र शासनाच्या निकषानुसार दारिद्र्यरेषेखालील कुटुंबात नाव असणे आवश्यक आहे." }
      }
    ]
  },
  {
    id: "mukhyamantri_yuva_prashikshan",
    category: "Youth & Employment",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Mukhyamantri Yuva Karya Prashikshan Yojana (Ladka Bhau)",
      hi: "मुख्यमंत्री युवा कार्य प्रशिक्षण योजना (लाडला भाई)",
      mr: "मुख्यमंत्री युवा कार्य प्रशिक्षण योजना (लाडका भाऊ)"
    },
    short_desc: {
      en: "6-month on-the-job internship with monthly stipend of ₹6,000 (12th Pass), ₹8,000 (ITI/Diploma), or ₹10,000 (Degree/PG) for unemployed youth.",
      hi: "18 से 35 वर्ष के युवाओं के लिए 6 महीने का कार्य प्रशिक्षण एवं ₹6,000 से ₹10,000 प्रतिमाह स्टाइपेंड।",
      mr: "१८ ते ३५ वयोगटातील सुशिक्षित बेरोजगार तरुणांसाठी ६ महिन्यांचे प्रत्यक्ष कार्य प्रशिक्षण व दरमहा ₹६,००० ते ₹१०,००० विद्यावेतन."
    },
    benefit_amount: "₹6,000 to ₹10,000 / month",
    benefit_frequency: "Monthly for 6 months",
    rules: {
      state: ["Maharashtra"],
      min_age: 18,
      max_age: 35,
      occupation: ["student", "unemployed", "all"]
    },
    required_documents: [
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "domicile", name: { en: "Maharashtra Domicile Certificate", hi: "महाराष्ट्र अधिवास प्रमाण पत्र", mr: "महाराष्ट्र अधिवास (डोमिसाईल) दाखला" }, mandatory: true },
      { id: "marksheet", name: { en: "Educational Marksheet (12th / ITI / Degree)", hi: "शैक्षणिक अंकतालिका (12वीं/डिप्लोमा/डिग्री)", mr: "शैक्षणिक गुणपत्रिका (१२वी / पदविका / पदवी)" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Aadhaar Linked Bank Passbook", hi: "आधार लिंक बैंक पासबुक", mr: "आधार संलग्न बँक पासबुक" }, mandatory: true }
    ],
    apply_mode: "Online (MahaSwayam Portal)",
    official_url: "https://rojgar.mahaswayam.gov.in",
    source_url: "https://rojgar.mahaswayam.gov.in/pdf/GR_YuvaKaryaPrashikshan.pdf",
    last_verified: "2024-09-20",
    qa: [
      {
        q: { en: "Who is eligible for this internship stipend?", hi: "इस योजना का लाभ किसे मिलेगा?", mr: "या योजनेचा लाभ कोणाला मिळतो?" },
        a: { en: "Any Maharashtra resident aged 18 to 35 with minimum 12th pass, ITI, Diploma, or Degree qualification.", hi: "18 से 35 वर्ष के महाराष्ट्र के मूल निवासी जिन्होंने 12वीं, आईटीआई, डिप्लोमा या डिग्री पूरी की हो।", mr: "किमान १२वी उत्तीर्ण, आयटीआय, डिप्लोमा किंवा पदवीधर असलेले १८ ते ३५ वयोगटातील महाराष्ट्रातील तरुण." }
      },
      {
        q: { en: "Is the stipend directly deposited into bank accounts?", hi: "क्या स्टाइपेंड सीधे बैंक खाते में आता है?", mr: "विद्यावेतन थेट बँकेत जमा होते का?" },
        a: { en: "Yes, stipend is deposited monthly through Direct Benefit Transfer (DBT) directly into Aadhaar-seeded accounts.", hi: "हाँ, डीबीटी के माध्यम से सीधे आधार से जुड़े बैंक खाते में प्रति माह राशि जमा की जाती है।", mr: "होय, दरमहा डीबीटीद्वारे थेट उमेदवाराच्या आधार-लिंक बँक खात्यात विद्यावेतन जमा केले जाते." }
      }
    ]
  },
  {
    id: "mukhyamantri_annapurna",
    category: "Women & Child Welfare",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Mukhyamantri Annapurna Yojana (3 Free LPG Cylinders)",
      hi: "मुख्यमंत्री अन्नपूर्णा योजना (3 मुफ्त गैस सिलेंडर)",
      mr: "मुख्यमंत्री अन्नपूर्णा योजना (वर्षाला ३ मोफत गॅस सिलिंडर)"
    },
    short_desc: {
      en: "Provision of 3 free LPG cooking gas cylinder refills per financial year for Ladki Bahin beneficiaries and PM Ujjwala families in Maharashtra.",
      hi: "लाडली बहना और उज्ज्वला योजना के लाभार्थी परिवारों को प्रति वर्ष 3 एलपीजी गैस सिलेंडर मुफ्त रीफिल।",
      mr: "लाडकी बहीण योजना आणि पीएम उज्ज्वला लाभार्थी कुटुंबांना दरवर्षी ३ एलपीजी गॅस सिलिंडर मोफत रीफिल (अनुदान थेट खात्यात)."
    },
    benefit_amount: "3 Free LPG Gas Cylinders / year (approx ₹2,550 value)",
    benefit_frequency: "3 refills per financial year",
    rules: {
      state: ["Maharashtra"],
      gender: ["female", "all"],
      max_income: 250000
    },
    required_documents: [
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "ration_card", name: { en: "Ration Card (Orange / Yellow)", hi: "राशन कार्ड (नारंगी / पीला)", mr: "रेशन कार्ड (पिवळे / केशरी)" }, mandatory: true },
      { id: "gas_passbook", name: { en: "LPG Consumer Connection Passbook (IOCL/BPCL/HPCL)", hi: "एलपीजी गैस कनेक्शन पासबुक", mr: "गॅस जोडणी ग्राहक पासबुक" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Aadhaar Linked Bank Passbook", hi: "आधार लिंक बैंक पासबुक", mr: "आधार संलग्न बँक पासबुक" }, mandatory: true }
    ],
    apply_mode: "Automatic via Ladki Bahin / Ujjwala & Gas Distributor",
    official_url: "https://mahafood.gov.in",
    source_url: "https://mahafood.gov.in/GR/Annapurna_Scheme_2024.pdf",
    last_verified: "2024-09-10",
    qa: [
      {
        q: { en: "How do families receive the free cylinder benefit?", hi: "मुफ्त सिलेंडर का लाभ कैसे मिलता है?", mr: "मोफत सिलिंडरचा लाभ कसा मिळतो?" },
        a: { en: "Beneficiaries pay the delivery agent for the cylinder, and the complete cylinder cost (₹850-₹900) is refunded directly to their bank account via DBT within 48 hours.", hi: "गैस डिलीवरी के समय भुगतान करने के बाद पूरा रिफंड 48 घंटों में बैंक खाते में डीबीटी द्वारा आ जाता है।", mr: "सिलिंडर घेतल्यानंतर शासकीय अनुदान थेट ४८ तासांत लाभार्थी महिलेच्या आधार लिंक बँक खात्यात जमा होते." }
      }
    ]
  },
  {
    id: "mjpjay_health",
    category: "Health & Medical Assistance",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY)",
      hi: "महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY)",
      mr: "महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY)"
    },
    short_desc: {
      en: "Universal cashless health insurance of ₹5,00,000 per family per year for all ration card holders in Maharashtra across 1,356 secondary and tertiary treatments.",
      hi: "महाराष्ट्र के परिवारों के लिए ₹5,00,000 प्रति वर्ष तक का पूर्णतः कैशलेस अस्पताल उपचार और सर्जरी।",
      mr: "महाराष्ट्रातील सर्व रेशनकार्डधारक कुटुंबांना दरवर्षी ₹५ लाखांपर्यंत मोफत व कॅशलेस वैद्यकीय उपचार आणि शस्त्रक्रिया."
    },
    benefit_amount: "₹5,00,000 / family / year",
    benefit_frequency: "Cashless across 1,356 medical procedures",
    rules: {
      state: ["Maharashtra"],
      gender: ["all"],
      max_income: 800000
    },
    required_documents: [
      { id: "ration_card", name: { en: "Valid Maharashtra Ration Card", hi: "राशन कार्ड", mr: "महाराष्ट्र वैध रेशन कार्ड" }, mandatory: true },
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true }
    ],
    apply_mode: "Cashless at any Network Hospital Arogyamitra Counter",
    official_url: "https://www.jeevandayee.gov.in",
    source_url: "https://www.jeevandayee.gov.in/MJPJAY/MJPJAY_GR_Enhanced_Cover.pdf",
    last_verified: "2024-09-01",
    qa: [
      {
        q: { en: "Is there any premium to be paid by the patient?", hi: "क्या मरीज को कोई प्रीमियम देना पड़ता है?", mr: "रुग्णाला कोणताही विमा हप्ता किंवा पैसे भरावे लागतात का?" },
        a: { en: "No, 100% of the premium and medical costs are paid by the Government of Maharashtra. Treatment is completely cashless.", hi: "नहीं, यह पूर्णतः निःशुल्क और कैशलेस है।", mr: "नाही, संपूर्ण उपचाराचा खर्च महाराष्ट्र शासन उचलते. उपचार पूर्णपणे मोफत व कॅशलेस आहे." }
      },
      {
        q: { en: "Where can we access this scheme?", hi: "योजना का लाभ कहाँ लिया जा सकता है?", mr: "या योजनेचा लाभ कोठे घेता येतो?" },
        a: { en: "At any government hospital and empaneled private network hospital via the hospital's Arogyamitra helpdesk.", hi: "किसी भी सरकारी या सूचीबद्ध निजी अस्पताल के आरोग्यमित्र काउंटर पर।", mr: "कोणत्याही शासकीय रुग्णालयात किंवा नोंदणीकृत खाजगी रुग्णालयातील 'आरोग्यमित्र' कक्षात." }
      }
    ]
  },
  {
    id: "mukhyamantri_vayoshri",
    category: "Senior Citizen/Pension",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Mukhyamantri Vayoshri Yojana",
      hi: "मुख्यमंत्री वयोश्री योजना (वरिष्ठ नागरिक)",
      mr: "मुख्यमंत्री वयोश्री योजना (ज्येष्ठ नागरिक सहाय्य)"
    },
    short_desc: {
      en: "One-time financial assistance of ₹3,000 for senior citizens aged 65 and above in Maharashtra to purchase physical assistive aids and medical devices.",
      hi: "65 वर्ष से अधिक आयु के वरिष्ठ नागरिकों को चश्मा, श्रवण यंत्र, वॉकर, छड़ी आदि सहायक उपकरण खरीदने हेतु ₹3,000 की आर्थिक मदद।",
      mr: "६५ वर्षे व त्यावरील ज्येष्ठ नागरिकांना चष्मा, श्रवणयंत्र, वॉकर, व्हीलचेअर व इतर सहाय्यक उपकरणे खरेदीसाठी ₹३,००० थेट बँक खात्यात."
    },
    benefit_amount: "₹3,000 (One-time grant)",
    benefit_frequency: "Direct Bank Transfer (DBT)",
    rules: {
      state: ["Maharashtra"],
      min_age: 65,
      max_income: 200000,
      gender: ["all"]
    },
    required_documents: [
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "age_proof", name: { en: "Age Proof (65+ years)", hi: "आयु प्रमाण (65 वर्ष+)", mr: "वयाचा पुरावा (६५ वर्षे पूर्ण)" }, mandatory: true },
      { id: "income_cert", name: { en: "Income Certificate (≤ ₹2 Lakh)", hi: "आय प्रमाण पत्र (≤ 2 लाख)", mr: "उत्पन्नाचा दाखला (वार्षिक २ लाखांपर्यंत)" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Bank Passbook", hi: "बैंक पासबुक", mr: "बँक पासबुक" }, mandatory: true }
    ],
    apply_mode: "District Social Welfare Office / CSC Aaple Sarkar",
    official_url: "https://sjsa.maharashtra.gov.in",
    source_url: "https://sjsa.maharashtra.gov.in/en/mukhyamantri-vayoshri-yojana",
    last_verified: "2024-08-15",
    qa: [
      {
        q: { en: "What devices can be bought with this assistance?", hi: "इस राशि से क्या खरीदा जा सकता है?", mr: "या पैशातून कोणती उपकरणे खरेदी करता येतात?" },
        a: { en: "Spectacles, hearing aids, wheelchairs, walkers, crutches, tripod sticks, spinal braces, and cervical collars.", hi: "चश्मा, कान की मशीन, व्हीलचेयर, वॉकर, स्टिक, घुटने के ब्रेस आदि।", mr: "चष्मा, श्रवणयंत्र, ट्रायपॉड स्टिक, वॉकर, व्हीलचेअर, कमोड खुर्ची, नी-ब्रेस इत्यादी." }
      }
    ]
  },
  {
    id: "saur_krushi_pump",
    category: "Farmer/Agriculture",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Magel Tyala Saur Krushi Pump Yojana (PM-KUSUM Maharashtra)",
      hi: "मागेल त्याला सौर कृषी पंप योजना",
      mr: "मागेल त्याला सौर कृषी पंप योजना"
    },
    short_desc: {
      en: "Provision of 3 HP, 5 HP, and 7.5 HP solar agriculture water pumps with 90% to 95% government subsidy for farmers with verified irrigation source.",
      hi: "किसानों को दिन के समय सिंचाई के लिए 90% से 95% तक की सब्सिडी पर 3, 5 या 7.5 एचपी सोलर पंप सेट।",
      mr: "शेतकऱ्यांना दिवसा सिंचनासाठी ९०% ते ९५% शासकीय अनुदानावर ३, ५ व ७.५ एचपी सौर कृषी पंप संच (शेतकऱ्याला फक्त ५% ते १०% हिस्सा)."
    },
    benefit_amount: "90% - 95% Subsidy (Up to ₹2,50,000 value)",
    benefit_frequency: "One-time installation",
    rules: {
      state: ["Maharashtra"],
      occupation: ["farmer"],
      land_owner: true,
      gender: ["all"]
    },
    required_documents: [
      { id: "land_7_12", name: { en: "7/12 Extract with Water Source Record", hi: "जल स्रोत दर्ज 7/12 भूलेख", mr: "विहीर/बोअरवेल पाण्याची नोंद असलेला ७/१२ व ८अ" }, mandatory: true },
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "caste_cert", name: { en: "Caste Certificate (for 95% SC/ST subsidy)", hi: "जाति प्रमाण पत्र (एससी/एसटी 95% सब्सिडी हेतु)", mr: "जात प्रमाणपत्र (SC/ST ९५% अनुदानासाठी)" }, mandatory: false },
      { id: "bank_passbook", name: { en: "Bank Passbook", hi: "बैंक पासबुक", mr: "बँक पासबुक" }, mandatory: true }
    ],
    apply_mode: "Online (MSEDCL Mahavitaran Solar Portal)",
    official_url: "https://www.mahadiscom.in/solar",
    source_url: "https://www.mahadiscom.in/solar/solar-krishi-pump-scheme.php",
    last_verified: "2024-09-05",
    qa: [
      {
        q: { en: "How much does a farmer have to pay?", hi: "किसान को कितना अंशदान देना होता है?", mr: "शेतकऱ्याला स्वतः किती रक्कम भरावी लागते?" },
        a: { en: "General category farmers pay only 10% of total cost, while SC and ST farmers pay only 5%. The rest 90-95% is paid by Central and State Governments.", hi: "सामान्य वर्ग के किसानों को मात्र 10% और एससी/एसटी किसानों को सिर्फ 5% राशि देनी होती है।", mr: "खुला प्रवर्ग शेतकऱ्यांना फक्त १०% आणि अनुसूचित जाती/जमाती शेतकऱ्यांना फक्त ५% लाभार्थी हिस्सा भरावा लागतो." }
      }
    ]
  },
  {
    id: "one_rupee_crop_insurance",
    category: "Farmer/Agriculture",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Pradhan Mantri Fasal Bima Savlat (₹1 Crop Insurance Maharashtra)",
      hi: "सर्वसमावेशक पीक विमा योजना (मात्र ₹1 में फसल बीमा)",
      mr: "सर्वसमावेशक पीक विमा योजना (१ रुपयात पीक विमा)"
    },
    short_desc: {
      en: "Comprehensive risk coverage against crop failure due to drought, excessive rainfall, and pests by paying a nominal token of just ₹1 per crop.",
      hi: "सूखा, बाढ़, ओलावृष्टि या कीटों से फसल नुकसान की भरपाई हेतु किसानों के लिए मात्र ₹1 के टोकन शुल्क में बीमा।",
      mr: "दुष्काळ, अतिवृष्टी किंवा किडीमुळे पिकांचे नुकसान झाल्यास भरपाई मिळण्यासाठी शेतकऱ्यांना प्रति अर्ज फक्त ₹१ नाममात्र शुल्कात पीक विमा."
    },
    benefit_amount: "Full Crop Compensation (100% Premium borne by State)",
    benefit_frequency: "Per crop season (Kharif & Rabi)",
    rules: {
      state: ["Maharashtra"],
      occupation: ["farmer"],
      land_owner: true,
      gender: ["all"]
    },
    required_documents: [
      { id: "land_7_12", name: { en: "7/12 Land Record with Crop Sowing Entry (E-Pik Pahani)", hi: "ई-पीक पाहणी दर्ज 7/12", mr: "ई-पीक पाहणी नोंद असलेला ७/१२ उतारा" }, mandatory: true },
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Aadhaar Linked Bank Passbook", hi: "बैंक पासबुक", mr: "बँक पासबुक" }, mandatory: true }
    ],
    apply_mode: "CSC Center / Aaple Sarkar / PMFBY Portal",
    official_url: "https://krishi.maharashtra.gov.in",
    source_url: "https://krishi.maharashtra.gov.in/1066/Pradhan-Mantri-Fasal-Bima-Yojana",
    last_verified: "2024-08-20",
    qa: [
      {
        q: { en: "Is E-Pik Pahani mandatory to claim crop insurance?", hi: "क्या ई-पीक पाहणी अनिवार्य है?", mr: "पीक विम्यासाठी ई-पीक पाहणी नोंद आवश्यक आहे का?" },
        a: { en: "Yes, the crop must be registered via the government Mobile E-Pik Pahani app before the crop insurance deadline.", hi: "हाँ, मोबाइल ऐप से ई-पीक पाहणी दर्ज होना अनिवार्य है।", mr: "होय, आपल्या ७/१२ वर खरीप किंवा रब्बी हंगामात ई-पीक पाहणी मोबाईल ॲपद्वारे नोंद असणे बंधनकारक आहे." }
      }
    ]
  },
  {
    id: "lek_ladki_yojana",
    category: "Women & Child Welfare",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Lek Ladki Yojana (Empowerment of Girl Child)",
      hi: "लेक लाडकी योजना (महाराष्ट्र सरकार)",
      mr: "लेक लाडकी योजना (मुलींच्या सक्षमीकरणासाठी)"
    },
    short_desc: {
      en: "Financial milestone grants totaling ₹1,01,000 for girl children born in yellow/orange ration card families from birth until completing 18 years.",
      hi: "पीले और नारंगी राशन कार्ड धारक परिवारों में जन्मी बेटियों को जन्म से लेकर 18 वर्ष की आयु तक कुल ₹1,01,000 की सहायता राशि।",
      mr: "पिवळे व केशरी रेशनकार्डधारक कुटुंबातील मुलींच्या जन्मापासून ते वयाची १८ वर्षे पूर्ण होईपर्यंत विविध टप्प्यांवर एकूण ₹१,०१,००० चे आर्थिक सहाय्य."
    },
    benefit_amount: "₹1,01,000 total milestone assistance",
    benefit_frequency: "5 installment stages (Birth to 18 yrs)",
    rules: {
      state: ["Maharashtra"],
      gender: ["female"],
      max_income: 100000
    },
    required_documents: [
      { id: "child_birth_cert", name: { en: "Girl Child Birth Certificate", hi: "बालिका जन्म प्रमाण पत्र", mr: "मुलीचा जन्म दाखला" }, mandatory: true },
      { id: "ration_card", name: { en: "Yellow or Orange Ration Card", hi: "पीला या नारंगी राशन कार्ड", mr: "पिवळे किंवा केशरी रेशन कार्ड" }, mandatory: true },
      { id: "income_cert", name: { en: "Income Certificate (≤ ₹1 Lakh)", hi: "आय प्रमाण पत्र (≤ 1 लाख)", mr: "उत्पन्नाचा दाखला (१ लाखांपर्यंत)" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Mother's or Joint Bank Passbook", hi: "माता का बैंक खाता पासबुक", mr: "आईचे बँक पासबुक" }, mandatory: true }
    ],
    apply_mode: "Anganwadi Worker / Gram Panchayat / Aaple Sarkar",
    official_url: "https://womenchild.maharashtra.gov.in",
    source_url: "https://womenchild.maharashtra.gov.in/upload/Lek_Ladki_GR.pdf",
    last_verified: "2024-09-01",
    qa: [
      {
        q: { en: "What are the payment stages of ₹1,01,000?", hi: "₹1,01,000 किन चरणों में मिलते हैं?", mr: "₹१,०१,००० कोणत्या टप्प्यांवर मिळतात?" },
        a: { en: "₹5,000 at birth, ₹6,000 in 1st Std, ₹7,000 in 6th Std, ₹8,000 in 11th Std, and ₹75,000 upon reaching 18 years of age (unmarried).", hi: "जन्म पर ₹5,000, पहली कक्षा में ₹6,000, छठवीं में ₹7,000, ग्यारहवीं में ₹8,000 और 18 वर्ष की आयु पर ₹75,000।", mr: "जन्माच्या वेळी ₹५,०००, पहिलीत ₹६,०००, सहावीत ₹७,०००, अकरावीत ₹८,००० आणि वय १८ वर्षे पूर्ण झाल्यावर एकरकमी ₹७५,०००." }
      }
    ]
  },
  {
    id: "ambedkar_swadhar_yojana",
    category: "Student/Scholarship/Education",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Dr. Babasaheb Ambedkar Swadhar Yojana",
      hi: "डॉ. बाबासाहेब आंबेडकर स्वाधार योजना",
      mr: "डॉ. बाबासाहेब आंबेडकर स्वाधार योजना"
    },
    short_desc: {
      en: "Annual financial grant of ₹51,000 to ₹60,000 for SC and Nav-Buddha college students who could not get admission into government hostels for higher education.",
      hi: "सरकारी छात्रावास में प्रवेश न पाने वाले अनुसूचित जाति व नवबौद्ध कॉलेज छात्रों को आवास व भोजन हेतु ₹51,000 से ₹60,000 वार्षिक सहायता।",
      mr: "शासकीय वसतिगृहात प्रवेश न मिळालेल्या अनुसूचित जाती व नवबौद्ध प्रवर्गातील उच्च शिक्षण घेणाऱ्या विद्यार्थ्यांना भोजन व निवासासाठी दरवर्षी ₹५१,००० ते ₹६०,००० थेट भत्ता."
    },
    benefit_amount: "₹51,000 to ₹60,000 / year",
    benefit_frequency: "Direct Bank Transfer (in 2 instalments)",
    rules: {
      state: ["Maharashtra"],
      min_age: 16,
      max_age: 30,
      occupation: ["student"],
      category: ["SC"],
      max_income: 250000
    },
    required_documents: [
      { id: "caste_cert", name: { en: "Caste Certificate & Validity (SC/Nav-Buddha)", hi: "जाति प्रमाण पत्र एवं वैधता", mr: "अनुसूचित जातीचे जात प्रमाणपत्र व वैधता" }, mandatory: true },
      { id: "college_bonafide", name: { en: "College Admission Receipt & Bonafide", hi: "कॉलेज प्रवेश रसीद व बोनाफाइड", mr: "महाविद्यालय प्रवेश पावती व बोनाफाईड" }, mandatory: true },
      { id: "income_cert", name: { en: "Income Certificate (≤ ₹2.5 Lakh)", hi: "आय प्रमाण पत्र (≤ 2.5 लाख)", mr: "उत्पन्नाचा दाखला (२.५ लाखांपर्यंत)" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Aadhaar Linked Bank Passbook", hi: "बैंक पासबुक", mr: "बँक पासबुक" }, mandatory: true }
    ],
    apply_mode: "District Social Welfare Officer / SJSA Portal",
    official_url: "https://sjsa.maharashtra.gov.in",
    source_url: "https://sjsa.maharashtra.gov.in/en/dr-babasaheb-ambedkar-swadhar-yojana",
    last_verified: "2024-08-30",
    qa: [
      {
        q: { en: "Who can apply for Swadhar Yojana?", hi: "स्वाधार योजना के लिए कौन पात्र है?", mr: "स्वाधार योजनेसाठी कोण पात्र आहे?" },
        a: { en: "SC students pursuing professional, technical, or degree courses in Maharashtra where distance from home exceeds 5 km and hostel admission was denied.", hi: "अनुसूचित जाति के ऐसे छात्र जो घर से 5 किमी दूर कॉलेज में पढ़ रहे हों और सरकारी हॉस्टल न मिला हो।", mr: "घरापासून ५ किमीपेक्षा दूर उच्च शिक्षण घेणारे व शासकीय वसतिगृहात जागा न मिळालेले अनुसूचित जातीचे विद्यार्थी." }
      }
    ]
  },
  {
    id: "baliraja_vij_savlat",
    category: "Farmer/Agriculture",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Mukhyamantri Baliraja Free Electricity Scheme (7.5 HP)",
      hi: "मुख्यमंत्री बळीराजा मोफत वीज योजना",
      mr: "मुख्यमंत्री बळीराजा मोफत वीज योजना"
    },
    short_desc: {
      en: "100% electricity bill waiver providing completely free power supply for all agricultural water pumps up to 7.5 Horsepower across Maharashtra.",
      hi: "महाराष्ट्र के किसानों के लिए 7.5 एचपी तक के कृषि पंपों का बिजली बिल पूर्णतः माफ और मुफ्त बिजली।",
      mr: "महाराष्ट्रातील शेतकऱ्यांच्या ७.५ अश्वशक्तीपर्यंतच्या (HP) सर्व शेतीपंपांना १००% मोफत वीज आणि पूर्ण वीजबिल माफी."
    },
    benefit_amount: "100% Free Power (Zero Electricity Bill)",
    benefit_frequency: "Every billing cycle",
    rules: {
      state: ["Maharashtra"],
      occupation: ["farmer"],
      land_owner: true,
      gender: ["all"]
    },
    required_documents: [
      { id: "land_7_12", name: { en: "7/12 Land Record Extract", hi: "7/12 भूलेख", mr: "७/१२ उतारा" }, mandatory: true },
      { id: "address_proof", name: { en: "MSEDCL Agriculture Pump Consumer Bill", hi: "महावितरण कृषि पंप बिजली बिल", mr: "महावितरण कृषी पंप वीजबिल / ग्राहक क्रमांक" }, mandatory: true },
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true }
    ],
    apply_mode: "Automatic via MSEDCL Mahavitaran System",
    official_url: "https://www.mahadiscom.in",
    source_url: "https://www.mahadiscom.in/consumer/agri-free-power-gr.pdf",
    last_verified: "2024-09-01",
    qa: [
      {
        q: { en: "Do farmers need to apply separately for free electricity?", hi: "क्या अलग से आवेदन करना पड़ता है?", mr: "मोफत वीजबिलासाठी वेगळा अर्ज करावा लागतो का?" },
        a: { en: "No, eligible registered 7.5 HP agricultural connections are automatically credited with zero-rupee electricity bills by Mahavitaran.", hi: "नहीं, महावितरण द्वारा पात्र कृषि कनेक्शनों को सीधे शून्य बिल जारी किया जाता है।", mr: "नाही, ७.५ एचपीपर्यंतच्या अधिकृत शेतीपंप ग्राहकांना महावितरणकडून थेट शून्य रुपयांचे वीजबिल दिले जाते." }
      }
    ]
  },
  {
    id: "free_higher_education_girls",
    category: "Student/Scholarship/Education",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Free Higher & Professional Education for Girls (EBC Waiver)",
      hi: "छात्राओं के लिए निःशुल्क उच्च एवं व्यावसायिक शिक्षा",
      mr: "मुलींना मोफत उच्च व व्यावसायिक शिक्षण योजना"
    },
    short_desc: {
      en: "100% complete waiver of tuition and examination fees for girl students pursuing engineering, medical, MBA, pharmacy, and professional degrees with family income up to ₹8 Lakh.",
      hi: "₹8 लाख तक वार्षिक पारिवारिक आय वाली छात्राओं के लिए इंजीनियरिंग, मेडिकल, फार्मेसी, पॉलिटेक्निक में 100% मुफ्त शिक्षा।",
      mr: "वार्षिक उत्पन्न ८ लाखांपर्यंत असणाऱ्या कुटुंबातील मुलींना इंजिनिअरिंग, मेडिकल, फार्मसी, कृषी व इतर व्यावसायिक अभ्यासक्रमांचे १००% शिक्षण व परीक्षा शुल्क माफ."
    },
    benefit_amount: "100% Tuition & Exam Fee Waiver (Up to ₹5 Lakh / year)",
    benefit_frequency: "Every academic year",
    rules: {
      state: ["Maharashtra"],
      gender: ["female"],
      occupation: ["student"],
      max_income: 800000
    },
    required_documents: [
      { id: "income_cert", name: { en: "Income Certificate (≤ ₹8 Lakh)", hi: "आय प्रमाण पत्र (≤ 8 लाख)", mr: "सक्षम प्राधिकाऱ्याचा उत्पन्नाचा दाखला (८ लाखांपर्यंत)" }, mandatory: true },
      { id: "domicile", name: { en: "Maharashtra Domicile Certificate", hi: "महाराष्ट्र अधिवास प्रमाण पत्र", mr: "महाराष्ट्र अधिवास (डोमिसाईल) दाखला" }, mandatory: true },
      { id: "college_bonafide", name: { en: "CAP College Allotment Letter & Bonafide", hi: "सीएपी अलॉटमेंट एवं कॉलेज बोनाफाइड", mr: "कॅप (CAP) प्रवेश पत्र व महाविद्यालय बोनाफाईड" }, mandatory: true },
      { id: "aadhaar", name: { en: "Aadhaar Card", hi: "आधार कार्ड", mr: "आधार कार्ड" }, mandatory: true }
    ],
    apply_mode: "Online (MahaDBT Portal - Rajarshi Shahu Maharaj Scheme)",
    official_url: "https://mahadbt.maharashtra.gov.in",
    source_url: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA97074E3C00",
    last_verified: "2024-09-01",
    qa: [
      {
        q: { en: "Which courses are covered under 100% fee waiver for girls?", hi: "कौन से कोर्स इस योजना में शामिल हैं?", mr: "या योजनेमध्ये कोणते अभ्यासक्रम येतात?" },
        a: { en: "All government and private-unaided professional degree courses including Engineering, MBBS/BAMS, MBA, MCA, Pharmacy, Polytechnic, and Agriculture admitted through CAP.", hi: "इंजीनियरिंग, एमबीबीएस, फार्मेसी, एमबीए, एमसीए, पॉलिटेक्निक सहित सभी मान्यता प्राप्त व्यावसायिक कोर्स।", mr: "सीएपी (CAP) फेरीद्वारे प्रवेश मिळालेले इंजिनिअरिंग, एमबीबीएस, फार्मसी, कृषी, पॉलिटेक्निक, एमबीए व इतर व्यावसायिक अभ्यासक्रम." }
      }
    ]
  },
  {
    id: "shetkari_apghat_vima",
    category: "Farmer/Agriculture",
    level: "State",
    state: "Maharashtra",
    name: {
      en: "Gopinath Munde Shetkari Apghat Sanugrah Anudan Yojana",
      hi: "गोपीनाथ मुंडे शेतकरी अपघात सानुग्रह अनुदान योजना",
      mr: "गोपीनाथ मुंडे शेतकरी अपघात सानुग्रह अनुदान योजना"
    },
    short_desc: {
      en: "Financial assistance of ₹2,00,000 to family of landholding and registered farmers in case of accidental death or permanent physical disability.",
      hi: "सड़क दुर्घटना, बिजली गिरने, सर्पदंश या कृषि कार्य के दौरान आकस्मिक मृत्यु पर किसान परिवार को ₹2,00,000 की अनुग्रह सहायता।",
      mr: "अपघाती मृत्यू, वीज पडणे, सर्पदंश किंवा शेतीकामादरम्यान अपंगत्व आल्यास शेतकरी किंवा त्याच्या कुटुंबीयांना ₹२,००,००० सानुग्रह अनुदान."
    },
    benefit_amount: "₹2,00,000 (Sanugrah Anudan)",
    benefit_frequency: "One-time lump sum grant",
    rules: {
      state: ["Maharashtra"],
      occupation: ["farmer"],
      min_age: 10,
      max_age: 75,
      gender: ["all"]
    },
    required_documents: [
      { id: "land_7_12", name: { en: "7/12 Land Record Extract", hi: "7/12 भूलेख", mr: "७/१२ व ८अ उतारा" }, mandatory: true },
      { id: "mother_status", name: { en: "FIR, Post-Mortem Report / Disability Certificate", hi: "एफआईआर एवं पोस्टमार्टम रिपोर्ट", mr: "पोलीस प्रथम खबरी अहवाल (FIR), शवविच्छेदन अहवाल किंवा अपंगत्व दाखला" }, mandatory: true },
      { id: "aadhaar", name: { en: "Aadhaar Card of Deceased & Legal Heir", hi: "आधार कार्ड", mr: "शेतकरी व वारसाचे आधार कार्ड" }, mandatory: true },
      { id: "bank_passbook", name: { en: "Legal Heir Bank Passbook", hi: "वारिस का बैंक पासबुक", mr: "कायदेशीर वारसाचे बँक पासबुक" }, mandatory: true }
    ],
    apply_mode: "Taluka Agriculture Officer (TAO) / Tehsildar Office within 30 days",
    official_url: "https://krishi.maharashtra.gov.in",
    source_url: "https://krishi.maharashtra.gov.in/1068/Gopinath-Munde-Shetkari-Apghat-Vima-Yojana",
    last_verified: "2024-09-01",
    qa: [
      {
        q: { en: "What types of accidents are covered under this scheme?", hi: "किन दुर्घटनाओं में यह अनुदान मिलता है?", mr: "कोणकोणत्या अपघातांना हे अनुदान लागू आहे?" },
        a: { en: "Road/railway accidents, lightning strikes, drowning, snakebites, electric shocks, machinery injuries, and poisoning during spraying.", hi: "सड़क दुर्घटना, आकाशीय बिजली, सर्पदंश, करंट लगना, कीटनाशक विषबाधा आदि।", mr: "रस्ता/रेल्वे अपघात, वीज पडणे, सर्पदंश, विहिरीत बुडणे, विजेचा शॉक, शेती यंत्रांमुळे अपघात, कीटकनाशक फवारणी करताना विषबाधा इत्यादी." }
      }
    ]
  }
];

// Document Procurement Rescue Guide (TRD/PRD stand-out feature)
export const DOCUMENT_GUIDE = {
  gas_passbook: {
    name: { en: "LPG Consumer Connection Passbook (IOCL / BPCL / HPCL)", hi: "एलपीजी गैस कनेक्शन पासबुक", mr: "गॅस जोडणी ग्राहक पासबुक (IOCL/BPCL/HPCL)" },
    where_to_get: {
      en: "Your authorized local LPG distributor (Indane / Bharat Gas / HP Gas).",
      hi: "अपने स्थानीय गैस वितरक (इंडेन / भारत गैस / एचपी गैस) से।",
      mr: "आपल्या स्थानिक गॅस एजन्सीकडून (इंडेन / भारत गॅस / एचपी गॅस)."
    },
    time_needed: "1 day",
    approx_fee: "Free / ₹50 duplicate",
    docs_needed: {
      en: "LPG 17-digit Consumer ID, Aadhaar Card, blue passbook.",
      hi: "एलपीजी 17-अंकीय उपभोक्ता आईडी, आधार कार्ड।",
      mr: "१७ अंकी एलपीजी ग्राहक क्रमांक, आधार कार्ड."
    },
    action_url: "https://www.mylpg.in"
  },
  income_cert: {
    name: { en: "Income Certificate (Tahsil Dakhla)", hi: "आय प्रमाण पत्र (तहसील दाखिला)", mr: "उत्पन्नाचा दाखला (तहसीलदार)" },
    where_to_get: {
      en: "Nearest Aaple Sarkar Seva Kendra (CSC) or online at aaplesarkar.mahaonline.gov.in / Tehsildar Office.",
      hi: "नजदीकी आपले सरकार सेवा केंद्र (CSC) या aaplesarkar.mahaonline.gov.in / तहसील कार्यालय से।",
      mr: "नजीकचे आपले सरकार सेवा केंद्र (CSC) किंवा aaplesarkar.mahaonline.gov.in वर ऑनलाइन / तहसील कार्यालयात."
    },
    time_needed: "7 - 15 days",
    approx_fee: "₹33 (Government portal fee)",
    docs_needed: {
      en: "Ration Card, Salary Slip / Talathi Income Report, Self-Declaration, Aadhaar Card.",
      hi: "राशन कार्ड, तलाठी रिपोर्ट, स्व-घोषणा पत्र, आधार कार्ड।",
      mr: "रेशन कार्ड, तलाठी अहवाल, स्वयं-घोषणापत्र, आधार कार्ड."
    },
    action_url: "https://aaplesarkar.mahaonline.gov.in"
  },
  land_7_12: {
    name: { en: "7/12 & 8A Land Extract", hi: "7/12 एवं 8A भूलेख खतौनी", mr: "७/१२ आणि ८अ डिजिटल स्वाक्षरी उतारा" },
    where_to_get: {
      en: "Download digitally signed 7/12 instantly from Maharashtra Mahabhulekh portal or get from Talathi.",
      hi: "महाराष्ट्र महाभूलेख पोर्टल (bhulekh.mahabhumi.gov.in) से तुरंत डाउनलोड करें या तलाठी से प्राप्त करें।",
      mr: "महाभूमी महाभूलेख पोर्टल (digitalsatbara.mahabhumi.gov.in) वरून त्वरित डिजिटल ७/१२ काढा किंवा तलाठ्याकडून घ्या."
    },
    time_needed: "Instant (Online) / 1-2 days (Talathi)",
    approx_fee: "₹15 (Official digital download fee)",
    docs_needed: {
      en: "District, Taluka, Village name, and Survey / Gat Number.",
      hi: "जिला, तालुका, गांव का नाम तथा गट/खसरा संख्या।",
      mr: "जिल्हा, तालुका, गाव आणि गट / सर्व्हे नंबर."
    },
    action_url: "https://digitalsatbara.mahabhumi.gov.in"
  },
  domicile: {
    name: { en: "Domicile & Nationality Certificate", hi: "अधिवास (डोमिसाइल) प्रमाण पत्र", mr: "अधिवास (डोमिसाईल) व राष्ट्रीयत्व प्रमाणपत्र" },
    where_to_get: {
      en: "Aaple Sarkar Seva Kendra or Sub-Divisional Magistrate (SDM) / Tehsildar Office.",
      hi: "आपले सरकार केंद्र या अनुमंडल दंडाधिकारी (SDM) / तहसीलदार कार्यालय से।",
      mr: "आपले सरकार सेवा केंद्र किंवा उपविभागीय अधिकारी (प्रांत) / तहसील कार्यालय."
    },
    time_needed: "15 days",
    approx_fee: "₹33 - ₹50",
    docs_needed: {
      en: "15-year residence proof (Ration Card, Electricity Bill, School Leaving Certificate), Aadhaar.",
      hi: "15 वर्ष निवास प्रमाण (राशन कार्ड, बिजली बिल, स्कूल टीसी), आधार कार्ड।",
      mr: "किमान १५ वर्षांचा वास्तव्याचा पुरावा (रेशन कार्ड, लाईट बिल, शाळा सोडल्याचा दाखला), आधार कार्ड."
    },
    action_url: "https://aaplesarkar.mahaonline.gov.in"
  },
  caste_cert: {
    name: { en: "Caste Certificate & Validity", hi: "जाति प्रमाण पत्र एवं वैधता", mr: "जात प्रमाणपत्र व जात पडताळणी दाखला" },
    where_to_get: {
      en: "Tehsildar / SDO office via Aaple Sarkar portal; Validity through District Caste Scrutiny Committee.",
      hi: "तहसीलदार/एसडीओ कार्यालय (आपले सरकार पोर्टल) और जात वैधता समिति से।",
      mr: "उपविभागीय अधिकारी (एसडीओ) / तहसीलदार आपले सरकार पोर्टलद्वारे; वैधता समितीकडे पडताळणी."
    },
    time_needed: "21 - 45 days",
    approx_fee: "₹50 - ₹100",
    docs_needed: {
      en: "Old family school records (pre-1967/1950 depending on caste), 7/12 extract, Father's LC, Aadhaar.",
      hi: "पारिवारिक पुराने अभिलेख (1967 से पूर्व), पिता की टीसी, 7/12, आधार कार्ड।",
      mr: "कुटुंबातील जुने शैक्षणिक पुरावे (१९६७ पूर्वीचे), वडिलांचा शाळा सोडल्याचा दाखला, आधार कार्ड."
    },
    action_url: "https://aaplesarkar.mahaonline.gov.in"
  },
  bank_passbook: {
    name: { en: "Aadhaar NPCI Linked Bank Account", hi: "आधार एवं एनपीसीआई लिंक बैंक खाता", mr: "आधार व एनपीसीआय लिंक बँक खाते" },
    where_to_get: {
      en: "Nearest Bank branch or India Post Payments Bank (IPPB) at any village Post Office.",
      hi: "अपनी बैंक शाखा या किसी भी ग्रामीण डाकघर में इंडिया पोस्ट पेमेंट्स बैंक (IPPB)।",
      mr: "आपल्या बँकेत किंवा जवळच्या पोस्ट ऑफिसमध्ये जाऊन 'इंडिया पोस्ट पेमेंट्स बँक' (IPPB) खाते उघडा."
    },
    time_needed: "Immediate (10 minutes with IPPB biometrics)",
    approx_fee: "Free / ₹100 deposit",
    docs_needed: {
      en: "Aadhaar Card, Mobile Number, Biometric thumb impression.",
      hi: "आधार कार्ड, मोबाइल नंबर, फिंगरप्रिंट।",
      mr: "आधार कार्ड, मोबाईल क्रमांक आणि बोटांचे ठसे (बायोमेट्रिक)."
    },
    action_url: "https://www.ippbonline.com"
  },
  ration_card: {
    name: { en: "Ration Card (Orange / Yellow / BPL)", hi: "राशन कार्ड (नारंगी / पीला / बीपीएल)", mr: "रेशन कार्ड (पिवळे / केशरी / अंत्योदय)" },
    where_to_get: {
      en: "District Supply Officer (DSO) or Taluka Food & Civil Supplies office.",
      hi: "जिला आपूर्ति अधिकारी (DSO) या तहसील खाद्य आपूर्ति कार्यालय।",
      mr: "तालुका पुरवठा अधिकारी (FSO) / तहसीलदार कार्यालय."
    },
    time_needed: "30 days",
    approx_fee: "₹20 - ₹50",
    docs_needed: {
      en: "Family photo, Aadhaar cards of all members, LPG gas connection slip, address proof.",
      hi: "पारिवारिक फोटो, सभी सदस्यों का आधार, गैस कनेक्शन पर्ची, निवास प्रमाण।",
      mr: "कुटुंबाचे छायाचित्र, सर्व सदस्यांचे आधार कार्ड, गॅस पासबुक, उत्पन्नाचा दाखला."
    },
    action_url: "https://rcms.mahafood.gov.in"
  },
  aadhaar: {
    name: { en: "Aadhaar Card (UIDAI)", hi: "आधार कार्ड (UIDAI)", mr: "आधार कार्ड (UIDAI)" },
    where_to_get: {
      en: "Nearest Aadhaar Seva Kendra, Post Office, Bank branch, or myaadhaar.uidai.gov.in.",
      hi: "नजदीकी आधार सेवा केंद्र, डाकघर, बैंक शाखा, या myaadhaar.uidai.gov.in पोर्टल पर।",
      mr: "नजीकचे आधार सेवा केंद्र, पोस्ट ऑफिस, बँक शाखा किंवा myaadhaar.uidai.gov.in वर ऑनलाइन."
    },
    time_needed: "Instant download / 7-10 days for physical card",
    approx_fee: "Free (New enrollment) / ₹50 (Update / PVC)",
    docs_needed: {
      en: "Proof of Identity (Voter ID/PAN/Passport) and Proof of Address (Ration card/Electricity bill).",
      hi: "पहचान प्रमाण (मतदाता पहचान पत्र/पैन कार्ड) एवं पता प्रमाण (राशन कार्ड/बिजली बिल)।",
      mr: "ओळख पुरावा (मतदार ओळखपत्र/पॅन कार्ड) व पत्ता पुरावा (रेशन कार्ड/लाईट बिल)."
    },
    action_url: "https://myaadhaar.uidai.gov.in"
  },
  job_card: {
    name: { en: "MGNREGA Job Card", hi: "मनरेगा जॉब कार्ड", mr: "मनरेगा रोजगार हमी जॉब कार्ड" },
    where_to_get: {
      en: "Gram Panchayat office or Taluka Panchayat Samiti.",
      hi: "ग्राम पंचायत कार्यालय या तालुका पंचायत समिति से।",
      mr: "ग्रामपंचायत कार्यालय किंवा तालुका पंचायत समिती."
    },
    time_needed: "15 days from application",
    approx_fee: "Free of cost (निःशुल्क)",
    docs_needed: {
      en: "Aadhaar Card, family photograph, bank account details.",
      hi: "आधार कार्ड, पारिवारिक पासपोर्ट फोटो, बैंक खाता विवरण।",
      mr: "आधार कार्ड, कौटुंबिक छायाचित्र, बँक पासबुक."
    },
    action_url: "https://nrega.nic.in"
  },
  land_docs: {
    name: { en: "Land Title / Possession Certificate", hi: "भूमि स्वामित्व / पट्टा प्रमाण पत्र", mr: "जमीन मालकी / ताबा प्रमाणपत्र" },
    where_to_get: {
      en: "Talathi / Village Revenue Officer or Gram Panchayat.",
      hi: "तलाठी / राजस्व अधिकारी अथवा ग्राम पंचायत से।",
      mr: "तलाठी / ग्रामसेवक अथवा भूमी अभिलेख कार्यालय."
    },
    time_needed: "3 - 7 days",
    approx_fee: "₹20 - ₹50",
    docs_needed: {
      en: "Existing 7/12 extract or village property register extract (Form 8).",
      hi: "वर्तमान 7/12 या ग्राम पंचायत नमूना 8 (घरपट्टी)।",
      mr: "७/१२ उतारा किंवा ग्रामपंचायत नमुना ८ (घरपट्टी पावती)."
    },
    action_url: "https://mahabhumi.gov.in"
  },
  age_proof: {
    name: { en: "Age Proof (Birth Certificate / School LC)", hi: "आयु प्रमाण पत्र (जन्म प्रमाण पत्र / स्कूल टीसी)", mr: "वयाचा पुरावा (जन्म दाखला / शाळा सोडल्याचा दाखला)" },
    where_to_get: {
      en: "Municipal Corporation / Gram Panchayat or school last attended.",
      hi: "नगर पालिका / ग्राम पंचायत अथवा संबंधित विद्यालय से।",
      mr: "महानगरपालिका / ग्रामपंचायत जन्म-मृत्यू नोंदणी विभाग किंवा शाळा."
    },
    time_needed: "1 - 7 days",
    approx_fee: "₹20 - ₹50",
    docs_needed: {
      en: "Hospital birth slip, school admission records, or Aadhaar.",
      hi: "अस्पताल जन्म पर्ची, स्कूल रिकॉर्ड्स या आधार कार्ड।",
      mr: "रुग्णालय जन्म नोंद किंवा शाळेचा दाखला."
    },
    action_url: "https://crsorgi.gov.in"
  },
  marksheet: {
    name: { en: "Previous Academic Marksheet / Passing Certificate", hi: "पिछली कक्षा की मार्कशीट / उत्तीर्ण प्रमाण पत्र", mr: "मागील शैक्षणिक गुणपत्रिका / उत्तीर्ण दाखला" },
    where_to_get: {
      en: "School, College, or State Board / Digilocker online.",
      hi: "अपने स्कूल/कॉलेज अथवा डिजिलॉकर (digilocker.gov.in) से।",
      mr: "शाळा/महाविद्यालय किंवा डिजीलॉकरवरून ऑनलाइन."
    },
    time_needed: "Instant on DigiLocker / 1 day from college",
    approx_fee: "Free on DigiLocker",
    docs_needed: {
      en: "Roll number, passing year, and Aadhaar linked to DigiLocker.",
      hi: "रोल नंबर, उत्तीर्ण वर्ष, आधार कार्ड।",
      mr: "परीक्षा आसन क्रमांक, उत्तीर्ण वर्ष, आधार कार्ड."
    },
    action_url: "https://www.digilocker.gov.in"
  },
  college_bonafide: {
    name: { en: "College Bonafide Certificate & Fee Receipt", hi: "कॉलेज बोनाफाइड प्रमाण पत्र एवं शुल्क रसीद", mr: "महाविद्यालय बोनाफाईड प्रमाणपत्र व फी पावती" },
    where_to_get: {
      en: "College / University Student Section / Principal Office.",
      hi: "संबंधित कॉलेज/विश्वविद्यालय छात्र कल्याण विभाग से।",
      mr: "महाविद्यालयाचे विद्यार्थी सहाय्य केंद्र / कार्यालय."
    },
    time_needed: "1 - 3 days",
    approx_fee: "₹10 - ₹50 (as per college rules)",
    docs_needed: {
      en: "Student ID Card, current term admission receipt.",
      hi: "विद्यार्थी पहचान पत्र, चालू सत्र की प्रवेश रसीद।",
      mr: "विद्यार्थी ओळखपत्र, चालू वर्षाची प्रवेश पावती."
    },
    action_url: "https://mahadbt.maharashtra.gov.in"
  },
  business_proof: {
    name: { en: "Business Proof (Udyam Registration / Gumasta License)", hi: "व्यवसाय प्रमाण (उद्यम रजिस्ट्रेशन / गुमाश्ता लाइसेंस)", mr: "व्यवसाय नोंदणी (उद्यम नोंदणी / शॉप ॲक्ट गुमास्ता)" },
    where_to_get: {
      en: "Online at udyamregistration.gov.in or Municipal Ward Office.",
      hi: "udyamregistration.gov.in पर मुफ्त ऑनलाइन या नगर निगम वार्ड कार्यालय से।",
      mr: "udyamregistration.gov.in वर मोफत ऑनलाइन किंवा नगरपालिका वॉर्ड कार्यालय."
    },
    time_needed: "Instant (Udyam Online) / 3-5 days (Shop Act)",
    approx_fee: "Free on Udyam Portal / Nominal for Shop Act",
    docs_needed: {
      en: "Aadhaar Card, PAN Card, Business address proof, Bank Account.",
      hi: "आधार कार्ड, पैन कार्ड, दुकान/कार्यस्थल का पता प्रमाण, बैंक खाता।",
      mr: "आधार कार्ड, पॅन कार्ड, दुकानाचा पत्ता पुरावा, बँक खाते."
    },
    action_url: "https://udyamregistration.gov.in"
  },
  bank_statement: {
    name: { en: "6-Month Bank Account Statement", hi: "6 माह का बैंक खाता विवरण (स्टेटमेंट)", mr: "६ महिन्यांचे बँक खात्याचे स्टेटमेंट" },
    where_to_get: {
      en: "Bank Branch, Internet Banking, or Mobile Banking App.",
      hi: "अपनी बैंक शाखा अथवा नेट बैंकिंग/मोबाइल ऐप से डाउनलोड करें।",
      mr: "आपल्या बँक शाखेतून किंवा मोबाइल बँकिंग / नेट बँकिंग ॲपवरून."
    },
    time_needed: "Instant (Mobile App) / 10 minutes (Bank Branch)",
    approx_fee: "Free on App / ₹50 at Branch",
    docs_needed: {
      en: "Bank Account Number or Net Banking login credentials.",
      hi: "खाता संख्या अथवा नेट बैंकिंग क्रेडेंशियल्स।",
      mr: "बँक खाते क्रमांक किंवा नेट बँकिंग पासवर्ड."
    },
    action_url: "https://www.onlinesbi.sbi"
  },
  artisan_declaration: {
    name: { en: "Traditional Artisan Verification & Recommendation", hi: "पारंपरिक कारीगर सत्यापन एवं स्व-घोषणा", mr: "पारंपरिक कारागीर स्व-घोषणा व पडताळणी" },
    where_to_get: {
      en: "Gram Panchayat / Municipal Ward via PM Vishwakarma Portal.",
      hi: "ग्राम पंचायत / नगर पालिका वार्ड द्वारा पीएम विश्वकर्मा पोर्टल पर।",
      mr: "ग्रामपंचायत / नगरपरिषद वॉर्ड कार्यालय पीएम विश्वकर्मा पोर्टलद्वारे."
    },
    time_needed: "7 - 14 days",
    approx_fee: "Free of cost (निःशुल्क)",
    docs_needed: {
      en: "Aadhaar Card, trade tools photo, self-declaration of artisan trade.",
      hi: "आधार कार्ड, कारीगरी औजारों की फोटो, ट्रेड स्व-घोषणा।",
      mr: "आधार कार्ड, व्यवसायाच्या अवजारांसह फोटो, स्वयं-घोषणापत्र."
    },
    action_url: "https://pmvishwakarma.gov.in"
  },
  birth_cert: {
    name: { en: "Girl Child Birth Certificate", hi: "बालिका जन्म प्रमाण पत्र", mr: "मुलीचा अधिकृत जन्म दाखला" },
    where_to_get: {
      en: "Gram Panchayat / Municipal Corporation Registrar of Births.",
      hi: "ग्राम पंचायत / नगर निगम जन्म-मृत्यु पंजीयक कार्यालय से।",
      mr: "ग्रामपंचायत / महानगरपालिका जन्म नोंदणी विभाग."
    },
    time_needed: "3 - 7 days",
    approx_fee: "₹20 - ₹50",
    docs_needed: {
      en: "Hospital discharge card/birth report, Parents' Aadhaar cards.",
      hi: "अस्पताल डिस्चार्ज कार्ड/जन्म पर्ची, माता-पिता का आधार कार्ड।",
      mr: "रुग्णालय डिस्चार्ज कार्ड / जन्म नोंद पावती, पालकांचे आधार कार्ड."
    },
    action_url: "https://crsorgi.gov.in"
  },
  guardian_aadhaar: {
    name: { en: "Parent / Legal Guardian Aadhaar Card", hi: "माता/पिता या विधिक अभिभावक का आधार कार्ड", mr: "पालक / कायदेशीर पालकांचे आधार कार्ड" },
    where_to_get: {
      en: "Nearest Aadhaar Seva Kendra or myaadhaar.uidai.gov.in.",
      hi: "नजदीकी आधार सेवा केंद्र या myaadhaar.uidai.gov.in से।",
      mr: "नजीकचे आधार केंद्र किंवा myaadhaar.uidai.gov.in."
    },
    time_needed: "Instant download",
    approx_fee: "Free",
    docs_needed: {
      en: "Aadhaar number and OTP on registered mobile.",
      hi: "आधार संख्या और पंजीकृत मोबाइल पर प्राप्त ओटीपी।",
      mr: "आधार क्रमांक आणि नोंदणीकृत मोबाईल ओटीपी."
    },
    action_url: "https://myaadhaar.uidai.gov.in"
  },
  address_proof: {
    name: { en: "Proof of Address (Electricity Bill / Voter ID)", hi: "निवास प्रमाण (बिजली बिल / मतदाता पहचान पत्र)", mr: "पत्ता पुरावा (लाईट बिल / मतदार ओळखपत्र)" },
    where_to_get: {
      en: "Mahavitaran (MSEDCL) Portal / Election Commission Portal.",
      hi: "महावितरण बिजली बिल पोर्टल या चुनाव आयोग पोर्टल (voters.eci.gov.in)।",
      mr: "महावितरण ऑनलाइन बिल पोर्टल किंवा मतदार सेवा पोर्टल."
    },
    time_needed: "Instant (Online)",
    approx_fee: "Free",
    docs_needed: {
      en: "Consumer number (Electricity) or EPIC voter number.",
      hi: "विद्युत ग्राहक संख्या अथवा वोटर आईडी नंबर।",
      mr: "ग्राहक क्रमांक (लाईट बिल) किंवा मतदार ओळख क्रमांक."
    },
    action_url: "https://wss.mahadiscom.in"
  },
  child_birth_cert: {
    name: { en: "Child Birth Certificate", hi: "बच्चे का जन्म प्रमाण पत्र", mr: "बालकाचा अधिकृत जन्म दाखला" },
    where_to_get: {
      en: "Local Gram Panchayat / Municipal Ward.",
      hi: "स्थानीय ग्राम पंचायत अथवा नगर पालिका से।",
      mr: "स्थानिक ग्रामपंचायत अथवा महानगरपालिका."
    },
    time_needed: "3 - 7 days",
    approx_fee: "₹20 - ₹50",
    docs_needed: {
      en: "Hospital birth registration slip, Parents' IDs.",
      hi: "अस्पताल पर्ची और माता-पिता के पहचान पत्र।",
      mr: "रुग्णालय नोंद व पालकांचे ओळखपत्र."
    },
    action_url: "https://crsorgi.gov.in"
  },
  mother_status: {
    name: { en: "Widow / Destitute Certificate or Death Certificate of Father", hi: "विधवा / निराधार प्रमाण पत्र या पिता का मृत्यु प्रमाण पत्र", mr: "विधवा / निराधार प्रमाणपत्र किंवा पतीचा मृत्यू दाखला" },
    where_to_get: {
      en: "Tehsildar Office / Women & Child Welfare Dept / Gram Panchayat.",
      hi: "तहसीलदार कार्यालय / महिला एवं बाल कल्याण विभाग / ग्राम पंचायत।",
      mr: "तहसील कार्यालय / महिला व बाल विकास अधिकारी / ग्रामपंचायत."
    },
    time_needed: "15 - 30 days",
    approx_fee: "₹33 - ₹50",
    docs_needed: {
      en: "Death certificate of spouse, Talathi Panchnama, 2 local witness statements.",
      hi: "पति का मृत्यु प्रमाण पत्र, तलाठी पंचनामा, दो स्थानीय गवाहों के बयान।",
      mr: "पतीचा मृत्यू दाखला, तलाठी पंचनामा, दोन स्थानिक साक्षीदारांचे जबाब."
    },
    action_url: "https://aaplesarkar.mahaonline.gov.in"
  },
  bpl_card: {
    name: { en: "BPL Certificate / Antyodaya Anna Yojana (AAY) Ration Card", hi: "बीपीएल प्रमाण पत्र / अंत्योदय अन्न योजना राशन कार्ड", mr: "बीपीएल दाखला / अंत्योदय अन्न योजना रेशन कार्ड" },
    where_to_get: {
      en: "Taluka Supply Officer (Tehsildar) or Block Development Officer (BDO).",
      hi: "तहसील आपूर्ति कार्यालय (DSO) या प्रखंड विकास अधिकारी (BDO) से।",
      mr: "तालुका पुरवठा अधिकारी (तहसीलदार) किंवा गट विकास अधिकारी (BDO)."
    },
    time_needed: "21 - 30 days",
    approx_fee: "₹20 - ₹50",
    docs_needed: {
      en: "SECC list inclusion proof, Income certificate, Gram Sabha resolution.",
      hi: "एसईसीसी सूची में नाम, आय प्रमाण पत्र, ग्राम सभा का प्रस्ताव।",
      mr: "सामाजिक-आर्थिक जात जनगणना (SECC) यादी नोंद, ग्रामसभा ठराव, उत्पन्नाचा दाखला."
    },
    action_url: "https://rcms.mahafood.gov.in"
  }
};

// Preset User Personas (TRD & PRD Section 5) for quick demoing
export const DEMO_PERSONAS = [
  {
    id: "sunita",
    name: { en: "Sunita (सुनीता)", hi: "सुनीता (52 वर्ष, किसान)", mr: "सुनीता (५२ वर्षे, शेतकरी महिला)" },
    avatar: "👩‍🌾",
    lang: "mr",
    voice_audio_text: {
      mr: "मी रायगड जिल्ह्यातील शेतकरी महिला आहे. माझे वय ५२ वर्षे असून पतीसोबत कोरडवाहू शेती करते. आमचे वार्षिक उत्पन्न सुमारे ८०,००० रुपये आहे. मला पेन्शन, लाडकी बहीण आणि आरोग्याची मदत हवी आहे.",
      hi: "मैं रायगढ़ जिले की 52 वर्षीय किसान महिला हूँ। पति के साथ खेती करती हूँ। हमारी सालाना आय 80,000 रुपये है। मुझे पेंशन, लाडकी बहिन और स्वास्थ्य योजना चाहिए।",
      en: "I am a 52-year-old farmer's wife from Raigad, Maharashtra. Family annual income is ₹80,000. I need pension, Ladki Bahin, and healthcare benefits."
    },
    profile: {
      age: 52,
      gender: "female",
      state: "Maharashtra",
      district: "Raigad",
      occupation: "farmer",
      annual_income: 80000,
      category: "OBC",
      land_owner: true,
      disability: false,
      student: false
    }
  },
  {
    id: "ramesh",
    name: { en: "Ramesh (रमेश)", hi: "रमेश (38 वर्ष, मजदूर)", mr: "रमेश (३८ वर्षे, बांधकाम मजूर)" },
    avatar: "👷‍♂️",
    lang: "hi",
    voice_audio_text: {
      hi: "मैं 38 साल का मजदूर हूँ, पुणे में काम करता हूँ। मेरी सालाना आय 1 लाख 20 हज़ार रुपये है। मुझे पक्का मकान, बच्चों की सुरक्षा और जीवन बीमा योजना के बारे में जानना है।",
      mr: "मी ३८ वर्षांचा बांधकाम मजूर असून पुण्यात काम करतो. माझी वार्षिक कमाई १ लाख २० हजार रुपये आहे. मला पक्के घर आणि विमा योजना हवी आहे.",
      en: "I am a 38-year-old daily wage construction worker living in Pune. Annual income is ₹1,20,000. Looking for housing assistance and insurance schemes."
    },
    profile: {
      age: 38,
      gender: "male",
      state: "Maharashtra",
      district: "Pune",
      occupation: "daily_wage",
      annual_income: 120000,
      category: "General",
      land_owner: false,
      disability: false,
      student: false
    }
  },
  {
    id: "aarti",
    name: { en: "Aarti (आरती)", hi: "आरती (19 वर्ष, छात्रा)", mr: "आरती (१९ वर्षे, विद्यार्थिनी)" },
    avatar: "👩‍🎓",
    lang: "en",
    voice_audio_text: {
      en: "I am a 19-year-old engineering college student from Kolhapur, Maharashtra. My family annual income is 1.5 Lakh and I belong to SC category. What scholarships and education schemes can I get?",
      hi: "मैं कोल्हापुर की 19 वर्षीय इंजीनियरिंग छात्रा हूँ। परिवार की सालाना आय 1.5 लाख है और मैं अनुसूचित जाति (SC) से हूँ। मुझे छात्रवृत्ति की जानकारी चाहिए।",
      mr: "मी कोल्हापूरची १९ वर्षांची अभियांत्रिकी विद्यार्थिनी आहे. माझ्या कुटुंबाचे वार्षिक उत्पन्न १.५ लाख असून मी अनुसूचित जाती प्रवर्गातील आहे. मला उच्च शिक्षण शिष्यवृत्ती हवी आहे."
    },
    profile: {
      age: 19,
      gender: "female",
      state: "Maharashtra",
      district: "Kolhapur",
      occupation: "student",
      annual_income: 150000,
      category: "SC",
      land_owner: false,
      disability: false,
      student: true
    }
  },
  {
    id: "ganesh",
    name: { en: "Ganesh (गणेश)", hi: "गणेश (63 वर्ष, चाय विक्रेता/वरिष्ठ)", mr: "गणेश (६३ वर्षे, चहा विक्रेता/ज्येष्ठ)" },
    avatar: "👴",
    lang: "mr",
    voice_audio_text: {
      mr: "माझे वय ६३ वर्षे असून नाशिकमध्ये माझी चहाची छोटी टपरी आहे. वर्षाला ९०,००० रुपये मिळतात. मला वयानुसार पेन्शन आणि टपरी वाढवण्यासाठी कर्ज मिळेल का?",
      hi: "मेरी उम्र 63 साल है, नासिक में चाय की छोटी दुकान है। साल में 90,000 कमाता हूँ। क्या मुझे वृद्धावस्था पेंशन और व्यापार ऋण मिल सकता है?",
      en: "I am 63 years old running a small tea shop in Nashik. Annual earnings are ₹90,000. Looking for senior citizen pension and micro-business credit."
    },
    profile: {
      age: 63,
      gender: "male",
      state: "Maharashtra",
      district: "Nashik",
      occupation: "artisan",
      annual_income: 90000,
      category: "OBC",
      land_owner: false,
      disability: false,
      student: false
    }
  }
];

// Sample Nearby CSC / Seva Kendras for Maharashtra (TRD Section 11, PRD F12)
export const NEARBY_CENTERS = [
  {
    name: "Aaple Sarkar Seva Kendra (Setu Suvidha Kendra)",
    type: "Common Service Center (CSC)",
    address: "Tehsildar Office Compound, Administrative Building",
    distance: "1.2 km away",
    timing: "9:30 AM - 6:00 PM (Mon-Sat)",
    phone: "+91 22 2202 5251",
    services: ["Income Certificate", "Caste Certificate", "7/12 Extract", "Ladki Bahin Form Fill"]
  },
  {
    name: "CSC DigiSeva Kendra - Gram Panchayat",
    type: "Digital Seva Center",
    address: "Shop No. 4, Opposite Post Office, Market Road",
    distance: "2.5 km away",
    timing: "8:00 AM - 8:00 PM (All days)",
    phone: "1800 3000 3468",
    services: ["Aadhaar Biometric Update", "PM-KISAN eKYC", "Ayushman Card Print", "MahaDBT Scan"]
  },
  {
    name: "India Post Payments Bank (IPPB) Branch",
    type: "Department of Posts",
    address: "Head Post Office, Station Chowk",
    distance: "3.1 km away",
    timing: "9:00 AM - 4:00 PM",
    phone: "155299",
    services: ["Instant Aadhaar-NPCI Bank Account", "DBT Seeding", "PMSBY / PMJJBY Insurance"]
  }
];
