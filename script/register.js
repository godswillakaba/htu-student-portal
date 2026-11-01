export async function registerCourses() {
    const response = await fetch("data/student.json");
    const data = await response.json();

    const courses = data.courses;

    //sessionStorage.setItem("loggedInStudentId", student.studentId);
    const studentId = sessionStorage.getItem("loggedInStudentId");
    console.log("Current student ID:", studentId);
    const registration = localStorage.getItem(`registration_${studentId}`);

    if (registration) {
        const savedRegistration = JSON.parse(registration);

        if (savedRegistration.registered) {
            document.querySelector(".course-table").style.display = "none";
            // document.querySelector("#registerAllCourses").style.display = "none";

            const registerAllCourses = document.querySelector("#registerAllCourses");
            if (registerAllCourses) {
                registerAllCourses.style.display = "none";
            }

            const registrationMessage = document.querySelector("#registrationMessage");

            if (registrationMessage) {
                registrationMessage.textContent =
                    `Congratulations! You have already registered ${savedRegistration.registeredCourses} courses.`;
            }

return;

            // document.querySelector("#registrationMessage").textContent =
            //     `Congratulations! You have already registered ${savedRegistration.registeredCourses} courses.`;
            // return;
        }
    }

    const courseList = document.querySelector("#registrationCourseList");
    if (!courseList) return;

    courseList.innerHTML = courses.map((course, index) => {
    return `
        <tr>
            <td>${index + 1}</td>
            <td>${course.courseCode}</td>
            <td>${course.courseName}</td>
            <td>${course.creditHours}</td>
        </tr>
    `;
    }).join("");

    const total = courses.reduce((sum, course) => sum + course.creditHours, 0);
    document.querySelector("#totalCreditHours").textContent = total;

    const registerButton = document.querySelector("#registerAllCourses");

    registerButton.addEventListener("click", () => {
        //const studentId = localStorage.getItem("studentId");
        const studentId = sessionStorage.getItem("loggedInStudentId");
        localStorage.setItem(
            `registration_${studentId}`,
            JSON.stringify({
                registered: true,
                registeredCourses: courses.length
            })
        );
        
        document.querySelector("#registrationMessage").textContent =
            `You have successfully registered ${courses.length} courses.`;

        courseList.closest(".course-table").style.display = "none";
            registerButton.style.display = "none";          
    });
    
};