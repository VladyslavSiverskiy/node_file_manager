import process from 'process';
import * as readline from "readline"; 
import { ls, up, cd, help } from "./services/nav/nav.js";
import { cat, add, rm, cp, mv } from './services/files/files.js';
import { EventEmitter } from 'events';
import { homedir } from "os";

let currentDir = homedir();
export const diskName = currentDir.substring(0,2);
export const getCurrentDir = () => currentDir;
export const setCurrentDir = newCurrentDir => currentDir = newCurrentDir;

const evEm = new EventEmitter();
evEm.on('up', up)
    .on('ls', ls)
    .on('help', help)
    .on('cd', cd)
    .on('cat', cat)
    .on('add', add)
    .on("rm", rm)
    .on('cp', cp)
    .on('mv', mv);

const action = data => { 
    try{
        const command = data.split(" ");
        if (command.length === 1){
            if(command[0] === "up" || command[0] === "ls" || command[0] === "help"){
                evEm.emit(command);
                console.log("\nYour current directory is: " + currentDir);
            }else{
                throw new Error("Wrong command! Print help to see all posible commands");
            }
        }else if(command.length === 2){
            if(command[0] === "cd" || command[0] === "cat" || command[0] === "add" || command[0] === "rm"){
                evEm.emit(command[0],command[1]);
                console.log("\nYour current directory is: " + currentDir);
            }else{
                throw new Error("Wrong command! Print help to see all posible commands");
            }
        }else if(command.length === 3){
            if(command[0] === "cp" || command[0] === "mv"){
                evEm.emit(command[0],command[1], command[2]);
                console.log("\nYour current directory is: " + currentDir);
            }else{
                throw new Error("Wrong command! Print help to see all posible commands");
            }
        }else{
            throw new Error("Wrong command! Print help to see all posible commands");
        }
    }catch(e){
        console.log(e.message);
    }
};


const init = () => {

    let userName = process.argv.slice(2);
    userName = userName[0].split("==")[1];

    function end(){
        console.log(`Thank you for using file manager, ${userName}`);
        process.exit();
    }

    console.log("Welcome to the file manager, " + userName + " !");
    console.log("Your current directory is: " + currentDir);
    console.log("Enter help to see all commands");

    const readLine = readline.createInterface({
        input: process.stdin, 
        output: process.stdout});
    
    
    readLine.on('line', (str) => {
        if(str === ".exit"){
            end();           
        }else if(str != ""){
            action(str);
        }
    });
    readLine.on('SIGINT', () => {
        end();
    }); 
};



init();