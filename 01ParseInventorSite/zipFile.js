import Zlib from "zlib";
import fs from "fs";

function zipFile(file, zipedFile){
    
    const gs = Zlib.createGzip();
    const rs = fs.createReadStream(`${file}`, 'utf-8');
    const ws = fs.createWriteStream(`${zipedFile}`, 'utf-8');

    rs.pipe(gs).pipe(ws);

    console.log("Sucessfully ziped");
}

export {zipFile};