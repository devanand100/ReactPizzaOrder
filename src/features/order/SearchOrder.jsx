import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        className="input w-28 sm:w-72 sm:focus:w-80 transition-width duration-200 text-black"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Order"
      />

      <button className="absolute right-3 top-[12px] stroke-stone-500 fill-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6"
          viewBox="0 0 512 512"
        >
          <path
            d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
            strokeMiterlimit="10"
            strokeWidth="32"
          />
          <path
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M338.29 338.29L448 448"
          />
        </svg>
      </button>
    </form>
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
}

export default SearchOrder;
