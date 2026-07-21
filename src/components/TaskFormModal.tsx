
interface ModalProps {
    isOpen: boolean
}

export default function TaskFormModal({ isOpen }: ModalProps) {
    if (!isOpen) return null;


    return (
        <div className="min-h-screen mx-auto bg-slate-500 z-10 absolute">
            <div className="">
                <div>
                    <p>Título:</p>
                    <input type="text" placeholder="Título da Tarefa"/>
                    <p>Descrição(Opcional):</p>
                    <input type="text" placeholder="Descrição da Tarefa(Opcional)"/>
                </div>
            </div>
        </div>
    )
}