// Function to simulate API call
const dummyApiCall = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ html: "<p>This is your summarized content.</p>" })
    }, 2000) // Simulating 2 seconds API response time
  })
}

// real API call
const fetchData = async () => {
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

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const responseData = await response.json()
    console.log(responseData)
  } catch (error) {
    console.error("Error:", error)
  }
}

document.getElementById("summarize").addEventListener("click", () => {
  const loading = document.getElementById("loading")
  const progressBar = document.getElementById("progressBar")
  const completion = document.getElementById("completion")

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
    loading.style.display = "none"
    completion.style.display = "block"
    completion.innerHTML = response.html
  })
})