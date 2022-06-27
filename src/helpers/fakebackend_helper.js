import { APIClient } from "./api_helper";
import * as url from "./url_helper";

const api = new APIClient();
// Gets the logged in user data from local session


// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

//is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postFakeRegister = (data) => {
  return api.create(url.POST_FAKE_REGISTER, data)
    .catch(err => {
      let message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message = "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};

// Login Method
export const postFakeLogin = data => api.create(url.POST_FAKE_LOGIN, data);

// postForgetPwd
export const postFakeForgetPwd = data => api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = data => api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = data => api.create(url.POST_EDIT_PROFILE, data);

// Register Method
export const postJwtRegister = (url, data) => {
  return api.create(url, data)
    .catch(err => {
      var message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message = "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};





// Login Method
export const postJwtLogin = data => api.create(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
export const postJwtForgetPwd = data => api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = data => api.create(url.SOCIAL_LOGIN, data);


// get Events
export const getEvents = () => api.get(url.GET_EVENTS);

// get Events
export const getCategories = () => api.get(url.GET_CATEGORIES);

// get Upcomming Events
export const getUpCommingEvent = () => api.get(url.GET_UPCOMMINGEVENT);

// add Events
export const addNewEvent = event => api.create(url.ADD_NEW_EVENT, event);

// update Event
export const updateEvent = event => api.update(url.UPDATE_EVENT, event);

// delete Event
export const deleteEvent = event => api.delete(url.DELETE_EVENT, { headers: { event } });

// get Contact
export const getDirectContact = () => api.get(url.GET_DIRECT_CONTACT);

// get messages
export const getMessages = roomId => api.get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } });

//add message
export const addMessage = message => api.create(url.ADD_MESSAGE, message);

// get Channels
export const getChannels = () => api.get(url.GET_CHANNELS);





// Backlogs





// get Backlog
export const getBacklogList = () => api.get(url.GET_BACKLOG_LIST);

// add Backlog
export const addNewBacklog = backlog => api.create(url.ADD_NEW_BACKLOG, backlog);

// update Backlog
export const updateBacklog = backlog => api.update(url.UPDATE_BACKLOG, backlog);

// delete Backlog
export const deleteBacklog = backlog => api.delete(url.DELETE_BACKLOG, { headers: { backlog } });





// Sprints





// get Sprint
export const getSprintList = () => api.get(url.GET_SPRINT_LIST);

// add Sprint
export const addNewSprint = sprint => api.create(url.ADD_NEW_SPRINT, sprint);

// update Sprint
export const updateSprint = sprint => api.update(url.UPDATE_SPRINT, sprint);

// delete Sprint
export const deleteSprint = sprint => api.delete(url.DELETE_SPRINT, { headers: { sprint } });




//Tasks




// get Task
export const getTaskList = () => api.get(url.GET_TASK_LIST);

// add Task
export const addNewTask = task => api.create(url.ADD_NEW_TASK, task);

// update Task
export const updateTask = task => api.update(url.UPDATE_TASK, task);

// delete Task
export const deleteTask = task => api.delete(url.DELETE_TASK, { headers: { task } });


//get mail
export const getMailDetails = () => api.get(url.GET_MAIL_DETAILS);

//delete mail
export const deleteMail = forId => api.delete(url.DELETE_MAIL, { headers: { forId } });
