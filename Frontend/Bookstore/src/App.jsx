import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import AllBooks from "./pages/AllBooks";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn";
import SignIn from "./pages/SignIn";
import BookDetails from "./components/ViewBookDetails/ViewBook";
import AdminDashboard from "./pages/AdminDashboard";
import Settings from "./pages/settings";
import Addnewbook from "./pages/Addnewbook";
import Editbook from "./pages/Editbook";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/view-book-details/:id" element={<BookDetails />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/addnewbook" element={<Addnewbook />} />
        <Route path="/editbook/:id" element={<Editbook />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
