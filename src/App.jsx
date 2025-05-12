import {useState} from 'react'
import './App.css'

function App() {
  const [zombieFighters, setZombieFighters] = useState(
    [
      {
        id: 1,
        name: 'Survivor',
        price: 12,
        strength: 6,
        agility: 4,
        img: '../public/images/survivor.jpg',
      },
      {
        id: 2,
        name: 'Scavenger',
        price: 10,
        strength: 5,
        agility: 5,
        img: '../public/images/scavenger.jpg',
      },
      {
        id: 3,
        name: 'Shadow',
        price: 18,
        strength: 7,
        agility: 8,
        img: '../public/images/shadow.jpg',
      },
      {
        id: 4,
        name: 'Tracker',
        price: 14,
        strength: 7,
        agility: 6,
        img: '../public/images/tracker.jpg',
      },
      {
        id: 5,
        name: 'Sharpshooter',
        price: 20,
        strength: 6,
        agility: 8,
        img: '../public/images/sharpshooter.jpg',
      },
      {
        id: 6,
        name: 'Medic',
        price: 15,
        strength: 5,
        agility: 7,
        img: '../public/images/medic.jpeg',
      },
      {
        id: 7,
        name: 'Engineer',
        price: 16,
        strength: 6,
        agility: 5,
        img: '../public/images/engineer.jpg',
      },
      {
        id: 8,
        name: 'Brawler',
        price: 11,
        strength: 8,
        agility: 3,
        img: '../public/images/brawler.jpg',
      },
      {
        id: 9,
        name: 'Infiltrator',
        price: 17,
        strength: 5,
        agility: 9,
        img: '../public/images/infiltrator.jpg',
      },
      {
        id: 10,
        name: 'Leader',
        price: 22,
        strength: 7,
        agility: 6,
        img: '../public/images/leader.jpg',
      },
      ]);
  const [money, setMoney] = useState(100);
  const [team, setTeam] = useState([]);
  let teamStrength = 0;
  let teamAgility = 0;
  team.forEach(fighter => {
    teamStrength += fighter.strength;
    teamAgility += fighter.agility;
  });
  const teamStats = {
    strength: teamStrength,
    agility: teamAgility,
  };

  const handleAddFighter = (fighter) => {
    if (money >= fighter.price) {
      if (!team.includes(fighter)) {
        setMoney(money - fighter.price);
        setTeam([...team, fighter]);
        setZombieFighters(zombieFighters.filter(z => z.id !== fighter.id));
      }
    } else {
      console.log("Not enough money");
    }
  };

  const handleRemoveFighter = (fighter) => {
    setMoney(money + fighter.price);
    setTeam(team.filter(t => t.id !== fighter.id));
    setZombieFighters([...zombieFighters, fighter]);
  }

  return (
    <>
      <section className="zFighters">
        <h1>Zombie Fighters</h1>
        <article className="fighter-list">
          {zombieFighters.map(fighter => (
            <div 
              key={fighter.id} 
              className={`fighter-card ${fighter.price <= money ? 'affordable' : ''}`}
            >
              <img src={fighter.img} alt={fighter.name} className="fighter-img" />
              <h2>{fighter.name}</h2>
              <ul>
                <li>Price: ${fighter.price}</li>
                <li>Strength: {fighter.strength}</li>
                <li>Agility: {fighter.agility}</li>
              </ul>
              <button onClick={() => handleAddFighter(fighter)}>Recruit</button>
            </div>
          ))}
        </article>
      </section>

      <section className="team">
        <h1>Your Team</h1>
        <h2>Current Money: ${money}</h2>
        <h3>Team Strength: {teamStats.strength}</h3>
        <h3>Team Agility: {teamStats.agility}</h3>
        {team.length === 0 ? (
          <p>Pick some team members!</p>
        ) : (
          <article className="fighter-list">
            {team.map(fighter => (
              <div className="fighter-card" key={fighter.id}>
                <img src={fighter.img} alt={fighter.name} className='fighter-img'/>
                <ul>
                  <li>{fighter.name}</li>
                  <li>Strength: {fighter.strength}</li>
                  <li>Agility: {fighter.agility}</li>
                  <li>Price: ${fighter.price}</li>
                </ul>
                <button onClick={() => handleRemoveFighter(fighter)}>Remove</button>
                </div>
            ))}
          </article>
        )}
      </section>
    </>
  );
}

export default App
