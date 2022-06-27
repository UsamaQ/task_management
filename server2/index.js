const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const PORT = process.env.PORT || 3001;

//--------------------- Serve Assets ---------------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "jira",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


//####################################################
//____________________SAMEER_Api______________________


app.post("/api/loginAuth", (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  const sqlLoginAuth =
    "SELECT COUNT(*) as countRows, role, id FROM users WHERE email=? AND password=?";
  db.query(sqlLoginAuth, [email, password], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log("Number of rows : ", result[0].countRows);
      // console.log("Role : ", result[0].role);
      if (result[0].countRows == 1) {
        res.send({
          loginAuth: true,
          msg: "Login Success",
          role: result[0].role,
          id: result[0].id,
        });
      } else {
        res.send({ loginAuth: false, msg: "Login Failed, Email or Password Incorrect" });
      }
    }
  });
});

app.post("/api/addProduct", (req, res) => {
  const id = req.body.id;
  const asin = req.body.asin;
  const amz_link = req.body.amzLink;
  const amz_price = req.body.amzPrice;
  const bsr = req.body.bsr;
  const rating = req.body.rating;
  const review_count = req.body.reviewCount;
  const bb_ss = req.body.bbSs;
  const no_of_sellers = req.body.noOfSellers;
  const category = req.body.category;
  const sales_per_day = req.body.salesPerDay;
  const shipping = req.body.shipping;
  const source = req.body.source;
  const source_link = req.body.sourceLink;
  const source_price = req.body.sourcePrice;
  const available_quantity = req.body.availableQuantity;
  const fee = req.body.amzPrice * 0.15;
  const expence = parseFloat(source_price) + parseFloat(fee) + parseFloat(shipping);
  const profit = parseFloat(amz_price) - expence;
  const roi = (profit / parseFloat(amz_price)) * 100;

  const sqlCheckAsin = "SELECT COUNT(*) as countAsin FROM products WHERE asin = ?";
  db.query(sqlCheckAsin, [asin], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: false, msg: "Error, Product Not Added" });
    } else {
      if (result[0].countAsin > 0) {
        res.send({
          status: false,
          msg: "Product with provided ASIN already exists",
        });
      } else {
        const sqlLoginAuth =
          "INSERT INTO products SET asin = ?,amz_link = ?, amz_price = ?, bsr = ?, no_of_sellers = ?, review_count = ?, rating = ?,bb_ss = ?, category = ?, shipping = ?, source = ?, source_price = ?, source_link = ?, available_quantity = ?, sales_per_day = ?, fee = ?, expence = ?, profit = ?, roi = ?, added_by = ?";
        db.query(
          sqlLoginAuth,
          [
            asin,
            amz_link,
            amz_price,
            bsr,
            no_of_sellers,
            review_count,
            rating,
            bb_ss,
            category,
            shipping,
            source,
            source_price,
            source_link,
            available_quantity,
            sales_per_day,
            fee,
            expence,
            profit,
            roi,
            id,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send({ status: false, msg: "Error, Product Not Added" });
            } else {
              res.send({ status: true, msg: "Product Added Successfully" });
            }
          }
        );
      }
    }
  });
});




app.post("/api/filterSearch", (req, res) => {
  const minBsr = req.body.minBsr;
  const maxBsr = req.body.maxBsr;
  const minRoi = req.body.minRoi;
  const maxRoi = req.body.maxRoi;
  const minProfit = req.body.minProfit;
  const maxProfit = req.body.maxProfit;

  let filters = [];

  let getEditProduct = "SELECT * FROM products WHERE ";
  if (minBsr != "" && maxBsr == "") {
    filters = filters.concat(" bsr >= " + minBsr);
  } else if (minBsr == "" && maxBsr != "") {
    filters = filters.concat(" bsr <= " + maxBsr);
  } else if (minBsr != "" && maxBsr != "") {
    filters = filters.concat(" bsr >= " + minBsr + " AND bsr <= " + maxBsr);
  }
  if (minRoi != "" && maxRoi == "") {
    filters = filters.concat(" roi >= " + minRoi);
  } else if (minRoi == "" && maxRoi != "") {
    filters = filters.concat(" roi <= " + maxRoi);
  } else if (minRoi != "" && maxRoi != "") {
    filters = filters.concat(" roi >= " + minRoi + " AND roi <= " + maxRoi);
  }
  if (minProfit != "" && maxProfit == "") {
    filters = filters.concat(" profit >= " + minProfit);
  } else if (minProfit == "" && maxProfit != "") {
    filters = filters.concat(" profit <= " + maxProfit);
  } else if (minProfit != "" && maxProfit != "") {
    filters = filters.concat(" profit >= " + minProfit + " AND profit <= " + maxProfit);
  }

  let filtersWithAnd = filters.join(" AND ");

  getEditProduct += filtersWithAnd;

  console.log(getEditProduct + filtersWithAnd);

  db.query(getEditProduct, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: false, msg: "Error in getting Product" });
    } else {
      res.send({ status: true, msg: "Product Found", productInfo: result });
    }
  });
});

















