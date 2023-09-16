document.addEventListener("DOMContentLoaded", function() {
  const slider = document.getElementById("slider");
  const button = document.getElementById("summarize");
  const loading = document.getElementById("loading");
  const progress = document.getElementById("progress");
  const complete = document.getElementById("complete");

  button.addEventListener("click", function() {
    loading.style.display = "block";
    let val = 0;

    const interval = setInterval(function() {
      val += 10;
      progress.value = val;

      if (val >= 100) {
        clearInterval(interval);
        loading.style.display = "none";
        complete.style.display = "block";
      }
    }, 1000);
  });
});
