import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { useEffect, useState } from "react";
import { removeBackground, loadImage } from "./utils/imageUtils";
import { toast } from "@/components/ui/use-toast";

// Import React
import React from "react";

// Initialize QueryClient
const queryClient = new QueryClient();

const App: React.FC = () => {
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const processImage = async () => {
      try {
        // Fetch the image
        const response = await fetch('/text.gif');
        const blob = await response.blob();
        
        // Load the image
        const img = await loadImage(blob);
        
        // Remove background
        const processedBlob = await removeBackground(img);
        
        // Create URL for processed image
        const processedUrl = URL.createObjectURL(processedBlob);
        setProcessedImageUrl(processedUrl);
      } catch (error) {
        console.error('Error processing image:', error);
        toast({
          title: "Error",
          description: "Failed to process image. Using original image instead.",
          variant: "destructive",
        });
      }
    };

    processImage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <img 
              src={processedImageUrl || "/text.gif"} 
              alt="Title GIF" 
              style={{ maxWidth: "100%", height: "auto" }} 
            />
          </div>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;