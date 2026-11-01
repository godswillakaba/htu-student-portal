export async function loadAssignments() {
    
    const response = await fetch("data/student.json");
    const data = await response.json();

    const assignments = data.assignments;


    //these 3 lines stores the student id and assignment that they have completed in a storage
    const studentId = sessionStorage.getItem("loggedInStudentId");
    const storageKey = `completedAssignments_${studentId}`;
    const completedAssignments = JSON.parse(localStorage.getItem(storageKey)) || [];

    //this finds the next assignment the student should work on
    //const nextAssignment = assignments.find((assignment) => {
    //    return !completedAssignments.includes(assignment.assignmentId);
    //});
    const lastCompleted = completedAssignments.at(-1);
    let nextAssignment;
    if (!lastCompleted) {
        nextAssignment = assignments[0];
    } else {
        const completedDate = new Date(lastCompleted.completedDate);
        const availableDate = new Date(completedDate);

        availableDate.setDate(availableDate.getDate() + 3);

        if (new Date() >= availableDate) {
            nextAssignment = assignments.find((assignment) => {
                return !completedAssignments.some((completed) => {
                    return completed.assignmentId === assignment.assignmentId;
                });
            });
        }
    }

    // this displays a message when a students sumbits all assignments and have no pending assignments
    const assignmentLists = document.querySelector("#assignments-list");
    
    //if (!nextAssignment) {
    //    assignmentLists.innerHTML = "<p>Congratulations! You have completed all your assignments.</p>";
    // return;
    //};
    if (!assignmentLists) return;

    if (!nextAssignment) {
    const lastCompleted = completedAssignments.at(-1);

    if (lastCompleted) {
        const completedDate = new Date(lastCompleted.completedDate);
        const availableDate = new Date(completedDate);

        availableDate.setDate(availableDate.getDate() + 3);

        if (new Date() < availableDate) {
            assignmentLists.innerHTML = `
                <p>No pending assignments available.</p>
                <p>Your next assignment will be available on
                ${availableDate.toLocaleDateString()}.</p>
            `;
            return;
        }
    }

    assignmentLists.innerHTML = `<p>Congratulations! You have completed all your assignments.</p>`;
        return;
    }

    //const assignmentLists = document.querySelector("#assignments-list");

    //assignments.forEach((assignment) => {
      //  assignmentLists.innerHTML += `
        //<div class="assignment-item">
//        <h3>${assignment.title}</h3>
  //      <p>${assignment.courseCode}</p>
    //    <p>${assignment.description}</p>
      //  <p>${assignment.dueDate}</p>
        //<p>${assignment.status}</p>
        //</div>`
    //});


    assignmentLists.innerHTML = `
    <div class="assignment-item">
    <div class="assignment-header">
            <h3>${nextAssignment.title}</h3>
            <p class="assignment-status">Pending</p>
        </div>
        <p>${nextAssignment.courseCode}</p>
        <p>${nextAssignment.description}</p>
        <p>Due date: ${nextAssignment.dueDate}</p>
        <button class="view-assignment-btn">View Assignment</button>
    </div>
    `;

    const viewButton = document.querySelector(".view-assignment-btn");
    const assignmentModal = document.querySelector("#assignmentModal");

    viewButton.addEventListener("click", function () {
        document.querySelector("#modalAssignmentTitle").textContent = nextAssignment.title;
        document.querySelector("#modalAssignmentCourse").textContent = nextAssignment.courseCode;
        document.querySelector("#modalAssignmentDescription").textContent = nextAssignment.instructions;
        document.querySelector("#modalAssignmentDueDate").textContent = nextAssignment.dueDate;
    
        assignmentModal.showModal();
    });


    const closeButton = document.querySelector("#closeAssignmentModal");
    closeButton.addEventListener("click", function () {
        assignmentModal.close();
    });

    const markDoneButton = document.querySelector("#markAsDone");
    //markDoneButton.addEventListener("click", function () {
    //    alert("Congratulations! You have completed this assignment.");
    //});

    markDoneButton.addEventListener("click", function () {
        completedAssignments.push({
            assignmentId: nextAssignment.assignmentId,
            completedDate: new Date().toISOString()
        });

        localStorage.setItem(
            storageKey,
            JSON.stringify(completedAssignments)
        );

        const modalContent = document.querySelector(".assignment-modal-content");
        const congratulationsMessage = document.querySelector("#congratulationsMessage");

        modalContent.querySelectorAll(":scope > *:not(#congratulationsMessage)").forEach((element) => {
            element.hidden = true;
        });

        congratulationsMessage.hidden = false;

        setTimeout(function () {
            assignmentModal.close();

            const completedDate = new Date(
                completedAssignments[completedAssignments.length - 1].completedDate
            );

            const availableDate = new Date(completedDate);
            availableDate.setDate(availableDate.getDate() + 3);

            assignmentLists.innerHTML = `
                <p>No pending assignments available.</p>
                <p>Your next assignment will be available on
                ${availableDate.toLocaleDateString()}.</p>
            `;
        }, 3000);


    });


};