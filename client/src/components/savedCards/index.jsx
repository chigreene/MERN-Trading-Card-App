function SavedCards({ savedCards }) {
  if (!savedCards.length) {
    return <h1>No saved Cards Yet</h1>;
  }

  return (
    <>
      <div>
        {savedCards.map((card) => (
          <div key={card._id}>
            <span>{card.card_id}</span>
            <h1>{card.name}</h1>
            <h2>{card.rarity}</h2>
            <h2>{card.description}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default SavedCards;
