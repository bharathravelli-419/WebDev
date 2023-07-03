import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        message:"Type in Your URL",
        name :"URL"
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.URL;
      //QR Code generation and Saving Part 
  var qr_svg = qr.image(url, { type: 'png' });
  qr_svg.pipe(fs.createWriteStream('A_QR.png'));
   
  fs.writeFile("URL.txt",url,(err)=>{
    if(err)
    throw err
    else
    console.log("The file has been craeted")

  })
  
  })
  .catch((error) => {
    if (error) {
     console.log(err);
    } else {
      // Something else went wrong
      console.log("Everything is Clear")
    }
  });


