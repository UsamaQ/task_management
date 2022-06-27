import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./layouts/saga";
//Auth
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";

//calendar
import calendarSaga from "./calendar/saga";
//chat
import chatSaga from "./chat/saga";

//Backlog
import backlogSaga from "./backlogs/saga";

//Sprint
import sprintSaga from "./sprints/saga";

// Task
import taskSaga from "./tasks/saga";

// SubTask
import subTaskSaga from "./subTasks/saga";

// Mail
import mailboxSaga from "./mailbox/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(chatSaga),
    fork(backlogSaga),
    fork(sprintSaga),
    fork(taskSaga),
    fork(subTaskSaga),
    fork(calendarSaga),
    fork(mailboxSaga),
  ]);
}
