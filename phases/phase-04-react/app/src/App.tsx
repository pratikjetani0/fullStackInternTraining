import "./App.css";

const user = {
  name: "Hedy Lamarr",
  imageUrl: "https://react.dev/images/docs/scientists/yXOvdOSs.jpg",
  imageSize: 90,
};

function App() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar w-50 rounded-full"
        src={user.imageUrl}
        alt={"Photo of " + user.name}

      />
    </>
  );
}

export default App;
