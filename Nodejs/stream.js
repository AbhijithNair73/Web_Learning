const fs = require('fs');
const rs = fs.createReadStream('./lorem.txt',{encoding:'utf-8'});
const ws = fs.createWriteStream("./new_lorem.txt");

// rs.on("data", datachunk => ws.write(datachunk));
rs.pipe(ws);