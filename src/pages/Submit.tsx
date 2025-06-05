
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Submit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    twitterUsername: "",
    image: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Submission received!",
        description: "Your bro will be reviewed by our elite council.",
      });
      setFormData({ twitterUsername: "", image: null });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

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
          <h1 className="text-2xl font-bold gradient-text">Submit</h1>
        </div>
        <nav className="flex gap-6">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/gallery')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Gallery
          </button>
        </nav>
      </header>

      {/* Submission Form */}
      <main className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Submit a Bro</h2>
            <p className="text-gray-400 text-lg">
              Found a worthy specimen? Share it with the community for review.
            </p>
          </div>

          <Card className="glass border-gray-800 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-white">New Submission</CardTitle>
              <CardDescription className="text-gray-400">
                All submissions are reviewed before being added to the collection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">
                    Twitter Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="@username"
                    value={formData.twitterUsername}
                    onChange={(e) => setFormData({ ...formData, twitterUsername: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-white">
                    Image Upload
                  </Label>
                  <div className="relative">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="bg-gray-900 border-gray-700 text-white file:bg-primary file:text-white file:border-0 file:rounded-md file:px-4 file:py-2"
                      required
                    />
                  </div>
                  {formData.image && (
                    <p className="text-sm text-gray-400">
                      Selected: {formData.image.name}
                    </p>
                  )}
                </div>

                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-primary">Submission Guidelines:</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Must be from Twitter/X</li>
                    <li>• High quality images preferred</li>
                    <li>• No NSFW content</li>
                    <li>• Must embody peak bro energy</li>
                  </ul>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-semibold rounded-xl hover-lift"
                >
                  {isSubmitting ? (
                    "Submitting to the Council..."
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      Submit for Review
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Submit;
