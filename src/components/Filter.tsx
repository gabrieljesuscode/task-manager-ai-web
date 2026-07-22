import { Button } from "./Button";

interface FilterProps {
    categories: string[];
    selectCategory: (category: string) => void
    selectedCategory: string
}

export function Filter({ categories, selectCategory, selectedCategory }: FilterProps) {
    return (
        <div className="flex items-center gap-2">
            <span>
                Categorias:
            </span>
            <div className="flex gap-2">
                {
                categories.length > 0 ? 
                    categories.map(value => (
                        <Button
                            key={value}
                            text={value}
                            className={`active:scale-80
                                ${
                                    selectedCategory === value ? "bg-blue-600 text-white" : "bg-slate-200"
                                }`}
                            onClick={() => selectCategory(value)} 
                            
                        />
                    ))
                    :
                    "Nenhuma categoria gerada"
                }
            </div>
        </div>
    )
}