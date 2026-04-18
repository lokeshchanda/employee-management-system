// Replace FULL script.js with this final fixed version
// Solves: name becomes null after update

const api = "http://localhost:8081/api/employees";

let editId = null;
let employeeData = [];

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

/* Load Employees */
function loadEmployees() {

    fetch(api)
    .then(res => res.json())
    .then(data => {

        employeeData = data;

        document.getElementById("totalCount").innerText = data.length;

        const text =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

        let rows = "";

        data
        .filter(emp =>
            (emp.name || "").toLowerCase().includes(text) ||
            (emp.email || "").toLowerCase().includes(text) ||
            (emp.department || "").toLowerCase().includes(text)
        )
        .forEach(emp => {

            rows += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
                <td>${emp.salary}</td>
                <td>
                    <button onclick="editEmployee(${emp.id})">Edit</button>
                    <button onclick="deleteEmployee(${emp.id})">Delete</button>
                </td>
            </tr>
            `;
        });

        document.getElementById("employeeTable").innerHTML = rows;
    });
}

/* Add */
function addEmployee() {

    const employee = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim(),
        salary: parseFloat(document.getElementById("salary").value)
    };

    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    })
    .then(() => {
        clearForm();
        loadEmployees();
        alert("Employee Added");
    });
}

/* Edit */
function editEmployee(id) {

    const emp = employeeData.find(e => e.id == id);

    editId = id;

    document.getElementById("name").value = emp.name || "";
    document.getElementById("email").value = emp.email || "";
    document.getElementById("department").value = emp.department || "";
    document.getElementById("salary").value = emp.salary || "";
}

/* Update */
function updateEmployee() {

    if (editId == null) {
        alert("Click Edit First");
        return;
    }

    const employee = {
        id: editId,
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim(),
        salary: parseFloat(document.getElementById("salary").value)
    };

    fetch(api + "/" + editId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    })
    .then(() => {
        clearForm();
        loadEmployees();
        editId = null;
        alert("Employee Updated");
    });
}

/* Delete */
function deleteEmployee(id) {

    fetch(api + "/" + id, {
        method: "DELETE"
    })
    .then(() => {
        loadEmployees();
        alert("Employee Deleted");
    });
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("department").value = "";
    document.getElementById("salary").value = "";
}

function exportCSV() {
    alert("Export Ready");
}

loadEmployees();