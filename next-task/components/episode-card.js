export default function EpisodeCard({ name, air_date, episode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderRadius: '1em',
        width: '15em',
        textAlign: 'center',
        padding: '1.5em',
      }}
    >
      <span style={{ fontSize: '1.2em', color: 'black' }}>{name}</span>
      <span style={{ fontSize: '0.8em', color: 'gray' }}>
        {new Date(air_date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </span>
      <span style={{ fontWeight: '600', color: 'darkgray', fontSize: '0.9em' }}>
        {episode}
      </span>
    </div>
  );
}
