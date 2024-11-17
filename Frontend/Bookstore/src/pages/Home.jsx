import React from "react";
import Banner from "../components/Home/banner";
import RecentlyAdded from "../components/Home/RecentlyAdded";
function Home() {
  return (
    <>
      <div className="px-10 text-white bg-zinc-900 py-7">
        <Banner />
        <RecentlyAdded />
      </div>
    </>
  );
}

export default Home;
