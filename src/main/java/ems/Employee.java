package ems;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String email;
    private String department;
    private double salary;

    public Employee() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String employeeName) {
        this.name = employeeName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String employeeEmail) {
        this.email = employeeEmail;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String employeeDepartment) {
        this.department = employeeDepartment;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double employeeSalary) {
        this.salary = employeeSalary;
    }
}