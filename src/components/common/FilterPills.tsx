interface FilterPillsProps<T extends string> {
  options: { id: T; label: string }[]
  active: T
  onChange: (id: T) => void
  /** Accessible name for the group */
  label: string
}

export function FilterPills<T extends string>({ options, active, onChange, label }: FilterPillsProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {options.map(({ id, label: text }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm ${
              isActive
                ? 'border-accent bg-accent text-white shadow-sm'
                : 'border-gray-200 bg-white text-gray-700 hover:border-accent/50 hover:text-accent'
            }`}
          >
            {text}
          </button>
        )
      })}
    </div>
  )
}

export default FilterPills