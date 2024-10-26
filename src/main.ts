
function initializeObject(): void {

    let jobID = (<HTMLInputElement>document.getElementById('jobID'));
    let jobName = (<HTMLInputElement>document.getElementById("jobName"));
    let Desc = (<HTMLTextAreaElement>document.getElementById('jobDes'));
    let opening = (<HTMLInputElement>document.getElementById('jobOpening'));
    let tableBody = <HTMLTableElement>document.getElementById('tbody')
    let jobIDError = (<HTMLSpanElement>document.getElementById('jobID-error'));
    let jobNameError = (<HTMLSpanElement>document.getElementById('jobName-error'));
    let vacancy = (<HTMLSpanElement>document.getElementById('vac-error'));
    let dec = (<HTMLSpanElement>document.getElementById('dec-error'));
    jobIDError.innerText = ""
    jobNameError.innerText = ""
    vacancy.innerText = ""
    dec.innerText = ""

    let isBool: boolean = true;
    if(!(jobID.value)){
        jobIDError.innerText = "Please Enter a Job ID!"
        isBool = false;
    }
    if(!(jobName.value)){
        jobNameError.innerText = "Please Enter Job Title!";
        isBool = false;
    }
    if(!(opening.value)){
        vacancy.innerText = "Please enter total Vacancy!";
        isBool = false;
    }
    if(!(Desc.value)){
        dec.innerText = "Please Enter a Description!"
        isBool = false;
    }

    if(isBool){
        tableBody.innerHTML += `<tr> 
            <td>${jobID.value}</td> 
            <td>${jobName.value}</td> 
            <td>${opening.value}</td> 
            <td>${Desc.value}</td> 
            <td><button class="btn btn-primary">Apply</button></td>
            </tr>`;

            jobID.value = "";
            jobName.value = "";
            Desc.value = "";
            opening.value = "";
    }
}

document.getElementById('createVac')?.addEventListener('click', initializeObject)
