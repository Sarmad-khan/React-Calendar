// import React from 'react'
// import {useState,useEffect} from 'react'
// import { fetchDateData } from './dateService';

// const DateHeader = () => {
//     const [dateData, setDateData] = useState([]);
//     useEffect(() => {
//         const getData = async () => {
//           try {
//             const data = await fetchDateData();
//             setDateData(data);
//             console.log(data);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
    
//         getData();
//       }, []);
    
//   return (
//     <>
//     <div className="date-component-container">
      
        
          
//           <p>Month: {dateData.hijri.month.en} ({dateData.hijri.month.ar})</p>
//           <p>Year: {dateData.hijri.year}</p>
          
//           <hr />
        
    
//     </div>
      
//     </>
//   )
// }

// export default DateHeader
