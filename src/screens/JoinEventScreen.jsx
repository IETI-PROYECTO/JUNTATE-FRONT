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
    creatorImage: "https://via.placeholder.com/100", // URL de imagen placeholder
    description: "Buenos manitos como es pa un partido relajao 8 v 8, si quieren apostar lo arreglamos entre todos.",
    location: "Av. Calle 72 # 112 a 01, Bogotá",
    mapImage: "https://via.placeholder.com/400x250.png?text=Google+Maps+Placeholder" // URL de imagen placeholder para mapa
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
          description={currentEvent.description}
          location={currentEvent.location}
          mapImage={currentEvent.mapImage}
        />
        <JoinButton onPress={onJoinEvent} />
      </main>
      <BottomNavBar onNavigate={onNavigateBack} />
    </div>
  );
};

export default JoinEventScreen;