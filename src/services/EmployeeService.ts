import axios from 'axios';
import { Employee } from '../types/employee';

const API_URL = 'http://localhost:8080/api/v1/employees';

export const EmployeeService = {
    getAll: async () => {
        return await axios.get<{ content: Employee[] }>(API_URL);
    },

    create: async (employee: Employee) => {
        return await axios.post<Employee>(API_URL, employee);
    },

    delete: async (id: number) => {
        return await axios.delete(`${API_URL}/${id}`);
    }
}