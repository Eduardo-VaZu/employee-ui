import { useEffect, useState } from 'react';
import { Employee } from '../types/employee';
import { EmployeeService } from '../services/EmployeeService';

export const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const response = await EmployeeService.getAll();
            setEmployees(response.data.content);
        } catch (error) {
            console.error("Error cargando empleados", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if(confirm('¿Estás seguro de eliminar este empleado?')) {
            await EmployeeService.delete(id);
            loadEmployees();
    }

    if (loading) return <div className="text-center mt-5">Cargando...</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Lista de Empleados 🚀</h2>
            <table className="table table-striped table-hover shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Salario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.firstname} {emp.lastname}</td>
                            <td>{emp.email}</td>
                            <td>{emp.phone || '-'}</td>
                            <td>${emp.salary.toLocaleString()}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => emp.id && handleDelete(emp.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};