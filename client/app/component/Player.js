"use client";

export default function Player({
  currentSong,
}) {

  if (!currentSong) return null;

  console.log(currentSong);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-zinc-800 p-4 flex items-center justify-between z-50">

      <div className="flex items-center gap-4">

        <img
          src={currentSong.image}
          alt={currentSong.title}
          className="w-16 h-16 rounded-lg object-cover"
        />

        <div>

          <h2 className="font-bold text-lg text-white">
            {currentSong.title}
          </h2>

          <p className="text-gray-400 text-sm">
            {currentSong.description}
          </p>

        </div>

      </div>

      <audio
        key={currentSong.audio}
        controls
        autoPlay
        className="w-[400px]"
      >
        <source
          src={currentSong.audio}
          type="audio/mpeg"
        />
      </audio>

    </div>
  );
}