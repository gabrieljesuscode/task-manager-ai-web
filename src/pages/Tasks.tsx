import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import TaskCard from "../components/TaskCard";
import Header from "../components/Header";
import TaskFormModal from "../components/TaskFormModal";
import { taskService } from "../api/taskService";
import { ConfirmModal } from "../components/ConfirmModal";
import { Filter } from "../components/Filter";
import { Loading } from "../components/Loading";

export default function Tasks() {
    // Header
    const [allHaveCategories, setAllHaveCategories] = useState(true);
    const [titleToSearch, setTitleToSearch] = useState("");

    // Loading
    const [isLoading, setIsLoading] = useState(false);

    // TaskFormModal
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

    // ConfirmModal
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [idConfirm, setIdConfirm] = useState<number>(0);

    // Filter
    const [categorySelect, setCategorySelect] = useState("");

    // TaskCard
    const [tasks, setTasks] = useState<Task[]>([]);



    // Header
    const handleCategoriesUpdate = (task_list: Record<string, unknown>[]) => {
        // Procura se pelo menos uma task está sem categoria
        const anyNoCategory = task_list.some(value => value.category == null);
        
        // Se tiver todas as categorias será TRUE, se não tiver será FALSE
        setAllHaveCategories(!anyNoCategory);
    }

    const handleNewTask = () => {
        setFormModalOpen(true);
        setSelectedTask(undefined);
    }

    // TaskCard
    const handleEditTask = (task: Task) => {
        setFormModalOpen(true);
        setSelectedTask(task);
    }

    const handleConfirmModal = (id: number) => {
        setConfirmModalOpen(true);
        setIdConfirm(id);
    }

    const handleFetchTasks = async () => {
        setIsLoading(true)
        
        const response = await taskService.getAll(setIsLoading);

        handleCategoriesUpdate(response.data)
        
        setTasks(response.data);
    }

    // ConfirmModal
    const handleDeleteUpdate = () => {
        handleFetchTasks()
    }

    // TaskFormModal
    const handleCloseModal = () => {
        setFormModalOpen(false);
        setSelectedTask(undefined);
    }

    // Filter
    const handleGetCategories = () => {
        const categories = tasks
            .filter(task => task.category != null)
            .filter(task => titleToSearch === "" || task.title.toLowerCase().includes(titleToSearch.toLowerCase()))
            .map(task => task.category as string);

        // O Set remove todas as duplicadas
        const categoriesNoRepeat = Array.from(new Set(categories));
        
        const finalCategories = ["Todas", ...categoriesNoRepeat]

        return finalCategories;
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
            const response = await taskService.getAll(setIsLoading);

            handleCategoriesUpdate(response.data)
            
            setTasks(response.data);
        }
        loadTasks();
    }, []);
    


    return (
        <div className="min-h-screen bg-slate-100">

            <Loading isLoading={isLoading} />
            
            <ConfirmModal 
                isOpen={confirmModalOpen} 
                onClose={() => setConfirmModalOpen(false)} 
                taskId={idConfirm} 
                updateList={handleDeleteUpdate}
                setIsLoading={setIsLoading}
            />
            
            <TaskFormModal 
                initialTask={selectedTask} 
                isOpen={formModalOpen} 
                onClose={handleCloseModal} 
                onTaskCreated={handleFetchTasks}
                setIsLoading={setIsLoading}
            />
            
            <div className="mx-auto max-w-5xl p-8">

                <Header 
                    onNewTask={handleNewTask} 
                    onCategorize={handleFetchTasks} 
                    categoriesOn={allHaveCategories} 
                    setCategoriesOn={setAllHaveCategories}
                    setTitleSearch={setTitleToSearch}
                />
                
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
                        .filter(task => titleToSearch === "" || task.title.toLowerCase().includes(titleToSearch.toLowerCase()))
                        .map((task) => (
                            <TaskCard 
                                key={task.id} 
                                task={task} 
                                onUpdate={handleFetchTasks} 
                                editTask={handleEditTask} 
                                onDelete={handleConfirmModal}
                                setIsLoading={setIsLoading}
                            />
                        ))
                        : 
                        <p className="bg-slate-200 px-3 py-2 rounded-lg text-center text-slate-600">
                            Nenhuma Tarefa Adicionada 
                        </p>
                    }
                </div>

            </div>
            
        </div>
    );
}