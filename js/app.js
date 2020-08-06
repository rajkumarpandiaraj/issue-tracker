const form = document.querySelector('#issue-form');
const issuesDiv = document.querySelector('.issues');


function Issueobj(description, type, address,id){
    this.description = description;
    this.type = type;
    this.address = address;
    this.id = id;
    this.status = 'open'
}

class UI{
    static displayTOUI(issue){
        const row = document.createElement('div')
        row.className = `issue ${issue.type}`;
        row.innerHTML = `<h6>Issue ID: <span id="issue-id">${issue.id}</span></h6>
                        <h3>${issue.description}</h3>
                        <span class="badge" id="badge">${issue.status}</span>
                        <h4>Address</h4>
                        <p>${issue.address}</p>
                        <a href="#" role="button" class="btn btn-delete" id="delete-btn">Delete</a>`
        
        if(issue.status === 'open'){
            const span = document.createElement('span');
            span.innerHTML = `<a href="#" role="button" class="btn btn-close" id="close-btn">Close</a>`
            row.appendChild(span);
        }
        issuesDiv.appendChild(row);
    }

    static changeStatus(el){
        el.style.display = 'none';
        const issue = el.parentElement.parentElement;
        const badge = issue.querySelector('.badge');
        badge.textContent = 'Closed'
    }

    static delfromUi(el){
        el.remove();
    }

    static clearField(){
        document.querySelector('#issue').value = ''
        document.querySelector('#address').value = ''
    }
}

class storage{

    static getIssues(){
        let issues = [];

        if(localStorage.getItem('issues') === null){
            return issues ;
        } else{
            return JSON.parse(localStorage.getItem('issues'));
        }
    }


    static toStore(issue){
        let issues = storage.getIssues();
        issues.push(issue);
        localStorage.setItem('issues',JSON.stringify(issues));
    }


    static delFromStorage(id){
        let issues = storage.getIssues();

        issues.forEach((issue, index) => {
            if(issue.id === id){
                issues.splice(index,1);
            }
        });
        localStorage.setItem('issues',JSON.stringify(issues));
    }

    static changeStatus(id){
        let issues = storage.getIssues();

        issues.forEach((issue) => {
            if(issue.id === id){
                issue.status = 'Closed';
            }
        });
        localStorage.setItem('issues',JSON.stringify(issues));
    }
}


function formSubmit(){
    let issueDescription = document.querySelector('#issue').value;
    let issueType = document.querySelector('#issue-type').value;
    let address = document.querySelector('#address').value;

    if(issueDescription === '' || address === ''){
        alert('Please fill the required field');
    } else{
        
    const time = new Date();
    const date = time.getDate();
    const month = time.getMonth();
    const seconds = time.getTime();
    const id = `${date}-${month}-${seconds}`

    const issue = new Issueobj(issueDescription, issueType, address,id);

    UI.displayTOUI(issue);
    storage.toStore(issue);
    UI.clearField();
    }
}




/////EventListeners
document.addEventListener('DOMContentLoaded', () => {
    let issues = storage.getIssues();

    issues.forEach(issue => {
        UI.displayTOUI(issue);
    });
});

form.addEventListener('submit',formSubmit)

issuesDiv.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-delete')){
        UI.delfromUi(e.target.parentElement)
        storage.delFromStorage(e.target.parentElement.firstChild.lastChild.textContent)
    }

    if(e.target.classList.contains('btn-close')){
        UI.changeStatus(e.target);
        storage.changeStatus(e.target.parentElement.parentElement.firstChild.lastChild.textContent)
    }

});




















