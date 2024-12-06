import React from "react";

function banner() {
  return (
    <div>
      <div className="w-full p-12">
        <div className="grid grid-cols-2 gap-4 tab:grid-cols-1">
          <div className="m-auto leftSide">
            <h1 className="text-3xl font-bold">Welcome to our website</h1>
            <p className="py-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Veritatis ullam dignissimos neque ipsa doloribus in non, odio et
              sed pariatur aliquid ratione debitis. Molestiae velit quod cum
              aperiam accusantium quas!
            </p>
            <div>
              <button className="p-3 border border-sky-500">
                Discover Books
              </button>
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
