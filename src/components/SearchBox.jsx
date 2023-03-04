import "../public/css/searchbox.css";





/// Function For The Search Box --------------------------------------------------------->
function SearchBox(){
    return(
        <>
        <div className="search-childbox1">
         <button>name</button>
        </div>
        <div className="search-childbox2">
        <i class="fa-solid fa-arrow-up"></i>
        <p>Price</p>
        <i class="fa-solid fa-arrow-down"></i>
        </div>
        <div className="search-childbox3">
            <input type="text" placeholder="Search Item" />
            <button>Search</button>
        </div>
        </>
    )
};

export default SearchBox;