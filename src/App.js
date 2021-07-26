import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import './App.css';
// import classNames from 'classnames';
// import Button from '../button';

// import './style.css';
// const Paginator = ({perPageElements, numRegistries, currentPage, setCurrentPage}) => {
  const App = ({perPageElements, numRegistries} ) => {

    const [currentPage, setCurrentPage] = React.useState(1)
    const [numberState, setNumberState] = React.useState({
      activeObject: null,
      objects: setNumbers
    })
    var setNumbers = []; 
    var maxNum = Math.ceil(numRegistries/perPageElements);
    
    console.log("currentPage" + currentPage);

    if(maxNum <= 6){
      for (let i = 1; i <= maxNum; i++){
        setNumbers.push(i);
      }
    } else {
      if (currentPage <= 4 ) {
        for (let i = 1; i <= 5; i++) {
          setNumbers.push(i)
        }
        setNumbers.splice(9,0, "...")
        setNumbers.splice(10,0, maxNum)
        
      } else if (currentPage >= (maxNum - 3)) {
        for (let i = 5; i >= 0; i--) {
          setNumbers.push(maxNum - i)
        }
        setNumbers.splice(1,0, 1)
        setNumbers.splice(2,0, "...")

      } else {
        if (currentPage >= maxNum - 3) {
          for (let i = maxNum; i >= 5; i--) {
            setNumbers.push(currentPage >= maxNum - 3 ?  maxNum - i: maxNum - 3 + i)
          }
        } else {
          for (let i = 1; i <= 5; i++) {
            setNumbers.push(currentPage < 4 ?  i: currentPage - 3 + i)
          }
        }
        
        if (currentPage > 4) {
          setNumbers.splice(1,0, 1)
          setNumbers.splice(2,0, "...")
        }

        setNumbers.splice(9,0, "...")
        setNumbers.splice(10,0, maxNum)
      }
    }

    // if (setNumbers.length > 2) {
    //   setNumbers[0] = "PREV"
    //   setNumbers.push("NEXT")
    // }

    const ref = useRef(null)

    function updateCurrentPage (x){
      console.log(x);
      if (x === 'PREV') {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1)
        } 
      } else if (x === 'NEXT') {
        if (currentPage < maxNum) {
          setCurrentPage(Number(currentPage) + 1)
        }
      } else {
        setCurrentPage(Number(x.target.value))
      }
      
    };

    function toggleActiveStyles(x, index){
      if (setNumbers[index] === Number(currentPage)) {
        return "active App-link"
      }else if (x === '...') {
        return "infoBtn App-link"
      }{
        return "App-link"
      }
    }

    return <div className="paginator-wrap">

      <button key="NEXT" className={toggleActiveStyles("NEXT")} value="NEXT" onClick={(x) => {
              updateCurrentPage("NEXT");
            }} >NEXT</button>
      <div>
        {
          setNumbers.map((x, index) => {
            return <button key={index} ref={ref} className={toggleActiveStyles(x, index)} id={index} value={x} onClick={(x) => {
              updateCurrentPage(x);
            }} >{x}</button>
          })
        }
      </div>  
      <button key="PREV" className={toggleActiveStyles("PREV")} value="PREV" onClick={(x) => {
              updateCurrentPage("PREV");
            }}>PREV</button>
    </div>
}

App.propTypes = {
  perPageElements: PropTypes.number.isRequired,
  numRegistries: PropTypes.number.isRequired
};

App.defaultProps = {
  perPageElements: 10,
  numRegistries: 291
};

// export default Paginator;
export default App;
