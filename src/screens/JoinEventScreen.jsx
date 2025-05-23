import React from 'react';
import HeaderJoin from '../components/joinevent/HeaderJoin';
import CreatorInfo from '../components/joinevent/CreatorInfo';
import EventDetails from '../components/joinevent/EventDetails';
import JoinButton from '../components/joinevent/JoinButton';
import BottomNavBar from '../components/futbol/BottomNavBar';
import '../styles/JoinEventScreen.css';

const JoinEventScreen = ({ eventData, onNavigateBack, onJoinEvent }) => {
  const defaultEventData = {
    creatorName: "David Restrepo",
    creatorAge: 18,
    playersNeeded: 18,
    abandonedMatches: 0,
    creatorImage: "https://via.placeholder.com/100",
    name: "Partido futbol 7",
    gameType: "Futbol 7",
    location: "Av. Calle 72 # 112 a 01, Bogotá",
    creationDate: "2025-02-25T20:30:00.000+00:00",
    expirationDate: "2025-03-01T23:00:00.000+00:00",
    numberOfPlayers: 14,
    description: "Buenos manitos como es pa un partido relajao 8 v 8, si quieren apostar lo arreglamos entre todos.",
    mapImage: "https://via.placeholder.com/400x250.png?text=Google+Maps+Placeholder"
  };

  const currentEvent = eventData || defaultEventData;

  return (
    <div className="join-event-screen-container">
      <HeaderJoin title="UNIRSE A UN EVENTO" onBack={onNavigateBack} />
      <main className="join-event-main-content">
        <CreatorInfo
          name={currentEvent.creatorName}
          age={currentEvent.creatorAge}
          players={currentEvent.playersNeeded}
          abandoned={currentEvent.abandonedMatches}
          imageUrl={currentEvent.creatorImage}
        />
        <EventDetails
          name={currentEvent.name}
          gameType={currentEvent.gameType}
          location={currentEvent.location}
          creationDate={currentEvent.creationDate}
          expirationDate={currentEvent.expirationDate}
          numberOfPlayers={currentEvent.numberOfPlayers}
          description={currentEvent.description}
          mapImage={currentEvent.mapImage}
        />
        <JoinButton onPress={onJoinEvent} />
      </main>
      <BottomNavBar onNavigate={onNavigateBack} />
    </div>
  );
};

export default JoinEventScreen;
