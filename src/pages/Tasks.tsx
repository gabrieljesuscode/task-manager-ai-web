import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import TaskCard from "../components/TaskCard";
import Header from "../components/Header";
import TaskFormModal from "../components/TaskFormModal";
import { taskService } from "../api/taskService";
import { ConfirmModal } from "../components/ConfirmModal";
import { Filter } from "../components/Filter";

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [idConfirm, setIdConfirm] = useState<number>(0);
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
    const [allHaveCategories, setAllHaveCategories] = useState(true);
    const [categorySelect, setCategorySelect] = useState("")

    const handleCategoriesUpdate = (task_list: Record<string, unknown>[]) => {
        // Procura se pelo menos uma task está sem categoria
        const anyNoCategory = task_list.some(value => value.category == null);
        
        // Se tiver todas as categorias será TRUE, se não tiver será FALSE
        setAllHaveCategories(!anyNoCategory);
    }

    const handleEditTask = (task: Task) => {
        setFormModalOpen(true);
        setSelectedTask(task);
    }

    const handleConfirmModal = (id: number) => {
        setConfirmModalOpen(true)
        setIdConfirm(id)
    }

    const handleCloseModal = () => {
        setFormModalOpen(false);
        setSelectedTask(undefined);
    }

    const handleNewTask = () => {
        setFormModalOpen(true);
        setSelectedTask(undefined);
    }

    const handleGetCategories = () => {
        const categories = tasks
            .filter(task => task.category != null)
            .map(task => task.category as string);

        // O Set remove todas as duplicadas
        const categoriesNoRepeat = Array.from(new Set(categories));
        
        return categoriesNoRepeat;
        
    }

    const handleFetchTasks = async () => {
        const response = await taskService.getAll();

        handleCategoriesUpdate(response.data)
        
        setTasks(response.data);
    }
    
    const handleFilterTasks = (category: string) => {
        if (categorySelect === category) {
            setCategorySelect("");
        } else {
            setCategorySelect(category);
        }
    }

    useEffect(() => {
        async function loadTasks() {
            // Repete a handleFecth Tasks apenas para não acusar erro no linter
            const response = await taskService.getAll();

            handleCategoriesUpdate(response.data)
            
            setTasks(response.data);
        }
        loadTasks();
    }, []);
    


    return (
        <div className="min-h-screen bg-slate-100">
            
            <ConfirmModal isOpen={confirmModalOpen} onClose={() => setConfirmModalOpen(false)} taskId={idConfirm} updateList={handleFetchTasks}/>
            
            <TaskFormModal initialTask={selectedTask} isOpen={formModalOpen} onClose={handleCloseModal} onTaskCreated={handleFetchTasks}/>
            
            <div className="mx-auto max-w-5xl p-8">

                <Header onNewTask={handleNewTask} onCategorize={handleFetchTasks} categoriesOn={allHaveCategories} setCategoriesOn={setAllHaveCategories}/>
                
                <Filter 
                    categories={handleGetCategories()} 
                    selectCategory={handleFilterTasks}
                    selectedCategory={categorySelect}
                />
                
                <div className="mt-5 space-y-4">
                    {
                        tasks.length > 0 ? 
                        tasks
                        .filter(task => categorySelect === "" || task.category === categorySelect)
                        .map((task) => (
                            <TaskCard key={task.id} task={task} onUpdate={handleFetchTasks} editTask={handleEditTask} onDelete={handleConfirmModal}/>
                        ))
                        : "Nenhuma Tarefa Adicionada" 
                    }
                </div>

            </div>
            
        </div>
    );
}