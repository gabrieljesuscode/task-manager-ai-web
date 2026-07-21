import { useEffect, useState } from "react";
import { api } from "../api/api";
import type { Task } from "../types/task";
import TaskCard from "../components/TaskCard";
import Header from "../components/Header";
import TaskFormModal from "../components/TaskFormModal";

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [modalOpen, setModalOpen] = useState(false)

    const onNewTask = () => setModalOpen(!modalOpen)
    const onCategorize = () => console.log("two")

    
    useEffect(() => {
        async function loadTasks() {
            const response = await api.get("/tasks");

            setTasks(response.data);
        }

        loadTasks();
    }, []);

    return (
        <div className="min-h-screen bg-slate-100">
            <TaskFormModal isOpen={modalOpen} />
            <div className="mx-auto max-w-5xl p-8">
                <Header onNewTask={onNewTask} onCategorize={onCategorize}/>
                
                <div className="mt-8 space-y-4">
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>

            </div>
            
        </div>
    );
}