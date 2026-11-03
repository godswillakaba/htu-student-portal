import { loadAssignments } from "./assignment.js";
import { registerCourses } from "./register.js";
import { getCourses } from "./courses.js";
import { loadResults } from "./result.js";



async function getStudentData() {
    const response = await fetch("data/student.json");
    const data = await response.json();

    const loggedInStudentId = sessionStorage.getItem("loggedInStudentId");

    const student = data.students.find((student) => {
        return student.studentId === loggedInStudentId;
    });

    displayTodaysClasses(data.schedule);
    displayAnnouncements(data.announcements);



    // Finance Card
    const totalFeesElement = document.querySelector("#totalFees");
    const amountPaidElement = document.querySelector("#amountPaid");
    const feeBalanceElement = document.querySelector("#feeBalance");

    if (totalFeesElement && amountPaidElement && feeBalanceElement) {
        const totalFees = Number(student.fees.totalFees);
        const amountPaid = Number(student.fees.amountPaid);
        const balance = totalFees - amountPaid;

        totalFeesElement.textContent = `GHS ${totalFees.toFixed(2)}`;
        amountPaidElement.textContent = `GHS ${amountPaid.toFixed(2)}`;
        feeBalanceElement.textContent = `GHS ${balance.toFixed(2)}`;
    }




    document.querySelectorAll(".firstName").forEach((element) => {
        element.textContent = student.firstName});

    document.querySelectorAll(".programme").forEach((element) => {
        element.textContent = student.programme});

    document.querySelectorAll(".studentId").forEach((element) => {
        element.textContent = student.studentId});

    document.querySelectorAll(".level").forEach((element) => {
        element.textContent = student.level});

    // document.querySelector("#middleName").textContent = student.middleName;
    const middleName = document.querySelector("#middleName");

        if (middleName) {
            middleName.textContent = student.middleName;
        }
    
    const lastName = document.querySelector("#lastName");
    if (lastName) {
        lastName.textContent = student.lastName;
    }
    document.querySelector("#semester").textContent = student.semester; 
    // 
    const department = document.querySelector("#department");

    if (department) {
        department.textContent = student.department;
    }

    const studentPhoto = document.querySelector("#studentPhoto");
    if (studentPhoto) {
        studentPhoto.src = student.photo;
    }

    const email = document.querySelector("#email");
    if (email) {
        email.textContent = student.email;
    }

    const phone = document.querySelector("#phone");
    if (phone) {
        phone.textContent = student.phone;
    }

    const gender = document.querySelector("#gender");
    if (gender) {
        gender.textContent = student.gender;
    }

    const dob = document.querySelector("#dob");
    if (dob) {
        dob.textContent = student.dob;
    }

    const dateOfAdmission = document.querySelector("#dateOfAdmission");
    if (dateOfAdmission) {
        dateOfAdmission.textContent = student.dateOfAdmission;
    }

    const address = document.querySelector("#address");
    if (address) {
        address.textContent = student.address;
    }
    
    function displayTodaysClasses(schedule) {
        const todaysClasses = document.querySelector("#todaysClasses");
        if (!todaysClasses) return;
    

        const today = new Date().toLocaleDateString("en-US", {
            weekday: "long"
        });

        const classesToday = schedule.filter((course) => course.day === today);

        if (classesToday.length === 0) {
            todaysClasses.innerHTML = "<p>No classes today.</p>";
            return;
        }
        todaysClasses.innerHTML = `
            <p><strong>${today}</strong></p>
            ${classesToday.map((course) => `
                <div class="class-item">
                    <p><strong>${course.courseCode}</strong></p>
                    <p>${course.startTime} – ${course.endTime}</p>
                    <p>${course.location}</p>
                </div>
            `).join("")}
        `;
    };

    function displayAnnouncements(announcements) {
        const announcementContainer = document.querySelector("#announcements");
        if (!announcementContainer) return;

        const latestAnnouncement = [...announcements]
            .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        announcementContainer.innerHTML = latestAnnouncement ? `
            <div class="announcement-item ${latestAnnouncement.important ? "important" : ""}">
                <h4>${latestAnnouncement.title}</h4>
                <p>${latestAnnouncement.message}</p>

                <div class="announcement-details">
                    <span>${latestAnnouncement.type}</span>
                    <span>${latestAnnouncement.date}</span>
                </div>
            </div>
        ` : "<p>No announcements available.</p>";
    }
}

loadAssignments();
getStudentData();
registerCourses();
getCourses();
loadResults();


