import React from "react";
import { Redirect } from "react-router-dom";


//Calendar
// Email box
import MailInbox from "../pages/EmailInbox";

//CHat
import Chat from "../pages/Chat";
import Calendar from "../pages/Calendar";

// Backlog
import BacklogList from "../pages/Backlogs/BacklogList";
import BacklogOverview from "../pages/Backlogs/BacklogOverview";

// Sprint
import SprintList from "../pages/Sprints/SprintList";
import SprintOverview from "../pages/Sprints/SprintOverview";

//Task
import SprintTaskDetails from "../pages/Tasks/SprintTaskDetails";
import SprintTaskList from "../pages/Tasks/SprintTaskList";
import BacklogTaskDetails from "../pages/Tasks/BacklogTaskDetails";
import BacklogTaskList from "../pages/Tasks/BacklogTaskList";
import TaskDetails from "../pages/Tasks/TaskDetails";
// import TaskList from "../pages/Tasks/TaskList";
import KanbanBoard from "../pages/Tasks/KanbanBoard/Index";



//Maps
import GoogleMaps from "../pages/Maps/GoogleMaps/GoogleMaps";

//AuthenticationInner pages
import BasicSignIn from '../pages/AuthenticationInner/Login/BasicSignIn';
import BasicSignUp from '../pages/AuthenticationInner/Register/BasicSignUp';
import BasicPasswReset from '../pages/AuthenticationInner/PasswordReset/BasicPasswReset';

//pages
import Starter from '../pages/Pages/Starter/Starter';
import SimplePage from '../pages/Pages/Profile/SimplePage/SimplePage';
import Settings from '../pages/Pages/Profile/Settings/Settings';
import Team from '../pages/Pages/Team/Team';
import Timeline from '../pages/Pages/Timeline/Timeline';
import Faqs from '../pages/Pages/Faqs/Faqs';
import Pricing from '../pages/Pages/Pricing/Pricing';
import Gallery from '../pages/Pages/Gallery/Gallery';
import Maintenance from '../pages/Pages/Maintenance/Maintenance';
import ComingSoon from '../pages/Pages/ComingSoon/ComingSoon';

import BasicLockScreen from '../pages/AuthenticationInner/LockScreen/BasicLockScr';
import BasicLogout from '../pages/AuthenticationInner/Logout/BasicLogout';
import BasicSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg';
import BasicTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify';
import Basic404 from '../pages/AuthenticationInner/Errors/Basic404';
import Alt404 from '../pages/AuthenticationInner/Errors/Alt404';
import Error500 from '../pages/AuthenticationInner/Errors/Error500';

import BasicPasswCreate from "../pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import TasksBoard from "../pages/TasksBoard/TasksBoard";



const authProtectedRoutes = [
  { path: "/dashboard", component: KanbanBoard },
  { path: "/apps-calendar", component: Calendar },

  //Chat
  { path: "/apps-chat", component: Chat },

  //EMail
  { path: "/apps-mailbox", component: MailInbox },

  //Backlogs
  { path: "/apps-backlogs-list", component: BacklogList },
  { path: "/apps-backlogs-overview/:id", component: BacklogOverview },
  { path: "/apps-backlog-tasks-list-view/:id/:backlogName", component: BacklogTaskList },
  { path: "/apps-backlog-tasks-details/:id", component: BacklogTaskDetails },


  //Sprints
  { path: "/apps-sprints-list", component: SprintList },
  { path: "/apps-sprints-overview/:id", component: SprintOverview },
  { path: "/apps-sprint-tasks-list-view/:id/:sprintName", component: SprintTaskList },
  { path: "/apps-sprint-tasks-details/:id", component: SprintTaskDetails },


  //Task
  // { path: "/apps-tasks-list-view", component: TaskList },
  { path: "/apps-tasks-details/:id", component: TaskDetails },
  { path: "/apps-sprint-tasks-list-view", component: SprintTaskList },
  { path: "/apps-tasks-kanban", component: KanbanBoard },
  { path: "/apps-tasks-board", component: TasksBoard },


  

  //Maps
  { path: "/maps-google", component: GoogleMaps },

  //Pages
  { path: "/pages-starter", component: Starter },
  { path: "/pages-profile", component: SimplePage },
  { path: "/pages-profile-settings", component: Settings },
  { path: "/pages-team", component: Team },
  { path: "/pages-timeline", component: Timeline },
  { path: "/pages-faqs", component: Faqs },
  { path: "/pages-gallery", component: Gallery },
  { path: "/pages-pricing", component: Pricing },


  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/login" />,
  },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPasswordPage },
  { path: "/register", component: Register },


  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: BasicSignIn },
  { path: "/auth-signup-basic", component: BasicSignUp },
  { path: "/auth-pass-reset-basic", component: BasicPasswReset },
  { path: "/auth-lockscreen-basic", component: BasicLockScreen },
  { path: "/auth-logout-basic", component: BasicLogout },
  { path: "/auth-success-msg-basic", component: BasicSuccessMsg },
  { path: "/auth-twostep-basic", component: BasicTwosVerify },
  { path: "/auth-404-basic", component: Basic404 },
  { path: "/auth-404-alt", component: Alt404 },
  { path: "/auth-500", component: Error500 },
  { path: "/pages-maintenance", component: Maintenance },
  { path: "/pages-coming-soon", component: ComingSoon },

  { path: "/auth-pass-change-basic", component: BasicPasswCreate },
  { path: "/auth-offline", component: Offlinepage },
];

export { authProtectedRoutes, publicRoutes };