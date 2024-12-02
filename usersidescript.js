//carousel
const carouselSlide = document.querySelector(".carousel-slide");
const images = document.querySelectorAll(".carousel-slide img");
let currentIndex = 0;
const intervalTime = 2000;

function showNextImage() {
  const imageWidth = images[0].clientWidth;
  // console.log("imageWidth : "+images[0].clientWidth)
  currentIndex += 1;

  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  //resets value to 0 - everytime it tries to go beyond 2 (2 is the images length)
  carouselSlide.style.transform =
    "translateX(" + -currentIndex * imageWidth + "px)";
}

setInterval(showNextImage, intervalTime);

//events-homepage

let firstfiveevents = [];
let lastfiveevents = [];
let eventsarr = [];

var numberofevents = 0;

var numberofcommunities = 0;

let timer;


//console check - function executing at all times

async function consolecheck(params) {
  if (screen.width > 600) {
    numberofevents = 5;
    numberofcommunities = 5;
    console.log("numberofevents : " + numberofevents);
  } else {
    numberofevents = 4;
    numberofcommunities = 4;
    console.log("numberofevents : " + numberofevents);
  }
  ongoing();
  fetchcommunitiesdata();
  fetchstarsoftheweek();
  getcommunityoptions("NGOS");
  geteventsoptions(0, 9, 1);


  // Clears any existing timer before setting a new one
  if (timer) 
    {
      clearInterval(timer);
    }

  updateCountdown();
  timer = setInterval(updateCountdown, 1000);

  document.onclick = function (event) {
    if (!event.target.matches(".filter-button")) {
      var dropdowns = document.getElementsByClassName("dropdown");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };


}

consolecheck();

//events-homepage -- for ongoing events

async function geteventsdata() {
  firstfiveevents = []; 
  try {
    const response = await fetch("http://localhost:4000/api/v1/getEvents");

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    const jsonData = await response.json();

    console.log("Fetched Events Data:", jsonData);


    const events = jsonData.event;


    for (let i = 0; i < numberofevents; i++) {
      firstfiveevents.push(events[i]);
    }

    console.log("Ongoing Events:", firstfiveevents);

  } catch (error) {
    console.error("Error fetching events data:", error);
  }
}


//events-homepage -- for upcoming events

async function getreveventsdata() {
  lastfiveevents = []; // Reset the array
  try {
    const response = await fetch("http://localhost:4000/api/v1/getEvents");

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    const jsonData = await response.json();
    console.log("Fetched Events Data:", jsonData);

    const events = jsonData.event;

    if (!Array.isArray(events)) {
      throw new Error("Unexpected data structure: 'event' is not an array");
    }


    for (let q = events.length - 1; q >= Math.max(events.length - 7, 0); q--) 
    {
      lastfiveevents.push(events[q]); 
    }

    console.log("Last 5 Events:", lastfiveevents);

  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}


//events-homepage -- for rendering data into designed divs

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
      eventDiv.className = "eventDiv";

      const detailsDiv = document.createElement("div");
      detailsDiv.className = "detailsDiv";

      const titleDiv = document.createElement("div");
      const title = document.createElement("h3");
      title.className = "title";

      title.innerText = event.event_name;

      const community = document.createElement("h5");
      community.className = "community";
      community.innerText = event.community_name;

      const eventDate = event.date;

      let date1 = '';
      let time = '';
      
      if (eventDate && typeof eventDate === 'string') {
        [date1, time] = eventDate.split(',');
      
        if (date1.includes('T')) {
          date1 = date1.split('T')[0]; 
        }
      }
      
      date1 = typeof date1 === 'string' ? date1.trim() : '';
      
      const dateDiv = document.createElement("div");
      const date = document.createElement("h4");
      date.className = "date";
      date.innerText = date1; 
      
      dateDiv.appendChild(date);
      

      titleDiv.appendChild(title);
      titleDiv.appendChild(community);

      dateDiv.appendChild(date);

      detailsDiv.appendChild(titleDiv);
      detailsDiv.appendChild(dateDiv);
      eventDiv.appendChild(detailsDiv);

      elements[index] = [];

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

//ongoing button - homepage

async function ongoing() {
  await geteventsdata();
  renderEvents(firstfiveevents);

  const temp1 = document.getElementById("ongoing-btn");
  temp1.className = "evb-active";
  const temp = document.getElementById("upcoming-btn");
  temp.className = "evb";
}

//upcoming button - homepage

async function upcoming() {
  await getreveventsdata();
  renderEvents(lastfiveevents);
  const temp = document.getElementById("upcoming-btn");
  temp.className = "evb-active";
  const temp1 = document.getElementById("ongoing-btn");
  temp1.className = "evb";
}

//communities-homepage

async function fetchcommunitiesdata() {
  try {
    const response = await fetch("data/data.json");
    const jsonData = await response.json();
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    for (let q = 0; q < numberofcommunities; q++) {
      const community = jsonData[q];

      const elements = document.querySelector(".communitieslist");
      const indicommunity = document.createElement("div");
      indicommunity.className = "indicommunity";

      const indiimage = document.createElement("div");
      indiimage.className = "indiimage";
      indiimage.style.backgroundImage = `url(${community.image})`;

      const atag = document.createElement("a");
      atag.href = `${community.name}` + ".html";

      const communitiestext = document.createElement("div");
      communitiestext.className = "communitiestext";

      const communitiestext1 = document.createElement("div");
      communitiestext1.className = "communitiestext1";
      communitiestext1.innerHTML = `${community.name}`;

      const communitiestext2 = document.createElement("div");
      communitiestext2.className = "communitiestext2";
      communitiestext2.innerHTML = "Members: " + `${community.members}`;

      const communitiestext3 = document.createElement("div");
      communitiestext3.className = "communitiestext3";
      communitiestext3.innerHTML = `${community.tagline}`;

      communitiestext.appendChild(communitiestext1);
      communitiestext.appendChild(communitiestext2);
      communitiestext.appendChild(communitiestext3);

      atag.appendChild(indiimage);
      atag.appendChild(communitiestext);
      indicommunity.appendChild(atag);
      elements.appendChild(indicommunity);
    }
  } catch (error) {
    console.log(error, "in fetching files");
  }
}

//stars of the week-homepage

async function fetchstarsoftheweek() {
  try {
    const response = await fetch("data/starsoftheweek.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const jsonData = await response.json();
    const star_names = jsonData.ngo_name;

    for (let q = 0; q < star_names.length; q++) {
      const star_name = star_names[q];

      const star_div = document.createElement("div");
      star_div.classList.add("starsoftheweek-item");

      const star_div_atag = document.createElement("a");
      star_div_atag.href = star_name.link;

      const star_div_image = document.createElement("img");
      star_div_image.src = star_name.image;

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
    }
  } catch (error) {
    console.log(error, "in loading data");
  }
}

//Individual Ngo page

async function fetchngopage() {
  try {
    const response = await fetch("data/data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const jsonData = await response.json();
    for (i = 0; i < jsonData.length; i++) {
      if (jsonData[i].name === document.getElementById("ngo_name").innerText) {
        console.log(jsonData[i].name);
        const bgimg = document.getElementById("bgimg");
        bgimg.src = jsonData[i].bgimage;

        const logo = document.getElementById("ngo_logo");
        logo.src = jsonData[i].logo;

        const enrolled = document.getElementById("volun");
        volun.innerText = jsonData[i].enrolled;

        const ratings = document.getElementById("rating_nos");
        ratings.innerHTML = `(${jsonData[i].ratings} reviews)`;

        const aboutus = document.getElementById("aboutus");
        aboutus.innerText = jsonData[i].about_us;

        const joinus = document.getElementById("join_us");
        joinus.innerText = jsonData[i].why_join_us;

        for (j = 0; j < jsonData[i].gallery.length; j++) {
          document.getElementById(`img${j + 1}`).src = jsonData[i].gallery[j];
        }
      }
    }
  } catch (error) {
    console.log(error, "in loading data");
  }
}

fetchngopage();


//countdown for events

function updateCountdown() {
  const eventDate = new Date("2025-02-18T00:00:00").getTime();
  const now = new Date().getTime();
  const timeLeft = eventDate - now;

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  // Check if all days,hours,minutes and seconds div exist
  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    console.warn("Countdown elements are missing in the DOM.");
    return;
  }


  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
  document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
}


 // load individual events page

 async function fetcheventpage() {
  try {
    const response = await fetch("data/data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const jsonData = await response.json();
    for (i = 0; i < jsonData.length; i++) {
      let b=0;
      for(j=0;j<jsonData[i].events.length;j++)
      {

        console.log("jsonData[i].events[j] : "+ jsonData[i].events[j]);

        if(jsonData[i].events[j].event_name === document.getElementById("eventname-head").innerText)
        {
          const elem = document.getElementById("event_pic");
          elem.src = `${jsonData[i].events[j].bg_image}`

          const countdown = document.createElement("div");
          countdown.className="countdown";

          const h2 = document.createElement("h2");
          h2.innerText = "Starts In";

          const timer = document.createElement("div");
          timer.className = "timer";
          
          const div1 = document.createElement("div");
          const span1 = document.createElement("span");
          span1.id = "days";
          const span12 = document.createElement("span");
          span12.innerText="DAYS";
          span1.innerText="00";

          const br4 = document.createElement("br");
          const br1 = document.createElement("br");
          const br2 = document.createElement("br");
          const br3 = document.createElement("br");

          div1.appendChild(span1);
          div1.appendChild(br1);
          div1.appendChild(span12);

          const div2 = document.createElement("div");
          const span2 = document.createElement("span");
          span2.id = "hours";
          const span21 = document.createElement("span");
          span21.innerText="HOURS";
          span2.innerText="00";

          div2.appendChild(span2);
          div2.appendChild(br2);
          div2.appendChild(span21);

          const div3 = document.createElement("div");
          const span3 = document.createElement("span");
          span3.id = "minutes";
          const span31 = document.createElement("span");
          span31.innerText="MINUTES";
          span3.innerText="00";
          

          div3.appendChild(span3);
          div3.appendChild(br3);
          div3.appendChild(span31);

          const div4 = document.createElement("div");
          const span4 = document.createElement("span");
          span4.id = "seconds";
          const span41 = document.createElement("span");
          span41.innerText="SECONDS";
          span4.innerText="00";

          div4.appendChild(span4);
          div4.appendChild(br4);
          div4.appendChild(span41);

          timer.appendChild(div1);
          timer.appendChild(div2);
          timer.appendChild(div3);
          timer.appendChild(div4);

          const volunteerbtn = document.createElement("a");
          volunteerbtn.href = `volunteer.html` ;
          volunteerbtn.className = "volunteer-btn";
          volunteerbtn.innerText = "VOLUNTEER";

          countdown.appendChild(h2);
          countdown.appendChild(timer);
          countdown.appendChild(volunteerbtn);

          const event_page = document.getElementById("countdown");
          // event_page.appendChild(countdown);
       
          event_page.insertBefore(countdown, event_page[0]);



          for(let e =0;e<jsonData[i].events[j].features.length;e++)
          {
            const feature = document.createElement("div");
            feature.className = "feature";

            const img = document.createElement("img");            
            img.src = jsonData[i].events[j].features_img[e];

            const h3 = document.createElement("h3");
            h3.innerText = jsonData[i].events[j].features_title[e];

            const p = document.createElement("p");
            p.innerText = jsonData[i].events[j].features[e];

            const elems = document.getElementById("features");
            feature.appendChild(img);
            feature.appendChild(h3);
            feature.appendChild(p);

            elems.append(feature);

          }
          b++;
        }
      }
      if(b>0)break; 
    }
  } catch (error) {
    console.log(error, "in loading data");
  }
}

fetcheventpage();

async function createevent(event)
{

}

// Login -> Signup

function changetologin() {
  const login = document.querySelector(".login-container");
  login.style.removeProperty("display");
  const signup = document.querySelector(".Signup-container");
  signup.style.display = "none";
}

function changetosignup() {
  const login = document.querySelector(".login-container");
  login.style.display = "none";
  const signup = document.querySelector(".Signup-container");
  signup.style.removeProperty("display");
}

const signup = document.querySelector(".Signup-container");
signup.style.display = "none";



// Suscribe Now pop up

document.addEventListener("DOMContentLoaded", function () {
  const subscribeButton = document.querySelector(".subscribenow button");
  const emailInput = document.querySelector(
    ".subscribenow input[type='email']"
  );

  subscribeButton.addEventListener("click", function (event) {
    const email = emailInput.value.trim(); //trim - to remove white spaces from ends
    const validDomains = [
      "@gmail.com",
      "@yahoo.in",
      "@outlook.in",
      "@bmu.edu.in",
    ];
    const isValidEmail = validDomains.some((domain) => email.endsWith(domain));

    if (email && isValidEmail) {
      showCustomAlert("Thank you for subscribing!! Email: " + email);
      emailInput.value = "";
    } else {
      showCustomAlert("Please enter a valid email address.");
    }
  });
});


//subscribeNow - alert 

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

  closeButton.addEventListener("click", function () {
    document.body.removeChild(overlay);
  });

  alertBox.appendChild(title);
  alertBox.appendChild(messageText);
  alertBox.appendChild(closeButton);

  overlay.appendChild(alertBox);
  document.body.appendChild(overlay);
}

//Listing for communities
function getcommunitieslist(a) {
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

// listing for events
function geteventslist(a, b, c) {
  for (let i = 1; i <= 2; i++) {
    let currOption = document.querySelector(`#option${i}`);
    if (i === c) {
      currOption.className = "tabactive";
      // pagechange(1);
      geteventsoptions(a, b);
    } else {
      currOption.className = "tab";
    }
  }
}

//Page changer for both events and communities

function pagechange(a) {
  for (let i = 1; i <= 2; i++) {
    let currOption = document.querySelector(`#page${i}`);
    if (i === a) {
      currOption.className = "activepage";
      if (a === 1) {
        getcommunityoptions("NGOS");
        if (
          document.querySelector(".tabactive").innerText === "Ongoing Events"
        ) {
          geteventsoptions(0, 9);
          //start and end index

        } else {
          geteventsoptions(3, 7);
           //start and end index
        }
      } else {
        getcommunityoptions("TRUSTS");
        if (
          document.querySelector(".tabactive").innerText === "Upcoming Events"
        ) {
          geteventsoptions(9, 0);
           //start and end index

        } else {
          geteventsoptions(8, 2);
           //start and end index
        }
      }
    } else {
      currOption.className = "page";
    }
  }
}

//get communities

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
        carddiv.className = "card";

        const eventimg = document.createElement("img");
        eventimg.src = jsonData[i].image;
        eventimg.alt = "Event Image";

        const cardcontent = document.createElement("div");
        cardcontent.className = "card-content";

        const h3 = document.createElement("h3");
        h3.innerHTML = jsonData[i].name;

        const p = document.createElement("p");
        p.className = "location";
        p.innerHTML = jsonData[i].address;

        const volunteercount = document.createElement("div");
        volunteercount.className = "volunteer-count";

        const itag = document.createElement("i");
        itag.innerHTML = jsonData[i].enrolled;

        const cardfooter = document.createElement("div");
        cardfooter.className = "card-footer";

        const anchor1 = document.createElement("a");
        anchor1.href = "volunteer.html";

        const anchor2 = document.createElement("a");
        anchor2.href = `${jsonData[i].name}.html`;

        const button1 = document.createElement("button");
        button1.className = "volunteer";
        button1.innerHTML = "Volunteer";

        const button2 = document.createElement("button");
        button2.className = "more-info";
        button2.innerHTML = "More info";

        volunteercount.appendChild(itag);
        cardfooter.appendChild(anchor1);
        cardfooter.appendChild(anchor2);
        anchor1.appendChild(button1);

        anchor2.appendChild(button2);

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

//Filter Dropdown

function toggleDropdown() {
  document.getElementById("filterDropdown").classList.toggle("show");
}



//Get events for events pageasync function 
async function geteventsoptions(a, b) {
  try {
    const response = await fetch("http://localhost:4000/api/v1/getEvents");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const jsonData = await response.json();
    const events = jsonData.event;
    const eventsgrid = document.querySelector(".events-grid1");
    eventsgrid.innerHTML = "";

    for (let i = a; i <= b; i++) {
      if (!events[i]) continue;

      const event = events[i];

      const carddiv = document.createElement("div");
      const eventimg = document.createElement("img");
      const cardcontent = document.createElement("div");
      const h3 = document.createElement("h3");
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      const p3 = document.createElement("p");
      const volunteercount = document.createElement("div");
      const itag = document.createElement("i");
      const cardfooter = document.createElement("div");
      const anchor1 = document.createElement("a");
      const anchor2 = document.createElement("a");
      const button1 = document.createElement("button");
      const button2 = document.createElement("button");

      carddiv.className = "cards";
      eventimg.src = event.image;
      eventimg.alt = "Event Image";
      cardcontent.className = "card-content";
      h3.innerHTML = event.event_name;
      p1.innerHTML = event.community_name;
      p2.innerHTML = event.place;
      p3.innerHTML = new Date(event.eventdate).toLocaleDateString();
      p2.className = "location";
      p3.className = "location";
      volunteercount.className = "volunteer-count";
      itag.innerHTML = `${event.no_of_volunteers_registered} volunteers enrolled`;
      cardfooter.className = "card-footer";
      anchor1.href = "volunteer.html";
      anchor1.appendChild(button1);
      button1.className = "volunteer";
      button1.innerHTML = "Volunteer";
      anchor2.href = `${event.event_name}.html`;
      anchor2.appendChild(button2);
      button2.className = "more-info";
      button2.innerHTML = "Explore";

      volunteercount.appendChild(itag);
      cardcontent.appendChild(h3);
      cardcontent.appendChild(p1);
      cardcontent.appendChild(p2);
      cardcontent.appendChild(p3);
      cardcontent.appendChild(volunteercount);
      cardfooter.appendChild(anchor1);
      cardfooter.appendChild(anchor2);
      cardcontent.appendChild(cardfooter);
      carddiv.appendChild(eventimg);
      carddiv.appendChild(cardcontent);
      eventsgrid.appendChild(carddiv);
    }

    for (let i = a; i >= b; i--) {
      if (!events[i]) continue;

      const event = events[i];

      const carddiv = document.createElement("div");
      const eventimg = document.createElement("img");
      const cardcontent = document.createElement("div");
      const h3 = document.createElement("h3");
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      const p3 = document.createElement("p");
      const volunteercount = document.createElement("div");
      const itag = document.createElement("i");
      const cardfooter = document.createElement("div");
      const anchor1 = document.createElement("a");
      const anchor2 = document.createElement("a");
      const button1 = document.createElement("button");
      const button2 = document.createElement("button");

      carddiv.className = "cards";
      eventimg.src = event.image;
      eventimg.alt = "Event Image";
      cardcontent.className = "card-content";
      h3.innerHTML = event.event_name;
      p1.innerHTML = event.community_name;
      p2.innerHTML = event.place;
      p3.innerHTML = new Date(event.eventdate).toLocaleDateString();
      p2.className = "location";
      p3.className = "location";
      volunteercount.className = "volunteer-count";
      itag.innerHTML = `${event.no_of_volunteers_registered} volunteers enrolled`;
      cardfooter.className = "card-footer";
      anchor1.href = "volunteer.html";
      anchor1.appendChild(button1);
      button1.className = "volunteer";
      button1.innerHTML = "Volunteer";
      anchor2.href = `${event.event_name}.html`;
      anchor2.appendChild(button2);
      button2.className = "more-info";
      button2.innerHTML = "Explore";

      volunteercount.appendChild(itag);
      cardcontent.appendChild(h3);
      cardcontent.appendChild(p1);
      cardcontent.appendChild(p2);
      cardcontent.appendChild(p3);
      cardcontent.appendChild(volunteercount);
      cardfooter.appendChild(anchor1);
      cardfooter.appendChild(anchor2);
      cardcontent.appendChild(cardfooter);
      carddiv.appendChild(eventimg);
      carddiv.appendChild(cardcontent);
      eventsgrid.appendChild(carddiv);
    }
  } catch (error) {
    console.log(error, "in loading data");
  }
}