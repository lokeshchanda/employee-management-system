package ems;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private EmployeeRepository repository;

    @GetMapping
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        return repository.save(employee);
    }

    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Integer id,
                                   @RequestBody Employee newEmployee) {

        Optional<Employee> optional = repository.findById(id);

        if (optional.isPresent()) {

            Employee oldEmployee = optional.get();

            oldEmployee.setName(newEmployee.getName());
            oldEmployee.setEmail(newEmployee.getEmail());
            oldEmployee.setDepartment(newEmployee.getDepartment());
            oldEmployee.setSalary(newEmployee.getSalary());

            return repository.save(oldEmployee);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Integer id) {

        repository.deleteById(id);

        return "Employee Deleted";
    }
}