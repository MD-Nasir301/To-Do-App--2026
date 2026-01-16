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
  let tasksStore = JSON.parse(localStorage.getItem("tasksStore")) || [];
  //  [
  //   {
  //     id: Date.now(),
  //     date: "01-01-2026",
  //     time: "10:00 AM",
  //     title: "Task 1",
  //     done: true,
  //   },
  // ];

  function tasksGroup() {
    // All Tasks Grouping  By Date
    let tasksGroup = tasksStore.reduce((acc, obj) => {
      let { id, date, time, title, done } = obj;
      let key = date;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push({ id, time, title, done });
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
                  class="task-text-area ${
                    obj.done ? "task-completed task-done-bg" : ""
                  }  d-flex ps-2 justify-content-between"
                  id="task-text-area"
                >
                  <span class="task-item-display"> ${obj.title}</span>
                  <span class="task-time">${obj.time}</span>
                </div>
              </div>
              <div
                class="col-3 col-sm-2 task-btn-area d-flex justify-content-between"
              >
                <button title="Done" data-id="${
                  obj.id
                }"  id="done" class="done btn">
                  ☑️
                </button>
                <button title="Delete" data-id="${
                  obj.id
                }" class="delete btn">❌</button>
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
      id: Date.now(),
      date: taskDate,
      time: taskTime,
      title: taskText,
      done: false,
    };
    tasksStore.push(task);
    localStorage.setItem("tasksStore", JSON.stringify(tasksStore));
    taskInput.value = "";

    renderUI();
    console.log(tasksStore);
  });
  renderUI();

  // Task completed
  taskDisplayArea.addEventListener("click", (e) => {
    if (e.target.classList.contains("done")) {
      const doneBtn = e.target
        .closest(".single-task-wrapper")
        .querySelector(".done");
      toggleDone(doneBtn.dataset.id);
    }
  });

  // Task remove
  taskDisplayArea.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      let liId = e.target.dataset.id;
      console.log("Dichi" + liId);
      remove(liId);
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

  function toggleDone(id) {
    let findLi = tasksStore.find((obj) => {
      return obj.id == id;
    });
    findLi.done = !findLi.done;
    localStorage.setItem("tasksStore", JSON.stringify(tasksStore));
    renderUI();
  }

  function remove(id) {
    let findIndex = tasksStore.findIndex((obj) => obj.id == id);
    tasksStore.splice(findIndex, 1);
    localStorage.setItem("tasksStore", JSON.stringify(tasksStore));
    renderUI();
  }

  let tl = gsap.timeline({});

  tl.from(".to", {
    duration: 1,
    opacity: 0,
    y: -150,
    rotate: 100,
    ease: "bounce",
    delay: 0.5,
  });
  tl.to(".to", {
    rotate: 20,
  });
  tl.fromTo(
    ".do",
    {
      duration: 1,
      opacity: 0,
      x: 350,
      ease: "bounce",
      delay: 0.5,
    },
    {
      duration: 0.5,
      opacity: 1,
      x: -10,
      ease: "none",
    }
  );
  tl.to(".do", {
    x: 0,
  });
  tl.to(
    ".to",
    {
      rotate: -10,
    },
    "-=0.5"
  );
  tl.from(
    ".logo",
    {
      scale: 0,
      duration: 1,
      opacity: 0,
      ease: "power2.in",
    },
    "-=1"
  );

  tl.from(".dark-mode", {
    scale: 0,
    duration: 1,
    opacity: 0,
    ease: "power2.in",
  });
  tl.from(".theme", {
    scale: 0,
    duration: 0.3,
    opacity: 0,
    ease: "power2.in",
  });

  gsap.from(".todo-task-input", {
    duration: 0.5,
    opacity: 0,
    scaleX: 0,
    delay: 0.3,
  });
  gsap.from(".single-task-wrapper", {
    duration: 0.4,
    opacity: 0,
    x: -80,
    delay: 0.6,
    stagger: 0.2,
  });
  //********* */
});
