import React from "react";
import { useState, useEffect } from "react";

const FoodGallery = () => {
  const [sort, setSort] = useState("Indian");
  const [Items, setItems] = useState([]);
  const [Loading, setLoading] = useState(true)

  const Filter = (fil) => {
    console.log(fil);
    setLoading(true);
    setSort(fil);
    
  };

  useEffect(() => {
    const fetchApi = async () => {
        // setItems(true);
        setLoading(true)
      try {
        
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${sort}`;
        const res = await fetch(url);
        const resData = await res.json();
        // console.log(resData.meals[0].strMealThumb);
        setItems(resData.meals);
        setLoading(false);
        // console.log(Items);
        // setSort(resData.meals[0].strMealThumb);
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);
  if (Loading) return <p className="display-1">Loading...</p>;
  return (
    <>
      <h1 className="text-center">Food Gallery</h1>
      <hr />
      <div className="container my-4">
        <div className="row">
          <div className="col d-sm-flex justify-content-sm-evenly ">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => Filter("Indian")}
            >
              Indian
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => Filter("Thai")}
            >
              Thai
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => Filter("Canadian")}
            >
              Canadian
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => Filter("Malaysian")}
            >
              Malaysian
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Filter("Chinese")}
            >
              Chinese
            </button>
            <button
              type="button"
              className="btn btn-info"
              onClick={() => Filter("Japanese")}
            >
              Japanese
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center justify-content-sm-start">
          <h1>{sort} Food</h1>
          {Items.map((ele, ind) => {
            /* console.log(ele); */
            const { idMeal, strMeal, strMealThumb } = ele;
            return (
              <div className="col-lg-4 col-md-6 col-10" key={idMeal}>
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={strMealThumb}
                        className="img-fluid rounded-start h-100"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{strMeal}</h5>
                        <p className="card-text">
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </p>
                        <p className="card-text">
                          <small className="text-muted">
                            Last updated 3 mins ago
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FoodGallery;
