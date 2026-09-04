"use client";

export default function SongCard({
  song,
  onPlay,
  onFavorite,
  onPlaylist,
}) {
  return (
    <div
      className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-green-500/20 hover:scale-105 transition duration-300 cursor-pointer"
    >
      <div className="relative">

        <img
          src={song.image}
          alt={song.title}
          className="w-full h-60 object-cover"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
          className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 w-14 h-14 rounded-full flex items-center justify-center text-2xl"
        >
          ▶
        </button>

      </div>

      <div className="p-4">

        <h2 className="text-xl font-bold">
          {song.title}
        </h2>

        <p className="text-gray-400 mt-2">
          {song.description}
        </p>

        <div className="flex justify-between mt-5">

          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite();
            }}
            className="text-red-500 text-2xl hover:scale-125 transition"
          >
            ❤️
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlaylist();
            }}
            className="text-xl hover:text-green-500"
          >
            ➕
          </button>

        </div>

      </div>
    </div>
  );
}