import { useState } from "react";
import { taskService } from "../api/taskService";
import { Button } from "./Button";

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
        setCategoriesOn(true);
        
        setIsLoading(true)
        await taskService.categorize();

        onCategorize();// Atualiza todas as tasks da lista principal

        setIsLoading(false);

    }

    return (
    <div className="mb-5 flex flex-col items-center gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
        <div className="flex flex-col items-center md:items-start">
            <h1 className="text-4xl font-bold text-slate-800 text-center md:text-start">
            Lista de Tarefas com IA
            </h1>

            <p className="mt-2 text-slate-500 text-center md:text-start">
                Organize suas tarefas com IA
            </p>
        </div>

        <div className="flex gap-3 flex-col md:flex-row w-full">
            <Button
                className="bg-green-600 hover:bg-green-700 font-medium text-white" 
                text="+ Nova Tarefa" 
                onClick={onNewTask}
            />
            <Button
                className={categoriesOn ? "bg-none border-2 border-indigo-700/40 text-indigo-700/40" : "text-white bg-indigo-700 hover:bg-indigo-800"}
                text= {isLoading ? "Atualizando..." : "Categorizar com IA"}
                onClick={handleCategorizeTasks}
            />
        </div>
    </div>
    )
}