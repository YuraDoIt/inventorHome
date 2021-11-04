import rp from 'request-promise';
import cheerio from 'cheerio';
import fs from 'fs';
import nodemailer from 'nodemailer';

import { mapToObj } from './mapToObj.js';
import { zipFile } from './zipFile.js';


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

        zipFile('vacancy.json','inventorTest.gz');
  
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
    html: `The body of the email goes here in html`,
    attachments: [{
        path: __dirname + "/" + 'inventorTest.gz'
    }]

};

transporter.sendMail(mailOption, function (err, info) {
    if (err) {
        console.log(err)
    } else {
        console.log('Email send to: ' + info.response + " receiver : " + mailOption.to);
    }
})

function execude(html) {

    const $ = cheerio.load(html);
    const map = new Map();

    $('.vacancy p', html).each(function (index) {
        map.set(index + 1, $(this).text());
    });

    let converted = mapToObj(map);
    console.log(converted);

    let data = JSON.stringify(converted, null, 2);
    fs.writeFile('./vacancy.json', data, (err) => {
        if (err) throw err;
    })
}



// async function fetchData() {
//     try {
//         await rp(url);

//         await execude(html);

//         //await zipFile('vacancy.json', 'inventorTest.gz');

//         //await sendMail();
//     }
//     catch (e) {
//         //throw e;
//     }
// }

// fetchData();
