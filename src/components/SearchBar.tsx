import { Search, X } from 'lucide-react'
import { useRef, useState } from 'react'

interface SearchBarProps {
    setTitleSearch: (title: string) => void
}


export function SearchBar( { setTitleSearch }: SearchBarProps ) {
    const [ title, setTitle ] = useState("");
    const inputRef = useRef<HTMLInputElement>(null) // 2. Crie a referência para o input

    const scrollToTasks = () => {
        const tasksElement = document.getElementById('tasks-section');
        if (tasksElement) {
            tasksElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    const handleSetTitleSearch = () => {
        const query = title.trim();

        setTitleSearch(query);

        inputRef.current?.blur()

        if (query !== "") scrollToTasks();
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleSetTitleSearch();
    }


    const handleClear = () => {
        setTitle("")
        setTitleSearch("")
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setTitle(value)

        // Se o usuário apagou tudo reseta automaticamente
        if (value.trim() === "") setTitleSearch("")
    }

    return (
        <div className="flex w-full md:w-100 border items-center border-slate-400 rounded-full bg-white shadow-sm hover:shadow-md">
            <button className="cursor-pointer active:opacity-50 p-1 rounded-bl-full rounded-tl-full">
                <Search
                    className="text-slate-600 ml-3 mr-1"
                    size={22} 
                    onClick={handleSetTitleSearch}
                />
            </button>
            <input 
                type="text" 
                className={`w-full px-2 py-2 rounded-bl-none rounded-tl-none ${title.trim() != "" ? "" : "rounded-full"}`}
                placeholder='Pesquisar...'
                value={title}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />

            {title.trim() !== "" && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                >
                    <X 
                        className='ml-1 mr-2'
                        size={22} 
                    />
                </button>
            )}
        </div>
    )
}