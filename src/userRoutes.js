/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import Dashboard from "views/UsersDashboard/UsersDashboard.jsx";
import UserProfile from "views/UsersProfile/UsersProfile.jsx";
import UserApplications from "views/UsersApplications/UsersApplications.jsx";
import UserDonations from "views/UsersDonations/UsersDonations.jsx";
import UserAnimalFollows from "views/UsersAnimalFollows/UsersAnimalFollows.jsx";
import UserShelterFollows from "views/UsersShelterFollows/UsersShelterFollows.jsx";

// @material-ui/icons

import DashboardIcon from "@material-ui/icons/Dashboard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

var userRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/userDash"
  }, 
  {
    path: "/profile",
    name: "My Profile",
    icon: "face",
    component: UserProfile,
    layout: "/userDash"
  },
  {
    path: "/applications",
    name: "My Applications",
    icon: LibraryBooks,
    component: UserApplications,
    layout: "/userDash"
  },
  {
    path: "/donations",
    name: "My Donations",
    icon: "money",
    component: UserDonations,
    layout: "/userDash"
  },
  {
    collapse: true,
    name: "My Follows",
    icon: "pets",
    state: "userCollapse",
    views: [
        {
          path: "/animalFollows",
          name: "Animals",
          component: UserAnimalFollows,
          layout: "/userDash"
      },
      {
        path: "/shelterFollows",
        name: "Shelters",
        component: UserShelterFollows,
        layout: "/userDash"
    }
    ]
  }
];
export default userRoutes;