import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

//Calendar
import Calendar from "./calendar/reducer";
//Chat
import chat from "./chat/reducer";

//Backlogs
import Backlogs from "./backlogs/reducer";

//Sprints
import Sprints from "./sprints/reducer";

// Tasks
import Tasks from "./tasks/reducer";

// SubTasks
import SubTasks from "./subTasks/reducer";

// Labels
import Labels from "./labels/reducer";

//Form advanced
import changeNumber from "./formAdvanced/reducer";


// //Invoice
// import Invoice from "./invoice/reducer";

//Mailbox
import Mailbox from "./mailbox/reducer";

const appReducer = combineReducers({
    // public
    Layout,
    Login,
    Account,
    ForgetPassword,
    Profile,
    Calendar,
    chat,
    Backlogs,
    Sprints,
    Tasks,
    SubTasks,
    Labels,
    changeNumber,
    Mailbox
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_USER_SUCCESS') {
        console.log(action.type);
        return appReducer( undefined , action)
    }
    // console.log(state);
    return appReducer(state, action)
}

export default rootReducer;