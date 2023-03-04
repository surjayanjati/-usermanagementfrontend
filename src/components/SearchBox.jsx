import "../public/css/searchbox.css";





/// Function For The Search Box --------------------------------------------------------->
function SearchBox(){
    return(
        <>
        <div className="search-childbox">
         <button>name</button>
        </div>
        <div className="search-childbox">
        <i class="fa-solid fa-arrow-up"></i>
        <p>Price</p>
        <i class="fa-solid fa-arrow-down"></i>
        </div>
        <div className="search-childbox">
            <input type="text" placeholder="Search Item" />
            <button>Search</button>
        </div>
        </>
    )
};

export default SearchBox;