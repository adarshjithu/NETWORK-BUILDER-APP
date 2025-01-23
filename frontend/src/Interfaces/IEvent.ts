export interface IEvent  {
    title: string;
    description: string;
    location: string;
    date?: Date|string;
    region: string;
    chapter: string;
    attendees: any
    createdAt: Date|string;
    updatedAt: Date|string;
  }
  