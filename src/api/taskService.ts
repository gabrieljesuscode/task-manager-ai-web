import { api } from "./api"
import type { TaskUpdate, TaskCreate } from "../types/task"


export const taskService = {

    getAll() {
        return api.get("/tasks")
    },

    create(task: TaskCreate) {
        return api.post(`/tasks`, task)
    },

    update(id: number, task: TaskUpdate) {
        return api.put(`/tasks/${id}`, task)
    },

    remove(id: number) {
        return api.delete(`/tasks/${id}`)
    },

    categorize() {
        return api.get("/ai/categorize")
    }
}

// taskService.getAll()
// taskService.create()
// taskService.update()
// taskService.delete()
// taskService.categorize()