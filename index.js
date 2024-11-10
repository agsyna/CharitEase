//carousel
const carouselSlide = document.querySelector(".carousel-slide");
const images = document.querySelectorAll(".carousel-slide img");
let currentIndex = 0;
const intervalTime = 2000;
function showNextImage() {
  const imageWidth = images[0].clientWidth;
  currentIndex += 1;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  carouselSlide.style.transform =
    "translateX(" + -currentIndex * imageWidth + "px)";
}
setInterval(showNextImage, intervalTime);

//events-homepage

let firstfourevents = [];

let lastfourevents = [];
let eventsarr = [];


MediaQueryList

let numberofevents=0;
let numberofcommunities=0;

async function geteventsdata() {
  firstfourevents = [];
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch("data/" + (i + 1) + ".json");

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const jsonData = await response.json();

      const event = jsonData.events[0];
      firstfourevents[i] = event;

      //   renderEvents(jsonData);
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  }
}

async function consolecheck(params) {
  ongoing();
  getcommunityoptions("NGOS");
}

consolecheck();

async function getreveventsdata() {
  lastfourevents = [];
  let j = 0;
  for (let i = 5; i > 0; i--) {
    try {
      const response = await fetch("data/" + i + ".json");

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const jsonData = await response.json();

      const event = jsonData.events[0];
      lastfourevents[j] = event;
      j++;
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  }
}

function renderEvents(eventsarr) {
  const elements = document.querySelectorAll(".educationdrive");

  // console.log(elements.length);
  // console.log(eventsarr.length);
  // console.log(elements.length);

  eventsarr.forEach((event, index) => {
    if (elements[index]) {
      console.log(event);

      const eventDiv = document.createElement("div");
      eventDiv.style.backgroundImage = `url(${event.image})`;
      eventDiv.style.width = "100%";
      eventDiv.style.height = "62%";
      eventDiv.style.backgroundRepeat = "no-repeat";
      eventDiv.style.backgroundSize = "cover";

      const detailsDiv = document.createElement("div");
      detailsDiv.style.paddingLeft = "20px";
      detailsDiv.style.paddingTop = "10px";
      detailsDiv.style.color = "#f2f2f2d9";
      detailsDiv.style.display = "flex";
      detailsDiv.style.flexDirection = "column";
      detailsDiv.style.justifyContent = "space-between";
      detailsDiv.style.height = "100%";

      const titleDiv = document.createElement("div");
      const title = document.createElement("h3");
      title.style.margin = "0";
      title.innerText = event.event_name;

      const community = document.createElement("h5");
      community.style.margin = "4px 0";
      community.innerText = event.community_name;

      const dateDiv = document.createElement("div");
      const date = document.createElement("h4");
      date.style.marginTop = "-4px";
      date.innerText = event.date;

      titleDiv.appendChild(title);
      titleDiv.appendChild(community);

      dateDiv.appendChild(date);

      detailsDiv.appendChild(titleDiv);
      detailsDiv.appendChild(dateDiv);
      eventDiv.appendChild(detailsDiv);

      // console.log(elements[index]);
      elements[index] = [];

      // elements[index].appendChild(eventDiv);
      // to empty div
      if (elements[index].firstChild) {
        elements[index].removeChild(elements[index].firstChild);
      }
      elements[index].insertBefore(eventDiv, elements[index].firstChild);

      elements[index].querySelector(
        ".noofvolunteers"
      ).innerText = `${event.no_of_volunteers_registered} + volunteers enrolled`;
      elements[index]
        .querySelector(".moreinfo_atag")
        .setAttribute("href", `${event.event_name}.html`);
    }
  });
}

async function ongoing() {
  await geteventsdata();
  renderEvents(firstfourevents);
  console.log(document.getElementsByClassName("evb"));
  const temp = document.getElementsByClassName("evb");
  // temp.setAttribute('style', 'background-color: #f47c19;color: #eeeded;')
  temp[0].style.backgroundColor = "#f47c19";
  temp[0].style.color = "#eeeded";
  temp[1].style.backgroundColor = "#eeeded";
  temp[1].style.color = "#f47c19";
}

async function upcoming() {
  await getreveventsdata();
  renderEvents(lastfourevents);
  const temp = document.getElementsByClassName("evb");
  // temp.setAttribute('style', 'background-color: #f47c19;color: #eeeded;')
  temp[1].style.backgroundColor = "#f47c19"; // Ongoing button
  temp[1].style.color = "#eeeded";
  temp[0].style.backgroundColor = "#eeeded";
  temp[0].style.color = "#f47c19";
}

//communities-homepage

async function fetchcommunitiesdata() {
  let count = 1;
  try {
    while(count<6)
    {
    const response = await fetch("data/" + count + ".json");

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const jsonData = await response.json();
    const elements = document.querySelectorAll(".indicommunity");

    // eventsarr.forEach((event, cpunt) => {
      if (elements[count-1]) {
          const indiimage = document.createElement("div");
          indiimage.style.backgroundImage = `url(${jsonData.image})`;
          indiimage.style.minHeight = "220px";
          indiimage.backgroundRepeat = "no-repeat";
          indiimage.backgroundSize = "cover";

          const atag = document.createElement("a");
          atag.href = `${jsonData.name}` + ".html";

          const communitiestext = document.createElement("div");
          communitiestext.style.display = "flex";
          communitiestext.style.flexDirection = "column";
          communitiestext.style.justifyContent = "start";
          communitiestext.style.paddingLeft = "6px";

          const communitiestext1 = document.createElement("div");

          communitiestext1.style.paddingTop = "10px";
          communitiestext1.style.fontWeight = "800";
          communitiestext1.style.fontSize = "16px";
          communitiestext1.innerHTML = `${jsonData.name}`;

          const communitiestext2 = document.createElement("div");
          communitiestext2.style.fontWeight = "700";
          communitiestext2.style.fontSize = "12px";
          communitiestext2.style.color = "#667479b3";
          communitiestext2.innerHTML = "Members: "+`${jsonData.members}`;

          const communitiestext3 = document.createElement("div");
          communitiestext3.style.fontWeight = "500";
          communitiestext3.style.fontSize = "12px";
          communitiestext3.style.color = "black";
          communitiestext3.innerHTML = `${jsonData.tagline}`;

          communitiestext.appendChild(communitiestext1);
          communitiestext.appendChild(communitiestext2);
          communitiestext.appendChild(communitiestext3);


          atag.appendChild(indiimage);
          atag.appendChild(communitiestext);

          elements[count-1].appendChild(atag);
        //   elements[i].appendChild(indiimage)        
        count++;
      }
    // });
  } 
}
catch (error) {
  console.log(error, "in fetching files");
}
}

fetchcommunitiesdata();




async function fetchstarsoftheweek()
{
    try{
        const response = await fetch("data/starsoftheweek.json");
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
          }
      
        const jsonData = await response.json();
        const star_names= jsonData.ngo_name;
        star_names.forEach((star_name,index)  =>{


            // console.log("Star Name: " + star_name.community_name);

            const star_div = document.createElement("div");
            star_div.classList.add('starsoftheweek-item');


            const star_div_atag = document.createElement("a");
            star_div_atag.href = star_name.link;

 

            const star_div_image = document.createElement("img");
            star_div_image.src= star_name.image;

            const star_community_name = document.createElement("h3");
            star_community_name.textContent = star_name.community_name;
            star_div_atag.appendChild(star_community_name);

            const star_title = document.createElement("h4");
            star_title.textContent = star_name.title;
            star_div_atag.appendChild(star_title);

            const star_reason = document.createElement("h5");
            star_reason.textContent = star_name.reason;
            star_div_atag.appendChild(star_reason);
            // star_div_atag.classList.add("startext");


            star_div_atag.appendChild(star_div_image);
            star_div.appendChild(star_div_atag);
            console.log(star_div);
            const elements = document.getElementById("starsoftheweek");
            elements.appendChild(star_div);

        })

    }
    catch(error){
        console.log(error,"in loading data")
    }

}
fetchstarsoftheweek();


