// Voice Service: Speech Recognition & High-Quality Native Multilingual Text-to-Speech
// Implements TRD Section 3 (FR-01, FR-02), PRD F2, F7 & Polly/Transcribe simulation
// Features native Marathi & Hindi streaming audio via /api/tts with SpeechSynthesis fallback

export class VoiceService {
  constructor(onTranscriptCallback, onStateChangeCallback) {
    this.onTranscript = onTranscriptCallback;
    this.onStateChange = onStateChangeCallback;
    this.recognition = null;
    this.isListening = false;
    this.isSpeaking = false;
    this.currentLanguage = 'mr'; // default marathi as per PRD/TRD MVP
    this.synth = window.speechSynthesis || null;
    this.voices = [];
    this.currentAudio = null;

    this.initVoices();
    this.initRecognition();
    this.enableAudioUnlock();
  }

  enableAudioUnlock() {
    const unlock = () => {
      if (this.synth && this.synth.paused) {
        this.synth.resume();
      }
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true });
  }

  initVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
      };
    }
  }

  findBestVoice(lang) {
    if (!this.synth) return null;
    let voices = this.voices && this.voices.length > 0 ? this.voices : this.synth.getVoices();
    if (!voices || voices.length === 0) return null;

    const norm = (s) => (s || '').toLowerCase().replace(/_/g, '-');

    if (lang === 'mr') {
      // 1. Explicit Marathi voice
      const mrVoice = voices.find(v => norm(v.lang) === 'mr-in' || norm(v.lang).startsWith('mr') || v.name.toLowerCase().includes('marathi'));
      if (mrVoice) return mrVoice;

      // 2. Hindi voice fallback
      const hiVoice = voices.find(v => norm(v.lang) === 'hi-in' || norm(v.lang).startsWith('hi') || v.name.toLowerCase().includes('lekha') || v.name.toLowerCase().includes('hindi') || v.name.toLowerCase().includes('kalpana') || v.name.toLowerCase().includes('hemant'));
      if (hiVoice) return hiVoice;

      // 3. Indian English voice fallback
      const inEnVoice = voices.find(v => norm(v.lang) === 'en-in' || v.name.toLowerCase().includes('india') || v.name.toLowerCase().includes('aman') || v.name.toLowerCase().includes('rishi') || v.name.toLowerCase().includes('neerja') || v.name.toLowerCase().includes('prabhat'));
      if (inEnVoice) return inEnVoice;
    }

    if (lang === 'hi') {
      // 1. Check for Hindi voice
      const hiVoice = voices.find(v => norm(v.lang) === 'hi-in' || norm(v.lang).startsWith('hi') || v.name.toLowerCase().includes('lekha') || v.name.toLowerCase().includes('hindi') || v.name.toLowerCase().includes('kalpana') || v.name.toLowerCase().includes('hemant'));
      if (hiVoice) return hiVoice;

      // 2. Fallback to Indian English voice
      const inEnVoice = voices.find(v => norm(v.lang) === 'en-in' || v.name.toLowerCase().includes('india') || v.name.toLowerCase().includes('aman') || v.name.toLowerCase().includes('rishi') || v.name.toLowerCase().includes('neerja'));
      if (inEnVoice) return inEnVoice;
    }

    // Default / en
    const inEnVoice = voices.find(v => norm(v.lang) === 'en-in' || v.name.toLowerCase().includes('india') || v.name.toLowerCase().includes('aman') || v.name.toLowerCase().includes('rishi') || v.name.toLowerCase().includes('tara'));
    if (inEnVoice) return inEnVoice;

    const enVoice = voices.find(v => norm(v.lang).startsWith('en'));
    if (enVoice) return enVoice;

    return voices[0] || null;
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    if (this.recognition) {
      this.recognition.lang = this.getBcp47(lang);
    }
  }

  getBcp47(lang) {
    switch (lang) {
      case 'hi': return 'hi-IN';
      case 'mr': return 'mr-IN';
      default: return 'en-IN';
    }
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Web Speech API not supported in this browser environment. Using manual/preset mode.");
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = this.getBcp47(this.currentLanguage);

      this.recognition.onstart = () => {
        this.isListening = true;
        if (this.onStateChange) this.onStateChange({ isListening: true });
      };

      this.recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (this.onTranscript) {
          const isFinal = event.results[event.results.length - 1].isFinal;
          this.onTranscript(transcript, isFinal);
        }
      };

      this.recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        this.isListening = false;
        if (this.onStateChange) this.onStateChange({ isListening: false, error: event.error });
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.onStateChange) this.onStateChange({ isListening: false });
      };
    } catch (e) {
      console.error("Failed to initialize SpeechRecognition:", e);
    }
  }

  toggleListening() {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  startListening() {
    if (this.isSpeaking) {
      this.stopSpeaking();
    }

    if (!this.recognition) {
      this.initRecognition();
    }

    if (this.recognition) {
      try {
        this.recognition.lang = this.getBcp47(this.currentLanguage);
        this.recognition.start();
      } catch (e) {
        console.warn("Recognition already started or permission blocked:", e);
      }
    } else {
      alert("Microphone API is not supported in this browser. Please use the preset personas or type your situation.");
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) { }
    }
    this.isListening = false;
    if (this.onStateChange) this.onStateChange({ isListening: false });
  }

  cleanTextForSpeech(text) {
    if (!text) return '';
    let cleaned = text;

    // Remove emojis, symbols, and special UI icons
    cleaned = cleaned.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}]/gu, ' ');
    cleaned = cleaned.replace(/[✓✅❌⚠️❓🤖👤🚀💰⏱️📋🔍⚡🏛️🚩✨👨👩🌾🏗️🎓🛠️🏠💼📍•]/gu, ' ');

    // Replace abbreviations
    cleaned = cleaned.replace(/उदा[:.]?\s*/gi, ' ');
    cleaned = cleaned.replace(/e\.g\.?,?\s*/gi, 'for example, ');

    // Remove parenthetical content
    cleaned = cleaned.replace(/\([^)]*\)/g, ' ');
    cleaned = cleaned.replace(/\[[^\]]*\]/g, ' ');
    cleaned = cleaned.replace(/[<>\/\\|#*~_\-–—^"]/g, ' ');

    // Replace currency symbols
    cleaned = cleaned.replace(/₹\s*(\d[\d,]*)/g, '$1 rupees ');

    // Collapse multiple spaces
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    return cleaned;
  }

  speak(text, lang = this.currentLanguage, onEndCallback = null) {
    // 1. Stop any currently playing audio or speech synthesis
    this.stopSpeaking();

    if (!text || text.trim() === '') {
      if (onEndCallback) onEndCallback();
      return;
    }

    const cleanedText = this.cleanTextForSpeech(text);
    if (!cleanedText || cleanedText.trim() === '') {
      if (onEndCallback) onEndCallback();
      return;
    }

    // Set speaking state for visual waveform & UI feedback
    this.isSpeaking = true;
    if (this.onStateChange) this.onStateChange({ isSpeaking: true });

    let finished = false;
    const finalize = () => {
      if (finished) return;
      finished = true;
      this.isSpeaking = false;
      this.currentAudio = null;
      if (this.onStateChange) this.onStateChange({ isSpeaking: false });
      if (onEndCallback) onEndCallback();
    };

    // 2. For Marathi (mr) and Hindi (hi):
    // Use the streaming /api/tts endpoint for authentic native pronunciation across all devices
    if (lang === 'mr' || lang === 'hi') {
      try {
        const audioUrl = `/api/tts?text=${encodeURIComponent(cleanedText)}&lang=${lang}`;
        const audio = new Audio(audioUrl);
        this.currentAudio = audio;

        audio.onplay = () => {
          this.isSpeaking = true;
          if (this.onStateChange) this.onStateChange({ isSpeaking: true });
        };

        audio.onended = () => {
          finalize();
        };

        audio.onerror = (e) => {
          console.warn("TTS stream error, falling back to browser SpeechSynthesis:", e);
          this.currentAudio = null;
          this.speakViaSpeechSynthesis(cleanedText, lang, finalize);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Audio autoplay prevented by browser gesture requirement:", err.message);
            this.currentAudio = null;
            this.speakViaSpeechSynthesis(cleanedText, lang, finalize);
          });
        }
        return;
      } catch (err) {
        console.warn("Audio element initialization error:", err);
        this.speakViaSpeechSynthesis(cleanedText, lang, finalize);
        return;
      }
    }

    // 3. For English or fallback, use browser SpeechSynthesis
    this.speakViaSpeechSynthesis(cleanedText, lang, finalize);
  }

  speakViaSpeechSynthesis(cleanedText, lang, finalizeCallback) {
    if (!this.synth) {
      if (finalizeCallback) finalizeCallback();
      return;
    }

    if (this.synth.paused) {
      this.synth.resume();
    }

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const matchedVoice = this.findBestVoice(lang);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
      utterance.lang = matchedVoice.lang;
    } else {
      utterance.lang = (lang === 'mr' || lang === 'hi') ? 'hi-IN' : 'en-IN';
    }

    utterance.onend = () => {
      if (finalizeCallback) finalizeCallback();
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis error:", e.error || e);
      if (finalizeCallback) finalizeCallback();
    };

    try {
      this.synth.speak(utterance);
      if (this.synth.paused) {
        this.synth.resume();
      }
    } catch (err) {
      console.warn("Exception in synth.speak:", err);
      if (finalizeCallback) finalizeCallback();
    }
  }

  stopSpeaking() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) { }
      this.currentAudio = null;
    }
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) { }
    }
    this.isSpeaking = false;
    if (this.onStateChange) this.onStateChange({ isSpeaking: false });
  }
}
