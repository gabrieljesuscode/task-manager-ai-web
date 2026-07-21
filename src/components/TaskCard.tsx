import { Circle, CircleCheckBig } from "lucide-react";
import { taskService } from "../api/taskService";
import type { Task } from "../types/task"; 
import { Button } from "./Button";



interface Props {
    task: Task;
    onUpdate: () => void;
    editTask: (task: Task) => void;
}

export default function TaskCard({ task, onUpdate, editTask }: Props) {

    const handleRemoveTask = async (id: number) => {
        await taskService.remove(id);
        onUpdate();
    }

    const toggleCompleteTask = async () => {
        
        // Atualiza a tarefa no banco de dados com o inverso do task.completed
        await taskService.update(task.id, {
            title: task.title,
            description: task.description,
            completed: !task.completed
        })
        console.log(task.completed)

        onUpdate(); // Atualiza lista da tela principal
    }

    return (
        <div className={`rounded-xl border  p-6 shadow-sm transition hover:shadow-md ${task.completed ? "border-green-500 border-2 bg-green-50" : "border-slate-200 bg-white"}`}>
            <div className="flex items-start justify-between">
                
                <div onClick={toggleCompleteTask}>
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
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                    task.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                    {task.completed ? "Completo" : "Pendente"}
                </span>

            </div>

        

            <div className="mt-5 flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">
                        Categoria:
                    </span>

                    <span className="rounded-md bg-slate-100 px-3 py-1 text-sm text-slate-700">
                        {task.category ?? "Sem Categoria"}
                    </span>
                    
                </div>
                
                <div className="space-x-2">
                    <Button
                        className="bg-slate-200 hover:bg-slate-300 font-medium" 
                        text="Editar" 
                        onClick={() => editTask(task)}
                    />


                    <Button
                        className="bg-red-500 hover:bg-red-600 text-white font-medium" 
                        text="Remover" 
                        onClick={() => handleRemoveTask(task.id)}
                    />
                </div>
            </div>
        </div>
    )
}
