// const express = require('express');
// const fs = require('fs');
// const path = './data.json';

// const app = express();
// app.use(express.json()); // Parse JSON bodies

// // Endpoint to handle signup form submission
// app.post('./index.html', (req, res) => {
//     const newData = req.body;

//     // Read, update, and write data to data.json
//     fs.readFile(path, 'utf8', (err, data) => {
//         if (err) {
//             console.error("Error reading file:", err);
//             return res.status(500).send('Internal Server Error');
//         }

//         let jsonData = [];
//         if (data.trim() !== "") {
//             try {
//                 jsonData = JSON.parse(data);
//             } catch (parseError) {
//                 console.error("Error parsing JSON:", parseError);
//                 return res.status(500).send('Internal Server Error');
//             }
//         }

//         jsonData.push(newData);

//         fs.writeFile(path, JSON.stringify(jsonData, null, 2), (err) => {
//             if (err) {
//                 console.error("Error writing file:", err);
//                 return res.status(500).send('Internal Server Error');
//             }
//             res.status(200).send('Signup data saved successfully!');
//         });
//     });
// });

// app.listen(55745, () => {
//     console.log('Server is running on http://localhost:55745');
// });
