interface ButtonProps {
    text: string;
    className: string;
    onClick: () => void;
}

export function Button ({ text, className, onClick }: ButtonProps) {

    return <button 
            className={`rounded-lg px-5 py-3 text-sm font-medium transition ${className}`}
            onClick={onClick}
        >
            { text }
        </button>
}


            // <button
            // onClick={onNewTask}
            // className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
            // >
            // Nova Tarefa
            // </button>