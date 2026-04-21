import { useRef, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

/**
 * Marketing video section — autoplays muted on viewport entry,
 * with a click-to-unmute control. Designed for the home page between
 * Story and Situations.
 */
export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    setIsPlaying(true);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <section className="py-20 md:py-28 bg-background" aria-labelledby="video-heading">
      <div className="container mx-auto px-6 max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-accent mb-3">
              Einblick
            </p>
            <h2
              id="video-heading"
              className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight"
            >
              Wer ich bin. Wofür ich stehe.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Ein kurzer Blick auf meine Arbeit als KI-Stratege und Systemarchitekt.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(15,61,46,0.5)] border border-border bg-black aspect-video group">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/videos/marketing.mp4"
              playsInline
              muted={isMuted}
              loop
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Play overlay */}
            {!isPlaying && (
              <button
                type="button"
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors"
                aria-label="Video abspielen"
              >
                <span className="flex items-center justify-center size-20 md:size-24 rounded-full bg-primary text-primary-foreground shadow-[0_10px_40px_rgba(15,61,46,0.6)] group-hover:scale-110 transition-transform">
                  <Play className="size-8 md:size-10 ml-1" fill="currentColor" />
                </span>
              </button>
            )}

            {/* Mute toggle */}
            {isPlaying && (
              <button
                type="button"
                onClick={toggleMute}
                className="absolute bottom-4 right-4 size-11 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                aria-label={isMuted ? 'Ton einschalten' : 'Ton ausschalten'}
              >
                {isMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
              </button>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
