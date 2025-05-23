import React from 'react'

export type SelectOption = {
  value: string
  label: string
}

type Props = {
  label?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  options: SelectOption[]
  className?: string
}

export const Select: React.FC<Props> = ({ label, value, onChange, options, className = '' }) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
