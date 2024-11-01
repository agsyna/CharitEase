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

async function geteventsdata() {
  firstfourevents = [];
  for (let i = 0; i < 4; i++) {
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
  await fetchcommunitiesdata();

}

consolecheck();

async function getreveventsdata() {
  lastfourevents = [];
  let j = 0;
  for (let i = 4; i > 0; i--) {
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

  console.log(elements.length);
  console.log(eventsarr.length);
  console.log(elements.length);

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

      console.log(elements[index]);
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
        .setAttribute("href", `${event.community_name}.html`);
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
    console.log(jsonData.name);
    console.log(jsonData.image);
    console.log(jsonData.members);
    console.log(jsonData.tagline);

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
          communitiestext.style.paddingLeft = "8px";

          const communitiestext1 = document.createElement("div");

          communitiestext1.style.paddingTop = "10px";
          communitiestext1.style.fontWeight = "800";
          communitiestext1.style.fontSize = "20px";
          communitiestext1.innerHTML = `${jsonData.name}`;

          const communitiestext2 = document.createElement("div");
          communitiestext2.style.fontWeight = "700";
          communitiestext2.style.fontSize = "14px";
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



async function fetchstarsoftheweek()
{

    // const star_name=[];
    try{
        const response = await fetch("data/starsoftheweek.json");
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
          }
      
        const jsonData = await response.json();
        const star_names= jsonData.ngo_name;
        star_names.forEach((star_name,index)  =>{


            console.log("Star Name: " + star_name.community_name);

            const star_div = document.createElement("div");
            star_div.classList.add('starsoftheweek-item');


            const star_div_atag = document.createElement("a");
            star_div_atag.href = star_name.link;

 

            const star_div_image = document.createElement("img");
            star_div_image.src= star_name.image;

            const star_title = document.createElement("h3");
            star_title.textContent = star_name.community_name;
            star_div_atag.appendChild(star_title);


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
