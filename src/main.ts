function initializeObject(): void {
  const jobID = (<HTMLInputElement>document.getElementById('jobID'));
  const jobName = (<HTMLInputElement>document.getElementById("jobName"));
  const description = (<HTMLTextAreaElement>document.getElementById('jobDes'));
  const openings = (<HTMLInputElement>document.getElementById('jobOpening'));

  const jobIDError = (<HTMLSpanElement>document.getElementById('jobID-error'));
  const jobNameError = (<HTMLSpanElement>document.getElementById('jobName-error'));
  const vacancyError = (<HTMLSpanElement>document.getElementById('vac-error'));
  const descriptionError = (<HTMLSpanElement>document.getElementById('dec-error'));

  jobIDError.innerText = "";
  jobNameError.innerText = "";
  vacancyError.innerText = "";
  descriptionError.innerText = "";

  let isValid = true;

  if (!jobID.value) {
    jobIDError.innerText = "Please Enter a Job ID!";
    isValid = false;
  }
  if (!jobName.value) {
    jobNameError.innerText = "Please Enter Job Title!";
    isValid = false;
  }
  if (!openings.value) {
    vacancyError.innerText = "Please enter total Vacancy!";
    isValid = false;
  }
  if (!description.value) {
    descriptionError.innerText = "Please Enter a Description!";
    isValid = false;
  }

  if (isValid) {
    const newJob = {
      jobID: jobID.value,
      jobName: jobName.value,
      description: description.value,
      openings: openings.value
    };

    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    jobs.push(newJob);

    localStorage.setItem("jobs", JSON.stringify(jobs));

    jobID.value = "";
    jobName.value = "";
    description.value = "";
    openings.value = "";

    alert('Vacancy Created Successfully!');
    displayJobs();
  }
}

function displayJobs(): void {
  const tableBody = <HTMLTableElement>document.getElementById('table');
  tableBody.innerHTML = "";

  const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");

  if (jobs.length !== 0) {
    tableBody.innerHTML = `<caption>List of Job Vacancies</caption>
      <thead>
        <tr>
          <th>Job ID</th>
          <th>Job Name</th>
          <th>Openings</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>`;
    jobs.forEach((job: { jobID: string; jobName: string; description: string; openings: string }) => {
      tableBody.innerHTML += `<tr>
        <td>${job.jobID}</td>
        <td>${job.jobName}</td>
        <td>${job.openings}</td>
        <td>${job.description}</td>
        <td><button class="btn btn-primary" onclick="applyApplication(${job.jobID})">Apply</button></td>
      </tr>`;
    });
  } else {
    tableBody.innerHTML = `<h1> There is No opening at the moments</h1>`;
  }
}

window.onload = displayJobs;

document.getElementById('createVac')?.addEventListener('click', initializeObject);

function applyApplication(id: number): void {
  const jobapp = (<HTMLDivElement>document.getElementById('jobApplications'));
  jobapp.classList.remove('d-none');

  const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
  jobs.forEach((ele: { jobID: string; jobName: string }) => {
    if (id == ele.jobID) {
      const name = (<HTMLInputElement>document.getElementById('jobName'));
      name.value = ele.jobName;
    }
  });
}

