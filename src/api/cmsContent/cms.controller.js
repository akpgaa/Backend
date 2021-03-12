const CmsContent = require("./cms.model");
const { endConnection } = require("../../helpers/databaseConnection");
const chalk = require("chalk");
const config = require("../../config");
const fs = require("fs");
const request = require("request");
const moment = require("moment");
const path = require("path");

require('dotenv').config();
const nodemailer = require('nodemailer');

const rootPath = path.dirname(
  require.main.filename || process.mainModule.filename
);
const { stringify } = require("querystring");
const { result } = require("lodash");


const A = async (req, res, next) => {
  try {
    let data = { name: "data" };
    console.log(data);
    res.send(data);
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};




const sandboxtest = async (req, res, next) => {
  try {
    let data = { name: "sandbox" };
    console.log(data);
    res.send(data);
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};

const getFreedom = async (req, res, next) => {
  let body = req.body.value ? req.body.value : req.body;
  let device = req.body.device;

  try {
    var result = [];
    if (device && device.id) {
      let check = await comparingObj(req);
      if (check) {
        result = await CmsContent.getFreedom(
          body.select,
          body.tableName,
          body.condition,
          body.groupby,
          body.orderby
        );
      } else {
        result = false;
      }
    } else {
      result = await CmsContent.getFreedom(
        body.select,
        body.tableName,
        body.condition,
        body.groupby,
        body.orderby
      );
    }
    //db end connection
    endConnection();
    res.send(result);
  } catch (error) {
    //db end connection
    endConnection();
    console.error(chalk.red(error));
    res.status(500);
    next(error);
  }
};

const addMaster = (req,res,next) =>{
try{
  let tablename = req.params.tablename;
  let body = req.body;
  console.log(body)
  res.send("body")
}catch(error){
console.log(error)
}
}



const sendmail = (req,res,next) =>{
var sender = nodemailer.createTransport(
{
  host: "0.0.0.0",
  port: 25255,
service:'gmail',
auth:
{
user:'xx368528@gmail.com',
pass:'maha@1999'
}
});

var composemail ={
from:'xx368528@gmail.com',
to:'mahalakshmid50@gmail.com',
subject:'maha',
text:'hi'
};
html: '<h1>Attachments</h1>',
  attachments
    {  
        filename: 'Report.pdf'
    }
  

sender.sendMail(composemail,function(error,info){
if(error)
{
console.log(error);
}
else{
console.log("mail sent successsfully"+info.response);
}
});
  res.send("Success")
};
module.exports = {
  A,sandboxtest,
  getFreedom,addMaster,sendmail
};
