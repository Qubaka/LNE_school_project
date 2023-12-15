const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const register = require('./routs/register');
const login = require('./routs/login');
const saleItems = require('./routs/addNewItem'); // Import the addnewitem app
const getItems = require('./routs/getItemData');
const getUserData = require('./routs/getUserData');
const updateUserInfo = require('./routs/updateUserInfo');
const createNewReport = require('./routs/createNewReport');
const returnReports = require('./routs/returnReports');
const userBan = require('./routs/ban')
const notBan = require('./routs/notBan')
const getUsers = require('./routs/getAllUsers')
const adminPerrmision = require('./routs/adminPerrmision')
const buyItem = require('./routs/buyItem')
const getBoughtItems = require('./routs/getUsersBoughtItems')
const delteItem = require('./routs/deleteItem')
const path = require('path');
const app = express();
const port = 3000;
const dbString = "mongodb://Admin:admin@ac-h87eufy-shard-00-00.yknsfbg.mongodb.net:27017,ac-h87eufy-shard-00-01.yknsfbg.mongodb.net:27017,ac-h87eufy-shard-00-02.yknsfbg.mongodb.net:27017/?ssl=true&replicaSet=atlas-i00tvt-shard-0&authSource=admin&retryWrites=true&w=majority";

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));

// Connect to the database
mongoose.connect(dbString)
.then(() => {
  console.log('Connected to the database');

  // Mount the routes
  app.use(register);
  app.use(userBan);
  app.use(notBan);
  app.use(login);
  app.use(getUsers);
  app.use(saleItems);
  app.use(getItems);
  app.use(adminPerrmision);
  app.use(returnReports)
  app.use(getUserData);
  app.use(updateUserInfo);
  app.use(createNewReport);
  app.use(buyItem);
  app.use(delteItem);
  app.use(getBoughtItems);

  app.listen(port, () => {
    console.log('Server is running on port 3000');
  });
})
.catch((error) => {
  console.error('Failed to connect to the database:', error);
});