function submitApplication(): void {
  const jobName = (<HTMLInputElement>document.getElementById('jobName'));
  const firstName = (<HTMLInputElement>document.getElementById('firstName'));
  const lastName = (<HTMLInputElement>document.getElementById('lastName'));
  const experience = (<HTMLInputElement>document.getElementById('experience'));
  const location = (<HTMLInputElement>document.getElementById('location'));
  const expectedCTC = (<HTMLInputElement>document.getElementById('expectedCTC'));

  const firstNameError = (<HTMLSpanElement>document.getElementById('firstName-error'));
  const lastNameError = (<HTMLSpanElement>document.getElementById('lastName-error'));
  const experienceError = (<HTMLSpanElement>document.getElementById('experience-error'));
  const locationError = (<HTMLSpanElement>document.getElementById('location-error'));
  const expectedCTCError = (<HTMLSpanElement>document.getElementById('expectedCTC-error'));

  firstNameError.innerText = "";
  lastNameError.innerText = "";
  experienceError.innerText = "";
  locationError.innerText = "";
  expectedCTCError.innerText = "";

  let isValid = true;

  if (!firstName.value) {
    firstNameError.innerText = "Please enter your first name!";
    isValid = false;
  }
  if (!lastName.value) {
    lastNameError.innerText = "Please enter your last name!";
    isValid = false;
  }
  if (!experience.value) {
    experienceError.innerText = "Please enter your experience!";
    isValid = false;
  }
  if (!location.value) {
    locationError.innerText = "Please enter your location!";
    isValid = false;
  }
  if (!expectedCTC.value) {
    expectedCTCError.innerText = "Please enter your expected CTC!";
    isValid = false;
  }

  if (isValid) {
    const newApplication = {
      jobName: jobName.value,
      firstName: firstName.value,
      lastName: lastName.value,
      experience: experience.value,
      location: location.value,
      expectedCTC: expectedCTC.value
    };

    const applications = JSON.parse(localStorage.getItem("applications") || "[]");
    applications.push(newApplication);
    localStorage.setItem("applications", JSON.stringify(applications));

    firstName.value = "";
    lastName.value = "";
    experience.value = "";
    location.value = "";
    expectedCTC.value = "";

    alert("Application submitted successfully!");
    displayApplications(); // Call to display updated applications
  }
}

document.getElementById('submitApplication')?.addEventListener('click', submitApplication);

function displayApplications(): void {
  const applicationsBody = <HTMLTableElement>document.getElementById('applicationsBody');
  applicationsBody.innerHTML = ""; 

  const applications = JSON.parse(localStorage.getItem("applications") || "[]");

  if (applications.length !== 0) {
    applications.forEach((application: { jobName: string; firstName: string; lastName: string; experience: string; location: string; expectedCTC: string }, index: number) => {
      applicationsBody.innerHTML += `<tr>
        <td>${application.jobName}</td>
        <td>${application.firstName}</td>
        <td>${application.lastName}</td>
        <td>${application.experience}</td>
        <td>${application.location}</td>
        <td>${application.expectedCTC}</td>
        <td><button class="btn btn-success" onclick="scheduleInterview(${index})">Schedule Interview</button></td>
      </tr>`;
    });
  } else {
    applicationsBody.innerHTML = `<tr><td colspan="7" class="text-center">No applications available</td></tr>`;
  }
}
displayApplications();

function scheduleInterview(index: number): void {
  alert("Interview scheduled successfully!");

  const applications = JSON.parse(localStorage.getItem("applications") || "[]");
  applications[index].interviewScheduled = true; 
  localStorage.setItem("applications", JSON.stringify(applications));

  displayApplications(); 
  replaceInterviewButton(index);
}

function replaceInterviewButton(index: number): void {
  const applicationsBody = <HTMLTableElement>document.getElementById('applicationsBody');
  const rows = applicationsBody.getElementsByTagName('tr');

  if (rows[index]) {
    const row = rows[index];
    row.cells[6].innerHTML = `<button class="btn btn-danger" onclick="hireApplicant(${index})">Hire</button>
                               <button class="btn btn-warning" onclick="rejectApplicant(${index})">Reject</button>`;
  }
}

function hireApplicant(index: number): void {
  alert("You are hired!");
  removeApplication(index); // Remove application after hiring
}

function rejectApplicant(index: number): void {
  alert("Application rejected.");
  removeApplication(index); // Remove application after rejection
}

function removeApplication(index: number): void {
  const applications = JSON.parse(localStorage.getItem("applications") || "[]");
  applications.splice(index, 1); // Remove the application at the specified index
  localStorage.setItem("applications", JSON.stringify(applications)); // Update local storage
  displayApplications(); // Refresh the applications display
}

window.onload = () => {
  displayJobs();
  displayApplications(); // Ensure applications are displayed on load
};

document.getElementById('home1')?.addEventListener('click', () => {
  window.location.pathname = "/";
  displayJobs();
});

document.getElementById('interview')?.addEventListener('click', () => {
  window.location.pathname = "/interview.html";
  displayApplications();
});
