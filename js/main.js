window.addEventListener("DOMContentLoaded", () => {
  //********** */

  const timeEl = getDomByID("time-value");
  const dateEl = getDomByID("date-value");
  const darkBtn = getDomByID("flexSwitchCheckChecked");
  const taskDisplayItem = getDomByID("task-text-area");
  const taskAddBtn = getDomByID("add");
  const taskInput = getDomByID("task-input");
  const taskDisplayArea = getDomByID("task-display-area");
  const doneBtn = getDomByID("done");

  // Primary source of truth for all tasks

  //===================================================
  let tasksStore = [
    {
      date: "01-01-2026",
      time: "10:00 AM",
      title: "Task 1",
    },
    {
      date: "02-01-2026",
      time: "11:30 PM",
      title: "Task 2",
    },
    {
      date: "03-01-2026",
      time: "12:30 PM",
      title: "Task 3",
    },
  ];
  let ts = [
    {
      "20-03-2026": [
        {
          time: "10:5",
          work: "home",
        },
        {
          time: "12:20",
          work: "FootBall",
        },
        {
          time: "06:00",
          work: "Reading",
        },
      ],
    },

    {
      "02-01-2026": [
        {
          time: "12:20",
          work: "Market",
        },
        {
          time: "21:23",
          work: "School",
        },
        {
          time: "02:00",
          work: "Batminton",
        },
      ],
    },
  ];

  //====================================================================
  // let grouped = [];

  // tasksStore.forEach((obj) => {
  //   if ([obj.date]) {
  //     grouped.push({ [obj.date]: obj.time });
  //   }
  // });
  // console.log(grouped);

  //==============================================================^^^^^^

  let html = ts.map((obj) => {
    let date = Object.keys(obj)[0];
    let tasksHtml = obj[date].map((nestedObj) => {
      return `
        <li class="single-task-wrapper mb-2">
          <div class="container">
            <div class="row">
              <div class="col-9 col-sm-10 p-0">
                <div
                  class="task-text-area d-flex ps-2 justify-content-between"
                  id="task-text-area"
                >
                  <span class="task-item-display">${nestedObj.work}</span>
                  <span class="task-time">${nestedObj.time}</span>
                </div>
              </div>
              <div
                class="col-3 col-sm-2 task-btn-area d-flex justify-content-center"
              >
                <button title="done" id="done" class="done btn">
                  ☑️
                </button>
                <button title="Delete" class="delete btn">❌</button>
              </div>
            </div>
          </div>
        </li>
      `;
    }).join('');

    return `
      <ul id="task-list-group" class="task-display-area mt-3 list-unstyled">
        <time class="Task-group-date ms-2 tex px-2" datetime="">${date}</time>
        ${tasksHtml}
      </ul>
    `;
  }).join('');

  taskDisplayArea.innerHTML = html;

  // tasksStore.map((obj) => {
  //   taskDisplayArea.innerHTML += `
  //       <ul id="task-list-group"
  //             class="task-display-area mt-3 list-unstyled"
  //           >
  //             <time class="Task-group-date ms-2 tex px-2" datetime=""
  //               >25-25-2026</time
  //             >
  //             <li class="single-task-wrapper mb-2">
  //               <div class="container">
  //                 <div class="row">
  //                   <div class="col-9 col-sm-10 p-0">
  //                     <div
  //                       class="task-text-area  d-flex ps-2 justify-content-between"
  //                       id="task-text-area"
  //                     >
  //                       <span class="task-item-display"> ${obj.title} </span>
  //                       <span class="task-time  ">${obj.time}</span>
  //                     </div>
  //                   </div>
  //                   <div
  //                     class="col-3 col-sm-2 task-btn-area d-flex justify-content-center"
  //                   >
  //                     <button title="done" id="done" class="done btn">
  //                       ☑️
  //                     </button>
  //                     <button title="Delete" class="delete btn">❌</button>
  //                   </div>
  //                 </div>
  //               </div>
  //             </li>
  //           </ul>
  //   `;
  // });

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
  });
  // Task completed
  taskDisplayArea.addEventListener("click", (e) => {
    if (e.target.classList.contains("done")) {
      const taskTextArea = e.target
        .closest(".single-task-wrapper")
        .querySelector(".task-text-area");
      taskTextArea.classList.toggle("task-completed");
    }
  });

  // Task remove
  taskDisplayArea.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const sigleTaskWraper = e.target
        .closest(".task-display-area")
        .querySelector(".single-task-wrapper");
      sigleTaskWraper.remove();
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
  function getDomByID(id) {
    return document.getElementById(id);
  }

  //********* */
});
