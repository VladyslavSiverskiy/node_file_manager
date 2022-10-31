import { getCurrentDir, setCurrentDir, diskName } from "../../file.js";
import { sep } from 'path';
import path from 'path';
import fs from 'fs';

export const up = () => {
    if(getCurrentDir() == diskName + sep){
        throw new Error('You can`t change root directory');
    }else{
        setCurrentDir(path.join(getCurrentDir(), "../"));
    }
};

export const ls = () => {
    fs.readdir(path.join(getCurrentDir()), (err,items)=>{
        if(err){
            console.log(err);
        }
        items.forEach((e)=>{
            console.log(e);
        });
    });
};

export const cd = (pathToFile) => {
    try{
        if(pathToFile.substring(0,2) === diskName){
           if(fs.existsSync(pathToFile)){
               setCurrentDir(pathToFile);
           }else{
                throw new Error("Directory or file doesn`t exist");
           }
        }else{
            if(fs.existsSync(path.join(getCurrentDir(), pathToFile))){
                setCurrentDir(path.join(getCurrentDir(), pathToFile));
            }else{
                throw new Error("Directory or file doesn`t exist");
            }
        }
    }
    catch(e){
        throw new Error(e);
    }
};

export const help = ()=>{
    console.log(`\t\tMove up in current directory - up
                Print all files and folders in directory - ls
                Change directory - cd [PATH_TO_TARGET] 
                Read file - cat [PATH_TO_FILE]
                create new file in current folder - add [FILE_NAME]   
    `);
};


