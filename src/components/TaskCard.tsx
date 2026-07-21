import type { Task } from "../types/task"; 


interface Props {
    task: Task
}

export default function TaskCard({ task }: Props) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between">
                
                
                <div>
                    <h2 className="text-xl font-semibold text-slate-800">
                        {task.title}
                    </h2>

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
                    <button className="rounded-lg bg-slate-200 px-4 py-2 font-medium transition hover:bg-slate-300">
                        Editar
                    </button>

                    <button className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600">
                        Remover
                    </button>
                </div>
            </div>
        </div>
    )
}
