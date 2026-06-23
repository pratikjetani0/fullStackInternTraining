import { useSearchStore } from "../../app/store/search.store";


export default function NavbarSearch() {
  const search = useSearchStore(
    (state) => state.search,
  );

  const setSearch = useSearchStore(
    (state) => state.setSearch,
  );

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="
        w-[50%]
        rounded-xl
        border
        border-slate-300
        bg-slate-50
        px-4
        py-2
        outline-none
        focus:border-black
      "
    />
  );
}