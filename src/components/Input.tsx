interface InputProps {
    label: string;
    placeholder: string;
    value: string;
    updateValue: (value: string) => void
}

export function Input({ label, placeholder, value, updateValue }: InputProps) {
     
    return (
        <div className="flex flex-col gap-1.5">
            <label className="mt-3 text-sm">
                {label}
            </label>
            <input 
                    type="text" 
                    className="w-full rounded-md border-2 border-slate-300 px-3 py-1 text-sm"
                    placeholder={placeholder}
                    id="input"
                    value={value} 
                    onChange={event => updateValue(event.target.value)}
            />
            
        </div>
    )
}