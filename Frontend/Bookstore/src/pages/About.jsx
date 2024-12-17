import React from "react";

function About() {
  return (
    <div className="bg-black text-gray-100 min-h-screen py-10 px-5">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">About Us</h1>
        <p className="text-lg mb-8">
          Welcome to{" "}
          <span className="font-semibold text-blue-400">Book Haven</span>! We
          are passionate about connecting readers with their next great
          adventure. Our mission is to make reading more accessible and
          enjoyable for everyone.
        </p>
        <img
          src="https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?cs=srgb&dl=pexels-pixabay-256455.jpg&fm=jpg"
          alt="About Us"
          className="mb-8 rounded-lg shadow-lg h-[400px] w-[400px] m-auto"
        />
        <p className="text-lg mb-8">
          At Book Haven, we believe that books are the gateway to endless
          possibilities. Whether you're looking for a thrilling mystery, a
          heartwarming romance, or an insightful biography, we have something
          for every book lover. Our carefully curated collection is designed to
          inspire and entertain.
        </p>
        <p className="text-lg mb-8">
          Join our community of book enthusiasts and explore our vast library of
          titles. We strive to provide an engaging and seamless browsing
          experience for our users. Your journey into the world of books starts
          here!
        </p>
        <p className="text-lg font-semibold text-blue-600">Happy Reading! 📚</p>
      </div>
    </div>
  );
}

export default About;
