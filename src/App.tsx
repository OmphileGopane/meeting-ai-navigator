
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import MeetingDetail from "./pages/MeetingDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // For demo purposes, we're always considering the user as authenticated
  const isAuthenticated = true;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route element={
              isAuthenticated ? (
                <MainLayout>
                  {/* This element needs children to satisfy TypeScript */}
                  <Outlet />
                </MainLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/meetings/:id" element={<MeetingDetail />} />
              
              {/* We'll add these pages later */}
              <Route path="/calendar" element={<div className="container py-6"><h1 className="text-3xl font-bold">Calendar View</h1><p className="mt-4">Calendar view is under development</p></div>} />
              <Route path="/past-meetings" element={<div className="container py-6"><h1 className="text-3xl font-bold">Past Meetings</h1><p className="mt-4">Past meetings history will be available soon</p></div>} />
              <Route path="/teams" element={<div className="container py-6"><h1 className="text-3xl font-bold">My Team</h1><p className="mt-4">Team collaboration features coming soon</p></div>} />
              <Route path="/chats" element={<div className="container py-6"><h1 className="text-3xl font-bold">Chats</h1><p className="mt-4">Chat functionality will be implemented in future updates</p></div>} />
              <Route path="/analytics" element={<div className="container py-6"><h1 className="text-3xl font-bold">Analytics</h1><p className="mt-4">Meeting analytics will be available soon</p></div>} />
              <Route path="/role-settings" element={<div className="container py-6"><h1 className="text-3xl font-bold">Role Settings</h1><p className="mt-4">Configure your role and project settings here (coming soon)</p></div>} />
              <Route path="/settings" element={<div className="container py-6"><h1 className="text-3xl font-bold">Settings</h1><p className="mt-4">Application settings will be available soon</p></div>} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
