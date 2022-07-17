const fspromises = require('fs').promises;
const path = require('path');
const fs = require('fs');
const latestFunc = async() => {
    try{
        if(fs.existsSync(path.join(__dirname,"birthday.txt")))
        {
            console.log('birthday exists');
            await fspromises.unlink(path.join(__dirname,"birthday.txt"));
        }
        await fspromises.writeFile(path.join(__dirname, "hello.txt"),"Happy Birthday!");
        await fspromises.rename(path.join(__dirname, "hello.txt"),path.join(__dirname, "birthday.txt"));
        await fspromises.appendFile(path.join(__dirname, "birthday.txt"),"to my baby!");
        let data = await fspromises.readFile(path.join(__dirname,"birthday.txt"),{encoding:"utf-8"});
        console.log(data);
    }
    catch(err)
    {
        console.log("catch");
        throw(err);  
    }
}
latestFunc();
// console.log("Check process:",process);
process.on("uncaughtException", err => {
    console.log("Uncaught error:",err),
    process.exit(1);
}
)