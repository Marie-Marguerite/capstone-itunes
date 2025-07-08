// src/components/filters/MainMediaFilter.jsx

import { useFilterContext } from "../../contexts/FilterContext";

const mediaOptions = [
  { value: "all", label: "All" },
  { value: "music", label: "Music" },
  { value: "books", label: "Books" }, // includes audiobooks and eBooksl
  { value: "pods", label: "Podcasts" },
];

export default function MainMediaFilter() {
  const { mediaFilterGroup, setMediaFilterGroup } = useFilterContext();

  return (
    <>
      <label htmlFor="mediaFilter">Media Type:</label>
      <select
        id="mediaFilter"
        value={mediaFilterGroup}
        onChange={(event) => setMediaFilterGroup(event.target.value)}
      >
        {mediaOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
