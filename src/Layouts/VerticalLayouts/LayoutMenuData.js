import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Navdata = () => {
    const history = useHistory();
    //state data
    const [isDashboard, setIsDashboard] = useState(false);
    const [isApps, setIsApps] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isPages, setIsPages] = useState(false);
    const [isMaps, setIsMaps] = useState(false);

    // Apps
    const [isBacklogs, setIsBacklogs] = useState(false);
    const [isSprints, setIsSprints] = useState(false);
    const [isTasks, setIsTasks] = useState(false);

    // Authentication
    const [isError, setIsError] = useState(false);

    // Pages
    const [isProfile, setIsProfile] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            const iconItems = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("subitems");
                if (document.getElementById(id))
                    document.getElementById(id).classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== 'Dashboard') {
            setIsDashboard(false);
        }
        if (iscurrentState !== 'Apps') {
            setIsApps(false);
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
        if (iscurrentState !== 'Pages') {
            setIsPages(false);
        }
        if (iscurrentState !== 'Maps') {
            setIsMaps(false);
        }
    },
     [
        history,
        iscurrentState,
        isDashboard,
        isApps,
        isAuth,
        isPages,
        isMaps
    ]);

    const menuItems = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "dashboard",
            label: "Dashboards",
            icon: "ri-dashboard-2-line",
            link: "/#",
            stateVariables: isDashboard,
            click: function (e) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
                updateIconSidebar(e);
            },
            subItems: [
                { 
                    id: 1, 
                    label: "Dashboard", 
                    link: "/apps-tasks-kanban",
                    parentId: "dashboard", 
                },
                { 
                    id: 2, 
                    label: "Tasks Board", 
                    link: "/apps-tasks-board",
                    parentId: "dashboard", 
                },
            ],
        },
        {
            id: "apps",
            label: "Apps",
            icon: "ri-apps-2-line",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsApps(!isApps);
                setIscurrentState('Apps');
                updateIconSidebar(e);
            },
            stateVariables: isApps,
            subItems: [
                {
                    id: "appsBacklogs",
                    label: "Backlogs",
                    link: "/apps-backlogs-list",
                    parentId: "apps",
                },
                {
                    id: "appsSprints",
                    label: "Sprints",
                    link: "/apps-sprints-list",
                    parentId: "apps",
                },
                // {
                //     id: "tasks",
                //     label: "Tasks",
                //     link: "/#",
                //     isChildItem: true,
                //     click: function (e) {
                //         e.preventDefault();
                //         setIsTasks(!isTasks);
                //     },
                //     parentId: "apps",
                //     stateVariables: isTasks,
                //     childItems: [
                //         { 
                //             id: 1, 
                //             label: "Kanban Board", 
                //             link: "/apps-tasks-kanban", 
                //             parentId: "apps", 
                //         },
                //         { id: 2, label: "List View", link: "/apps-tasks-list-view", parentId: "apps", },
                //         { id: 3, label: "Task Details", link: "/apps-tasks-details", parentId: "apps", },
                //     ]
                // },
            ],
        },
        {
            label: "Pages",
            isHeader: true,
        },
        // {
        //     id: "authentication",
        //     label: "Authentication",
        //     icon: "ri-account-circle-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsAuth(!isAuth);
        //         setIscurrentState('Auth');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isAuth,
        //     subItems: [
        //         {
        //             id: "signIn",
        //             label: "Sign In",
        //             link: "/auth-signin-basic",
        //             parentId: "authentication",
        //         },
        //         {
        //             id: "signUp",
        //             label: "Sign Up",
        //             link: "/auth-signup-basic",
        //             parentId: "authentication",
        //         },
        //         {
        //             id: "passwordReset",
        //             label: "Password Reset",
        //             link: "/auth-pass-reset-basic",
        //             parentId: "authentication",
        //         },
        //         {
        //             id: "passwordCreate",
        //             label: "Password Create",
        //             link: "/auth-pass-change-basic",
        //             parentId: "authentication",
        //         },
        //         {
        //             id: "lockScreen",
        //             label: "Lock Screen",
        //             link: "/auth-lockscreen-basic",
        //             parentId: "authentication",
        //         },
        //         {
        //             id: "logout",
        //             label: "Logout",
        //             link: "/auth-logout-basic",
        //             parentId: "authentication",
        //         },
        //         {
        //             id: "successMessage",
        //             label: "Success Message",
        //             link: "/auth-success-msg-basic",
        //             parentId: "authentication",
        //         },
        //         {
        //             id: "twoStepVerification",
        //             label: "Two Step Verification",
        //             link: "/auth-twostep-basic",
        //             parentId: "authentication",
        //         },
        //         {
        //             id: "errors",
        //             label: "Errors",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsError(!isError);
        //             },
        //             parentId: "authentication",
        //             stateVariables: isError,
        //             childItems: [
        //                 { id: 1, label: "404 Basic", link: "/auth-404-basic" },
        //                 { id: 2, label: "404 Alt", link: "/auth-404-alt" },
        //                 { id: 3, label: "500", link: "/auth-500" },
        //                 { id: 4, label: "Offline Page", link: "/auth-offline" },
        //             ]
        //         },
        //     ],
        // },
        {
            id: "pages",
            label: "Pages",
            icon: "ri-pages-line",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsPages(!isPages);
                setIscurrentState('Pages');
                updateIconSidebar(e);
            },
            stateVariables: isPages,
            subItems: [
                {
                    id: "starter",
                    label: "Starter",
                    link: "/pages-starter",
                    parentId: "pages",
                },
                {
                    id: "profile",
                    label: "Profile",
                    link: "/#",
                    isChildItem: true,
                    click: function (e) {
                        e.preventDefault();
                        setIsProfile(!isProfile);
                    },
                    parentId: "pages",
                    stateVariables: isProfile,
                    childItems: [
                        { id: 1, label: "Simple Page", link: "/pages-profile", parentId: "pages" },
                        { id: 2, label: "Settings", link: "/pages-profile-settings", parentId: "pages" },
                    ]
                },
                { id: "team", label: "Team", link: "/pages-team", parentId: "pages" },
                { id: "timeline", label: "Timeline", link: "/pages-timeline", parentId: "pages" },
                { id: "faqs", label: "FAQs", link: "/pages-faqs", parentId: "pages" },
                { id: "pricing", label: "Pricing", link: "/pages-pricing", parentId: "pages" },
                { id: "gallery", label: "Gallery", link: "/pages-gallery", parentId: "pages" },
                { id: "maintenance", label: "Maintenance", link: "/pages-maintenance", parentId: "pages" },
                { id: "comingSoon", label: "Coming Soon", link: "/pages-coming-soon", parentId: "pages" },
            ],
        },
        {
            label: "Components",
            isHeader: true,
        },
        {
            id: "maps",
            label: "Maps",
            icon: "ri-map-pin-line",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsMaps(!isMaps);
                setIscurrentState('Maps');
                updateIconSidebar(e);
            },
            stateVariables: isMaps,
            subItems: [
                { id: "google", label: "Google", link: "/maps-google", parentId: "maps" },
            ],
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;