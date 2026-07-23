import { useState } from "react";
import { taskService } from "../api/taskService";
import { Button } from "./Button";
import { Sparkles } from "lucide-react";
import { SearchBar } from "./SearchBar";

interface HeaderProps {
    onNewTask: () => void;
    onCategorize: () => void;
    categoriesOn: boolean;
    setCategoriesOn: (arg: boolean) => void;
    setTitleSearch: (title: string) => void;
}


export default function Header({
    onNewTask,
    onCategorize,
    categoriesOn,
    setCategoriesOn,
    setTitleSearch
}: HeaderProps) {

    const [isLoading, setIsLoading] = useState(false)


    const handleCategorizeTasks = async () => {
        if (categoriesOn) return; // Se todas as tasks estão atualizadas bloqueia a ação
        setCategoriesOn(true);
        
        setIsLoading(true)
        await taskService.categorize(setIsLoading);

        onCategorize();// Atualiza todas as tasks da lista principal

        setIsLoading(false);

    }

    return (
    <div className="mb-5 flex flex-col items-center gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
        <div className="flex flex-col items-center md:items-start">
            <h1 className="text-4xl font-bold text-slate-800 text-center md:text-start hover:cursor-pointer" onClick={() => window.location.reload()}>
                <a onClick={window.location.reload}>Gerenciador de Tarefas</a>
            </h1>

            <p className="mt-2 text-slate-500 text-center md:text-start">
                Organize suas tarefas com IA
            </p>
        </div>

        <div className="flex items-center justify-center md:justify-between w-full flex-col md:flex-row gap-4">
            
            <div className="w-full md:w-auto">
                <SearchBar setTitleSearch={setTitleSearch}/>
            </div>
            

            <div className="flex gap-3 flex-col md:flex-row w-full md:w-auto">
                <Button
                    className="bg-green-600 hover:bg-green-700 font-medium text-white" 
                    text="+ Nova Tarefa" 
                    onClick={onNewTask}
                />
                <Button
                    className={categoriesOn ? "bg-none border-2 border-indigo-700/40 text-indigo-700/40" : "text-white bg-indigo-700 hover:bg-indigo-800"}
                    text= {
                        isLoading ? 
                        "Atualizando..." 
                        : 
                        (
                            <div className="flex justify-center gap-2">
                                <Sparkles/>
                                <span>
                                    Gerar Categorias
                                </span>    
                            </div>
                        )
                    }
                    onClick={handleCategorizeTasks}
                />
            </div>
        </div>        
    </div>
    )
}