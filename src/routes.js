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

import Dashboard from "views/Dashboard/Dashboard2.jsx";
// import ErrorPage from "views/Pages/ErrorPage.jsx";

import AnimalView from "views/Animals/AnimalView";
import AnimalTable from "views/Animals/AnimalTable";
import AddAnimalForm from "views/Animals/AddAnimalForm";
import ApplicationView from "views/Applications/ApplicationView.jsx"
import ApplicationTable from "views/Applications/ApplicationTable";
import ShelterProfile from "views/ShelterProfile/ShelterProfile";
import StripeInfo from "views/ShelterProfile/StripeInfo";
import SubscriptionPlan from "views/ShelterProfile/SubscriptionPlan";
import Donations from "views/Donations/Donations.jsx";
import FollowerTable from "views/Followers/FollowerTable.jsx";

// @material-ui/icons

import DashboardIcon from "@material-ui/icons/Dashboard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  }, 
  
  {
    collapse: true,
    name: "Shelter Info",
    icon: "store_mall_directory",
    state: "shelterCollapse",
    views: [
        {
          path: "/shelterProfile",
          name: "Shelter Profile",
          component: ShelterProfile,
          layout: "/admin"
      },
      {
        path: "/stripeInfo",
        name: "Stripe Info",
        component: StripeInfo,
        layout: "/admin"
    }
    ]
  },
  {
      collapse: true,
      name: "Animals",
      icon: "pets",
      state: "animalCollapse",
      views: [
          {
              path:"/allAnimals",
              name: "All Animals",
              component: AnimalTable,
              layout: "/admin"
          },
          {
              path:"/addAnimals",
              name: "Add Animal",
              component: AddAnimalForm,
              layout: "/admin"
          },
          {
              path: "/animal/:id",
              name: "Animal",
              component: AnimalView,
              layout: "/admin",
              invisible: true
          }
      ]
  },
  {
    collapse: true,
    name: "Applications",
    icon: LibraryBooks,
    state: "applicationCollapse",
    views: [
        {
            path:"/currentApplications",
            name: "Current Applications",
            component: ApplicationTable,
            layout: "/admin"
        },
        {
            path:"/application/:id",
            name: "Application",
            component: ApplicationView,
            layout: "/admin",
            invisible: true
        }
    ]
},
{
    path: "/donations",
    name: "Donations",
    icon: "money",
    component: Donations,
    layout: "/admin"
  },
  {
    path: "/followers",
    name: "Shelter Followers",
    icon: "face",
    component: FollowerTable,
    layout: "/admin"
  },  
];
export default dashRoutes;