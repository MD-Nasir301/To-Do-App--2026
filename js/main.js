window.addEventListener("DOMContentLoaded", () => {
  //********** */

  const timeEl = getDomByID("time-value");
  const dateEl = getDomByID("date-value");

  // Set Date

  setInterval(() => {
    timeEl.textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      //second: "2-digit",
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
