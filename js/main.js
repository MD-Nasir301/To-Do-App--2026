window.addEventListener("DOMContentLoaded", () => {
  //********** */

  const timeEl = getDomByID("time-value");
  const dateEl = getDomByID("date-value");
  const darkBtn = getDomByID("flexSwitchCheckChecked");






  // Dark Mode Toggle
  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Set Date & Time
  setInterval(() => {
    timeEl.textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      //second: "2-digit",
      hour12: true,
    });

    dateEl.textContent = new Date().toLocaleDateString("en-UK", {
      year: "numeric",
      day: "numeric",
      month: "numeric",
    });
  }, 1000);

  // All Functions
  function getDomByID(id) {
    return document.getElementById(id);
  }

  //********* */
});
