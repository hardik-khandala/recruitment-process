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
  
    if(jobs.length != 0){
      tableBody.innerHTML = `<caption>List of Job Vacancies</caption>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Name</th>
            <th>Openings</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>`
      jobs.forEach((job: { jobID: string; jobName: string; description: string; openings: string }) => {
        tableBody.innerHTML += `<tr>
          <td>${job.jobID}</td>
          <td>${job.jobName}</td>
          <td>${job.openings}</td>
          <td>${job.description}</td>
          <td><button class="btn btn-primary" onclick="applyApplication(${job.jobID})"  id="apply-btn">Apply</button></td>
        </tr>`;
      });
    }else{
      tableBody.innerHTML = `<h1> There is No opening at the moments</h1>`
    }
  
  }
  
  window.onload = displayJobs;
  
  document.getElementById('createVac')?.addEventListener('click', initializeObject);
  
  
  function applyApplication(id: number): void{
    let jobapp = (<HTMLDivElement>document.getElementById('jobApplications'));
    jobapp.classList.remove('d-none')
    
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    jobs.forEach((ele:number | any)=>{
        if(id==ele.jobID){
            let name = (<HTMLInputElement>document.getElementById('jobName'))
            name.value = ele.jobName
        }

    })
}
