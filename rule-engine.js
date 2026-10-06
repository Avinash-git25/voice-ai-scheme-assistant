// Deterministic Rule Engine for VoiceScheme AI / YojanaMitra
// Implements TRD Section 6 (Deterministic Rule Engine) & Section 7 (Recommendation Engine)

import { SCHEMES_DATABASE } from './schemes-data.js';

export class EligibilityEngine {
  constructor() {
    this.schemes = SCHEMES_DATABASE;
  }

  /**
   * Evaluate a user profile against all schemes in the verified database
   * @param {Object} profile - User profile extracted from conversation
   * @param {string} lang - 'en' | 'hi' | 'mr'
   * @returns {Array} List of evaluated schemes sorted by recommendation score
   */
  evaluate(profile, lang = 'mr') {
    const results = [];

    for (const scheme of this.schemes) {
      const evaluation = this.evaluateSingleScheme(scheme, profile, lang);
      results.push(evaluation);
    }

    // Rank schemes: High match first, then Potentially Eligible, then by benefit relevance
    return results.sort((a, b) => b.score - a.score);
  }

  /**
   * Evaluate a single scheme deterministically
   */
  evaluateSingleScheme(scheme, profile, lang) {
    const rules = scheme.rules;
    const checks = [];
    let isEligible = true;
    let missingInfo = false;
    let matchScore = 0;

    // 1. Age Rule
    if (rules.min_age !== undefined || rules.max_age !== undefined) {
      if (profile.age === undefined || profile.age === null) {
        checks.push({
          rule: 'age',
          status: 'MISSING',
          label: this.getRuleLabel('age_missing', lang, rules.min_age, rules.max_age)
        });
        missingInfo = true;
      } else {
        const meetsMin = rules.min_age === undefined || profile.age >= rules.min_age;
        const meetsMax = rules.max_age === undefined || profile.age <= rules.max_age;
        if (meetsMin && meetsMax) {
          checks.push({
            rule: 'age',
            status: 'PASS',
            label: this.getRuleLabel('age_pass', lang, profile.age, rules.min_age, rules.max_age)
          });
          matchScore += 20;
        } else {
          isEligible = false;
          checks.push({
            rule: 'age',
            status: 'FAIL',
            label: this.getRuleLabel('age_fail', lang, profile.age, rules.min_age, rules.max_age)
          });
        }
      }
    }

    // 2. Gender Rule
    if (rules.gender && !rules.gender.includes('all')) {
      if (!profile.gender) {
        checks.push({
          rule: 'gender',
          status: 'MISSING',
          label: this.getRuleLabel('gender_missing', lang)
        });
        missingInfo = true;
      } else if (rules.gender.includes(profile.gender.toLowerCase())) {
        checks.push({
          rule: 'gender',
          status: 'PASS',
          label: this.getRuleLabel('gender_pass', lang, profile.gender)
        });
      } else {
        isEligible = false;
        checks.push({
          rule: 'gender',
          status: 'FAIL',
          label: this.getRuleLabel('gender_fail', lang, profile.gender)
        });
      }
    } else if (rules.gender && rules.gender.includes('all') && profile.gender) {
      checks.push({
        rule: 'gender',
        status: 'PASS',
        label: this.getRuleLabel('gender_all_pass', lang, profile.gender)
      });
    }

    // 3. State / Location Rule
    if (rules.state && !rules.state.includes('All')) {
      if (!profile.state) {
        checks.push({
          rule: 'state',
          status: 'MISSING',
          label: this.getRuleLabel('state_missing', lang)
        });
        missingInfo = true;
      } else if (rules.state.includes(profile.state)) {
        checks.push({
          rule: 'state',
          status: 'PASS',
          label: this.getRuleLabel('state_pass', lang, profile.state)
        });
      } else {
        isEligible = false;
        checks.push({
          rule: 'state',
          status: 'FAIL',
          label: this.getRuleLabel('state_fail', lang, profile.state, rules.state.join(', '))
        });
      }
    } else if (rules.state && rules.state.includes('All') && profile.state) {
      checks.push({
        rule: 'state',
        status: 'PASS',
        label: this.getRuleLabel('state_all_pass', lang, profile.state)
      });
    }

    // 4. Annual Income Rule
    if (rules.max_income !== undefined) {
      if (profile.annual_income === undefined || profile.annual_income === null) {
        checks.push({
          rule: 'income',
          status: 'MISSING',
          label: this.getRuleLabel('income_missing', lang, rules.max_income)
        });
        missingInfo = true;
      } else if (profile.annual_income <= rules.max_income) {
        checks.push({
          rule: 'income',
          status: 'PASS',
          label: this.getRuleLabel('income_pass', lang, profile.annual_income, rules.max_income)
        });
        matchScore += 25;
      } else {
        isEligible = false;
        checks.push({
          rule: 'income',
          status: 'FAIL',
          label: this.getRuleLabel('income_fail', lang, profile.annual_income, rules.max_income)
        });
      }
    }

    // 5. Occupation Rule
    if (rules.occupation && rules.occupation.length > 0) {
      if (!profile.occupation) {
        checks.push({
          rule: 'occupation',
          status: 'MISSING',
          label: this.getRuleLabel('occupation_missing', lang)
        });
        missingInfo = true;
      } else if (rules.occupation.includes(profile.occupation)) {
        checks.push({
          rule: 'occupation',
          status: 'PASS',
          label: this.getRuleLabel('occupation_pass', lang, profile.occupation)
        });
        matchScore += 30;
      } else {
        // Occupation mismatch is either a disqualifier or secondary relevance
        isEligible = false;
        checks.push({
          rule: 'occupation',
          status: 'FAIL',
          label: this.getRuleLabel('occupation_fail', lang, profile.occupation)
        });
      }
    }

    // 6. Land Owner Rule
    if (rules.land_owner !== undefined) {
      if (profile.land_owner === undefined || profile.land_owner === null) {
        checks.push({
          rule: 'land_owner',
          status: 'MISSING',
          label: this.getRuleLabel('land_missing', lang)
        });
        missingInfo = true;
      } else if (profile.land_owner === rules.land_owner) {
        checks.push({
          rule: 'land_owner',
          status: 'PASS',
          label: this.getRuleLabel('land_pass', lang, profile.land_owner)
        });
        matchScore += 20;
      } else {
        isEligible = false;
        checks.push({
          rule: 'land_owner',
          status: 'FAIL',
          label: this.getRuleLabel('land_fail', lang)
        });
      }
    }

    // 7. Social Category Rule
    if (rules.category && rules.category.length > 0) {
      if (!profile.category) {
        checks.push({
          rule: 'category',
          status: 'MISSING',
          label: this.getRuleLabel('category_missing', lang)
        });
        missingInfo = true;
      } else if (rules.category.includes(profile.category)) {
        checks.push({
          rule: 'category',
          status: 'PASS',
          label: this.getRuleLabel('category_pass', lang, profile.category)
        });
        matchScore += 20;
      } else {
        isEligible = false;
        checks.push({
          rule: 'category',
          status: 'FAIL',
          label: this.getRuleLabel('category_fail', lang, profile.category, rules.category.join('/'))
        });
      }
    }

    // Final Status Determination
    let status = 'POTENTIALLY_ELIGIBLE';
    let statusLabel = '';
    let statusColor = '';

    const totalChecks = checks.length;
    const passedCount = checks.filter(c => c.status === 'PASS').length;

    if (!isEligible) {
      status = 'NOT_ELIGIBLE';
      statusLabel = this.getStatusText('NOT_ELIGIBLE', lang);
      statusColor = 'red';
      matchScore = 0;
    } else if (missingInfo) {
      status = 'MISSING_INFO';
      statusLabel = this.getStatusText('MISSING_INFO', lang);
      statusColor = 'orange';
      matchScore = totalChecks > 0 ? Math.min(75, Math.round((passedCount / totalChecks) * 75)) : 50;
    } else {
      status = 'POTENTIALLY_ELIGIBLE';
      statusLabel = this.getStatusText('POTENTIALLY_ELIGIBLE', lang);
      statusColor = 'green';
      matchScore = 100;
    }

    // Calculate Why You Qualify reasons
    const passedReasons = checks.filter(c => c.status === 'PASS').map(c => c.label);
    const failedReasons = checks.filter(c => c.status === 'FAIL').map(c => c.label);
    const missingReasons = checks.filter(c => c.status === 'MISSING').map(c => c.label);

    return {
      scheme,
      status,
      statusLabel,
      statusColor,
      score: matchScore,
      checks,
      passedReasons,
      failedReasons,
      missingReasons
    };
  }

