"use client";

import { useState, useEffect, useCallback } from 'react';
import { type ShortLink, type ClickStat } from '@/lib/types';
import { generateShortCode } from '@/lib/utils';
import { useToast } from './use-toast';

const STORE_KEY = 'linkforge_links';
const MOCK_GEOS = [
  { city: 'New York', country: 'USA' },
  { city: 'London', country: 'UK' },
  { city: 'Tokyo', country: 'Japan' },
  { city: 'Sydney', country: 'Australia' },
  { city: 'Paris', country: 'France' },
  { city: 'Lagos', country: 'Nigeria' },
];

export const useLinkStore = () => {
  const { toast } = useToast();
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const items = window.localStorage.getItem(STORE_KEY);
      if (items) {
        setLinks(JSON.parse(items));
      }
    } catch (error) {
      console.error("Failed to load links from localStorage", error);
      toast({
        title: "Error",
        description: "Could not load your saved links.",
        variant: "destructive"
      });
    }
    setIsInitialized(true);
  }, [toast]);

  const saveLinks = useCallback((newLinks: ShortLink[]) => {
    try {
      setLinks(newLinks);
      window.localStorage.setItem(STORE_KEY, JSON.stringify(newLinks));
    } catch (error) {
      console.error("Failed to save links to localStorage", error);
      toast({
        title: "Error",
        description: "Could not save your new link.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const addLink = useCallback((originalUrl: string, validityDays?: number, customShortcode?: string): ShortLink | null => {
    const id = customShortcode || generateShortCode();

    if (links.some(link => link.id === id)) {
      toast({
        title: "Error",
        description: "This custom shortcode is already in use.",
        variant: "destructive"
      });
      return null;
    }

    const shortUrl = `${window.location.origin}/${id}`;
    const createdAt = new Date().toISOString();
    let expiresAt: string | null = null;
    if (validityDays) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + validityDays);
      expiresAt = expiryDate.toISOString();
    }
    
    const newLink: ShortLink = { id, originalUrl, shortUrl, createdAt, expiresAt, clicks: [] };
    const newLinks = [newLink, ...links];
    saveLinks(newLinks);

    return newLink;
  }, [links, saveLinks, toast]);
  
  const getLink = useCallback((id: string): ShortLink | undefined => {
    return links.find(link => link.id === id);
  }, [links]);

  const logClick = useCallback((id: string) => {
    const newLinks = links.map(link => {
      if (link.id === id) {
        const newClick: ClickStat = {
          timestamp: new Date().toISOString(),
          geo: MOCK_GEOS[Math.floor(Math.random() * MOCK_GEOS.length)],
        };
        return { ...link, clicks: [newClick, ...link.clicks] };
      }
      return link;
    });
    saveLinks(newLinks);
  }, [links, saveLinks]);

  return { links, addLink, getLink, logClick, isInitialized };
};
