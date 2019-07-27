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
import Buttons from "views/Components/Buttons.jsx";
import Calendar from "views/Calendar/Calendar.jsx";
import Charts from "views/Charts/Charts.jsx";
import Dashboard from "views/Dashboard/Dashboard.jsx";
import ErrorPage from "views/Pages/ErrorPage.jsx";
import ExtendedForms from "views/Forms/ExtendedForms.jsx";
import ExtendedTables from "views/Tables/ExtendedTables.jsx";
import FullScreenMap from "views/Maps/FullScreenMap.jsx";
import GoogleMaps from "views/Maps/GoogleMaps.jsx";
import GridSystem from "views/Components/GridSystem.jsx";
import Icons from "views/Components/Icons.jsx";
import LockScreenPage from "views/Pages/LockScreenPage.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";
import Notifications from "views/Components/Notifications.jsx";
import Panels from "views/Components/Panels.jsx";
import PricingPage from "views/Pages/PricingPage.jsx";
import RTLSupport from "views/Pages/RTLSupport.jsx";
import ReactTables from "views/Tables/ReactTables.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import RegularForms from "views/Forms/RegularForms.jsx";
import RegularTables from "views/Tables/RegularTables.jsx";
import SweetAlert from "views/Components/SweetAlert.jsx";
import TimelinePage from "views/Pages/Timeline.jsx";
import Typography from "views/Components/Typography.jsx";
import UserProfile from "views/Pages/UserProfile.jsx";
import ValidationForms from "views/Forms/ValidationForms.jsx";
import VectorMap from "views/Maps/VectorMap.jsx";
import Widgets from "views/Widgets/Widgets.jsx";
import Wizard from "views/Forms/Wizard.jsx";
import AnimalView from "views/Animals/AnimalView";
import AnimalTable from "views/Animals/AnimalTable";
import AddAnimalForm from "views/Animals/AddAnimalForm";
import EditAnimalForm from "views/Animals/EditAnimalForm";
import ApplicationView from "views/Applications/ApplicationView.jsx"
import ApplicationTable from "views/Applications/ApplicationTable";
import ShelterProfile from "views/ShelterProfile/ShelterProfile";


// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";


var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  }, 
  {
    path: "/shelterProfile",
    name: "Shelter Profile",
    icon: "store_mall_directory",
    component: ShelterProfile,
    layout: "/admin"
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
          },
          {
                path:"/editAnimal/:id",
                name: "Edit Animal",
                component: EditAnimalForm,
                layout: "/admin",
                invisible: true
        },

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
            path:"/allApplications",
            name: "All Applications",
            component: ExtendedForms,
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
    component: ReactTables,
    layout: "/admin"
  },
  {
    path: "/followers",
    name: "Shelter Followers",
    icon: "face",
    component: ReactTables,
    layout: "/admin"
  },  
];
export default dashRoutes;
