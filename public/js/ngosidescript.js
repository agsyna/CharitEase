
const addFeatureBtn = document.getElementById('add-feature-btn');
const featuresContainer = document.getElementById('features-container');

const toggle = document.querySelector('.switch input');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('on');
    setTimeout(()=>{
      window.location= "/";
    },1000);
    

  });


  async function getEvents() {

    try{
    const response = await fetch("http://localhost:4000/api/v1/getEvents"); 
    const data = await response.json();


    if (data.success) {
      const events = data.event;
      console.log(`[SYNA] events :`, events);

      let clubs = document.querySelector('.events-list');

      

      
      const table = document.createElement('table');
      const tableBody = document.createElement('tbody');
      for (let i = 0; i < events.length; i++) {
        const event = events[i];

        const eventDate = event.date || event.eventdate ;

        let date = '';
        let time = '';
  
        if (eventDate && typeof eventDate === 'string') {
          [date, time] = eventDate.split(',');
        
         
          if (date.includes('T')) {
            date = date.split('T')[0]; 
          }
        }
  
        date = typeof date === 'string' ? date.trim() : '';

        const row = document.createElement('tr');
        
        const eventNameDiv = document.createElement('td');
        eventNameDiv.textContent = event.event_name;
        row.appendChild(eventNameDiv);
        
        const communityDiv = document.createElement('td');
        communityDiv.textContent = event.community_name;
        row.appendChild(communityDiv);
        
        const dateDiv = document.createElement('td');
        dateDiv.innerText = date;
        row.appendChild(dateDiv);

        const volunteer1Div = document.createElement('td');
        volunteer1Div.textContent = event.no_of_volunteers_required;
        row.appendChild(volunteer1Div);
        
        const volunteerDiv = document.createElement('td');
        volunteerDiv.textContent = event.no_of_volunteers_registered;
        row.appendChild(volunteerDiv);


        const edit = document.createElement('img');
        edit.src = 'http://127.0.0.1:55745/assets/update.png'; 
        edit.alt = 'Edit';
        edit.style.cursor = 'pointer'; 
        edit.style.width = '20px'; 
        edit.style.height = '20px';
        edit.onclick = () => updateEvent(event._id); 

        row.appendChild(edit);


        const deleteEntry = document.createElement('img');
        deleteEntry.src = 'http://127.0.0.1:55745/assets/delete.png'; 
        deleteEntry.alt = 'Delete';
        deleteEntry.style.cursor = 'pointer'; 
        deleteEntry.onclick = () => deleteEvent(event._id);
        deleteEntry.style.width = '20px'; 
        deleteEntry.style.height = '20px';
        row.appendChild(deleteEntry);


        tableBody.appendChild(row);


      }
  
      table.appendChild(tableBody);
      clubs.appendChild(table);
    } else {
      console.log("No events found.");
    }
  } catch (err) {
    console.error("Error fetching events:", err);
  }
}


  getEvents();

  async function deleteEvent(id){
    try{
      console.log(id)
      const response = await fetch(`http://localhost:4000/api/v1/deleteEvent/${id}`,{
        method: 'DELETE'
       })
       
       const data = await response.json();
       
       console.log(data)
       
       window.location.reload();
     }catch(error){
       console.log('failed to delete club',error)
     }
   }




  function updateEvent(id){
    localStorage.setItem('eventId', id);
    window.location.href = 'ngoupdate.html';
  }
  
  
 async function updateHandler(event){
  try{
    event.preventDefault()
    const id = localStorage.getItem('eventId')
    const formData = new FormData(event.target)
    const response  = await fetch(`http://localhost:4000/api/v1/updateEvent/${id}`,{
      method:'PUT',
      body: formData
    })

    const data = await response.json();
    console.log('[SYNA 1 ] response',data);

    window.location.href = '/ngodashboard';
    localStorage.clear('eventId')

  }catch(error){
    console.error('Error in updating club:', error.message);
  }
 }
 
      


  addFeatureBtn.addEventListener('click', () => {
    // Create new feature input fields
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'features_title[]';
    titleInput.placeholder = 'Feature Title';
    titleInput.required = true;
  
    const imgInput = document.createElement('input');
    imgInput.type = 'text';
    imgInput.name = 'features_img[]';
    imgInput.placeholder = 'Feature Image URL';
    imgInput.required = true;
  
    const descInput = document.createElement('input');
    descInput.type = 'text';
    descInput.name = 'features[]';
    descInput.placeholder = 'Feature Description';
    descInput.required = true;
  
    featuresContainer.appendChild(titleInput);
    featuresContainer.appendChild(imgInput);
    featuresContainer.appendChild(descInput);
  });

function showDialog(message, isSuccess = true) {
  const dialog = document.getElementById("customDialog");
  const dialogMessage = document.getElementById("dialogMessage");

  // Set message and style
  dialogMessage.innerText = message;
  dialog.classList.remove("success", "error");
  dialog.classList.add(isSuccess ? "success" : "error");
  dialog.classList.add("show");

  // Hide dialog after 5 seconds
  setTimeout(() => {
    dialog.classList.remove("show");
  }, 5000);
}




async function createevent(event) {
  try {
    event.preventDefault();

    const createForm = document.querySelector("#eventform");
    const formData = new FormData(createForm);

    // Collect feature details using a for loop
    const featureTitles = formData.getAll("features_title[]");
    const featureImgs = formData.getAll("features_img[]");
    const featureDescs = formData.getAll("features[]");

    const features = [];
    for (let i = 0; i < featureTitles.length; i++) {
      features.push({
        title: featureTitles[i],
        img_url: featureImgs[i],
        description: featureDescs[i],
      });
    }

    // Process perks as an array using for loop
    const perksInput = formData.get("perks");
    const perks = [];
    if (perksInput) {
      const perksArray = perksInput.split(",");
      for (let i = 0; i < perksArray.length; i++) {
        perks.push(perksArray[i].trim());
      }
    }

    // Add processed arrays back to formData
    formData.set("features", JSON.stringify(features));
    formData.set("perks", JSON.stringify(perks));

    const response = await fetch("http://localhost:4000/api/v1/createEvent", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to add event.");
    }

    if (result.success) {
      // showDialog("Event Added Successfully", true);
      // setTimeout(() => {
        window.location.href = "/ngodashboard";
      // }, 240);

    } else {
      showDialog(result.message, false);
    }
  } catch (e) {
    console.error("Failed to Add Event:", e.message);
    showDialog("Failed to add event: " + e.message, false);
  }
}


