import { Route, Routes } from "react-router-dom";
import Home from "../Pages/User/Home";
import Market from "../Pages/User/Market";
import Trending from "../Pages/User/Trending";
import Recent from "../Pages/User/Recent";
import DueDate from "../Pages/User/DueDate";
import ToRead from "../Pages/User/ToRead";
import Profile from "../Pages/User/Profile";
import Login from "../Pages/User/Login";
import Signup from "../Pages/User/Signup";
import Otp from "../Pages/User/Otp";
import Biddings from "../Pages/User/Bidding";
import Subscriptions from "../Pages/User/Subscription";

import UserAuthorization from "../Verification/userVerification";
import EditProfiles from "../Pages/User/EditProfile";
import BookDetails from "../Pages/User/BookDetails";
import BookReviews from "../Pages/User/BookReview";

const UserRoutes = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<Otp />} />

      <Route element={<UserAuthorization />}>
        <Route path="/home" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/market" element={<Market />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/duedate" element={<DueDate />} />
        <Route path="/toread" element={<ToRead />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bid" element={<Biddings />} />
        <Route path="/subscription" element={<Subscriptions />} />
        <Route path="/editprofile" element={<EditProfiles />} />
        <Route path="/bookdetails" element={<BookDetails />} />
        <Route path="/bookreview" element={<BookReviews />} />
      </Route>
    </Routes>
    </>
  );
};

export default UserRoutes;
