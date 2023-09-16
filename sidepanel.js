document.getElementById('summarize').addEventListener('click', () => {
  const loading = document.getElementById('loading');
  loading.style.display = 'block';

  let progress = 0;
  const progressBar = document.getElementById('progressBar');

  const interval = setInterval(() => {
    progress += 10;
    progressBar.value = progress;

    if (progress >= 100) {
      clearInterval(interval);
      loading.style.display = 'none';
      document.getElementById('completion').style.display = 'block';
    }
  }, 1000);
});
