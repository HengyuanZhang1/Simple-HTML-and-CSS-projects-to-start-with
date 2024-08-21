const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progresses = document.querySelectorAll(".progress");

let activeCount = 1;

prevBtn.addEventListener("click", () => {
    changeActiveCount(-1);
})

nextBtn.addEventListener("click", () => {
    changeActiveCount(+1);
})

const changeActiveCount = (step) => {
    activeCount = Math.max(1, Math.min(progresses.length, activeCount + step));
    if(activeCount === 1){
        prevBtn.classList.add("disabled");
    } else {
        prevBtn.classList.remove("disabled");
    }
    if(activeCount === progresses.length) {
        nextBtn.classList.add("disabled");
    } else {
        nextBtn.classList.remove("disabled");
    }
    updateProgress(activeCount);
}

const updateProgress = (count) => {
    progresses.forEach((progress, index) => {
        if (index < count){
            progress.classList.add("active");
        }else {
            progress.classList.remove("active");
        }
    })
}

changeActiveCount(0);