//########################################################################################################################
//____________________________________________________Tasks_API___________________________________________________________
//########################################################################################################################








//####################################################
//____________________INSERT_TASK_____________________


app.post("/api/task/insertTask", (req, res) => {
  const title=req.body.title;
  const description=req.body.description;
  const priority=req.body.priority;
  const backlog=req.body.backlog;
  const file=req.body.file;

  // const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET)
  // res.json({accessToken: accessToken})

  const sqlAddTask =
          "INSERT INTO tasks SET title = ?,description = ?,priority = ?,backlogID = ?";
        db.query(
          sqlAddTask,
          [
            title,
            description,
            priority,
            backlog,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send({ status: false, msg: "Error, Task Not Added" });
            } else {
              res.send({ status: true, msg: "Task Added Successfully!" });
            }
          }
        );
});


//####################################################
//____________________DISPLAY_TASKS___________________


app.post("/api/task/showTasks", (req, res) => {
  const backlogID=req.body.backlogID;
  const location=req.body.location;
  console.log(location);
  if(location == 'backlog') {

    if(backlogID != null)
    {
      getTasks = "SELECT * FROM tasks WHERE backlogID=?";
      db.query(getTasks,[backlogID], (err, result) => {
      if (err) {
        console.log(err);
        res.send({ status: false, msg: "Error in getting Tasks" });
      } else {
        res.send({ status: true, msg: "Tasks Found!", tasks: result });
        console.log(result);
      }
    });
  } else{
    getTasks = "SELECT * FROM tasks";
    db.query(getTasks, (err, result) => {
      if (err) {
        console.log(err);
        res.send({ status: false, msg: "Error in getting Tasks" });
      } else {
        res.send({ status: true, msg: "Tasks Found!", tasks: result });
        console.log(result);
      }
    });
  }

} else{
  if(backlogID != null)
    {
      getTasks = "SELECT * FROM tasks WHERE sprintID=?";
      db.query(getTasks,[backlogID], (err, result) => {
      if (err) {
        console.log(err);
        res.send({ status: false, msg: "Error in getting Tasks" });
      } else {
        res.send({ status: true, msg: "Tasks Found!", tasks: result });
        console.log(result);
      }
    });
  } else{
    getTasks = "SELECT * FROM tasks";
    db.query(getTasks, (err, result) => {
      if (err) {
        console.log(err);
        res.send({ status: false, msg: "Error in getting Tasks" });
      } else {
        res.send({ status: true, msg: "Tasks Found!", tasks: result });
        console.log(result);
      }
    });
  }
}
});


//####################################################
//_______________DISPLAY_TASKS_TO_EDIT________________


app.post("/api/task/getTaskDetaials", (req, res) => {
  const id=req.body.id;
  console.log(id);
    getTasks = "SELECT * FROM tasks WHERE id=?";
    db.query(getTasks,[id], (err, result) => {
      if (err) {
        console.log(err);
        res.send({ status: false, msg: "Error in getting Tasks" });
      } else {
        console.log(result);
        res.send({ status: true, msg: "Tasks Found!", tasks: result });
      }
    });
});


//####################################################
//____________________UPDATE_TASKS-___________________


app.post("/api/task/updateTask", (req, res) => {
  const id=req.body.id;
  const title=req.body.title;
  const description=req.body.description;
  const taskType=req.body.taskType;
  const priority=req.body.priority;
  const backlog=req.body.backlog;
  const sprint=req.body.sprint;
  const assignedBy=req.body.assignedBy;
  const assignedTo=req.body.assignedTo;
  const dueDate=req.body.dueDate;
  const notes=req.body.notes;
  console.log(id)

  const sqlAddTask =
          "UPDATE tasks SET title = ?,description = ?,taskType = ?,priority = ?,backlogID = ?,sprintID = ?,assignedBy = ?,assignedTo = ?,dueDate = ?, notes=? WHERE id=?" ;
        db.query(
          sqlAddTask,
          [
            title,
            description,
            taskType,
            priority,
            backlog,
            sprint,
            assignedBy,
            assignedTo,
            dueDate,
            notes,
            id,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send({ status: false, msg: "Error, Task Not Added" });
            } else {
              res.send({ status: true, msg: "Task Added Successfully!" });
            }
          }
        );
});


//####################################################
//____________________DELETE_TASKS___________________


app.post("/api/task/deleteTask", (req, res) => {
  const id = req.body.id;

  const sqlDeleteTasks = "DELETE FROM tasks WHERE id = ?";
  db.query(sqlDeleteTasks, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: false, msg: "Error, Task Not deleted" });
    } else {
      res.send({ status: true, msg: "Task Deleted"});
    }
  });
});





