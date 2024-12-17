import React from "react";
import Banner from "../components/Home/banner";
import RecentlyAdded from "../components/Home/RecentlyAdded";
import HomeDown from "../components/Home/homeDown";
function Home() {
  return (
    <>
      <div className="px-10 text-white bg-zinc-900 py-7">
        <Banner />
        <RecentlyAdded />
        <HomeDown />
      </div>
    </>
  );
}

export default Home;
