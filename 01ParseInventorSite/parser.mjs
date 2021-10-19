import  rp  from 'request-promise';
import  cheerio from 'cheerio';
import fs from 'fs';
import nodemailer from 'nodemailer';

import { mapToObj } from './mapToObj.mjs';
import { zipFile } from './zipFile.mjs';

var url = 'https://inventorsoft.co/careers';


rp(url)
    .then(function(html){

        const $ = cheerio.load(html);
        const map = new Map();

        $('.vacancy p',html).each(function(index){
            map.set(index + 1, $(this).text());
        });

        var converted = mapToObj(map);
        console.log(converted);

        var data = JSON.stringify(converted, null, 2);
        fs.writeFile('./vacancy.json', data, (err) => {
            if(err) throw err;            
        })

    })
    .then(() => {
        zipFile('vacancy.json','inventorTest.gz');
    })
    .catch(function(err){
        return err;
    })