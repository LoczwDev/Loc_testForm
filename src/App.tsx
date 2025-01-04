import { Route, Routes } from "react-router-dom";
import BannerTable from "./components/BannerTable";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<BannerTable />} />
    </Routes>
  );
}

export default App;
