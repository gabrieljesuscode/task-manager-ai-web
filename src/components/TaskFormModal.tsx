import { useState } from "react";
import { taskService } from "../api/taskService";
import { Input } from "./Input";
import { Button } from "./Button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTaskCreated: () => void;
}

export default function TaskFormModal({ isOpen, onClose, onTaskCreated }: ModalProps) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")


    if (!isOpen) return null;

    const handleCreateTask = async () => {
        if (!title) return window.alert("Título é obrigatório para a tarefa");

        await taskService.create({
            title,
            description,
        });

        setTitle("");
        setDescription("");

        onTaskCreated(); // Atualiza Lista principal
        onClose();
    }


    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40" onClick={onClose}>
            <div className="bg-white rounded-md w-2xl px-10 py-7" onClick={e => e.stopPropagation()}>
                <div className=" ">
                    <h2 className="text-lg font-medium">
                        Nova Tarefa
                    </h2>

                    <div className="">
                      
                        <Input label="Título:" placeholder="Ex.: Compras no mercado" value={title} updateValue={setTitle}/>        
            
                        <Input label="Descrição(Opcional):" placeholder="Ex.: 1 kg de feijão, 1 kg de arroz" value={description} updateValue={setDescription}/>

                    </div>

                    <div className="flex justify-between mt-5">
                        <Button className="bg-green-600 hover:bg-green-700 text-white" text="Adicionar Tarefa" onClick={handleCreateTask}/>

                        <Button className="bg-red-600 hover:bg-red-700 text-white" text="Cancelar" onClick={onClose}/>
                    </div>

                </div>
            </div>
        </div>
    )
}
