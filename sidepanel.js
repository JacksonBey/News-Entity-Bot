// Function to simulate API call
const dummyApiCall = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({html: '<p>This is your summarized content.</p>'});
    }, 2000); // Simulating 2 seconds API response time
  });
};

document.getElementById('summarize').addEventListener('click', () => {
  const loading = document.getElementById('loading');
  const progressBar = document.getElementById('progressBar');
  const completion = document.getElementById('completion');

  // Initially hide loading and completion elements
  loading.style.display = 'none';
  completion.style.display = 'none';
  
  // Show loading elements
  loading.style.display = 'block';

  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    progressBar.value = progress;

    if (progress >= 100) {
      clearInterval(interval);
      loading.style.display = 'none';
    }
  }, 200); // Adjust the interval time if needed

  // Make the dummy API call
  dummyApiCall().then(response => {
    clearInterval(interval); // Clear the interval
    progressBar.value = 100;
    loading.style.display = 'none';
    completion.style.display = 'block';
    completion.innerHTML = response.html;
  });
});
