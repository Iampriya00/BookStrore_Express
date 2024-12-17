import React from "react";
import { Link } from "react-router-dom";

function banner() {
  return (
    <div>
      <div className="w-full p-12">
        <div className="grid grid-cols-2 gap-4 tab:grid-cols-1">
          <div className="m-auto leftSide">
            <h1 className="text-3xl font-bold">Welcome to our website</h1>
            <p className="py-4">
              "Discover the World, One Page at a Time" At Book Heaven, <br />
              we believe that books have the power to transport you to new
              worlds, ignite your imagination, and transform your life. Whether
              you're an avid reader or just beginning your journey, we have
              something for everyone.
            </p>
            <div className="mt-3">
              <Link to="/books" className="p-3 border border-sky-500">
                Discover Books
              </Link>
            </div>
          </div>
          <div className="rightSide">
            <img
              src="https://curlytales.com/wp-content/uploads/2023/08/story_11zon.jpg"
              alt="Book"
              className="w-full h-auto" // Example responsive styling
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default banner;
