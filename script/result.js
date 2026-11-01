export async function loadResults() {

    const response  = await fetch("data/student.json");
    const data = await response.json();
    const courses = data.courses;

    const resultContent = document.querySelector(".result-content");
    if (!resultContent) return;

    courses.forEach((course) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${course.courseCode}</td>
            <td>${course.courseName}</td>
            <td>${course.creditHours}</td>
            <td>0.00</td>
            <td>0.00</td>
        `;
        resultContent.appendChild(row);
    });

    const semesterCredit = document.querySelector("#semester-credits");
    semesterCredit.textContent = "0.00";

    const semesterGrade = document.querySelector("#semester-grade");
    semesterGrade.textContent= "0.00"

    const semesterGradePoint = document.querySelector("#semester-grade-point");
    semesterGradePoint.textContent= "0.00"

    const total = courses.reduce((sum, course) => sum + course.creditHours, 0);
    document.querySelector("#semester-credits").textContent = total;

    
}