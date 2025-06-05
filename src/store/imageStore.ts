
import { create } from 'zustand';

export interface ImageData {
  id: number;
  src: string;
  username: string;
  uploadDate: string;
  status?: 'pending' | 'approved' | 'rejected';
}

interface ImageStore {
  galleryImages: ImageData[];
  pendingSubmissions: ImageData[];
  approveImage: (id: number) => void;
  rejectImage: (id: number) => void;
}

// Initial gallery images
const initialGalleryImages: ImageData[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
    username: "@gigachad_mike",
    uploadDate: "2024-01-15"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop",
    username: "@alpha_steve",
    uploadDate: "2024-01-14"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
    username: "@bro_supreme",
    uploadDate: "2024-01-13"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop",
    username: "@chad_energy",
    uploadDate: "2024-01-12"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop",
    username: "@elite_bro",
    uploadDate: "2024-01-11"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
    username: "@pro_male",
    uploadDate: "2024-01-10"
  }
];

// Initial pending submissions
const initialPendingSubmissions: ImageData[] = [
  {
    id: 101,
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    username: "@new_bro_123",
    uploadDate: "2024-01-16",
    status: "pending"
  },
  {
    id: 102,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    username: "@alpha_warrior",
    uploadDate: "2024-01-15",
    status: "pending"
  },
  {
    id: 103,
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    username: "@chad_supreme",
    uploadDate: "2024-01-14",
    status: "pending"
  }
];

export const useImageStore = create<ImageStore>((set) => ({
  galleryImages: initialGalleryImages,
  pendingSubmissions: initialPendingSubmissions,
  
  approveImage: (id: number) => {
    set((state) => {
      const submissionToApprove = state.pendingSubmissions.find(sub => sub.id === id);
      if (!submissionToApprove) return state;

      const newGalleryImage = {
        ...submissionToApprove,
        status: undefined // Remove status when adding to gallery
      };

      return {
        ...state,
        galleryImages: [newGalleryImage, ...state.galleryImages],
        pendingSubmissions: state.pendingSubmissions.filter(sub => sub.id !== id)
      };
    });
  },

  rejectImage: (id: number) => {
    set((state) => ({
      ...state,
      pendingSubmissions: state.pendingSubmissions.filter(sub => sub.id !== id)
    }));
  }
}));
