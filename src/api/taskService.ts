import api from "./api"
import type { TaskUpdate, TaskCreate } from "../types/task"


export const taskService = {

    async getAll(setIsLoading: (bool: boolean) => void) {

        setIsLoading(true)

        try {
            return await api.get("/tasks")
        } finally {
            setIsLoading(false)
        }

    },

    async create(task: TaskCreate, setIsLoading: (bool: boolean) => void) {
        setIsLoading(true)

        try {
            return await api.post(`/tasks`, task)
        } finally {
            setIsLoading(false)
        }
    },

    async update(id: number, task: TaskUpdate, setIsLoading: (bool: boolean) => void) {
        setIsLoading(true)

        try {
            return await api.put(`/tasks/${id}`, task)
        } finally {
            setIsLoading(false)
        }
    },

    async remove(id: number, setIsLoading: (bool: boolean) => void) {
        setIsLoading(true)

        try {
            return await api.delete(`/tasks/${id}`)
        } finally {
            setIsLoading(false)
        }
    },

    async categorize(setIsLoading: (bool: boolean) => void) {
        setIsLoading(true)

        try {
            return await api.get("/ai/categorize")
        } finally {
            setIsLoading(false)
        }
    }
}

// taskService.getAll()
// taskService.create()
// taskService.update()
// taskService.delete()
// taskService.categorize()