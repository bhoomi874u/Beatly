import RecentSongs from "./RecentSongs";

export default function ProfileStats ({favorites, recent, playlists}){
    return(
        <div className="grid grid-cols-3 gap-6 mt-8" >
            <div className="bg-zinc-900 rounded-xl p-6 text-center">
                {/* <h1 className="text-4xl ">❤️</h1> */}
                <h2 className="text-3xl font-bold mt-2">{favorites}</h2>
                <p className="text-gray-400"> ❤️ Favorite Songs</p>
            </div>
            <div className="bg-zinc-900 rounded-xl p-6 text-center">
                {/* <h1 className="text-4xl">🕒</h1> */}
                <h2 className="text-3xl font-bold mt-2">{recent}</h2>
                <p className="text-gray-400">  🕒 Recently Played</p>
            </div>
            <div className="bg-zinc-900 rounded-xl p-6 text-center">
                
                <h2 className="text-3xl font-bold mt-2">{playlists}</h2>
                <p className="text-gray-400">🎶 My Playlists</p>
            </div>
           
        </div>
          )
}