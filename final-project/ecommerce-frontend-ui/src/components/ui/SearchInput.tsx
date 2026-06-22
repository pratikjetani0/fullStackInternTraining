interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full
        rounded-xl
        border
        bg-white
        px-4
        py-3
        outline-none
      "
    />
  );
}
