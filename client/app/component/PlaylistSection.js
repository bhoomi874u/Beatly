import Link from "next/link";
export default function PlaylistSection({ playlists = [] }) {

  if (!Array.isArray(playlists)) {
    return <p className="text-red-500">No Playlist Found</p>;
  }

  return (
    <div className="mt-12">

      <h2 className="text-3xl font-bold mb-6">
        🎵 My Playlists
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {playlists.map((playlist) => (

          <div
            key={playlist._id}
            className="bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition hover:scale-105"
          >

            <img
              src={
                playlist.songs?.length > 0
                  ? playlist.songs[0].image
                  : "https://placehold.co/400x400?text=Playlist"
              }
              alt={playlist.name}
              className="w-full h-52 object-cover rounded-xl"
            />

            <h3 className="text-xl font-bold mt-4">
              {playlist.name}
            </h3>

            <p className="text-gray-400">
              {playlist.songs?.length || 0} Songs
            </p>

           <Link href={`/playlist/${playlist._id}`}>
  <button
    className="mt-4 w-full bg-green-500 hover:bg-green-600 py-3 rounded-full"
  >
    ▶ Open Playlist
  </button>
</Link>
          </div>

        ))}

      </div>

    </div>
  );
}