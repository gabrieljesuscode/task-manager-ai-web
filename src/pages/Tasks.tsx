import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import TaskCard from "../components/TaskCard";
import Header from "../components/Header";
import TaskFormModal from "../components/TaskFormModal";
import { taskService } from "../api/taskService";

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [modalOpen, setModalOpen] = useState(false)
    const [allHaveCategories, setAllHaveCategories] = useState(false)

    const handleCategoriesUpdate = (task_list: Record<string, unknown>[]) => {
        // Procura se pelo menos uma task está sem categoria
        const anyNoCategory = task_list.some(value => value.category == null);
        
        // Se tiver todas as categorias será TRUE, se não tiver será FALSE
        setAllHaveCategories(!anyNoCategory);
    }


    const handleFetchTasks = async () => {
        const response = await taskService.getAll();

        handleCategoriesUpdate(response.data)
        
        setTasks(response.data);
    }
    
    // ARRUMAR CATEGORIZE PARA IMPEDIR QUE CLIQUE DUAS VEZES COM AS MESMAS TAREFAS
    // ARRUMAR CATEGORIZE NO HEADER COM CARREGAMENTO isLoading()
    // ESTILIZAR MODAL
    
    useEffect(() => {
        async function loadTasks() {
            const response = await taskService.getAll();

            handleCategoriesUpdate(response.data)
            
            setTasks(response.data);
        }
        loadTasks();
    }, []);
    


    return (
        <div className="min-h-screen bg-slate-100">
            <TaskFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onTaskCreated={handleFetchTasks}/>
            <div className="mx-auto max-w-5xl p-8">

                <Header onNewTask={() => setModalOpen(true)} onCategorize={handleFetchTasks} categoriesOn={allHaveCategories} setCategoriesOn={setAllHaveCategories}/>

                <div className="mt-8 space-y-4">
                    {
                        tasks.length > 0 ? 
                        tasks.map((task) => (
                            <TaskCard key={task.id} task={task} onUpdate={handleFetchTasks}/>
                        ))
                        : "Nenhuma Tarefa Adicionada" 
                    }
                </div>

            </div>
            
        </div>
    );
}