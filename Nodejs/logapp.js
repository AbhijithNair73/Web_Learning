const { format } = require("date-fns");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
const EventEmmiter = require("events");
class MyEmmitter extends EventEmmiter { }
const myEmmiter = new MyEmmitter();

const clearLogFolder = async () => {
  if (fs.existsSync(path.join(__dirname, "logs", "log.txt"))) {
    console.log("clearing log files");
    await fs.promises.unlink(path.join(__dirname, "logs", "log.txt"));
  }
};
const logEvent = async (data, logtype) => {
  if (!fs.existsSync(path.join(__dirname, "logs"))) {
    console.log("log directory donot exists");
    await fs.promises.mkdir(path.join(__dirname, "logs"));
  }
  switch (logtype) {
    case "info":
      logtype = "user.info";
      break;
    case "alert":
      logtype = "user.alert";
      break;
    case "warn":
      logtype = "user.warn";
      break;
    case "error":
      logtype = "user.error";
      break;
    default:
      logtype = "user.info";
      break;
  }
  const date = format(new Date(), "dd/MM/yyyy \t hh:mm:ss");
  await fs.promises.appendFile(
    path.join(__dirname, "logs", "log.txt"),
    date + "\t" + logtype + "\t" + data + "\n"
  );
};

clearLogFolder();
logEvent("Welcome to log app");
module.exports.logEvent = logEvent;
