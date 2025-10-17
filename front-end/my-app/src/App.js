import "./App.css";
import Routing from "./Router";
import { useContext, useEffect } from "react";
import { DataContext } from "./components/Dataprovider/Dataprovider";
import { auth } from "./Utility/firebase";
import { Type } from "./Utility/action.Type";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Routing />
    </>
  );
}
export default App;
