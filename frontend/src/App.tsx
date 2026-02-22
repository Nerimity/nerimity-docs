import style from "./App.module.css";
import { ContentPane } from "./ContentPane";
import { Drawer } from "./Drawer";
import { Header } from "./Header";

function App() {
  return (
    <>
      <Header />
      <div class={style.container}>
        <Drawer />
        <ContentPane  />
      </div>
    </>
  );
}

export default App;
