fetch("ok.json")
.then(response => response.json()
.then(dataObj=> {

    const a = document.createElement("p");
    const b = document.createElement("p");
    const c = document.createElement("p");
    a.innerText=dataObj.model;
    b.innerText=dataObj.brand;
    c.innerText=dataObj.screen_size;
    const body = document.querySelector("body");
    body.appendChild(a);
    body.appendChild(b);
    body.appendChild(c);

})
)