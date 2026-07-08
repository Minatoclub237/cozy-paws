import { X, Play, Pause, Volume2, VolumeX, Heart, Share2, MessageCircle, Star } from "lucide-react";
import { useState, useEffect } from "react";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoPlayerModal({ isOpen, onClose }: VideoPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);
  const [likes, setLikes] = useState(1420);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1.2;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-[#1a3d1a] border-2 border-white/20 rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl relative z-10 animate-scale-in aspect-[9/16] flex flex-col justify-between">
        {/* Background review thumbnail simulation */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://polo-pecan-73837341.figma.site/_assets/v11/76be6ec3a93a703b15e9cc01e764a4e3f9d7d2c0.png"
            alt="Video Preview"
            className={`w-full h-full object-cover transition-all duration-500 ${isPlaying ? "scale-105 brightness-110" : "scale-100 brightness-75"}`}
          />
          {/* Subtle moving noise or glow for simulation */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>

        {/* Top bar */}
        <div className="relative z-10 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded-full">FLUX SIMULÉ</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-black/40 border border-white/10 rounded-full hover:bg-black/60 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Centered big play button overlay (if paused) */}
        {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 m-auto w-16 h-16 bg-[#E86A10] hover:bg-[#d45e0d] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 z-20"
          >
            <Play className="w-8 h-8 fill-white ml-1" />
          </button>
        )}

        {/* Video UI Overlay */}
        <div className="relative z-10 p-4 space-y-4">
          {/* Side action buttons (TikTok style) */}
          <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5 text-white z-20">
            {/* Likes */}
            <button
              onClick={() => {
                setHasLiked(!hasLiked);
                setLikes((prev) => (hasLiked ? prev - 1 : prev + 1));
              }}
              className="flex flex-col items-center gap-1 group"
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all bg-black/40 border border-white/10 group-hover:scale-110 ${hasLiked ? "bg-[#E86A10] border-none" : ""}`}>
                <Heart className={`w-5 h-5 ${hasLiked ? "fill-white" : ""}`} />
              </div>
              <span className="text-xs font-bold">{likes}</span>
            </button>

            {/* Comments count */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-11 h-11 rounded-full bg-black/40 border border-white/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold">48</span>
            </div>

            {/* Share */}
            <div className="flex flex-col items-center gap-1 cursor-pointer">
              <div className="w-11 h-11 rounded-full bg-black/40 border border-white/10 flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold">Partager</span>
            </div>
          </div>

          {/* Bottom metadata */}
          <div className="text-white max-w-[240px] space-y-2">
            <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 px-2 py-1 rounded-lg w-fit">
              <Star className="w-3.5 h-3.5 fill-[#E86A10] text-[#E86A10]" />
              <span className="text-xs font-bold">Note Confort 4.9/5</span>
            </div>
            
            <h4 className="font-bold text-sm tracking-tight text-white drop-shadow-md">
              @LunaEtSesAmis • Avis sur la Maison Douillette
            </h4>
            <p className="text-xs text-white/80 leading-relaxed drop-shadow-sm">
              "Luna n'a pas quitté sa nouvelle maison pour chat depuis qu'elle est arrivée. Littéralement obsédée par le coussin en laine ! Je recommande vivement CozyPaws ! 🐾🐈"
            </p>
          </div>

          {/* Control Bar & Progress */}
          <div className="bg-black/60 border border-white/10 p-3 rounded-xl backdrop-blur-md flex items-center gap-3">
            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 hover:text-[#E86A10] transition-colors text-white"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            {/* Simulated Progress bar */}
            <div className="flex-1 h-1 bg-white/20 rounded-full relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#E86A10] transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Volume */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 hover:text-[#E86A10] transition-colors text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
