import fs from 'fs';
import path from 'path';
import { getCurrentDir } from '../../file.js';

const cat = (pathToFile) => {
    try{
        fs.readFile(path.join(getCurrentDir(), pathToFile), (err,file)=>{
            try{    
                if(err){
                    console.log(err);
                }
            console.log(file.toString());
            }catch(e){
                console.log(e);
            }
        });
    }catch(e){
        console.log(e);
    }
};

const add = (fileName) => {
    let content = "";
    fs.writeFile(path.join(getCurrentDir(), fileName), content, (err)=>{
        console.log('was added');
        if(err){
            console.log(err);
        }
        
    });
};

const rm = (fileName) => {
    fs.unlink(path.join(getCurrentDir(), fileName), (err)=>{
        console.log('was removed');
        if(err){
             console.log(err);
        }
    });
};

const cp = (fileName, directoryName) => {
    fs.copyFile(path.join(getCurrentDir(), fileName), path.join(directoryName, fileName), (err) => {
        if(err){
            console.log(err);
        }
    });
};

const mv = (fileName, directoryName) => {
    fs.copyFile(path.join(getCurrentDir(), fileName), path.join(directoryName, fileName), (err) => {
        if(err){
            console.log(err);
        }
        fs.unlinkSync(path.join(getCurrentDir(), fileName));
    });
};

export { cat, add, rm, cp, mv };