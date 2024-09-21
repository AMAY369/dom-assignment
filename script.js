const button = document.getElementById('submit-btn');
const studentList = document.querySelector(".right");
let students = JSON.parse(localStorage.getItem('students')) || [];



let editIndex = -1;

button.addEventListener('click', () => {
  const form = document.getElementById('student-form');
  const name = document.getElementById('name').value;
  const studentId = document.getElementById('student-id').value;
  const email = document.getElementById('email').value;
  const contact = document.getElementById('contact').value;

  // Check if form is valid
  if (form.checkValidity()) {
    const newStudent = { name, studentId, email, contact };

    if (editIndex === -1) {
      students.push(newStudent);
    } else {
      students[editIndex] = newStudent;
      editIndex = -1;
    }

    localStorage.setItem('students', JSON.stringify(students));
    clearForm();
    renderDetails();
  } else {
    form.reportValidity();
  }
});


// rending the students details
function renderDetails() {
  studentList.innerHTML = `
    <div class="_ele">
      <div>Student Name</div>
      <div>Student ID</div>
      <div>Email ID</div>
      <div>Contact No.</div>
      <div>Action</div>
    </div>
  `;
  students.forEach((student, index) => {
    const ele = document.createElement('div');
    ele.classList.add("_ele");
    ele.innerHTML = `
      <div>${student.name}</div>
      <div>${student.studentId}</div>
      <div>${student.email}</div>
      <div>${student.contact}</div>
      <div>
        <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </div>`;
    studentList.appendChild(ele);
  });
}


// clear form after adding student 
function clearForm() {
  document.getElementById('name').value = '';
  document.getElementById('student-id').value = '';
  document.getElementById('email').value = '';
  document.getElementById('contact').value = '';
}


// delete student from dom and localStorage
function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(students));
  renderDetails();
}

function editStudent(index) {
  const student = students[index];
  document.getElementById('name').value = student.name;
  document.getElementById('student-id').value = student.studentId;
  document.getElementById('email').value = student.email;
  document.getElementById('contact').value = student.contact;
  editIndex = index;
}

renderDetails();
