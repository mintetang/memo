document.addEventListener("DOMContentLoaded", function () {
  showMemo();
});

function pushAb() {
  const inputA = document.getElementById("inputA").value;
  const inputB = document.getElementById("inputB").value;
  const inputC = document.getElementById("inputC").value;
  //console.log(inputA,inputB,inputC);

  memoObj = { classA: inputA, classB: inputB, valC: inputC };
  //console.log(attObj);
  let memoArray = JSON.parse(localStorage.getItem("memoArr"));
  //console.log(attArray);
  if (memoArray === null) {
    memoArray = [];
    memoArray.push(memoObj);
  } else {
    memoArray.push(memoObj);
  }
  memoArray.sort((a, b) => a.classA.localeCompare(b.classA));
  //save attendance history to localStorage attHis
  console.log(memoArray);

  //group by same key value

  const groupArray = memoArray.reduce((acc, currentItem) => {
    const { classA, classB, ...rest } = currentItem; // Destructure to get category and other properties

    // Find if the category already exists in the accumulator
    let existingCategory = acc.find(
      (item) => item.classA === classA && item.classB === classB
    );

    if (!existingCategory) {
      // If category doesn't exist, create a new entry
      existingCategory = { classA, classB, value: [] };
      acc.push(existingCategory);
    }

    // Add the current item (without the category key) to the items array of the found/new category
    existingCategory.value.push(rest.valC);

    return acc;
  }, []);

  console.log(groupArray);

  //old spared method
  //console.log(collect(memoArray));

  localStorage.setItem("memoArr", JSON.stringify(memoArray));
  localStorage.setItem("groupArr", JSON.stringify(groupArray));
  showMemo();
}

function showreadForm() {
  document.getElementById("readPopup").style.display = "block";
}

function getFormattedDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  //const seconds = String(now.getSeconds()).padStart(2, '0');

  // Example format: YYYY-MM-DD_HH-MM-SS
  return `${year}-${month}-${day}-${hours}-${minutes}`;
}

function exportLocalStorage() {
  // 1. Get all localStorage data
  const localStorageData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    localStorageData[key] = localStorage.getItem(key);
  }

  // 2. Convert to a JSON string
  const jsonString = JSON.stringify(localStorageData, null, 4);

  // 3. Create a Blob and URL
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // 4. Create and click a download link
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  const dateTimeString = getFormattedDateTime();
  console.log(dateTimeString);
  const filename = `memo_${dateTimeString}.json`;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  //alert('Your localStorage data has been exported to data.json');
}

function rlsFromFile(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      localStorage.clear(); // Clear existing localStorage before restoring
      for (const key in data) {
        localStorage.setItem(key, data[key]);
      }
      console.log("localStorage restored successfully!");
      alert("成功讀回紀錄!");
      location.reload();
    } catch (error) {
      console.error("Error parsing or restoring localStorage:", error);
    }
  };
  reader.readAsText(file);
  closePopup();
}

function closePopup() {
  // Close the currently open popup
  document.getElementById("readPopup").style.display = "none";
}

function cleanCurrent() {
  const reCheck = prompt('are U sure? type "YES" to confirm!');
  if (reCheck === "YES") {
    localStorage.clear();
    location.reload();
  } else {
    alert("Cancelled!");
  }
}

/*function searchRoll() {
    const kword1 = document.getElementById("kword").value;
    //const kword2 = document.getElementById("aSelector").value;
    //console.log(kword1,kword2);
    // Define your attribute name and value as variables
    let targetElement = null;
    const allParagraphs = document.querySelectorAll('p');
    for (const p of allParagraphs) {
        if (p.textContent.includes(String(kword1))) {
            targetElement = p;
            break;
        }
    }
    if (targetElement) {
    targetElement.scrollIntoView({
        behavior: "smooth", // Optional: for smooth scrolling animation
        block: "start"      // Optional: align the top of the element with the top of the viewport
        });
    }
}*/

