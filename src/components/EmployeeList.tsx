import { useEffect, useState } from 'react';
import type { Employee } from '../types/employee';
import { EmployeeService } from '../services/EmployeeService';
import { EmployeeModal } from './EmployeeModal';

export const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        setLoading(true);
        try {
            const response = await EmployeeService.getAll();
            setEmployees(response.data.content); 
        } catch (error) {
            console.error("Error cargando empleados", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedId(null);
        setShowModal(true);
    }

    const handleEdit = (id: number) => {
        setSelectedId(id);
        setShowModal(true);
    }

    const handleDelete = async (id: number) => {
        if(confirm('¿Estás seguro de eliminar este empleado?')) {
            await EmployeeService.delete(id);
            loadEmployees();
        }
    }

    const handleSuccess = () => {
        loadEmployees();
        setShowModal(false);
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-header bg-white py-4 d-flex justify-content-between align-items-center rounded-top-4">
                    <div>
                        <h2 className="mb-0 fw-bold text-primary">Gestión de Empleados</h2>
                        <p className="text-muted mb-0">Administra tu equipo de forma eficiente</p>
                    </div>
                    <button className="btn btn-primary btn-lg rounded-pill px-4 shadow-sm" onClick={handleCreate}>
                        <span className="me-2">＋</span> Nuevo Empleado
                    </button>
                </div>
                
                <div className="card-body p-0">
                    {loading ? (
                        <div className="text-center p-5">
                            <div className="spinner-border text-primary" role="status"></div>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="ps-4 py-3">Nombre Completo</th>
                                        <th>Contacto</th>
                                        <th>Salario</th>
                                        <th className="text-end pe-4">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((emp) => (
                                        <tr key={emp.id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-2 me-3 fw-bold" style={{width: '40px', height: '40px', textAlign: 'center'}}>
                                                        {emp.firstname.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="fw-bold">{emp.firstname} {emp.lastname}</div>
                                                        <small className="text-muted">ID: {emp.id}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column">
                                                    <span>📧 {emp.email}</span>
                                                    {emp.phone && <small className="text-muted">📞 {emp.phone}</small>}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">
                                                    ${emp.salary.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="text-end pe-4">
                                                <button 
                                                    className="btn btn-outline-primary btn-sm me-2 rounded-pill px-3"
                                                    onClick={() => emp.id && handleEdit(emp.id)}
                                                >
                                                    Editar
                                                </button>
                                                <button 
                                                    className="btn btn-outline-danger btn-sm rounded-pill px-3"
                                                    onClick={() => emp.id && handleDelete(emp.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {employees.length === 0 && (
                                <div className="text-center py-5 text-muted">
                                    No hay empleados registrados. ¡Crea el primero!
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <EmployeeModal 
                show={showModal} 
                handleClose={() => setShowModal(false)}
                employeeId={selectedId}
                onSuccess={handleSuccess}
            />
        </div>
    );
};