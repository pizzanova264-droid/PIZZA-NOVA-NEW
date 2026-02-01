import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface RecentItem {
  id: string;
  name: string;
  price: number;
  image: string;
  viewedAt: Date;
}

interface RecentlyViewedContextType {
  recentItems: RecentItem[];
  addToRecent: (item: Omit<RecentItem, 'viewedAt'>) => void;
  clearRecent: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentItems, setRecentItems] = useState<RecentItem[]>(() => {
    const saved = localStorage.getItem('pizzanova_recent');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pizzanova_recent', JSON.stringify(recentItems));
  }, [recentItems]);

  const addToRecent = (item: Omit<RecentItem, 'viewedAt'>) => {
    setRecentItems(prev => {
      // Remove if already exists
      const filtered = prev.filter(i => i.id !== item.id);
      // Add to front, keep only last 10
      return [{ ...item, viewedAt: new Date() }, ...filtered].slice(0, 10);
    });
  };

  const clearRecent = () => {
    setRecentItems([]);
  };

  return (
    <RecentlyViewedContext.Provider value={{
      recentItems,
      addToRecent,
      clearRecent,
    }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}

