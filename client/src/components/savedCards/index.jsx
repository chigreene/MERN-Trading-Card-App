function SavedCards({ savedCards }) {
  if (!savedCards.length) {
    return <h1>No saved Cards Yet</h1>;
  }

  return (
    <>
      <div>
        {savedCards.map((card) => (
          <div key={card._id}>
            <span>
              <p>{card.card_id}</p>
              <h1>{card.name}</h1>
            </span>

            <h2>{card.rarity}</h2>
            <h2>{card.description}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default SavedCards;
