siteName = document.getElementById("siteName");
siteUrl = document.getElementById("siteUrl");
btnSubmit = document.getElementById("Submit");
search = document.getElementById("search");

if (localStorage.getItem("sitesdata") == null) {
  siteList = [];
} else {
  siteList = JSON.parse(localStorage.getItem("sitesdata"));
}

nameregex=/^[A-Za-z_]$/
urlregex=/^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]$/
console.log(nameregex.test("0m"))

function validation() {
  if (nameregex.test(siteName.value)) {
    return true;
  }else{
    return false;
  }
  
}















show();

function addSite() {
  sites = {
    name: siteName.value,
    url: siteUrl.value,
  };
  siteList.push(sites);
  localStorage.setItem("sitesdata", JSON.stringify(siteList));
  show();
  clear();
}

function show() {
  var str = "";
  for (var i = 0; i < siteList.length; i++) {
    str += `<tr>
     <td>${i + 1}</td>
     <td>${siteList[i].name}</td>
     <td> <button class="btn btn-success p-2" onclick="visited(${i})" >visit</button></td>
     <td> <button class="btn btn-warning p-2" onclick="updated(${i})" >update</button></td>
     <td> <button class="btn btn-danger p-2" onclick="deleted(${i})" >delete</button></td>
    </tr>`;
  }
  document.getElementById("tbody").innerHTML = str;
}

function clear() {
  siteName.value = "";
  siteUrl.value = "";
}

function visited(i) {
  window.open( siteList[i].url, "_blank").focus();
}

function deleted(i) {
  siteList.splice(i, 1);
  localStorage.setItem("sitesdata", JSON.stringify(siteList));
  show();
}

function updated(i) {
  siteName.value = siteList[i].name;
  siteUrl.value = siteList[i].url;
  btnSubmit.innerHTML = "Update";
  btnSubmit.className = "btn btn-warning my-3 p-2 px-4";

  btnSubmit.onclick = function () {
    siteList[i].name = siteName.value;
    siteList[i].url = siteUrl.value;
    btnSubmit.innerHTML = "submit";
    btnSubmit.className = "btn btn-info my-3 p-2 px-4";
    localStorage.setItem("sitesdata", JSON.stringify(siteList));
    show();
    btnSubmit.onclick = addSite;
    clear();
  };
}

function searchf() {
  var str = "";
  for (var i = 0; i < siteList.length; i++) {
    if (siteList[i].name.toLowerCase().includes(search.value.toLowerCase())) {
      str += `<tr>
       <td>${i + 1}</td>
       <td>${siteList[i].name.replace(search.value,`<span style='background-color:yellow;'>${search.value}</span>`)}</td>
       <td> <button class="btn btn-success p-2" onclick="visited(${i})" >visit</button></td>
       <td> <button class="btn btn-warning p-2" onclick="updated(${i})" >update</button></td>
       <td> <button class="btn btn-danger p-2" onclick="deleted(${i})" >delete</button></td>
      </tr>`;
    }
  }
  document.getElementById("tbody").innerHTML = str;
}