async function fetchngopage()
{
    try{
        const response = await fetch("data/data.json");
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
          }
        const jsonData = await response.json();
      for(i = 0; i < jsonData.length; i++){
        if(jsonData[i].name === document.getElementById("ngo_name").innerText){
          console.log(jsonData[i].name);
          const bgimg = document.getElementById("bgimg");
          bgimg.src= jsonData[i].bgimage;
          const logo = document.getElementById("ngo_logo");
          logo.src= jsonData[i].logo;
          const enrolled = document.getElementById("volun");
          volun.innerText = jsonData[i].enrolled;
          const ratings = document.getElementById("rating_nos");
          ratings.innerHTML = `(${jsonData[i].ratings} reviews)`;
          const aboutus = document.getElementById("aboutus");
          aboutus.innerText = jsonData[i].about_us;
          const joinus = document.getElementById("join_us");
          joinus.innerText = jsonData[i].why_join_us;
          for(j = 0; j < jsonData[i].gallery.length; j++){
            document.getElementById(`img${j+1}`).src = jsonData[i].gallery[j];
          }
        }
      }

    }
    catch(error){
        console.log(error,"in loading data")
    }

}
fetchngopage();


function changetologin(){
  const login = document.querySelector(".login-container");
  login.style.removeProperty("display");
  const signup = document.querySelector(".Signup-container");
  signup.style.display = "none";
}

function changetosignup(){
  const login = document.querySelector(".login-container");
  login.style.display = "none";
  const signup = document.querySelector(".Signup-container");
  signup.style.removeProperty("display");;
}

const signup = document.querySelector(".Signup-container");
signup.style.display = "none";


