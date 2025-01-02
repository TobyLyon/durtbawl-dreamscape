import { initializeAudio } from "@/utils/audioUtils";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  const handleStart = async () => {
    await initializeAudio();
    onStart();
  };

  return (
    <div 
      className="h-screen w-full fixed inset-0 flex items-center justify-center bg-black"
      style={{
        backgroundImage: `url('/lovable-uploads/48af7768-67d7-4f6a-bcd2-42a710962483.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      }}
    >
      <button
        onClick={handleStart}
        className="press-start text-4xl md:text-6xl text-white font-bold tracking-wider cursor-pointer"
      >
        PRESS START
      </button>
    </div>
  );
};

export default StartScreen;