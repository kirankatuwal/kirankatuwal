const companyInput = document.getElementById("company")
const roleInput = document.getElementById("role")
const statusInput = document.getElementById("status")
const addBtn = document.getElementById("addBtn")
const jobList = document.getElementById("jobList")
let editIndex = null

let jobs = []

addBtn.addEventListener("click", addJob)

function addJob() {

    const company = companyInput.value
    const role = roleInput.value
    const status = statusInput.value

    if (company === "" || role === "") {
        alert("Please fill all fields")
        return
    }

    const job = {
        company,
        role,
        status
    }

    if (editIndex === null) {

        jobs.push(job)

    } else {

        jobs[editIndex] = job

        editIndex = null
    }

    displayJobs()
    saveJobs()

    clearInputs()
}

function displayJobs() {

    jobList.innerHTML = ""

    jobs.forEach((job, index) => {

        const jobCard = document.createElement("div")

        jobCard.classList.add("job-card")

        jobCard.innerHTML = `
      <h3>${job.company}</h3>
      <p>${job.role}</p>
      <p>Status: ${job.status}</p>

      <button onclick="editJob(${index})">
        Edit
    </button>
      <button onclick="deleteJob(${index})">
        Delete
      </button>

    `

        jobList.appendChild(jobCard)
    })
}

function deleteJob(index) {
    jobs.splice(index, 1)
    displayJobs()
    saveJobs()
}

function saveJobs() {

    localStorage.setItem(
        "jobs",
        JSON.stringify(jobs)
    )

}

function editJob(index) {

    const job = jobs[index]

    companyInput.value = job.company
    roleInput.value = job.role
    statusInput.value = job.status

    editIndex = index
    addBtn.innerText = "Update Job"

}

function clearInputs() {
    companyInput.value = ""
    roleInput.value = ""
    addBtn.innerText = "Add Job"
}

loadJobs()

function loadJobs() {

    const savedJobs =
        localStorage.getItem("jobs")

    if (savedJobs) {

        jobs = JSON.parse(savedJobs)

        displayJobs()

    }

}