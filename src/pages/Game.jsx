

export default function Game() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        border: 'none',
        zIndex: 9999,
      }}
    >
      <iframe
        src="/game/index.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title="Игра"
      />
    </div>
  );
}
