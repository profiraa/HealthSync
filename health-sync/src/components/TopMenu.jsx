import "../styles/topMenu.css";

export default function TopMenu() {
  return (
    <div className="topMenu">
      <div className="searchBar">
        <img src="./search.svg" />
        <p>Search</p>
      </div>
      <img className="avatar" src="./small-doctor.png" alt="" />
    </div>
    
  );
}
