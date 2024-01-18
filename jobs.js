// Fetch data from the JSON file
fetch('jobs.json')
    .then(response => response.json())
    .then(data => {
        // Save the data
        localStorage.setItem('jobs', JSON.stringify(data));
    })
    .catch(error => console.error('Error:', error));

function searchJobs(query) {
    // Get the jobs data
    var jobs = JSON.parse(localStorage.getItem('jobs'));

    var lowerCaseQuery = query.toLowerCase();
    // Filter the jobs
    var results = jobs.filter(function(job) {
        // Convert the job title and company name to lowercase
        var lowerCaseTitle = job.title.toLowerCase();
        var lowerCaseCompany = job.company.toLowerCase();

        // Search if the job title or company name includes the query
        return lowerCaseTitle.includes(lowerCaseQuery) || lowerCaseCompany.includes(lowerCaseQuery);
    });

    return results;
}

function createPopup(title, fields, message, onSubmit) {
    // Popup
    var popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = '#fff';
    popup.style.padding = '20px';
    popup.style.border = '1px solid #000';
    document.body.appendChild(popup);

    //Title and form fields
    var h2 = document.createElement('h2');
    h2.textContent = title;
    popup.appendChild(h2);

    var form = document.createElement('form');
    popup.appendChild(form);

    var inputs = [];

    fields.forEach(function(field) {
        var label = document.createElement('label');
        label.textContent = field + ':';
        form.appendChild(label);

        var input = document.createElement('input');
        input.type = 'text';
        input.name = field.toLowerCase();
        form.appendChild(input);
        inputs.push(input);

        form.appendChild(document.createElement('br'));
    });

    //Submit button
    var submit = document.createElement('button');
    submit.textContent = 'Submit';
    submit.type = 'submit';
    submit.style.float = 'right';
    submit.addEventListener('click', function(event){
        event.preventDefault();
        var isEmpty = inputs.some(function(input){
            return input.value.trim() === '';
        });
        if (isEmpty){
            alert('Error, Missing data in the form');
        } else{
            onSubmit(form);
            document.body.removeChild(popup);
        }
    });
    form.appendChild(submit);

    //Clear button
    var clear = document.createElement('button');
    clear.textContent = 'Clear';
    clear.addEventListener('click', function(event) {
        event.preventDefault();
        form.reset();
    });
    form.appendChild(clear);

    //Close button
    var close = document.createElement('button');
    close.textContent = 'Close';
    close.style.display = 'block'
    close.addEventListener('click', function() {
        document.body.removeChild(popup);
    });
    popup.appendChild(close);
}

document.getElementById('search').addEventListener('click', function() {
    createPopup('Search', ['Search'], 'Searching for jobs...', function(form) {
        var query = form.elements.search.value;
        var results = searchJobs(query);
        var jobsDiv = document.getElementById('jobs');
        jobsDiv.innerHTML = '';
        if (results.length > 0) {
            results.forEach(function(job) {
                var jobDiv = document.createElement('div');
                jobDiv.textContent = job.title + ' at ' + job.company + ' in ' + job.location + '. ' + job.description + ' Requirements: ' + job.requirements;
                jobsDiv.appendChild(jobDiv);
            });
        } else {
            jobsDiv.textContent = 'No job found!!';
        }
    });
});

document.getElementById('login').addEventListener('click', function() {
    createPopup('Login', ['Username', 'Password'], 'Welcome Back!!', function(form) {
        
    });
});

document.getElementById('signup').addEventListener('click', function() {
    createPopup('Sign Up', ['Name', 'Email', 'Password'], 'Welcome to Moringa Search Jobs!!', function(form) {
       
    });
});