function searchAndHighlight() {
  const searchTerm = document.getElementById("searchTermInput").value;
  const contentDiv = document.getElementById("resultSection");

  // Remove previous highlights
  contentDiv.innerHTML = contentDiv.innerHTML.replace(
    /<mark class="highlight">(.*?)<\/mark>/gi,
    "$1"
  );

  if (searchTerm) {
    const regex = new RegExp(searchTerm, "gi");
    contentDiv.innerHTML = contentDiv.innerHTML.replace(
      regex,
      `<mark class="highlight">${searchTerm}</mark>`
    );

    const firstHighlight = document.querySelector(".highlight");
    if (firstHighlight) {
      firstHighlight.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

function clearInput() {
  document.getElementById("inputA").value = null;
  document.getElementById("inputB").value = null;
  document.getElementById("inputC").value = null;
}

function toInputHome() {
  document.getElementById("inputA").value = null;
  document.getElementById("inputA").value =
    document.querySelector('[value="home"]').innerText;
}

function toInputRecent() {
  document.getElementById("inputA").value = null;
  document.getElementById("inputA").value =
    document.querySelector('[value="recent"]').innerText;
}

function toInputBusiness() {
  document.getElementById("inputA").value = null;
  document.getElementById("inputA").value =
    document.querySelector('[value="business"]').innerText;
}

function toInputChurch() {
  document.getElementById("inputA").value = null;
  document.getElementById("inputA").value =
    document.querySelector('[value="church"]').innerText;
}

function toInputTravel() {
  document.getElementById("inputA").value = null;
  document.getElementById("inputA").value =
    document.querySelector('[value="travel"]').innerText;
}

function toInputWord() {
  document.getElementById("inputA").value = null;
  document.getElementById("inputA").value =
    document.querySelector('[value="word"]').innerText;
}

function generateObjectReport(data) {
  // Step 1: Group the objects by 'category'
  const groupByKey = (arr, key) => {
    return arr.reduce((result, currentValue) => {
      // Get the category of the current object
      const groupKey = currentValue[key];
      // If the group doesn't exist, create it
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      // Add the current object to the correct group
      result[groupKey].push(currentValue);
      return result;
    }, {});
  };
  // Step 2: Generate the cascading report
  const generateObjectReport = (data) => {
    let groupedData = groupByKey(data, "classA");

    let selectedOne = document.getElementById("aSelector").value;
    if (selectedOne !== "all") {
      const keysToKeep = [selectedOne]; // Keys you want to include
      groupedData = Object.keys(groupedData)
        .filter((key) => keysToKeep.includes(key)) // Filter keys based on your criteria
        .reduce((acc, key) => {
          acc[key] = groupedData[key]; // Add the key-value pair to the new object
          return acc;
        }, {});
      console.log(groupedData);
    }

    // Step 3: Format the report in a cascading style
    let report = "";
    for (const classA in groupedData) {
      report += `${classA}:\n`;
      groupedData[classA].forEach((item) => {
        report += `  - ${item.classB} (: ${item.value})\n`;
      });
      report += "\n"; // Add space between categories
    }
    return report;
  };

  // Step 4: Output the report
  const report = generateObjectReport(data);

  //console.log(report);
  // To display in a browser:
  document.getElementById("cReport").innerText = report;
}

function showMemo() {
  // Update the result section
  /*document.getElementById('noteData').
        innerText = localStorage.getItem('groupArr');
    resultSection.style.display = 'block';*/
  groupArray = JSON.parse(localStorage.getItem("groupArr"));
  generateObjectReport(groupArray);
}

// for Google Output to drive

const CLIENT_ID =
  "273160542369-ttt03gmv0iio70vek53dqrqcfs9rt1a6.apps.googleusercontent.com";
const API_KEY = "AIzaSyDZkfoh01VUEwX_uK3xn3jVvMLssdPCqoo";
const SCOPES = "https://www.googleapis.com/auth/drive.file";
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById("authorize_button").onclick = handleAuthClick;
document.getElementById("upload_button").onclick = uploadToDrive;

// Load GAPI client
gapi.load("client", async () => {
  await gapi.client.init({ apiKey: API_KEY, discoveryDocs: [DISCOVERY_DOC] });
  gapiInited = true;
  maybeEnableButtons();
});

// Initialize Google Identity Services
window.onload = () => {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: "", // Set later
  });
  gisInited = true;
  maybeEnableButtons();
};

//make button dimmed or blink after clicked
document
  .getElementById("authorize_button")
  .addEventListener("click", function () {
    this.classList.add("dimmed");
  });
document.getElementById("upload_button").addEventListener("click", function () {
  this.classList.add("blink");
});

document.getElementById("upload_button").addEventListener("click", function () {
  this.classList.add("blink");
});

function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById("authorize_button").disabled = false;
  }
}

