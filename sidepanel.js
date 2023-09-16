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
  loading.style.display = 'block';

  let progress = 0;
  const progressBar = document.getElementById('progressBar');
  const completion = document.getElementById('completion');

  const interval = setInterval(() => {
    progress += 10;
    progressBar.value = progress;

    if (progress >= 100) {
      clearInterval(interval);
      loading.style.display = 'none';
    }
  }, 1000);

  // Make the dummy API call
  dummyApiCall().then(response => {
    if (progress < 100) {
      progressBar.value = 100;
      loading.style.display = 'none';
    }
    completion.style.display = 'block';
    completion.innerHTML = response.html;
  });
});
