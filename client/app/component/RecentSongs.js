export default function RecentSongs({ recent }) {
  return (
    <div className="mt-12">

      <h2 className="text-3xl font-bold mb-6">
        🕒 Recently Played
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
{/* console.log(recentSongs) */}
        {recent.map((item) => (

          <div
            key={item._id}
            className="bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition duration-300 cursor-pointer"
          >

            <img
  src={
    item.songId?.image ||
    "https://placehold.co/300x300?text=No+Image"
  }
  alt={item.songId?.title || "No Song"}
  className="w-full h-48 object-cover rounded-lg"
/>

<h3 className="font-bold mt-4 text-lg">
  {item.songId?.title || "Song Deleted"}
</h3>

<p className="text-gray-400 text-sm mt-1">
  {item.songId?.artist || "Unknown Artist"}
</p>

          </div>

        ))}

      </div>

    </div>
  );
}