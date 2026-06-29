import React from "react";
import Banner from "../components/Home/banner";
import RecentlyAdded from "../components/Home/RecentlyAdded";
import HomeDown from "../components/Home/homeDown";
function Home() {
  return (
    <>
      <div className="px-10 text-white py-7 bg-gradient-to-r from-black via-zinc-900 to-slate-900">
        <Banner />
        <RecentlyAdded />
        <HomeDown />
      </div>
    </>
  );
}

export default Home;
