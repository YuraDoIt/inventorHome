import  rp  from 'request-promise';
import  cheerio from 'cheerio';
import fs from 'fs';
import nodemailer from 'nodemailer';

import { mapToObj } from './mapToObj.mjs';
import { zipFile } from './zipFile.mjs';

const url = 'https://inventorsoft.co/careers';


rp(url)
    .then(function(html){

        const $ = cheerio.load(html);
        const map = new Map();

        $('.vacancy p', html).each(function(index){
            map.set(index + 1, $(this).text());
        });

        let converted = mapToObj(map);
        console.log(converted);

        let data = JSON.stringify(converted, null, 2);
        fs.writeFile('./vacancy.json', data, (err) => {
            if(err) throw err;            
        })

    })
    .then(() => {
        zipFile('vacancy.json','inventorTest.gz');
    })
    .then(() => {
        //sendMail();
    })
    .catch(function(err){
        return err;
    })

//*** - put you data here
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '***',
        pass: '***',
    },
});

let mailOption = {
    from: '***',
    to: 'yura9989@gmail.com',
    subject: `Inventor soft parse info about vacancies`,
    html:`The body of the email goes here in html`,
    attachments: [{
        path: __dirname + "/" + 'inventorTest.gz'
    }]

};

transporter.sendMail(mailOption, function(err, info){
    if(err){
        console.log(err)
    } else {
        console.log('Email send to: ' + info.response + " receiver : " + mailOption.to);
    }
})