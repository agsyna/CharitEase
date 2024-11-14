

async function okaygets()
{

    const response = await fetch("test.json");
    // console.log(response);

    const jsonData = await response.json();
    console.log(jsonData);

    const div1 = document.createElement("div");
    div1.style.backgroundColor="green";
    div1.style.height="220px";
    div1.style.width="220px";
    div1.style.marginTop="220px";
    div1.innerText = jsonData.name;

    const div2 = document.createElement("div");
    div2.style.backgroundColor="green";
    div2.style.height="220px";
    div2.style.width="220px";
    div2.style.marginTop="620px";
    div2.innerText = jsonData.age;

    const div3 = document.createElement("div");
    div3.style.backgroundColor="green";
    div3.style.height="220px";
    div3.style.width="220px";
    div3.style.marginTop="1020px";
    div3.innerText = jsonData.gender;


    const elem = document.getElementById("oks");
    elem.appendChild(div1);
    elem.appendChild(div2);
    elem.appendChild(div3);










}

okaygets();