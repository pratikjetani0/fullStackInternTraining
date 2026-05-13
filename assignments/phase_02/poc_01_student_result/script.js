let students = []; // for stores all students data

// Add student
function addStudent() {
  const studentData = {
    name: document.getElementById("stu-input").value.trim(),
    maths: document.getElementById("maths").value,
    physics: document.getElementById("physics").value,
    chemistry: document.getElementById("chemistry").value,
    computer: document.getElementById("computer").value,
  };

  // validation
  const error = validateStudent(studentData);
  if (error) {
    showToast(error);
    return;
  }

  // all marks should be in number
  const maths = Number(studentData.maths);
  const physics = Number(studentData.physics);
  const chemistry = Number(studentData.chemistry);
  const computer = Number(studentData.computer);

  // calculate percentage
  const total = maths + physics + chemistry + computer;
  const percentage = total / 4;

  // Grade assigning
  const grade = gradeAssign(percentage);

  // stores each student in object
  const student = {
    name: studentData.name,
    maths,
    physics,
    chemistry,
    computer,
    percentage,
    grade,
  };

  students.push(student);

  showToast("Student added Succesfully ✅");

  showStudentsData(); // render student

  clearInputs(); //clear input

  // console.table(students);
}

// validation
function validateStudent({ name, maths, physics, chemistry, computer }) {
  // name validating
  if (!name) {
    return "Name is Required ❌";
  }

  //Duplicate student name
  if (students.some((stu) => stu.name.toLowerCase() === name.toLowerCase())) {
    return "Student already exists ⌛";
  }

  // marks validating

  const marks = [maths, physics, chemistry, computer];
  
  if (marks.some((mark) => mark === "")) {
    return "All marks are required ❗";
  }

  if (marks.some((mark) => mark < 0 || mark > 100)) {
    return "Marks must be between 0 and 100 🎯";
  }
}

// clear inputs
function clearInputs() {
  document.getElementById("stu-input").value = "";
  document.getElementById("maths").value = "";
  document.getElementById("physics").value = "";
  document.getElementById("chemistry").value = "";
  document.getElementById("computer").value = "";
}

// assgain grade based on percentage
function gradeAssign(percentage) {
  let grade = "";

  if (percentage > 90) grade = "A";
  else if (percentage >= 80) grade = "B";
  else if (percentage >= 70) grade = "C";
  else if (percentage >= 55) grade = "D";
  else if (percentage >= 40) grade = "E";
  else grade = "F";

  return grade;
}

// show student data in table
function showStudentsData() {
  // result showing into ui
  let resultDiv = document.getElementById("student-table");
  resultDiv.innerHTML = `
    <table id="student-card"> 
        <thead>
            <tr>
            <th> Name </th>
            <th> Percentage </th>
            <th> Grade </th>
            </tr>
        </thead>
        <tbody id="table-body"> </tbody>
    </table>
  `;

  let tbody = document.getElementById("table-body");

  students.forEach((stu) => {
    tbody.innerHTML += `
        <tr>
        <td>${stu.name}</td>
        <td>${stu.percentage.toFixed(2)}%</td>
        <td>${stu.grade}</td>
      </tr>
    `;
  });
}

// Message show
function showToast(msg) {
  const toast = document.createElement("div");
  toast.innerText = msg;
  toast.className = "toast";
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => toast.remove(), 2500);
}

// show report of class
function showReport() {
  if (students.length === 0) {
    alert("No students added yet");
    return;
  }

  let totalPercentage = 0;
  let highest = students[0];
  let lowest = students[0];

  students.forEach((stu) => {
    totalPercentage += stu.percentage;

    // Highest percentage
    if (stu.percentage > highest.percentage) {
      highest = stu;
    }

    //Lowest percentage
    if (stu.percentage < lowest.percentage) {
      lowest = stu;
    }
  });

  //average of all students
  let average = totalPercentage / students.length;

  //showing to ui
  let resultDiv = document.getElementById("report");
  resultDiv.innerHTML = `
        <div class="student-class-card" >
        <h3>Class Report </h3>
            <p>Total Students: ${students.length}</p>
            <p>Average Percentage: ${average.toFixed(2)}%</p>
            <p> Topper : ${highest.name} </p>
            <p> Lower : ${lowest.name} </p>
        </div>
    `;

  showToast("Class Report Generated ✅");
}

// Enter key
document.getElementById("stu-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addStudent();
  }
});
