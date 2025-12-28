import axios from 'axios';
import type { Employee } from '../types/employee';

const API_URL = 'http://localhost:8080/api/v1/employees';

export const EmployeeService = {
    
    getAll: async () => {
        return await axios.get<{ content: Employee[] }>(API_URL);
    },

    getById: async (id: number) => {
        return await axios.get<Employee>(`${API_URL}/${id}`);
    },

    create: async (employee: Employee) => {
        return await axios.post<Employee>(API_URL, employee);
    },

    update: async (id: number, employee: Employee) => {
        return await axios.put<Employee>(`${API_URL}/${id}`, employee);
    },

    delete: async (id: number) => {
        return await axios.delete(`${API_URL}/${id}`);
    }
}