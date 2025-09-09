/**
 * @fileoverview تعریف مدل داده (Interface) برای تحلیلگران کافه ترید.
 */

export type PostType = 'text' | 'image' | 'poll';

/**
 * @interface CafeTradePost
 * ساختار داده برای یک پست در کانال کافه ترید.
 */
export interface CafeTradePost {
  id: number;
  channelId: number;
  authorId: number; // The user ID of the instructor
  authorName: string;
  authorAvatarUrl: string;
  timestamp: Date;
  content: string; // HTML content from rich text editor
  imageUrl?: string;
  type: PostType;
  reactions: {
    likes: number;
    dislikes: number;
  };
  // For poll type
  pollOptions?: { text: string, votes: number }[];
}


/**
 * @interface Analyst
 * ساختار داده برای یک تحلیلگر یا کانال تحلیلی را تعریف می کند.
 */
export interface Analyst {
  id: number; // This will now be the Channel ID
  userId: number; // Link to the user who owns this channel
  name: string;
  specialty: string;
  imageUrl: string;
  followers: number;
  bio: string;
}