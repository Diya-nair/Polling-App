let polls = [];

function createPoll() {
    const pollTitle = document.getElementById("pollTitle").value;
    const option1 = document.getElementById("option1").value;
    const option2 = document.getElementById("option2").value;
    const option3 = document.getElementById("option3").value;
    const option4 = document.getElementById("option4").value;

    if (pollTitle && option1 && option2 && option3 && option4) {
        const newPoll = {
            id: Date.now(),
            title: pollTitle,
            options: [
                { option: option1, votes: 0 },
                { option: option2, votes: 0 },
                { option: option3, votes: 0 },
                { option: option4, votes: 0 },
            ],
            totalVotes: 0,
        };

        polls.unshift(newPoll);  // Add the new poll at the top
        displayPolls();  // Refresh the list of polls
        clearForm();  // Clear the input fields
    } else {
        alert("Please fill in all fields!");
    }
}

function vote(pollId, optionIndex) {
    const poll = polls.find(poll => poll.id === pollId);
    if (poll) {
        poll.options[optionIndex].votes++;
        poll.totalVotes++;
        displayPolls();  // Refresh the polls with updated votes
    }
}

function displayPolls() {
    const pollsContainer = document.getElementById("pollsContainer");
    pollsContainer.innerHTML = '';  // Clear the previous polls

    polls.forEach((poll) => {
        const pollElement = document.createElement("div");
        pollElement.classList.add("poll");
        pollElement.innerHTML = `
            <h3>${poll.title}</h3>
            <div class="options">
                ${poll.options.map((option, index) => `
                    <label onclick="vote(${poll.id}, ${index})">
                        ${option.option}
                    </label>
                `).join('')}
            </div>
            <button onclick="showResults(${poll.id})">View Results</button>
            <div class="results" id="results-${poll.id}" style="display:none;">
                ${poll.options.map(option => `
                    <p>${option.option}: ${option.votes} vote(s)</p>
                `).join('')}
                <p><strong>Total Votes: ${poll.totalVotes}</strong></p>
            </div>
        `;

        pollsContainer.appendChild(pollElement);
    });
}

function showResults(pollId) {
    const resultsDiv = document.getElementById(`results-${pollId}`);
    resultsDiv.style.display = resultsDiv.style.display === 'none' ? 'block' : 'none';
}

function clearForm() {
    document.getElementById("pollTitle").value = '';
    document.getElementById("option1").value = '';
    document.getElementById("option2").value = '';
    document.getElementById("option3").value = '';
    document.getElementById("option4").value = '';
}
