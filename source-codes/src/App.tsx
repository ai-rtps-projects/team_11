import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "sonner";
import Index from "./pages/Index.tsx";
import Programs from "./pages/Programs.tsx";
import Admissions from "./pages/Admissions.tsx";
import Campus from "./pages/Campus.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <>
    <Sonner richColors position="top-right" />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/campus" element={<Campus />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
