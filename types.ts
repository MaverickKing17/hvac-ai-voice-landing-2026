
import React from 'react';

export interface Testimonial {
  id: string;
  name: string;
  business: string;
  quote: string;
  rating: number;
  videoThumbnail: string;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface DemoScenario {
  id: string;
  label: string;
  transcript: { speaker: 'Customer' | 'Peel AI'; text: string }[];
}