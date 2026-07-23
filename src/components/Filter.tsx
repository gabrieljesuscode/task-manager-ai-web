import { Button } from "./Button";

interface FilterProps {
    categories: string[];
    selectCategory: (category: string) => void
    selectedCategory: string
}

export function Filter({ categories, selectCategory, selectedCategory }: FilterProps) {
    
    if (categories.length === 0) return null;

    return (
        <div className="flex items-center gap-2 flex-col md:flex-row">
            <span className="text-slate-500">
                Categorias:
            </span>
            <div className="flex gap-2 flex-wrap justify-center items-center">
                {
                categories.length > 0 ? 
                    categories.map(value => (
                        <Button
                            key={value}
                            text={value}
                            className={`active:scale-80
                                ${
                                    selectedCategory === value || (value === "Todas" && selectedCategory === "") ? "bg-blue-600 text-white" : "bg-slate-200"
                                }`}
                            
                            onClick={value === "Todas" ? () => selectCategory("") : () => selectCategory(value)}
                        />
                    ))
                    :
                    "Nenhuma categoria gerada"
                }
            </div>
        </div>
    )
}