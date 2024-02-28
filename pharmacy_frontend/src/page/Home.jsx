import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Header from "../component/Header";
import HomeStyles from "../AllStyles/Home.module.css";
import FormList from "./FormList";
import { useSelector, useDispatch } from "react-redux";
import {
  // addDrug,
  addDrugThunk,
  fetchDrugThunk,
} from "../store/features/drugs/drugSlice";
// import { drugReducer } from "../redux-store/redux-reducers/drugReducer.js";
import HeadStyles from "../AllStyles/Header.module.css";
import Chart from "../component/Chart.jsx";
import { set } from "mongoose";
import { FaSearch } from "react-icons/fa";


function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [drugName, setDrugName] = useState("");
  const [description, setDescription] = useState("");
  const [drugCode, setDrugCode] = useState("");
  const [unitofPrice, setUnitofPrice] = useState("");
  const [price, setPrice] = useState("");
  const [results, setResults] = useState([]);



  const drugs = useSelector((state) => state.drugs);
  // console.log(drugs)

  const dispatch = useDispatch();

  // search function
  // const search = (drugs) => {
  //   return drugs.filter((drug) => drug.drugName.toLowerCase().includes(searchTerm) || drug.description.toLowerCase().includes(searchTerm))
  // }

  const handleSubmit = (e) => {
    e.preventDefault();

    const drug = {
      drugName,
      description,
      drugCode,
      unitofPrice,
      price,
    };

    dispatch(addDrugThunk(drug));
    setDrugName(""),
      setDescription(""),
      setDrugCode(""),
      setUnitofPrice(""),
      setPrice("");
  };

  useEffect(() => {
    dispatch(fetchDrugThunk());
  }, [dispatch]);


     //serach functionality
     const fetchData = (value) => {
      fetch("http://localhost:8000/api/drugs")
        .then((response) => response.json())
        .then((json) => {
          const results = json.filter((drug) => {
            return (
              value &&
              drug &&
              drug.drugName &&
              drug.drugName.toLowerCase().includes(value) || drug && drug.description && drug.description.toLowerCase().includes(value)
            );
          });
   
          setResults(results)
        });
    };
  
    const handleChange = (value) => {
      setSearchTerm(value);
      fetchData(value);
    };
  

  return (
    <>
      {/* <section className={HeadStyles.header}>
        <div className={HeadStyles.topnav}>
          <a className={""} href="https://medtrack.io">
            MedTrack
          </a>
         
        </div>
      </section> */}
      {/* <PharmNav /> */}

      <section className={HomeStyles.formContent}>
        <div>
        <div className={HeadStyles.searchContainer}>
          <h1
            style={{
              lineHeight: "0.2",
              letterSpacing: "2px",
              fontFamily: "fantasy",
              color: "white"
            }}
          >
            Pharmacy Inventory
          </h1>
        
        </div>
        <div className={Home.searchbar}>
            <FaSearch style={{color: "#46AB6A"}} />
            <input
              type="text"
              className={Home.inputBar}
              value={searchTerm}
              placeholder="Search drug....."
              name="search"
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        </div>
        
        <div className={HomeStyles.formdetails}>
          <form onSubmit={handleSubmit} className={HomeStyles.pharmform}>
            <div className={HomeStyles.formgroup}>
              <label htmlFor="drugName" style={{}}>
                Drug Name
              </label>
              <input
                type="text"
                className={HomeStyles.inputText}
                placeholder="Type Drug Name"
                id="drugName"
                name="drugName"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
                // autoComplete="off"
              />
            </div>

            <div className={HomeStyles.formgroup}>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className={HomeStyles.inputText}
                placeholder="Drug description"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                // autoComplete="off"
              />
            </div>

            <div className={HomeStyles.formgroup}>
              <label htmlFor="drugCode">Drug Code</label>
              <input
                type="text"
                className={HomeStyles.inputText}
                placeholder="A0c123FH"
                id="drugCode"
                value={drugCode}
                name="drugCode"
                onChange={(e) => setDrugCode(e.target.value)}
                autoComplete="off"
                // autoCapitalize= {true}
              />
            </div>

            <div className={HomeStyles.formgroup}>
              <label htmlFor="unitofPrice">Unit of Pricing</label>
              <input
                type="text"
                className={HomeStyles.inputText}
                placeholder="Tablet"
                id="unitPrice"
                value={unitofPrice}
                name="unitofPrice"
                onChange={(e) => setUnitofPrice(e.target.value)}
                // autoComplete="off"
              />
            </div>

            <div className={HomeStyles.formgroup}>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className={HomeStyles.inputText}
                placeholder="2.02"
                id="price"
                value={price}
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                // autoComplete="off"
                
              />

              <div className={HomeStyles.btn}>
                <button
                  type="submit"
                  disabled={
                    !drugName ||
                    !description ||
                    !drugCode ||
                    !unitofPrice ||
                    !price
                  }
                  style={
                    !drugName ||
                    !description ||
                    !drugCode ||
                    !unitofPrice ||
                    !price
                      ? { cursor: "not-allowed" }
                      : { cursor: "pointer" }
                  }
                >
                  Add
                </button>
              </div>
            </div>
          </form>

          <div className={HomeStyles.graphContent}>
            <Chart />
          </div>
        </div>
      </section>

      <FormList drugs={drugs} />
    </>
  );
}

export default Home;
