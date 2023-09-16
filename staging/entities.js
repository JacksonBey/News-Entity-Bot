let entities2 = [
  {
     "name": "Austin, Texas",
     "kind": "city",
     "country": "USA",
     "summary-10y": "Austin is where the trial of a big Texas leader happened.",
     "summary-adult": "Austin, Texas is the city where Republican Texas Attorney General Ken Paxton faced his impeachment trial."
  },
  {
     "name": "Texas Capitol",
     "kind": "building",
     "country": "USA",
     "summary-10y": "It's a big building where they decided if someone did something wrong.",
     "summary-adult": "The Texas Capitol is the venue where the impeachment trial for Texas Attorney General Ken Paxton took place."
  }
]

let entities = [
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

let kidMode = false;
let content = document.querySelector('.content');

function renderResults() {
  content.innerHTML = '';

  let ul = document.createElement('ul');
  content.appendChild(ul);
  entities.forEach(function(entity) {
    let li = document.createElement('li');
    let nameEl = document.createElement('div');
    
    nameEl.innerHTML = entity.name;
    nameEl.className = 'name';
  
    let summaryEl = document.createElement('summary');
    summaryEl.className = 'summary';
    
    summaryEl.innerHTML = entity['summary-10y'];
    if (!kidMode) {
      summaryEl.innerHTML = entity['summary-adult'];
    }
    
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

let toggle = document.getElementById('toggle');
toggle.addEventListener('click', (event) => {
  kidMode = !kidMode;
  renderResults()
});

renderResults()