import { useState } from "react";
import { taskService } from "../api/taskService";

interface HeaderProps {
    onNewTask: () => void;
    onCategorize: () => void;
    categoriesOn: boolean;
    setCategoriesOn: (arg: boolean) => void
}


export default function Header({
    onNewTask,
    onCategorize,
    categoriesOn,
    setCategoriesOn
}: HeaderProps) {

    const [isLoading, setIsLoading] = useState(false)


    const handleCategorizeTasks = async () => {
        if (categoriesOn) return; // Se todas as tasks estão atualizadas bloqueia a ação
        
        setIsLoading(true)
        await taskService.categorize();

        onCategorize();// Atualiza todas as tasks da lista principal
        setCategoriesOn(false);

        setIsLoading(false);

    }

    return (
    <div className="mb-10 flex items-center justify-between">
        <div>
            <h1 className="text-4xl font-bold text-slate-800">
            Lista de Tarefas com IA
            </h1>

            <p className="mt-2 text-slate-500">
                Organize suas tarefas com IA
            </p>
        </div>

        <div className="flex gap-3">
            <button
            onClick={onNewTask}
            className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
            >
            Nova Tarefa
            </button>

            <button
            onClick={handleCategorizeTasks}
            className={`rounded-lg  px-5 py-3 font-medium transition 
                ${categoriesOn ? "bg-none border-2 border-indigo-700/40 text-indigo-700/40" : "text-white bg-indigo-700 hover:bg-indigo-800"}`}
            >
            {isLoading ? "Atualizando..." : "Categorizar com IA"}
            </button>
        </div>
    </div>
    )
}