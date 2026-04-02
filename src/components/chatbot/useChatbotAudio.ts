import { useEffect, useRef } from "react";
import notificationSoundFile from "@/assets/sounds/notification.mp3";
import popSoundFile from "@/assets/sounds/pop.mp3";

const playAudio = async (audio: HTMLAudioElement | null) => {
  if (!audio) {
    return;
  }

  try {
    audio.currentTime = 0;
    await audio.play();
  } catch (error) {
    console.error("Audio playback error:", error);
  }
};

export const useChatbotAudio = () => {
  const botReplyAudioRef = useRef<HTMLAudioElement | null>(null);
  const userMessageAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    botReplyAudioRef.current = new Audio(notificationSoundFile);
    botReplyAudioRef.current.preload = "auto";

    userMessageAudioRef.current = new Audio(popSoundFile);
    userMessageAudioRef.current.preload = "auto";

    return () => {
      if (botReplyAudioRef.current) {
        botReplyAudioRef.current.pause();
        botReplyAudioRef.current.currentTime = 0;
      }

      if (userMessageAudioRef.current) {
        userMessageAudioRef.current.pause();
        userMessageAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  return {
    playBotReplySound: () => playAudio(botReplyAudioRef.current),
    playUserMessageSound: () => playAudio(userMessageAudioRef.current),
  };
};
