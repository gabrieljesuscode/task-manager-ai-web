import type { ReactNode } from "react";

interface FilterProps {
    categories: ReactNode[];
}

export function Filter({ categories }: FilterProps) {
    return (
        <div className="flex items-center gap-2">
            <span>
                Categorias:
            </span>
            <div className="flex gap-2">
                {
                categories.length > 0 ? 
                    categories.map(value => (
                        <button className="rounded-lg px-3 py-2 bg-slate-200">
                            { value }
                        </button>
                    ))
                    :
                    "Nenhuma categoria gerada"
                }
            </div>
        </div>
    )
}