/////////////
document.addEventListener("DOMContentLoaded", function() {
  const subscribeButton = document.querySelector(".subscribenow button");
  const emailInput = document.querySelector(".subscribenow input[type='email']");

  subscribeButton.addEventListener("click", function(event) {
      const email = emailInput.value.trim();
      const validDomains = ["@gmail.com", "@yahoo.in", "@outlook.in", "@bmu.edu.in"];
      const isValidEmail = validDomains.some(domain => email.endsWith(domain));

      if (email && isValidEmail) {
          showCustomAlert("Thank you for subscribing!! Email: " + email);
          emailInput.value = ""; 
      } else {
          showCustomAlert("Please enter a valid email address.");
      }
  });
});


function showCustomAlert(message) {
   
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "flex-start";  
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "1000";
  overlay.style.paddingTop = "20px"; 

  
  const alertBox = document.createElement("div");
  alertBox.style.backgroundColor = "#ffffff"; 
  alertBox.style.color = "#173B45"; 
  alertBox.style.padding = "20px";
  alertBox.style.borderRadius = "8px";
  alertBox.style.width = "50%"; 
  alertBox.style.maxWidth = "500px"; 
  alertBox.style.textAlign = "center";
  alertBox.style.fontFamily = "Poppins";


  const title = document.createElement("div");
  title.innerText = "CharitEase says";
  title.style.fontWeight = "bold";
  title.style.marginBottom = "10px";
  title.style.fontSize = "1.2em";

  const messageText = document.createElement("p");
  messageText.innerText = message;

  
  const closeButton = document.createElement("button");
  closeButton.innerText = "OK";
  closeButton.style.backgroundColor = "#173B45";
  closeButton.style.color = "#ffffff";
  closeButton.style.padding = "10px 20px";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "5px";
  closeButton.style.cursor = "pointer";
  closeButton.style.marginTop = "10px";

  closeButton.addEventListener("click", function() {
      document.body.removeChild(overlay);
  });

  alertBox.appendChild(title);
  alertBox.appendChild(messageText);
  alertBox.appendChild(closeButton);

  overlay.appendChild(alertBox);
  document.body.appendChild(overlay);
}

function getlist(a) {
  for (let i = 1; i <= 3; i++) {
    let currOption = document.querySelector(`#option${i}`);
    if (i === a) {
      currOption.className = "tabactive";
      pagechange(1);
      getcommunityoptions(currOption.innerHTML);
    } else {
      currOption.className = "tab";
    }
  }
}
function pagechange(a) {
  for (let i = 1; i <= 2; i++) {
    let currOption = document.querySelector(`#page${i}`);
    if (i === a) {
      currOption.className = "activepage";
      if(a===1){
        getcommunityoptions("NGOS");
      }else{
        getcommunityoptions("TRUSTS");
      }
    } else {
      currOption.className = "page";
    }
  }
}


async function getcommunityoptions(a) {
  try {
    const response = await fetch("data/data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const jsonData = await response.json();
    const eventsgrid = document.querySelector(".events-grid");
    eventsgrid.innerHTML = "";

    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i].type === a) {
        const carddiv = document.createElement("div");
        const eventimg = document.createElement("img");
        const cardcontent = document.createElement("div");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        const volunteercount = document.createElement("div");
        const itag = document.createElement("i");
        const cardfooter = document.createElement("div");
        const anchor1 = document.createElement("a");
        const anchor2 = document.createElement("a");
        const button1 = document.createElement("button");
        const button2 = document.createElement("button");

        carddiv.className = "card";
        eventimg.src = jsonData[i].image;
        eventimg.alt = "Event Image";
        cardcontent.className = "card-content";
        h3.innerHTML = jsonData[i].name;
        p.className = "location";
        p.innerHTML = jsonData[i].address;
        volunteercount.className = "volunteer-count";
        volunteercount.appendChild(itag);
        itag.innerHTML = jsonData[i].enrolled;
        cardfooter.className = "card-footer";
        cardfooter.appendChild(anchor1);
        cardfooter.appendChild(anchor2);
        anchor1.href = "volunteer.html";
        anchor1.appendChild(button1);
        button1.className = "volunteer";
        button1.innerHTML = "Volunteer";
        anchor2.href = `${jsonData[i].name}.html`;
        anchor2.appendChild(button2);
        button2.className = "more-info";
        button2.innerHTML = "More info";

        carddiv.appendChild(eventimg);
        cardcontent.appendChild(h3);
        cardcontent.appendChild(p);
        cardcontent.appendChild(volunteercount);
        cardcontent.appendChild(cardfooter);
        carddiv.appendChild(cardcontent);
        eventsgrid.appendChild(carddiv);
      }
    }
  } catch (error) {
    console.log(error, "in loading data");
  }
}


function toggleDropdown() {
  document.getElementById("filterDropdown").classList.toggle("show");
}

// window.onclick = function(event) {
//   // if (!event.target.matches('.filter-button')) {
//   //   var dropdowns = document.getElementById("filterDropdown");
//   //   dropdowns.classList.toggle("show"); 
//   // }
//   // console.log("Clicked at coordinates: ", event.clientX, event.clientY);
//   // console.log(event.target);
// }

document.addEventListener("click", function(event) {
  // Handle the click event
  console.log("Clicked at coordinates: ", event.clientX, event.clientY);
console.log(event.target);
});