import "./App.css";
import MainPage from "./Components/MainPage/MainPage";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider
      maxSnack={1}
      autoHideDuration={1000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      preventDuplicate
    >
      <div className="App">
        <MainPage />
      </div>
    </SnackbarProvider>
  );
}

export default App;
