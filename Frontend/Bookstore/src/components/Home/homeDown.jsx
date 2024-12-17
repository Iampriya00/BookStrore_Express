import React from "react";

function homeDown() {
  return (
    <>
      <div className="px-6 mt-12">
        <h2 className="text-3xl text-center text-yellow-200">
          Explore Our Collection
        </h2>
        <p className="font-bold text-2xl pt-3">
          Dive into a vast collection of books across all genres!
        </p>
        <p className="text-xl py-3">
          From thrilling mysteries to heartwarming romances, thought-provoking
          non-fiction, and exciting sci-fi, our curated selection of books is
          designed to meet the needs of every reader.
        </p>
        <ul className="text-xl">
          <li>
            <strong>Bestsellers:</strong> Keep up with the latest must-reads.
          </li>
          <li>
            <strong>New Releases: </strong>Be the first to grab the latest
            books.
          </li>
          <li>
            <strong>Editor’s Picks:</strong> Handpicked recommendations from our
            team of book lovers
          </li>
        </ul>
      </div>
      <div className="px-6 mt-12">
        <h2 className="text-3xl text-center text-yellow-200">
          Why Shop with Us?
        </h2>
        <p className="font-bold text-2xl py-3">
          At Book Heaven, we’re more than just a bookstore — we’re a community.
          Here’s why readers love shopping with us:
        </p>
        <ul className="text-xl">
          <li>
            <strong>Free Shipping on Orders Over $50:</strong> Get your books
            delivered to your door without the extra cost.
          </li>
          <li>
            <strong>Exclusive Discounts:</strong> Save more with our regular
            promotions and special offers.
          </li>
          <li>
            <strong>Curated Recommendations:</strong> Based on your reading
            preferences, we suggest books you’ll love.
          </li>
          <li>
            <strong>Customer Support:</strong> Our team is here to assist you
            with any questions or concerns.
          </li>
        </ul>
      </div>
    </>
  );
}

export default homeDown;
