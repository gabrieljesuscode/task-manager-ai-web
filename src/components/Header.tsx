interface HeaderProps {
    onNewTask: () => void;
    onCategorize: () => void;
}


export default function Header({
    onNewTask,
    onCategorize
}: HeaderProps) {
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
            + New Task
            </button>

            <button
            onClick={onCategorize}
            className="rounded-lg bg-indigo-700 px-5 py-3 font-medium text-white transition hover:bg-indigo-800"
            >
            AI Categorize
            </button>
        </div>
    </div>
    )
}