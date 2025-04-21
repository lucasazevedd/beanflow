import SearchIcon from "../assets/icons/search-icon";
import "../styles/search-bar.css";

export default function SearchBar() {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Digite um nome ou CNPJ..."
        className="search-input"
      />
      <button className="search-button">
        <SearchIcon className="search-icon"/>
      </button>
    </div>
  );
}
