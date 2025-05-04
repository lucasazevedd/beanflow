import SearchIcon from "../assets/icons/search-icon";
import "../styles/components/search-bar.css";

interface SearchBarProps {
  onSearch: (termo: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Digite um nome ou CNPJ..."
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
      <button className="search-button" type="button" onClick={() => onSearch((document.querySelector('.search-input') as HTMLInputElement).value)}>
        <SearchIcon className="search-icon"/>
      </button>
    </div>
  );
}
