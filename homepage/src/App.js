import 'bulma/css/bulma.min.css';
import { FcSearch } from 'react-icons/fc';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import ExperimentLoader from './components/ExperimentLoader';
import React, { useState } from 'react';
import { HiFilter } from 'react-icons/hi'
import Navbar from './components/Navbar';
function App() {
  const [experiments, setExperiments] = React.useState([]);
  const [nav, setNav] = useState(3)
  const [word, setWord] = useState("")
  const [page, setPage] = useState(1)
  const [totalPage, setTotal] = useState(1)
  const [Pop, setPop] = useState([])
  const PrevPage = () => {
    setPage(page - 1)
  }
  const NextPage = () => {
    setPage(page + 1)
  }
  React.useEffect(() => {
    fetch("https://8kne7udek3.execute-api.ap-southeast-2.amazonaws.com/items")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        setExperiments(data);
        setTotal(Math.ceil(data.length / 8))
        let copy = [...data]
        setPop(copy.sort((a, b) => b["Pageviews"] - a["Pageviews"]))
      });
  }, []);
  const SearchExp = (e) => {
    setWord(e.target.value)
  }
  const ToggleFilter = () => {
    console.log(document.getElementById("filter-set").className)
    if (!document.getElementById("filter-set").className.includes("is-hidden-desktop is-hidden-tablet")) {
      document.getElementById("filter-set").className = document.getElementById("filter-set").className + " is-hidden-desktop is-hidden-tablet";
      document.getElementById("divider").className = document.getElementById("divider").className + " is-hidden-desktop is-hidden-tablet";
    }
    else {
      document.getElementById("filter-set").className = 'column is-2 is-hidden-mobile is-hidden-tablet-only mr-4';
      document.getElementById("divider").className = 'is-divider-vertical is-black is-hidden-mobile is-hidden-tablet-only';
    }
    document.getElementById("filter-model").className = document.getElementById("filter-model").className + " is-active"
  }
  return (
    <>
      <Navbar setp={setPage} settp={setTotal} nav={nav} setNav={setNav} />
      <div className='columns is-vcentered is-mobile m-0'>
        <div className=" column mb-0 is-hidden-mobile is-hidden-tablet-only is-2-desktop ml-4 mt-2" >
          <img alt="" className="image" style={{padding:"0px"}} width="200" height="200" src={"https://cdn.vlabs.ac.in/logo/vlead-large.png"}/>
        </div>
        <div className='column is-three-fifths-desktop ' style={{margin:"auto"}}>
          <div className="field has-addons">
            <div className='control' style={{ marginTop: "auto", marginBottom: "auto" }}>
              <p className="control has-icons-left">
                <input className="input is-large" size="42" placeholder="Search" style={{ borderRadius: "290000px", borderWidth: "3px", borderColor: "black" }} onChange={SearchExp} />
                <span className="icon is-small is-left">
                  <FcSearch />
                </span>
              </p>
            </div>
            <div className="control" style={{ marginTop: "auto", marginBottom: "auto" }}>
              <button id="button-style" className="button is-info ml-6 has-text-white is-large" style={{ borderRadius: "290000px", borderWidth: "3px", borderColor: "black" }} onClick={ToggleFilter}>
                <HiFilter /> Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <ExperimentLoader experiments={experiments} word={word} pagenum={page} setp={setPage} settp={setTotal} nav={nav} setNav={setNav} pop={Pop} />
      {
        totalPage !==0 ?
          <footer className="footer" style={{ padding: "2%", backgroundColor: "lightcyan" }}>
            <div className="content has-text-centered">
              <button className=' button is-dark has-text-white is-pulled-left ml-1' style={{ fontSize: '20px' }}
                disabled={page === 1} onClick={PrevPage}>
                <AiOutlineArrowLeft />&nbsp;Previous
              </button>
              <button className='button is-dark has-text-white is-pulled-right mr-1' style={{ fontSize: '20px' }}
                disabled={page === totalPage} onClick={NextPage}>
                Next&nbsp;<AiOutlineArrowRight />
              </button>
              <p className='has-text-black is-size-4'>
                Page {page} of {totalPage}
              </p>
            </div>
          </footer> : <h1 className='has-text-black has-text-centered is-size-1'>No Results Found</h1>}
    </>
  );
}

export default App;




