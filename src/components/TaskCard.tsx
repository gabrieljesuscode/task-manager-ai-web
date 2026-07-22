import { Circle, CircleCheckBig, PencilIcon, Trash } from "lucide-react";
import { taskService } from "../api/taskService";
import type { Task } from "../types/task"; 
import { Button } from "./Button";



interface Props {
    task: Task;
    onUpdate: () => void;
    editTask: (task: Task) => void;
    onDelete: (id: number) => void;
    setIsLoading: (bool: boolean) => void;
}

export default function TaskCard({ task, onUpdate, editTask, onDelete, setIsLoading }: Props) {

    const toggleCompleteTask = async () => {
        
        // Atualiza a tarefa no banco de dados com o inverso do task.completed
        await taskService.update(task.id, {
            title: task.title,
            description: task.description,
            completed: !task.completed
        }, setIsLoading)

        onUpdate(); // Atualiza lista da tela principal
    }

    return (
        <div className={`rounded-xl border  p-6 shadow-sm transition hover:shadow-md ${task.completed ? "border-green-500 border-2 bg-green-50" : "border-slate-200 bg-white"}`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                
                <div onClick={toggleCompleteTask} className="flex flex-col items-center text-center md:text-start md:items-start">
                    <div className="flex items-center gap-2">

                        <button>
                            {task.completed ?
                                <CircleCheckBig className="text-green-500 text-lg" />
                                : 
                                <Circle className="text-slate-500 text-lg" />
                            }
                        </button>
                        
                        <h2 className="text-xl font-semibold text-slate-800">
                            {task.title}
                        </h2>
                    </div>
                    
                    <p className="mt-2 text-slate-600">
                        {task.description ?? "Nenhuma descrição adicionada"}
                    </p>
                </div>                
            
            
                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium text-center ${
                    task.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                    {task.completed ? "Completo" : "Pendente"}
                </span>

            </div>

        

            <div className="mt-5 flex items-center md:items-start justify-between">
                <div className="flex md:items-center gap-2 flex-col md:flex-row">
                    <span className="rounded-md bg-blue-100 px-4 py-1 text-sm text-slate-700">
                        {task.category ?? "Sem Categoria"}
                    </span>
                    
                </div>
                
                <div className="space-x-2">
                    <Button
                        className="bg-slate-200 hover:bg-slate-300 border border-slate-200 font-medium" 
                        text={(<PencilIcon size={20}/>)}
                        onClick={() => editTask(task)}
                    />


                    <Button
                        className="border-red-500 bg-none border hover:text-white hover:bg-red-600 text-red-500 font-medium mt-1" 
                        text={(<Trash size={20}/>)} 
                        onClick={() => onDelete(task.id)}
                    />
                </div>
            </div>
        </div>
    )
}
