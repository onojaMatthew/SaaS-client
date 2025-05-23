import { Select } from "../common/Select"

type Props = {
  filter: string
  setFilter: (val: string) => void
}

export default function RecommendationFilters({ filter, setFilter }: Props) {
  return (
    <div className="flex gap-4 items-center mb-4">
      <label className="text-sm">Filter by:</label>
      <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        options={[
          { label: 'All', value: 'all' },
          { label: 'Content-Based', value: 'content' },
          { label: 'Collaborative', value: 'collab' },
          { label: 'Hybrid', value: 'hybrid' },
        ]}
      />
    </div>
  )
}
