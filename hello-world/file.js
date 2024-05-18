const { error } = require("console");
const fs = require("fs");

const os = require("os");
console.log(os.cpus().length);


//sync creating file
// fs.writeFileSync("./test.txt","Hello there !");

//asynchronous creating file
// fs.writeFile("./test.txt","Hello there async !",(error)=>{})

//reading a file synchronously

// const result = fs.readFileSync("./contact.txt","utf-8");
// console.log(result);

//reading a file asynchronously

//  fs.readFile("./contact.txt","utf-8",(error,result)=>{
//   if(error){
//     console.log("Error",error);

//   }else{
//     console.log(result)
//   }
// });

//appending something in a file

// fs.appendFileSync("./test.txt", `${Date.now()} Hey There\n`)

// For creating a copy of file
// fs.cpSync("./test.txt","./copy.txt");

//for deleting a file
// fs.unlinkSync("./copy.txt");

//for getting stats of a file
// console.log(fs.statSync("./test.txt"))

