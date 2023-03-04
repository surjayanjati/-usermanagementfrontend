/// Importing The Css --------------------------------------------------------------------------------->
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../public/css/notes.css";
/// Importing The Componenets ------------------------------------------------------------------------->
import DataTable from "./DataTable";
import LogoutButton from "./LogoutButton";
/// Importing The Action ----------------------------------------------------------------------------->
import { getData, emptyStore } from "../Actions/managementAction";

/// Function For The CurdBox--------------------------------------------------------------------------->
function ItemDetails() {
  const [initialFormValue, setFormValue] = useState({
    item: "",
    price: "",
    description: "",
  });
  const [intialSearchData, setSearchData] = useState();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["loginCookie"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((event) => event.managementReducer);
  function checkValue() {
    if (data.length !== 0) {
      return <DataTable />;
    } else {
      return <p>No Data Yet</p>;
    }
  }
  /// Use Effect Hook For Calling Fetch Request _____________________________/
  async function fetchValue() {
    console.log("hi");
    let param = `?page=${page}&`;
    if (intialSearchData) {
      param += `searchKeyword=${intialSearchData}&`;
    }
    if (sort) {
      param += `sort=${sort}&`;
    }
    const response = await fetch(
      "/usermanagementsystem/api/v1/users/items" + param,
      {
        method: "GET",
        headers: {
          "Content-type": "Application/json",
          "access-token": cookies.loginCookie,
        },
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.success === true) {
      dispatch(getData(responseData.dataArray));
    } else if (responseData.success === false) {
      alert("Some Internal Server Error, Please try again later");
    }
  }
  useEffect(() => {
    fetchValue();
  }, [page,intialSearchData,sort]);

  function nextPage() {
    setPage(page+1);
  }
  function prevPage() {
    if(page!=1) {
      setPage(page-1);
    }
  }
  // Function For InputEvent_____________________________/
  function inputEvent(e) {
    const { name, value } = e.target;
    setFormValue((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  /// Function For Additem Request ______________________/
  async function addItem() {
    const itemId = Math.floor(Math.random() * 100 * Date.now());
    const data = JSON.stringify({
      itemId: itemId,
      name: initialFormValue.item,
      price: initialFormValue.price,
      description: initialFormValue.description,
    });
    const response = await fetch(
      "/usermanagementsystem/api/v1/users/additems",
      {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
          "access-token": cookies.loginCookie,
        },
        body: data,
      }
    );
    const responseData = await response.json();
    if (responseData.success === true) {
      alert(responseData.msg);
    } else if (responseData.status === 401) {
      removeCookie("loginCookie");
      dispatch(emptyStore());
      navigate("/login");
    } else if (responseData.success === false) {
      alert(responseData.msg);
    }
  }

  ///Function For Search Event ----------------------------------------------------->
  function searchEvent(e) {
    setSearchData(e.target.value);
  }

  function setSortData(value) {
    setSort(value);
  }
  return (
    <>
      <div className="whole-containeri">
        <div className="main-boxi">
          <div id="box1i">
            <div className="box1-firstboxi">
              <h2>Item-Details</h2>
            </div>
            <div className="box1-firstboxi">
              <LogoutButton />
            </div>
          </div>
          <div id="box2i">
            <div className="form-element-boxi">
              <div className="input-box1">
                <i class="fa-solid fa-user"></i>
              </div>
              <hr />
              <div className="input-box2">
                <input
                  type="text"
                  placeholder="Enter Item Name"
                  name="item"
                  onChange={inputEvent}
                />
              </div>
            </div>
            <div className="form-element-boxi">
              <div className="input-box1">
                <i class="fa-solid fa-indian-rupee-sign"></i>
              </div>
              <hr />
              <div className="input-box2">
                <input
                  type="number"
                  placeholder="Enter Item Price"
                  name="price"
                  onChange={inputEvent}
                />
              </div>
            </div>
            <div className="form-element-boxi">
              <div className="input-box1">
                <i class="fa-solid fa-circle-info"></i>
              </div>
              <hr />
              <div className="input-box2">
                <input
                  type="text"
                  placeholder="Enter Item Description"
                  name="description"
                  onChange={inputEvent}
                />
              </div>
            </div>

            <div id="button-divi">
              <button onClick={addItem}>Add Item</button>
            </div>
          </div>
          <hr id="notesseparater" />
          <div className="box3">
            <div
              id="searchbox"
              style={{
                height: "5%",
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <div className="search-childbox1">
              <i
                  class="fa-solid fa-arrow-up"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSortData('name+asc')}
                ></i>
                <p>Name</p>
                <i
                  class="fa-solid fa-arrow-down"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSortData('name+desc')}
                ></i>
              </div>
              <div className="search-childbox2">
                <i
                  class="fa-solid fa-arrow-up"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSortData('price+asc')}
                ></i>
                <p>Price</p>
                <i
                  class="fa-solid fa-arrow-down"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSortData('price+desc')}
                ></i>
              </div>
              <div className="search-childbox3">
                <input
                  type="text"
                  placeholder="Search Item"
                  onChange={searchEvent}
                />
                <button onClick={fetchValue}>Search</button>
              </div>
            </div>
            <div
              className="table"
              style={{
                height: "80%",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                paddingTop: "2%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {checkValue()}
            </div>
            <div
              className="pagination-box"
              style={{
                height: "15%",
                display: "flex",
                flexDirection: "row",
                width: "100%",
                paddingTop: "2%",
                paddingLeft: "5%",
                paddingRight: "5%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <i class="fa-solid fa-file"></i>
              <div
                className="arrow-box"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "20%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <i
                  class="fa-solid fa-arrow-left"
                  style={{ cursor: "pointer" }}
                  onClick={() => prevPage()}
                ></i>
                <i
                  class="fa-solid fa-arrow-right"
                  style={{ cursor: "pointer" }}
                  onClick={() => nextPage()}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemDetails;
