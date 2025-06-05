import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useImageStore } from "@/store/imageStore";

// Mock pending submissions data
const mockPendingSubmissions = [
  {
    id: 1,
    twitterUsername: "@new_bro_123",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    uploadDate: "2024-01-16",
    status: "pending"
  },
  {
    id: 2,
    twitterUsername: "@alpha_warrior",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    uploadDate: "2024-01-15",
    status: "pending"
  },
  {
    id: 3,
    twitterUsername: "@chad_supreme",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    uploadDate: "2024-01-14",
    status: "pending"
  }
];

const ADMIN_PASSWORD = "admin123";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  
  const { pendingSubmissions, approveImage, rejectImage } = useImageStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with password:", password);
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Access granted",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Access denied",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  const handleApprove = (id: number) => {
    console.log("Approving submission:", id);
    approveImage(id);
    toast({
      title: "Submission approved",
      description: "Image has been added to the gallery",
    });
  };

  const handleReject = (id: number) => {
    console.log("Rejecting submission:", id);
    rejectImage(id);
    toast({
      title: "Submission rejected",
      description: "Image has been removed from review queue",
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  console.log("Admin component rendered. Authenticated:", isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm border-gray-700">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-white text-xl">Admin Access</CardTitle>
            <CardDescription className="text-gray-300">
              Enter the admin password to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Access Dashboard
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="w-full text-gray-300 hover:text-white hover:bg-gray-800"
              >
                Back to Home
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="w-full px-6 py-8 flex justify-between items-center border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
        </div>
        <nav className="flex gap-6 items-center">
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
          <Button 
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800"
          >
            Logout
          </Button>
        </nav>
      </header>

      {/* Dashboard Content */}
      <main className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Pending Submissions</h2>
            <p className="text-gray-300 text-lg">
              Review and approve submissions for the gallery ({pendingSubmissions.length} pending)
            </p>
          </div>

          {pendingSubmissions.length === 0 ? (
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 text-center py-12">
              <CardContent>
                <div className="text-gray-300 text-lg">
                  No pending submissions to review
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingSubmissions.map((submission) => (
                <Card key={submission.id} className="bg-gray-900/80 backdrop-blur-sm border-gray-700 overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={submission.src} 
                      alt={`Submission by ${submission.username}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-blue-400 font-semibold">{submission.username}</p>
                        <p className="text-gray-400 text-sm">{submission.uploadDate}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleApprove(submission.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          onClick={() => handleReject(submission.id)}
                          variant="destructive"
                          className="flex-1 bg-red-600 hover:bg-red-700"
                          size="sm"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