//########################################################################################################################
//__________________________________________________Backlog_API___________________________________________________________
//########################################################################################################################

//####################################################
//___________________INSERT_Backlog___________________





app.post("/api/backlog/insertBacklog", (req, res) => {
  const title=req.body.title;
  const description=req.body.description;
  const createdBy=req.body.createdBy;

  const sqlAddBacklog =
          "INSERT INTO backlogs SET title = ?,description = ?, createdBy =?";
        db.query(
          sqlAddBacklog,
          [
            title,
            description,
            createdBy
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send({ status: false, msg: "Error, Backlog Not Added" });
            } else {
              res.send({ status: true, msg: "Backlog Added Successfully!" });
            }
          }
        );
});


// ####################################################
// ___________________DISPLAY_BACKLOG__________________


app.post("/api/backlog/showBacklogs", (req, res) => {
    showBacklog = "SELECT * FROM backlogs";
    db.query(showBacklog, (err, result) => {
      if (err) {
        console.log(err);
        res.send({ status: false, msg: "Error in getting Backlogs" });
      } else {
        res.send({ status: true, msg: "Backlogs Found!", backlogs: result });
        console.log(result);
      }
    });
});


// ####################################################
// __________DISPLAY_TASKS_TO_ADD_IN_Backlog____________


app.post("/api/backlog/showTasksToAdd", (req, res) => {
  getTasks = "SELECT * FROM tasks";
      db.query(getTasks, (err, result) => {
      if (err) {
        console.log(err);
        res.send({ status: false, msg: "Error in getting Tasks" });
      } else {
        res.send({ status: true, msg: "Tasks Found!", tasks: result });
        console.log(result);
      }
    });
  });


//####################################################
//________________ADD_TASKS_TO_SPRINT_________________


app.post("/api/backlog/AddTaskToBacklog", (req, res) => {
  const id=req.body.id;
  const backlog=req.body.backlog;
  // console.log(id)

  const sqlAddTask =
          "UPDATE tasks SET backlogID = ? WHERE id=?" ;
        db.query(
          sqlAddTask,
          [
            backlog,
            id,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send({ status: false, msg: "Error, Task Not Added" });
            } else {
              res.send({ status: true, msg: "Task Added Successfully!" });
            }
          }
        );
});


//####################################################
//______________DISPLAY_BACKLOG_TO_EDIT_______________


app.post("/api/backlog/getBacklogDetaials", (req, res) => {
  const id=req.body.id;
  console.log(id);
    getBacklog = "SELECT * FROM Backlogs WHERE id=?";
    db.query(getBacklog,[id], (err, result) => {
      if (err) {
        console.log(err);
        res.send({ status: false, msg: "Error in getting Backlogs" });
      } else {
        console.log(result);
        res.send({ status: true, msg: "Backlogs Found!", backlogs: result });
      }
    });
});


//####################################################
//____________________UPDATE_BACKLOG__________________


app.post("/api/backlog/updateBacklog", (req, res) => {
  const id=req.body.id;
  const title=req.body.title;
  const description=req.body.description;
  console.log(id)
  console.log(title)
  console.log(description)


  const updateBacklog =
          "UPDATE backlogs SET title = ?,description = ? WHERE id=?" ;
        db.query(
          updateBacklog,
          [
            title,
            description,
            id,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send({ status: false, msg: "Error, Backlog Not Added" });
            } else {
              res.send({ status: true, msg: "Backlog Added Successfully!" });
            }
          }
        );
});


// //####################################################
// //___________________DELETE_BACKLOG___________________


app.post("/api/backlog/deleteBacklog", (req, res) => {
  const id = req.body.id;

  const sqlDeleteBacklog = "DELETE FROM backlogs WHERE id = ?";
  db.query(sqlDeleteBacklog, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: false, msg: "Error, Backlog Not deleted" });
    } else {
      res.send({ status: true, msg: "Backlog Deleted"});
    }
  });
});





//########################################################################################################################
//____________________________________________________Sprints_API___________________________________________________________
//########################################################################################################################





//####################################################
//____________________INSERT_SPRINTS____________________


app.post("/api/sprint/insertSprint", (req, res) => {
  const title=req.body.title;
  const description=req.body.description;
  const status=req.body.status;
  const startDate=req.body.startDate;
  const endDate=req.body.endDate;

  const sqlAddSprint =
  "INSERT INTO sprints SET title = ?,description = ?,status = ?,startDate = ?,endDate = ?";
  db.query(
          sqlAddSprint,
          [
            title,
            description,
            status,
            startDate,
            endDate,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send({ status: false, msg: "Error, Sprint Not Added" });
            } else {
              res.send({ status: true, msg: "Sprint Added Successfully!" });
            }
          }
        );
});