  getStatusText(status, lang) {
    const texts = {
      POTENTIALLY_ELIGIBLE: {
        en: 'Potentially Eligible',
        hi: 'संभावित रूप से पात्र (Potentially Eligible)',
        mr: 'संभाव्य पात्र (Potentially Eligible)'
      },
      MISSING_INFO: {
        en: 'Missing Details Needed',
        hi: 'अतिरिक्त विवरण आवश्यक',
        mr: 'अतिरिक्त माहिती आवश्यक'
      },
      NOT_ELIGIBLE: {
        en: 'Criteria Not Met',
        hi: 'पात्रता मानदंड पूरा नहीं',
        mr: 'अटी पूर्ण होत नाहीत'
      }
    };
    return texts[status]?.[lang] || texts[status]?.en;
  }

  getRuleLabel(key, lang, p1, p2, p3) {
    const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

    const labels = {
      age_pass: {
        en: `Age (${p1}) meets scheme requirement (${p2 ? `Min: ${p2}` : ''} ${p3 ? `Max: ${p3}` : ''})`,
        hi: `आयु (${p1} वर्ष) योजना की सीमा में है (${p2 ? `न्यूनतम: ${p2}` : ''} ${p3 ? `अधिकतम: ${p3}` : ''})`,
        mr: `वय (${p1} वर्षे) योजनेच्या निकषामध्ये बसते (${p2 ? `किमान: ${p2}` : ''} ${p3 ? `कमाल: ${p3}` : ''})`
      },
      age_fail: {
        en: `Age (${p1}) is outside the required range (${p2 ? `Min: ${p2}` : ''} ${p3 ? `Max: ${p3}` : ''})`,
        hi: `आयु (${p1} वर्ष) योजना की पात्रता सीमा से बाहर है`,
        mr: `वय (${p1} वर्षे) योजनेच्या वयोमर्यादेत बसत नाही`
      },
      age_missing: {
        en: 'Age not specified',
        hi: 'आयु का उल्लेख नहीं किया गया',
        mr: 'वयाचा उल्लेख नाही'
      },
      gender_pass: {
        en: `Gender matches scheme beneficiary target (${p1})`,
        hi: `लिंग पात्रता से मेल खाता है (${p1})`,
        mr: `लिंग योजनेच्या उद्दिष्टाशी जुळते (${p1})`
      },
      gender_all_pass: {
        en: 'Scheme is open to all genders',
        hi: 'यह योजना सभी लिंगों (पुरुष/महिला) के लिए खुली है',
        mr: 'ही योजना सर्व लिंगांसाठी (पुरुष/महिला) खुली आहे'
      },
      gender_fail: {
        en: 'Scheme is exclusively reserved for women beneficiaries',
        hi: 'यह योजना केवल महिला लाभार्थियों के लिए आरक्षित है',
        mr: 'ही योजना केवळ महिला लाभार्थ्यांसाठी राखीव आहे'
      },
      gender_missing: {
        en: 'Gender detail required',
        hi: 'लिंग की जानकारी आवश्यक',
        mr: 'लिंग माहिती आवश्यक'
      },
      state_pass: {
        en: `Resident of eligible state (${p1})`,
        hi: `संबंधित राज्य (${p1}) के निवासी`,
        mr: `पात्र राज्याचे रहिवासी (${p1})`
      },
      state_all_pass: {
        en: 'Central Scheme applicable nationwide across all States & UTs',
        hi: 'केंद्र सरकार की योजना: पूरे भारत में सभी राज्यों में लागू',
        mr: 'केंद्र शासन योजना: संपूर्ण भारतात सर्व राज्यांसाठी लागू'
      },
      state_fail: {
        en: `Scheme is only applicable for residents of ${p2}`,
        hi: `यह योजना केवल ${p2} के निवासियों के लिए है`,
        mr: `ही योजना केवळ ${p2} च्या रहिवाशांसाठी लागू आहे`
      },
      state_missing: {
        en: 'State residency not provided',
        hi: 'राज्य निवास का विवरण नहीं मिला',
        mr: 'राज्याचा उल्लेख नाही'
      },
      income_pass: {
        en: `Annual income (${formatINR(p1)}) is within the allowed limit (${formatINR(p2)})`,
        hi: `वार्षिक आय (${formatINR(p1)}) निर्धारित सीमा (${formatINR(p2)}) के भीतर है`,
        mr: `वार्षिक उत्पन्न (${formatINR(p1)}) विहित मर्यादेत (${formatINR(p2)}) आहे`
      },
      income_fail: {
        en: `Annual income (${formatINR(p1)}) exceeds the maximum ceiling (${formatINR(p2)})`,
        hi: `वार्षिक आय (${formatINR(p1)}) अनुमत सीमा (${formatINR(p2)}) से अधिक है`,
        mr: `वार्षिक उत्पन्न (${formatINR(p1)}) कमाल मर्यादेपेक्षा (${formatINR(p2)}) जास्त आहे`
      },
      income_missing: {
        en: `Income details needed (Ceiling: ${formatINR(p1)})`,
        hi: `आय का विवरण आवश्यक (सीमा: ${formatINR(p1)})`,
        mr: `उत्पन्नाचा तपशील आवश्यक (मर्यादा: ${formatINR(p1)})`
      },
      occupation_pass: {
        en: `Occupation (${p1}) matches target beneficiary group`,
        hi: `व्यवसाय (${p1}) लक्षित लाभार्थी वर्ग से मेल खाता है`,
        mr: `व्यवसाय (${p1}) लक्षित लाभार्थी घटकाशी जुळतो`
      },
      occupation_fail: {
        en: `Beneficiary occupation (${p1}) does not match scheme category`,
        hi: `व्यवसाय (${p1}) योजना के लक्षित वर्ग में नहीं आता`,
        mr: `व्यवसाय (${p1}) योजनेच्या प्रवर्गाशी जुळत नाही`
      },
      occupation_missing: {
        en: 'Occupation details required',
        hi: 'व्यवसाय का विवरण आवश्यक',
        mr: 'व्यवसायाची माहिती आवश्यक'
      },
      land_pass: {
        en: 'Owns cultivable agricultural land in official records',
        hi: 'सरकारी राजस्व रिकॉर्ड में स्वयं की कृषि भूमि उपलब्ध है',
        mr: 'महसूल नोंदीनुसार स्वतःच्या मालकीची शेतीजमीन उपलब्ध आहे'
      },
      land_fail: {
        en: 'Scheme specifically requires land ownership in applicant name',
        hi: 'इस योजना के लिए आवेदक के नाम पर भूमि का होना अनिवार्य है',
        mr: 'या योजनेसाठी अर्जदाराच्या नावावर जमीन असणे बंधनकारक आहे'
      },
      land_missing: {
        en: 'Land ownership status needed',
        hi: 'जमीन स्वामित्व की जानकारी आवश्यक',
        mr: 'जमीन मालकीची माहिती आवश्यक'
      },
      category_pass: {
        en: `Social category (${p1}) is eligible for scholarship/aid`,
        hi: `सामाजिक वर्ग (${p1}) योजना के तहत पात्र है`,
        mr: `सामाजिक प्रवर्ग (${p1}) योजनेसाठी पात्र आहे`
      },
      category_fail: {
        en: `Category (${p1}) does not match eligible groups (${p2})`,
        hi: `वर्ग (${p1}) पात्र वर्गों (${p2}) से मेल नहीं खाता`,
        mr: `प्रवर्ग (${p1}) पात्र प्रवर्गांशी (${p2}) जुळत नाही`
      },
      category_missing: {
        en: 'Category (General/OBC/SC/ST) required',
        hi: 'सामाजिक वर्ग (General/OBC/SC/ST) आवश्यक',
        mr: 'सामाजिक प्रवर्ग आवश्यक'
      }
    };

    return labels[key]?.[lang] || labels[key]?.en || '';
  }
}
