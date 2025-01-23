
import AppRouter from "./Routes/AppRouter.tsx";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <div>
          <Toaster/>
            <AppRouter />
        </div>
    );
}

export default App;
