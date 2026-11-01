const loginForm = document.querySelector("#loginForm");
const studentNameInput = document.querySelector("#studentName");
const studentIdInput = document.querySelector("#studentId");

loginForm.addEventListener("submit", async function(event){
    event.preventDefault();
    const studentName = studentNameInput.value.trim();
    const studentId = studentIdInput.value.trim();

    console.log("Entered Student ID:", studentId);

    const response = await fetch("data/student.json");
    const data = await response.json();

    const student = data.students.find((student) => {
        return student.studentId === studentId;
    });

    if (!student) {
    document.querySelector("#logInMessage").textContent =
        "Invalid Student ID. Please try again.";
    return;
    }
    //- !student means no matching student was found.
    //- textContent displays the error message inside your <p id="logInMessage"></p> element.
    //- return stops the function so the login process doesn't continue with an invalid ID.


    const fullName =
    `${student.firstName} ${student.middleName} ${student.lastName}`
        .replace(/\s+/g, " ")
        .trim();
        

    if (fullName.toLowerCase() !== studentName.toLowerCase()) {
        document.querySelector("#logInMessage").textContent =
            "Student name does not match the Student ID.";
        return;
    }


    sessionStorage.setItem("loggedInStudentId", student.studentId);

    window.location.href = "dashboard.html";
});