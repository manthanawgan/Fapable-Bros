
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { ArrowUp, ChevronLeft } from "lucide-react";
import { useImageStore } from "@/store/imageStore";

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const { galleryImages } = useImageStore();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="w-full px-6 py-8 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold gradient-text">Gallery</h1>
        </div>
        <nav className="flex gap-6">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/submit')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Submit
          </button>
        </nav>
      </header>

      {/* Gallery Grid */}
      <main className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4">The Collection</h2>
            <p className="text-gray-400 text-lg">Handpicked excellence from the Twitterverse</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((image) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <div className="group cursor-pointer animate-scale-in">
                    <div className="glass rounded-2xl overflow-hidden hover-lift">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={image.src} 
                          alt={`Bro by ${image.username}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-primary font-semibold">{image.username}</p>
                        <p className="text-gray-400 text-sm">{image.uploadDate}</p>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-black border-gray-800">
                  <div className="space-y-4">
                    <img 
                      src={image.src} 
                      alt={`Bro by ${image.username}`}
                      className="w-full rounded-xl"
                    />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-primary font-semibold text-lg">{image.username}</p>
                        <p className="text-gray-400">{image.uploadDate}</p>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <ArrowUp className="w-4 h-4 mr-2" />
                        Appreciate
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gallery;
