import { useQuery } from "@apollo/client";
import { QUERY_CARDS } from "../../../utils/queries";
import { useState } from "react";
import SavedCards from "../savedCards";

function Collection({compare}) {
const { loading: loadingCards, data: dataCards } = useQuery(QUERY_CARDS, {
});

 
  const allCards=dataCards?.cards||{}
  const allCardIds=Array.isArray(allCards)?allCards.map(card=>card.card_id):[]

   const[currentCards,setCards]=useState(allCards)
  const [sortName,setSortName]=useState('asc')
  const [sortRarity,setSortRarity]=useState('asc')
  const [sortNumber,setSortNumber]=useState('asc')

  const [view,setView]=useState(true)



const onSortNameClick=()=>{
    const sortedCards = [...allCards].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (sortName === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    setCards(sortedCards)
    setSortName(sortName === 'asc' ? 'desc' : 'asc');
    setSortRarity(null);
    setSortNumber(null); 

}


const onSortNumberClick = () => {
    const sortedCards = [...allCards].sort((a, b) => {
      const numberA = a.card_id;
      const numberB = b.card_id;

      if (sortNumber === 'asc') {
        return numberA - numberB;
      } else {
        return numberB - numberA;
      }
    });
    setCards(sortedCards)
    setSortNumber(sortNumber === 'asc' ? 'desc' : 'asc');
    setSortName(null);
    setSortRarity(null);
  };

const onSortRarityClick = () => {
    const sortedCards = [...allCards].sort((a, b) => {
      const rarityOrder = ['common', 'uncommon', 'rare', 'legendary'];
      const rarityA = rarityOrder.indexOf(a.rarity);
      const rarityB = rarityOrder.indexOf(b.rarity);

      if (sortRarity === 'asc') {
        return rarityA - rarityB;
      } else {
        return rarityB - rarityA;
      }
    });
    setCards(sortedCards);
    setSortRarity(sortRarity === 'asc' ? 'desc' : 'asc');
    setSortName(null);
    setSortNumber(null);
  };

  const onViewClick=()=>{
    setView(!view)
  }
return (
    <>
            <div>
            <button onClick={(onViewClick)}>View</button>
        <button onClick={onSortNumberClick}>Card ID</button>
        <button onClick={onSortRarityClick}>Rarity</button>
        <button onClick={onSortNameClick}>Name</button>
        </div>
{view?(
   <>
  <table>
    <thead>
      <tr>
        <th onClick={onSortNumberClick}>Card ID</th>
        <th>Rarity</th>
        <th onClick={onSortNameClick}>Name</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(allCards) && allCards.length > 0 ? (
        currentCards.map((card, index) => (
          <tr key={index} 
            style={{
              backgroundColor: compare.includes(card.card_id) ? "yellow" : "none",
            }}
          >
            <td>{card.card_id}</td>
            <td className={card.rarity}>{card.rarity}</td>
            <td>{card.name}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="3">No cards found</td>
        </tr>
      )}
    </tbody>
  </table>
   </> 
):(
<>
<SavedCards savedCards={currentCards} compare={compare}></SavedCards>
</>
)}

</>
);

}

export default Collection;
