import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

interface AudioPlayerProps {
  title: string;
  instructor?: string;
  audioUrl?: string;
  duration: number;
  onComplete?: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  instructor,
  audioUrl,
  duration,
  onComplete,
  onFavorite,
  isFavorited = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Generate a calming nature sound URL for demo purposes
  const defaultAudioUrl = "https://www.soundjay.com/misc/sounds/rain-01.wav";
  const finalAudioUrl = audioUrl || defaultAudioUrl;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      onComplete?.();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onComplete]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing audio:', error);
        // Fallback: create a synthesized audio experience
        startSyntheticAudio();
      }
    }
  };

  const startSyntheticAudio = () => {
    // Create a simple meditation timer with visual feedback
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 1;
        if (newTime >= duration * 60) {
          clearInterval(interval);
          setIsPlaying(false);
          setCurrentTime(0);
          onComplete?.();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    // Store interval reference for cleanup
    (audioRef.current as any)._interval = interval;
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
    } else {
      setCurrentTime(prev => Math.min(prev + 10, duration * 60));
    }
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(audio.currentTime - 10, 0);
    } else {
      setCurrentTime(prev => Math.max(prev - 10, 0));
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVolume / 100;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDurationSeconds = duration * 60;
  const progress = totalDurationSeconds > 0 ? (currentTime / totalDurationSeconds) * 100 : 0;

  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
      <audio
        ref={audioRef}
        src={finalAudioUrl}
        onLoadedMetadata={() => {
          const audio = audioRef.current;
          if (audio) {
            audio.volume = volume / 100;
          }
        }}
      />
      
      <div className="space-y-4">
        {/* Track Info */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {instructor && (
            <p className="text-sage-100 text-sm">with {instructor}</p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={totalDurationSeconds}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-sage-100">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalDurationSeconds)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={skipBackward}
            className="text-white hover:bg-white/10"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={togglePlayPause}
            className="bg-white/20 hover:bg-white/30 text-white rounded-full p-3"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={skipForward}
            className="text-white hover:bg-white/10"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Volume and Favorite */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <Volume2 className="h-4 w-4 text-sage-100" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-20"
            />
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onFavorite}
            className={`${
              isFavorited ? 'text-red-400' : 'text-sage-100'
            } hover:bg-white/10`}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
    </Card>
  );
};