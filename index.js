import { exec } from 'child_process';
import fs from "fs";
import { fileURLToPath } from 'url'; 
import express from "express";
import cors from "cors";
import path from 'path';
import * as fsJSON from 'fs'
import { create, globSource } from 'ipfs-http-client'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileCsr = "nor.csr";
const fileKey = "hhhg.key";
const fileCert = "cert.pem";
const ipfs = await create();

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

app.use(cors())
app.use(express.json());

/*
app.get("/data", (req, res) => {
    res.send({
        firstName: "Rabo",
        lastName: "Madoyan"
    });
});
*/

app.post("/key", (req, res) => {
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
        let datas = [];

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
            
            function createThumbprint() { 
                exec(`openssl x509 -in cert.pem -fingerprint -noout`, (error, stdout, stderr) => {
                    if (error) {
                    console.error(`error: ${error.message}`);
                    return;
                    }
                
                    if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return;
                    }
                    console.log(`stdout:\n${stdout}`);
                    datas.push(`${stdout}`);
                });
            }
            
            function createSerialNumber() { 
                exec(`openssl x509 -in cert.pem -serial -noout`, (error, stdout, stderr) => {
                    if (error) {
                    console.error(`error: ${error.message}`);
                    return;
                    }
                
                    if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return;
                    }
                    console.log(`stdout:\n${stdout}`);
                    datas.push(`${stdout}`);
                });
            }

            function cer() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        return resolve (createCert());},1700);
                    });
                }

             function thumb() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        return resolve (createThumbprint());},1800);
                    });
                }
                
            function seria() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                            return resolve (createSerialNumber());},1900);
                        });
                }    
            
            function kardaFile (fileName) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        let data = fs.readFileSync(fileName);
                        return resolve (
                        data.toString());},60);
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
            
            async function verj () { 
                  
                   createCsr()
                   
                   await cer()            
            
                   await thumb()

                   await seria()       
                   
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
                certThumbrint: datas[0],
                certSerial:datas[1],
                keyText: datas[2],
                csrText: datas[3],
                certText: datas[4] 
                })                        
                
            });           
    
        });
    });

    app.post("/nft", async (req, res) => {
        //stanum enq canvasic base64 encodac vor fetch einq arel u hanum enq demi masy
        let base64Data = req.body.file.replace(/^data:image\/png;base64,/, "");
        //base64decode enq anum
        const buf = Buffer.from(base64Data, 'base64');
        //grum enq fayly mer uzac teghy
        fs.writeFileSync('/opt/ipfs_png_json/ipfs_png/pngFile_CertNFT.png', buf);
        console.log(buf);

        let CertPNG_IPFS_CID = ''
        for await (const pngFile_CertNFT of ipfs.addAll(globSource('/opt/ipfs_png_json/ipfs_png', '**/*'))) {
        console.log(pngFile_CertNFT)
        CertPNG_IPFS_CID = pngFile_CertNFT.cid
        }

        const CertPNG_IPFS_URI = 'ipfs://'+CertPNG_IPFS_CID

        const CertNFT_IPFS_json = {
        'description': 'CertNFT uploaded via local IPFS',
        'image': CertPNG_IPFS_URI,
        'name': 'CertNFT-IPFS-local'
        }
        console.log(CertNFT_IPFS_json)

        const jsonString_CertNFT_IPFS = JSON.stringify(CertNFT_IPFS_json)
        fsJSON.writeFile('/opt/ipfs_png_json/ipfs_json/CertNFT_IPFS_json.json', jsonString_CertNFT_IPFS, err => {
        if (err) {
                console.log('Error create json file', err)
        } else {
                console.log('json created successfully')
        }
        })

        let ipfsURI_CertNFT = ''
        for await (const ipfsURI_CertNFT of ipfs.addAll(globSource('/opt/ipfs_png_json/ipfs_json','**/*'))) {
        console.log('ipfs.io/ipfs/'+ipfsURI_CertNFT.cid)
        }

        
        res.send("Amen inch lav e");
        });



app.listen(process.env.PORT || 60000);