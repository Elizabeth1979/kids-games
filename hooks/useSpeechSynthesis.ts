'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { LanguageConfig, SpeechSynthesisHook } from '@/types';

export function useSpeechSynthesis(languageConfig: LanguageConfig): SpeechSynthesisHook {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isReady, setIsReady] = useState(false);
  const loadAttemptsRef = useRef(0);

  const loadVoices = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const availableVoices = window.speechSynthesis.getVoices();

    if (availableVoices.length > 0) {
      setVoices(availableVoices);
      setIsReady(true);

      const baseLang = languageConfig.lang.split('-')[0];
      let voice: SpeechSynthesisVoice | undefined;

      // Try voice preferences first
      if (languageConfig.voicePreferences) {
        for (const pref of languageConfig.voicePreferences) {
          voice = availableVoices.find(v =>
            v.lang === pref || v.lang.startsWith(pref)
          );
          if (voice) break;
        }
      }

      // Fallback to base language
      if (!voice) {
        voice = availableVoices.find(v => v.lang.startsWith(baseLang));
      }

      // Try matching by voice name (for Arabic)
      if (!voice && baseLang === 'ar') {
        voice = availableVoices.find(v =>
          v.name.toLowerCase().includes('arabic') ||
          v.name.includes('Majed') ||
          v.name.includes('Hoda') ||
          v.name.includes('Tarik') ||
          v.name.includes('Laila')
        );
      }

      // Try matching by language name in voice name
      if (!voice) {
        voice = availableVoices.find(v =>
          v.name.toLowerCase().includes(baseLang)
        );
      }

      // Fallback to Google voices
      if (!voice) {
        voice = availableVoices.find(v =>
          v.name.toLowerCase().includes('google')
        );
      }

      // Final fallback to default voice
      if (!voice) {
        voice = availableVoices.find(v => v.default) || availableVoices[0];
      }

      setSelectedVoice(voice || null);

      if (voice) {
        console.log(`[Speech] Selected voice: ${voice.name} (${voice.lang})`);
      }
    }
  }, [languageConfig]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    loadVoices();

    // Load voices with retry strategy for Android
    const loadWithRetry = () => {
      if (loadAttemptsRef.current < 3) {
        loadAttemptsRef.current++;
        const delays = [100, 500, 1000];
        setTimeout(loadVoices, delays[loadAttemptsRef.current - 1]);
      }
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    loadWithRetry();

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [loadVoices]);

  const speak = useCallback((text: string, localeOverride?: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis || !text) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = localeOverride || languageConfig.lang;
    utterance.lang = targetLang;
    utterance.rate = languageConfig.speechRate || 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    // If locale override is provided, try to find a voice for that locale
    if (localeOverride && voices.length > 0) {
      const baseLang = localeOverride.split('-')[0];
      const overrideVoice = voices.find(v =>
        v.lang.startsWith(baseLang) || v.lang === localeOverride
      );
      if (overrideVoice) {
        utterance.voice = overrideVoice;
      } else if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    } else if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('[Speech] Error:', error);
    }
  }, [selectedVoice, languageConfig, voices]);

  return { speak, isReady, selectedVoice, voices };
}