// ####################################################
// ___________________DISPLAY_SPRINTS__________________


app.post("/api/sprint/showSprints", (req, res) => {
  showSprint = "SELECT * FROM sprints";
  db.query(showSprint, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: false, msg: "Error in getting Sprints" });
    } else {
      res.send({ status: true, msg: "Sprints Found!", sprints: result });
      console.log(result);
    }
  });
});


// ####################################################
// __________DISPLAY_TASKS_TO_ADD_IN_SPRINT____________


app.post("/api/sprint/showTasksToAdd", (req, res) => {
  const backlogID=req.body.backlogID;
  getTasks = "SELECT * FROM tasks WHERE backlogID=?";
      db.query(getTasks,[backlogID], (err, result) => {
      if (err) {
        console.log(err);
        res.send({ status: false, msg: "Error in getting Tasks" });
      } else {
        res.send({ status: true, msg: "Tasks Found!", tasks: result });
        console.log(result);
      }
    });
  });


//####################################################
//_______________DISPLAY_SPRINTS_TO_EDIT________________


app.post("/api/sprint/getSprintToEdit", (req, res) => {
  const id=req.body.id;
  console.log(id);
    getSprints = "SELECT * FROM sprints WHERE id=?";
    db.query(getSprints,[id], (err, result) => {
      if (err) {
        console.log(err);
        res.send({ status: false, msg: "Error in getting Sprints" });
      } else {
        console.log(result);
        res.send({ status: true, msg: "Sprints Found!", sprints: result });
      }
    });
});


//####################################################
//____________________UPDATE_SPRINTS___________________


app.post("/api/sprint/updateSprint", (req, res) => {
  const id=req.body.id;
  const title=req.body.title;
  const description=req.body.description;
  const status=req.body.status;
  const startDate=req.body.startDate;
  const endDate=req.body.endDate;
  console.log(id)

  const sqlUpdateSprints =
          "UPDATE sprints SET title = ?,description = ?,status =?,startDate = ?,endDate = ? WHERE id=?" ;
        db.query(
          sqlUpdateSprints,
          [
            title,
            description,
            status,
            startDate,
            endDate,
            id,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send({ status: false, msg: "Error, Sprint Not Updated" });
            } else {
              res.send({ status: true, msg: "Sprint Updated Successfully!" });
            }
          }
        );
});


//####################################################
//___________________DELETE_SPRINTS___________________


app.post("/api/sprint/deleteSprint", (req, res) => {
  const id = req.body.id;

  const sqlDeleteSprint = "DELETE FROM sprints WHERE id = ?";
  db.query(sqlDeleteSprint, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: false, msg: "Error, Sprint Not deleted" });
    } else {
      res.send({ status: true, msg: "Sprint Deleted"});
    }
  });
});


//####################################################
//________________ADD_TASKS_TO_SPRINT_________________


app.post("/api/sprint/AddTaskToSprint", (req, res) => {
  const id=req.body.id;
  const sprint=req.body.sprint;
  console.log(id)

  const sqlAddTask =
          "UPDATE tasks SET sprintID = ? WHERE id=?" ;
        db.query(
          sqlAddTask,
          [
            sprint,
            id,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send({ status: false, msg: "Error, Task Not Added" });
            } else {
              res.send({ status: true, msg: "Task Added Successfully!" });
            }
          }
        );
});









//########################################################################################################################
//____________________________________________________Users_API___________________________________________________________
//########################################################################################################################








// ####################################################
// ___________________DISPLAY_USERS____________________


app.post("/api/user/showUser", (req, res) => {
  showUsers = "SELECT * FROM users";
  db.query(showUsers, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: false, msg: "Error in getting Users" });
    } else {
      res.send({ status: true, msg: "Users Found!", users: result });
      console.log(result);
    }
  });
});









//####################################################
//____________________REGISTER_USER_____________________


app.post("/api/user/registerUser", (req, res) => {
  const fullName=req.body.fullName;
  const email=req.body.email;
  const password=req.body.password;
  const designation=req.body.designation;

  bcrypt.hash(password, 10).then((hash) => {
  const sqlRegisterUser =
          "INSERT INTO users SET fullName = ?,designation = ?,email = ?,password = ?";
        db.query(
          sqlRegisterUser,
          [
            fullName,
            designation,
            email,
            hash,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              res.send({ status: false, msg: "Error, User Not Added" });
            } else {
              res.send({ status: true, msg: "User Added Successfully!" });
            }
          }
        );
  });
});






//########################################################################################################################
//_________________________________________________FETCHING_API___________________________________________________________
//########################################################################################################################








//####################################################
//____________________FETCHING_API____________________















app.listen(PORT, () => {
  console.log(`Running On port ${PORT}`);
});