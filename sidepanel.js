let entities = [];

// Function to simulate API call
const dummyApiCall = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ html: "<p>This is your summarized content.</p>" })
    }, 2000) // Simulating 2 seconds API response time
  })
}

// real API call
const fetchData = async (text) => {
  const sampleText =
    "AUSTIN, Texas (AP) — Republican Texas Attorney General Ken Paxton was fully acquitted Saturday of corruption charges following a historic impeachment trial, a resounding verdict that reaffirms the power of the GOP’s hard right and puts an indicted incumbent who remains under FBI investigation back into office.The outcome demonstrated Paxton’s enduring durability in America’s biggest red state after years of criminal charges and scandal. It also delivered a signature victory for the Texas GOP’s ascendent conservative wing following a dramatic trial that put on display the fractures among Republicans nationally heading into 2024.More than three months after an overwhelming impeachment in the Texas House, which is controlled by Republicans, Paxton was just as convincingly acquitted by Senate Republicans who serve alongside his wife, state Sen. Angela Paxton."

  const apiUrl =
    "https://api.fixie.ai/api/v1/agents/csdiehl/fixie-sidekick-template/conversations"

  const data = {
    message: {
      text: sampleText,
    },
  }

  const headers = {
    "Authorization":
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmaXhpZS5haS9wcm9kIiwiYXVkIjoiaHR0cHM6Ly9maXhpZS5haSIsInN1YiI6IjYyIn0.0yz4Okfj534haGKC3u0Ibp6_XJYuPsfw-rnCDbgixQM",
    "Content-Type": "application/json",
  }

  console.log("fetching fixie data")

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const text = await response.text()
    
    const lastLine = text.split("\n").at(-2)
    const messages = JSON.parse(lastLine)
      .turns[1].messages.map((d) => d.args)
      .filter((d) => d !== undefined)

    return messages
  } catch (error) {
    console.error("Error:", error)
  }
}

document.getElementById("summarize").addEventListener("click", () => {
  const loading = document.getElementById("loading")
  const progressBar = document.getElementById("progressBar")
  const completion = document.getElementById("completion")

  console.log("button clicked")

  // Initially hide loading and completion elements
  loading.style.display = "none"
  completion.style.display = "none"

  // Show loading elements
  loading.style.display = "block"

  let progress = 0
  const interval = setInterval(() => {
    progress += 10
    progressBar.value = progress

    if (progress >= 100) {
      clearInterval(interval)
      loading.style.display = "none"
    }
  }, 200) // Adjust the interval time if needed

  // Make the dummy API call
  fetchData().then((response) => {
    clearInterval(interval) // Clear the interval
    progressBar.value = 100
    // loading.style.display = "none"
    // completion.style.display = "block"
    // completion.innerHTML = response.html

    console.log(response);

    entities = response;


    renderResults(response);

    // for (let entity of response) {
    //   console.log(entity)
    //   let p = document.createElement("p")
    //   document.getElementById("responses").appendChild(p)
    //   p.innerHTML = `<strong>${entity.name},</strong>${entity.title}<br/>${entity.summary}`
    // }
  })
})

// Fake data
let entitiesStatic2 = [
  {
      "name": "Ken Paxton",
      "title": "Republican Texas Attorney General",
      "summary-10y": "Ken Paxton was in a big trial because some people said he did bad things, but he was not found guilty.",
      "summary-adult": "Republican Texas Attorney General Ken Paxton was acquitted of corruption charges after a historic impeachment trial but still faces other legal issues."
  },
  {
      "name": "Angela Paxton",
      "title": "State Senator & Ken Paxton's Wife",
      "summary-10y": "Angela Paxton was at the trial supporting her husband and hugged his lawyers after the trial ended.",
      "summary-adult": "State Sen. Angela Paxton was present throughout the trial in support of her husband and celebrated his acquittal with his legal team."
  },
  {
      "name": "Greg Abbott",
      "title": "Texas Governor",
      "summary-10y": "Governor Greg Abbott said he was happy that Ken Paxton could come back to his job.",
      "summary-adult": "Texas Gov. Greg Abbott swiftly welcomed Paxton back to his position following the acquittal."
  },
  {
      "name": "Dan Patrick",
      "title": "Republican Lt. Governor of Texas",
      "summary-10y": "Dan Patrick was the boss of the trial and later said he didn't like how it started.",
      "summary-adult": "Republican Lt. Gov. Dan Patrick, who presided over the trial, criticized the impeachment process and suggested changes to the state constitution."
  },
 ]

 let entitiesStatic = [
  {
    "summary10y": "Angela Paxton, who is married to Ken Paxton, works…people who decided her husband did nothing wrong.",
    "title": "State Senator",
    "summaryExpert": "The role of Angela Paxton in the Senate Republican…potential conflicts of interest within the party.",
    "summary": "Angela Paxton, a state senator and the wife of Ken…the Senate Republicans who acquitted her husband.",
    "name": "Angela Paxton"
  }
]


 
 let summaryLevelMode = 1;

 const renderResults = async (entities) => {
  let results = document.querySelector('.results');

  results.innerHTML = '';

  let ul = document.createElement('ul');
  results.appendChild(ul);
  entities.forEach(function(entity) {
    let li = document.createElement('li');
    let nameEl = document.createElement('div');
    
    nameEl.innerHTML = entity.name;
    nameEl.className = 'name';
  
    let summaryEl = document.createElement('summary');
    summaryEl.className = 'summary';
    
    let summary = entity['summary'];
    switch(summaryLevelMode) {
      case 1:
        // Adult
        summary = entity['summary'];
        break;
      case 2:
        // Expert
        summary = entity['summaryExpert'];
        break;
      default:
        // Kid
        summary = entity['summary10y'];
    }
    summaryEl.innerHTML = summary;
  
    let textContent = document.createElement('summary');
    textContent.className = 'text-content';
    textContent.append(nameEl)
    textContent.append(summaryEl);
  
    li.append(textContent);
  
    let thumbEl = document.createElement('div');
    thumbEl.className = 'thumb';
    li.append(thumbEl);
  
    ul.append(li);
  
    let thumb = document.createElement('div');
    thumb.className = 'thumb';
  });
 }

let slider = document.getElementById('slider');
slider.addEventListener('change', (event) => {
  let sliderVal = slider.value * 1;
  switch(sliderVal) {
    case 1:
      // Adult
      summaryLevelMode = 1;
      break;
    case 2:
      // Expert
      summaryLevelMode = 2;
      break;
    default:
      // Kid
      summaryLevelMode = 0;
  }
  renderResults(entities)
});

renderResults(entities)
