let firstfourevents=[]

let promise = new Promise(function geteventsdata() {
    for(let i =0;i<4;i++)
        {
            fetch('data/'+(i+1)+'.json')
          .then(response => {
            if (!response.ok) {
              throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
          })
          .then(jsonData => {
            const events = jsonData.events[0];
              console.log('-----------------------');
              firstfourevents[i]=events;
              console.log(firstfourevents[i]);
        
          })
          .catch(error => {
            console.error("Error fetching JSON:", error);
          });
        
        }
    
});

console.log(firstfourevents[0]);
console.log(firstfourevents[1]);
console.log(firstfourevents[2]);
console.log(firstfourevents[3]);


// for(let i =0;i<4;i++)
//     {
//         fetch('data/'+(i+1)+'.json')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok " + response.statusText);
//         }
//         return response.json();
//       })
//       .then(jsonData => {
//         // Access the events array from jsonData
//         const events = jsonData.events;
    
//         // Loop through each event and log details
//         events.forEach((event, index) => {
//           console.log(`Event ${index + 1}:`);
//           console.log(`Name: ${event.event_name}`);
//           console.log(`Theme: ${event.theme}`);
//           console.log(`Eligibility: ${event.eligibility}`);
//           console.log(`Volunteers Required: ${event.no_of_volunteers_required}`);
//           console.log(`Volunteers Registered: ${event.no_of_volunteers_registered}`);
//           console.log(`Perks: ${event.perks.join(', ')}`);
//           console.log('-----------------------');
//         });
//       })
//       .catch(error => {
//         console.error("Error fetching JSON:", error);
//       });
    
//     }







// const eventsListContainer = document.querySelector(".eventslist");

// events.forEach(event => {
//     const eventDiv = document.createElement('div');
//     eventDiv.className = 'educationdrive';
//     eventDiv.style.backgroundImage = `url(${event.image})`;

//     eventDiv.innerHTML = `
//         <div class="eventstext">
//             <h3>${event.event_name}</h3>
//             <p>${event.about}</p>
//             <h4>${event.date}</h4>
//             <p>${event.volunteers} volunteers enrolled</p>
//         </div>
//         <div class="eddownpanel">
//             <a href="volunteer.html"><button class="volunteerbutton">Volunteer</button></a>
//             <a href="educationdrive.html"><button class="moreinfobutton">More info</button></a>
//         </div>
//     `;

//     eventsListContainer.appendChild(eventDiv);
// });



{/* <div style="background-image: url(assets/educationdrive.png); width:100%;
height:62%;">
            <div class="eventstext" style="padding-left: 20px;padding-top:8px;">
                <div >
                <h3 style="margin-bottom: 0;">
                    Education Drive
                </h3>
                    Savera | Chetna
                
            </div>
            <div>
                <h4>
                    October 30, 2024

                </h4>

            </div>    
            </div>
        </div>
        <div class="eddownpanel">
            <div>
                <a href="volunteer.html"><button class="volunteerbutton">Volunteer</button></a>
                <a href="educationdrive.html"><button class="moreinfobutton">More info</button></a>
            </div>

        </div>
       <hr class="hr2">
        <div style="display: flex; justify-content:start;background-color: #E4E4E4;">
            
            <div>
                <img src="assets/tick.png" alt="" style="width: auto;">
            </div>
            <div style="text-align: start; padding:6px;font-size:12px">
                100+ volunteers enrolled
            </div>
        </div> */}