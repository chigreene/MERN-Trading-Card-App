import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PACK, Query_ME } from "../../utils/queries";
import { ADD_CARD } from "../../utils/mutations";
import "./home.css";
import Auth from "../../utils/auth";
import Card1 from "../assets/resources/card1.png";

const Home = () => {
  const [cards, setCards] = useState([]);
  const cardsToSave = [...cards];
  const [select, setSelect] = useState(cardsToSave.map(() => false));

  const { loading: loadingPack, data: dataPack } = useQuery(QUERY_PACK, {
    fetchPolicy: "no-cache",
  });
  const { loading: loadingMe, data: dataMe } = useQuery(Query_ME, {
    fetchPolicy: "no-cache",
  });

  const username = dataMe?.me.username || "";

  const [addCardToUser, { error }] = useMutation(ADD_CARD);

  const openPack = () => {
    const fetchData = dataPack?.cardPack || [];
    console.log("fetchData", fetchData);
    setCards(fetchData);
  };

  const onCheckboxChange = (index) => {
    const updatedSelect = [...select];
    updatedSelect[index] = !updatedSelect[index];
    setSelect(updatedSelect);
  };

  const onClick = async () => {
    const selectedItems = cardsToSave.filter((item, index) => select[index]);
    const selectedCardIds = selectedItems.map((item) => item.card_id);

    try {
      const { data } = await addCardToUser({
        variables: { username: username, cardIds: selectedCardIds },
      });
      console.log("Cards saved successfully:", data);
      window.location.assign("/");
    } catch (error) {
      console.error("Error saving cards:", error);
    }
  };
  return (
    <>
      {Auth.loggedIn() ? (
        <div>
          <h1>Hello Group</h1>
          {cards.length === 0 ? (
            <button type="button" className="btn btn-light" onClick={openPack}>
              Open Pack
            </button>
          ) : (
            <>
              <div className="card-container">
                {cards.map((card, index) => (
                  <div key={card._id} className="card">
                    <img
                      className="card-img-top"
                      src={Card1}
                      alt="Card image cap"
                    />
                    <h2>{card.name}</h2>
                    <h3>{card.rarity}</h3>
                    <input
                      type="checkbox"
                      onChange={() => onCheckboxChange(index)}
                      checked={select[index] || false}
                    />
                  </div>
                ))}
              </div>
              <button onClick={onClick} type="button" className="btn btn-light">
                Confirm
              </button>
            </>
          )}
        </div>
      ) : (
        <h1>Must be logged in</h1>
      )}
    </>
  );
};

export default Home;
