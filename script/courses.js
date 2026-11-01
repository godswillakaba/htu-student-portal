export async function getCourses() {
    const response = await fetch("data/student.json");
    const data = await response.json();
    const courses = data.courses;
    

    // const courseTableBody = document.querySelector("#course-table-body");

    const coursesTable = document.querySelector("#courses-table");
    if (!coursesTable) return;

    
    courses.forEach((course) => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");

        // Course heading
        const heading = document.createElement("div");
        heading.classList.add("course-main-row");

        const title = document.createElement("h3");
        title.textContent = `${course.courseCode} - ${course.courseName}`;

        const hours = document.createElement("p");
        hours.textContent = `Credit Hours: ${course.creditHours}`;

        heading.appendChild(title);
        heading.appendChild(hours);
        courseCard.appendChild(heading);

        // Course description
        const description = document.createElement("div");
        description.classList.add("course-detail-row");

        const descriptionTitle = document.createElement("h4");
        descriptionTitle.textContent = "Description";

        const descriptionText = document.createElement("p");
        descriptionText.textContent = course.description;

        description.appendChild(descriptionTitle);
        description.appendChild(descriptionText);
        courseCard.appendChild(description);

        // Learning outcomes
        const outcomes = document.createElement("div");
        outcomes.classList.add("course-detail-row");

        const outcomesTitle = document.createElement("h4");
        outcomesTitle.textContent = "Learning Outcomes";

        const outcomesList = document.createElement("ul");

        course.outcomes.forEach((outcome) => {
            const item = document.createElement("li");
            item.textContent = outcome;
            outcomesList.appendChild(item);
        });

        outcomes.appendChild(outcomesTitle);
        outcomes.appendChild(outcomesList);
        courseCard.appendChild(outcomes);

        // Milestones
        const milestones = document.createElement("div");
        milestones.classList.add("course-detail-row");

        const milestonesTitle = document.createElement("h4");
        milestonesTitle.textContent = "Milestones";

        const milestonesList = document.createElement("ul");

        course.milestones.forEach((milestone) => {
            const item = document.createElement("li");
            item.textContent = milestone;
            milestonesList.appendChild(item);
        });

        milestones.appendChild(milestonesTitle);
        milestones.appendChild(milestonesList);
        courseCard.appendChild(milestones);

        // Add the completed card to the page
        coursesTable.appendChild(courseCard);
    });

}