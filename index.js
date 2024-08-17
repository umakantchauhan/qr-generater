import inquirer from 'inquirer';
import qr from 'qr-image'; // Import the qr-image package using ES modules
import fs from 'fs'; // Import the fs (file system) package using ES modules


inquirer
  .prompt([
    /* Pass your questions in here */
    {
        name: 'Text',
        message: 'Enter Text : '
      },
  ])
  .then((answers) => {
    var Text = answers.Text; // Extract the Text from the answer object

    // Step 2: Generate QR Code Image
    var qr_image = qr.image(Text, { type: "png" }); // Create QR image data

    // Save the QR Code Image (png format)
    qr_image.pipe(fs.createWriteStream("qr_code.png"));

    // Step 3: Save User Input as Text File
    fs.writeFile("Text.txt", Text, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });

  })
  .catch((error) => {
    console.error("An error occurred:", error); // Handle errors
  });