import React from 'react';
import AdminYouTube from '@/components/admin/AdminYouTube';
import AdminPodcasts from '@/components/admin/AdminPodcasts';
import AdminIdeas from '@/components/admin/AdminIdeas';
import AdminBooks from '@/components/admin/AdminBooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="youtube" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="youtube">YouTube</TabsTrigger>
          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
        </TabsList>
        
        <TabsContent value="youtube">
          <AdminYouTube />
        </TabsContent>
        
        <TabsContent value="podcasts">
          <AdminPodcasts />
        </TabsContent>
        
        <TabsContent value="ideas">
          <AdminIdeas />
        </TabsContent>
        
        <TabsContent value="books">
          <AdminBooks />
        </TabsContent>
      </Tabs>
    </div>
  );
} 