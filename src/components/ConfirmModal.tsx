import { taskService } from "../api/taskService";
import { Button } from "./Button";

interface ConfirmProps {
    taskId: number;
    isOpen: boolean;
    onClose: () => void;
    updateList: () => void;
    setIsLoading: (bool: boolean) => void;
}

export function ConfirmModal({ taskId, isOpen, onClose, updateList, setIsLoading }: ConfirmProps) {
    if (!isOpen) return null;

    const handleDeleteTask = async () => {
        onClose();

        await taskService.remove(taskId, setIsLoading);
        
        updateList();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40" onClick={onClose}>
            <div className="bg-white rounded-md w-2xl px-10 py-7" onClick={e => e.stopPropagation()}>
                <div className=" ">
                    <h2 className="text-lg font-medium">
                        Remover Tarefa?
                    </h2>

                    <div className="">
                      <p>
                        Deseja mesmo deletar essa tarefa?
                      </p>
                    </div>

                    <div className="flex justify-between mt-5">

                        <Button 
                            className="bg-green-600 hover:bg-green-700 text-white" 
                            text="Confirmar" 
                            onClick={handleDeleteTask}
                        />

                        <Button 
                            className="bg-red-600 hover:bg-red-700 text-white" 
                            text="Cancelar" 
                            onClick={onClose}
                        />

                    </div>

                </div>
            </div>
        </div>
    )
}