import { exec } from 'child_process';
import { readFileSync, unlink } from "fs";
import fs from "fs";
import express from "express";
import cors from "cors";

const fileCsr = "nor.csr";
const fileKey = "hhhg.key";
const fileCert = "cert.pem";

const app = express();

app.use(cors())
app.use(express.json());

app.get("/data", (req, res) => {
    res.send({
        firstName: "Rabo",
        lastName: "Madoyan"
    });
});


app.post("/", (req, res) => {
    let data ="";
    req.on("data", (info) => {
        data += info;
    });
    req.on("end", () => {
        const obj = JSON.parse(data);
        let RSA = obj.selected;
        let countryName = obj.countryname;
        let stateOrProvinceName = obj.statename;
        let localityName = obj.localityname;
        let organizationName = obj.organizationname;
        let organizationUnit = obj.organizationunitname;
        let commonName = obj.commonname;
        let emailAddress = obj.email;

        function createCsr() {
            exec(`openssl req -new -newkey rsa:${RSA} -nodes -out ${fileCsr} -keyout ${fileKey} -subj "/C=${countryName}/ST=${stateOrProvinceName}/L=${localityName}/O=${organizationName}/OU=${organizationUnit}/CN=${commonName}/emailAddress=${emailAddress}"`, (error, stdout, stderr) => {
              if (error) {
                console.error(`error: ${error.message}`);
                return;
              }
            
              if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
              }
              console.log(`stdout:\n${stdout}`);
            });
            }
            
            function createCert() { 
                exec(`openssl x509 -req -days 9999 -in ${fileCsr} -signkey ${fileKey} -out ${fileCert}`, (error, stdout, stderr) => {
                    if (error) {
                    console.error(`error: ${error.message}`);
                    return;
                    }
                
                    if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return;
                    }
                    console.log(`stdout:\n${stdout}`);
                });
            }
            
            function cer() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        return resolve (createCert());},1500);
                    });
                }
            
            function kardaFile (fileName) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        let data = fs.readFileSync(fileName);
                        return resolve (
                        data.toString());},500);
                    });
                }
            
            function jnjiFile (fileName) {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            return resolve (
                                fs.unlink(fileName, function(err){
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("Jnjalam");
                                    }
                                }));},500);
                        });
                    }
            let datas = [];
            
            async function verj () { 
                  
                   createCsr()
                   
                   await cer()            
            
                   await kardaFile(fileKey)
                    .then((readKey) => {
                        datas.push(readKey);
                    })
                        
                   await kardaFile(fileCsr)
                   .then((readCsr) => {
                    datas.push(readCsr);
                    })
                        
                   await kardaFile(fileCert)
                   .then((readCert) => {
                    datas.push(readCert);
                    })
                        
                   await jnjiFile (fileCsr)
                        
                   await jnjiFile (fileKey)
                        
                   await jnjiFile (fileCert)
                
                   return datas;
                }
            
            verj().then((datas) => {
            res.send ({
                keyText: (datas[0]),
                csrText: datas[1],
                certText: datas[2]
                })                        
                
            });           
    
        });
    });



/* hetaqrqira bayc nerqevi kody chi ashxatum chnayac app.use(express.json)-in
app.post("/", (req, res) => {
    console.log(req.body.countryname);
    res.send("Stacel em Jsony");
});
*/
app.listen(process.env.PORT || 3003);