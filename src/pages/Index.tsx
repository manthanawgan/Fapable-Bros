
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Image } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold gradient-text">Fapable Bros</h1>
        <nav className="flex gap-6">
          <button 
            onClick={() => navigate('/gallery')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Gallery
          </button>
          <button 
            onClick={() => navigate('/submit')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Submit
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8">
            <Image className="w-20 h-20 mx-auto mb-6 text-primary" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 gradient-text leading-tight">
            FAPABLE
            <br />
            BROS
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            A carefully curated collection of the finest Twitter bros. 
            <br />
            <span className="text-primary font-semibold">Peak masculinity</span> meets 
            <span className="text-primary font-semibold"> premium aesthetics</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate('/gallery')}
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-xl hover-lift group"
            >
              View Collection
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={() => navigate('/submit')}
              variant="outline" 
              size="lg"
              className="border-gray-600 text-gray-300 hover:text-white hover:border-white px-8 py-4 text-lg font-semibold rounded-xl hover-lift"
            >
              Submit a Bro
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-8 text-center text-gray-500">
        <p>© 2024 Fapable Bros Collection. Curating excellence since yesterday.</p>
      </footer>
    </div>
  );
};

export default Index;
