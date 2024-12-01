
const addFeatureBtn = document.getElementById('add-feature-btn');
const featuresContainer = document.getElementById('features-container');



async function getngodata()
{

}





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
        const row = document.createElement('tr');
        
        const eventNameDiv = document.createElement('td');
        eventNameDiv.textContent = event.event_name;
        row.appendChild(eventNameDiv);
        
        const communityDiv = document.createElement('td');
        communityDiv.textContent = event.community_name;
        row.appendChild(communityDiv);

        const eventDate = event.date;

        const [date, time] = eventDate.split('T');
        
        const dateDiv = document.createElement('td');
        dateDiv.textContent = date;
        row.appendChild(dateDiv);

        const volunteer1Div = document.createElement('td');
        volunteer1Div.textContent = event.no_of_volunteers_required;
        row.appendChild(volunteer1Div);
        
        const volunteerDiv = document.createElement('td');
        volunteerDiv.textContent = event.no_of_volunteers_registered;
        row.appendChild(volunteerDiv);
        
        tableBody.appendChild(row);
      }
  
      table.appendChild(tableBody);
      clubs.appendChild(table); // Append table to the .events-list container
    } else {
      console.log("No events found.");
    }
  } catch (err) {
    console.error("Error fetching events:", err);
  }
}


  getEvents();


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
      showDialog("Event Added Successfully", true);
      setTimeout(() => {
        window.location.href = "ngodashboard.html";
      }, 5000);
    } else {
      showDialog(result.message, false);
    }
  } catch (e) {
    console.error("Failed to Add Event:", e.message);
    showDialog("Failed to add event: " + e.message, false);
  }
}