function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error) throw resp;
    document.getElementById("upload_button").disabled = false;
  };
  tokenClient.requestAccessToken({ prompt: "consent" });
}

//declaire fileId to set in upload and use in googleIn

async function uploadToDrive() {
  // Example: get all localStorage data
  const allData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    allData[key] = localStorage.getItem(key);
  }

  const fileContent = JSON.stringify(allData, null, 2);
  const file = new Blob([fileContent], { type: "application/json" });
  const metadata = {
    name: "memo.json",
    mimeType: "application/json",
  };

  const accessToken = gapi.client.getToken().access_token;
  const form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append("file", file);

  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
    {
      method: "POST",
      headers: new Headers({ Authorization: "Bearer " + accessToken }),
      body: form,
    }
  );

  const json = await res.json();
  document.getElementById("pfileId").innerText = json.id;
  alert("✅ 已完成上傳: File ID: " + json.id);
  return;
}

function getGoogleDriveFileIdFromUrl(url) {
  const regex = /\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  return null; // Or throw an error if the ID isn't found
}

// Example usage:

async function googleIn() {
  accessToken = gapi.client.getToken().access_token;
  console.log(accessToken);
  //  const fileUrl =
  //    "https://drive.google.com/file/d/1AmekSB_8aADD7HOxUeptsb3moZ6I75V2";
  //fileId = "1AT-8tDkBQRvP0UGlMsebDbHZcROF-d1b";
  
  if (typeof fileId !== "undefined"){
    console.log(fileId);}
    else {
  fileId = document.getElementById("pfileId").innerText;}
  
  const fetchUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  const fetchOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(fetchUrl, fetchOptions);
    if (!response.ok) {
      throw new Error(`Error fetching file: ${response.statusText}`);
    }
    const fileContent = await response.json(); // or .blob(), .json(), etc., depending on file type
    console.log("File Content:", fileContent);
    localStorage.clear(); // Clear existing localStorage before restoring
    for (const key in fileContent) {
      localStorage.setItem(key, fileContent[key]);
    }
    console.log("localStorage restored successfully!");
    alert("成功讀回紀錄!");
    location.reload();
    //return fileContent;
  } catch (error) {
    console.error("Failed to read file:", error);
    return null;
  }
}

// Assuming you have authenticated and obtained an access token
// and the gapi client library is loaded.

async function overwriteFile() {
  fileId = document.getElementById("pfileId").innerText;
  const allData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    allData[key] = localStorage.getItem(key);
  }
  const fileContent = JSON.stringify(allData, null, 2);
  const newContentBlob = new Blob([fileContent], { type: "application/json" });
  try {
    const response = await gapi.client.drive.files.update({
      fileId: fileId,
      resource: {
        //name: newFileName, // Optional: Update the file name
        mimeType: newContentBlob.type // Optional: Update the MIME type
      },
      media: {
        mimeType: newContentBlob.type,
        body: newContentBlob // The new content of the file as a Blob or File object
      }
    });

    console.log('File updated:', response.result);
    return response.result;
  } catch (error) {
    console.error('Error updating file:', error);
    throw error;
  }
}

// Example usage:
 //const existingFileId = document.getElementById("pfileId").innerText;
 //const newContent = new Blob(['This is the new content.'], { type: 'text/plain' });
// const updatedFileName = 'my_updated_file.txt';

// overwriteFile(existingFileId, newContent, updatedFileName);
