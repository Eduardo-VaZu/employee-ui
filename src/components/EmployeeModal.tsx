import { useEffect, useState } from 'react';
import type { Employee } from '../types/employee';
import { EmployeeService } from '../services/EmployeeService';

interface Props {
    show: boolean;
    handleClose: () => void;
    employeeId?: number | null;
    onSuccess: () => void;
}

const initialEmployee: Employee = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    salary: 0
};

export const EmployeeModal = ({ show, handleClose, employeeId, onSuccess }: Props) => {
    const [employee, setEmployee] = useState<Employee>(initialEmployee);
    const [error, setError] = useState<string>('');


    useEffect(() => {

        const loadEmployee = async (id: number) => {
            try {
                const response = await EmployeeService.getById(id);
                setEmployee(response.data);
            } catch (err) {
                console.error(err);
                setError("Error al cargar el empleado");
            }
        };

        if (employeeId) {
            loadEmployee(employeeId);
        }
    }, [employeeId]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployee(prev => ({
            ...prev,
            [name]: name === 'salary' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (employeeId) {
                await EmployeeService.update(employeeId, employee);
            } else {
                await EmployeeService.create(employee);
            }
            onSuccess();
            handleClose();
        } catch (err) {
            console.error(err);
            setError("Error al guardar. Verifica los datos.");
        }
    };

    if (!show) return null;

    return (
        <>
            {/* Fondo oscuro del modal */}
            <div className="modal-backdrop show"></div>

            {/* Modal */}
            <div className="modal d-block" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content shadow-lg rounded-4 border-0">
                        <div className="modal-header bg-primary text-white rounded-top-4">
                            <h5 className="modal-title fw-bold">
                                {employeeId ? '✏️ Editar Empleado' : '✨ Nuevo Empleado'}
                            </h5>
                            <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body p-4">
                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="firstname" name="firstname"
                                                placeholder="Nombre" value={employee.firstname} onChange={handleChange} required />
                                            <label htmlFor="firstname">Nombre</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="lastname" name="lastname"
                                                placeholder="Apellido" value={employee.lastname} onChange={handleChange} required />
                                            <label htmlFor="lastname">Apellido</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="email" name="email"
                                        placeholder="name@example.com" value={employee.email} onChange={handleChange} required />
                                    <label htmlFor="email">Email Corporativo</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="phone" name="phone"
                                        placeholder="Teléfono" value={employee.phone || ''} onChange={handleChange} />
                                    <label htmlFor="phone">Teléfono (Opcional)</label>
                                </div>

                                <div className="form-floating mb-4">
                                    <input type="number" className="form-control" id="salary" name="salary"
                                        placeholder="0.00" value={employee.salary} onChange={handleChange} required min="1" step="0.01" />
                                    <label htmlFor="salary">Salario Mensual ($)</label>
                                </div>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="button" className="btn btn-light me-md-2" onClick={handleClose}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary px-4 fw-bold">
                                        {employeeId ? 'Actualizar' : 'Guardar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};