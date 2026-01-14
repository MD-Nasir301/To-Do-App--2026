window.addEventListener("DOMContentLoaded", () => {
  //********** */
  let getDomByID = (id) => document.getElementById(id);

  const timeEl = getDomByID("time-value");
  const dateEl = getDomByID("date-value");
  const darkBtn = getDomByID("flexSwitchCheckChecked");
  const taskDisplayItem = getDomByID("task-text-area");
  const taskAddBtn = getDomByID("add");
  const taskInput = getDomByID("task-input");
  const taskDisplayArea = getDomByID("task-display-area");
  const doneBtn = getDomByID("done");

  // Primary source of truth for all tasks
  let tasksStore = [
    {
      id: 1,
      date: "01-01-2026",
      time: "10:00 AM",
      title: "Task 1",
    },
  ];

  function tasksGroup() {
    // All Tasks Grouping  By Date
    let tasksGroup = tasksStore.reduce((acc, obj) => {
      let { date, time, title } = obj;
      let key = date;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push({ time, title });
      return acc;
    }, {});
    // Grouped Tasks Convert into Array
    let tasksByDate = Object.entries(tasksGroup).map(([date, task]) => {
      return { [date]: task };
    });

    return tasksByDate;
  }

  function renderUI() {
    let tasksByDate = tasksGroup();
    let ul = tasksByDate
      .map((obj) => {
        let date = Object.keys(obj)[0];
        let li = obj[date]
          .map((obj) => {
            return `
        <li class="single-task-wrapper mb-2">
          <div class="container">
            <div class="row">
              <div class="col-9 col-sm-10 p-0">
                <div
                  class="task-text-area d-flex ps-2 justify-content-between"
                  id="task-text-area"
                >
                  <span class="task-item-display">${obj.title}</span>
                  <span class="task-time">${obj.time}</span>
                </div>
              </div>
              <div
                class="col-3 col-sm-2 task-btn-area d-flex justify-content-center"
              >
                <button title="Done" id="done" class="done btn">
                  ☑️
                </button>
                <button title="Delete" class="delete btn">❌</button>
              </div>
            </div>
          </div>
        </li>
      `;
          })
          .join("");
        return `
      <ul id="task-list-group" class="task-display-area mt-3 list-unstyled">
         <time class="Task-group-date ms-2 tex px-2" datetime="">${date}</time>
        ${li}
       </ul>
     `;
      })
      .join("");

    taskDisplayArea.innerHTML = ul;
  }

  // Handles task creation and updates the primary tasks store
  taskAddBtn.addEventListener("click", () => {
    let taskText = taskInput.value;
    let taskTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    let taskDate = new Date().toLocaleDateString("en-UK", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    let task = {
      date: taskDate,
      time: taskTime,
      title: taskText,
    };
    tasksStore.push(task);
    taskInput.value = "";
    console.log(tasksStore);

    renderUI();
    console.log(tasksStore);
  });
  renderUI();

  // Task completed
  taskDisplayArea.addEventListener("click", (e) => {
    if (e.target.classList.contains("done")) {
      const taskTextArea = e.target
        .closest(".single-task-wrapper")
        .querySelector(".task-text-area");
      taskTextArea.classList.toggle("task-completed");
      taskTextArea.classList.toggle("task-done-bg");
    }
  });

  // Task remove
  taskDisplayArea.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const singleTaskWraper = e.target.closest(".single-task-wrapper");

      let liText =
        singleTaskWraper.querySelector(".task-item-display").textContent;
      let findLi = tasksStore.find((obj) => {
        return obj.title === liText;
      });
      let index = tasksStore.indexOf(liText);
      tasksStore.splice(index, 1);

      singleTaskWraper.remove();
    }
  });

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

  //********* */
});
