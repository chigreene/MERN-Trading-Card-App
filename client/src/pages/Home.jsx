import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PACK, Query_ME } from "../../utils/queries";
import { ADD_CARD } from "../../utils/mutations";

const Home = () => {
  const [cards, setCards] = useState([]);
  const cardsToSave=[...cards]
  console.log(cardsToSave)
  const [select,setSelect]=useState(cardsToSave.map(()=>false))

  const { loading: loadingPack, data: dataPack } = useQuery(QUERY_PACK, {
    fetchPolicy: "no-cache",
  });
  const { loading: loadingMe, data: dataMe } = useQuery(Query_ME, {
    fetchPolicy: "no-cache",
  });

  const username = dataMe?.me.username || [];

  const [addCardToUser, { error }] = useMutation(ADD_CARD);

  const openPack = () => {
    // Fetch data from the database and populate the cards array
    // Replace the following code with your actual database fetch logic
    const fetchData = dataPack?.cardPack || [];
    console.log("fetchData", fetchData);
    setCards(fetchData);
  };

  const saveCard = async (username, cardId) => {
    try {
      // Run the addCardToUser mutation

      const { data } = await addCardToUser({
        variables: { username, cardIds: cardId },
      });

      console.log(`Card with ID ${cardId} saved successfully.`);
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };
  
  const onCheckboxChange = (index) => {
    const updatedSelect = [...select];
    updatedSelect[index] = !updatedSelect[index]; 
    setSelect(updatedSelect);
  };

  const onClick=()=>{
    const selectedItems=cardsToSave.filter((item, index) => select[index]);
     console.log("Selected items:", selectedItems);
  }
  return (
    <div>
      <h1>Hello Group</h1>
      {cards.length === 0 ? (
        <button onClick={openPack}>Open Pack</button>
      ) : (
        cards.map((card,index) => (
          <div key={card._id} className="card">
            <h2>{card.name}</h2>
            {/* Render other card details here */}
          <input 
          type='checkbox'
          onChange={()=>onCheckboxChange(index)}
          checked={select[index]}></input>
          </div>
        ))
      )}
    </div>
  );
};

// const Home = () => {
//   const testArray = ['bob', 'penny', 'brew'];
//   const [select, setSelect] = useState(testArray.map(() => false));

//   const onCheckboxChange = (index) => {
//     const updatedSelect = [...select];
//     updatedSelect[index] = !updatedSelect[index]; 
//     setSelect(updatedSelect);
//   };

//   const onClick = () => {
//     const selectedItems = testArray.filter((item, index) => select[index]);
//     console.log("Selected items:", selectedItems);\
//   };

//   return (
//     <div>
//       {testArray.map((person, index) => (
//         <div key={index}>
//           {person}
//           <input
//             type='checkbox'
//             onChange={() => onCheckboxChange(index)}
//             checked={select[index]}
//           />
//           <p>State of select: {select[index].toString()}</p>
//         </div>
//       ))}
//       <button onClick={onClick}>Submit</button>
//     </div>
//   );
// };

export default Home;
