import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  idea: z.string().min(10, { message: "Your idea should be at least 10 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
});

type FormValues = z.infer<typeof formSchema>;

const IdeaForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      idea: "",
      category: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Add document to Firestore
      const docRef = await addDoc(collection(db, "ideas"), {
        ...data,
        createdAt: serverTimestamp(),
        reviewed: false,
      });
      
      console.log("Idea submitted successfully with ID:", docRef.id);
      
      toast({
        title: "Idea submitted successfully!",
        description: "Thank you for your contribution to Quirkitopia Space!",
      });
      
      form.reset();
    } catch (error: any) {
      console.error("Error submitting idea:", error);
      
      // More detailed error message
      const errorMessage = error.message || "Unknown error occurred";
      console.error("Firebase error details:", errorMessage);
      
      toast({
        title: "Error submitting idea",
        description: `There was a problem submitting your idea: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-dark/80 rounded-xl shadow-lg p-8 hover-card">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    {...field} 
                    className="focus:ring-2 focus:ring-accent transition-all duration-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="john@example.com" 
                    type="email" 
                    {...field} 
                    className="focus:ring-2 focus:ring-accent transition-all duration-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                    {...field}
                  >
                    <option value="">Select a category</option>
                    <option value="books">Books</option>
                    <option value="youtube">YouTube Channels</option>
                    <option value="podcasts">Podcasts</option>
                    <option value="other">Other</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="idea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Idea</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Share your quirky idea with us..." 
                    className="min-h-32 focus:ring-2 focus:ring-accent transition-all duration-300"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-accent text-dark hover:bg-accent/80 font-bold transform transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>💡 Submit Your Idea</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default IdeaForm;
