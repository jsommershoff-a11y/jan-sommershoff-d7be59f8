export interface OutlookMessage {
  id: string;
  subject: string;
  bodyPreview: string;
  receivedDateTime: string;
  isRead: boolean;
  from?: { emailAddress?: { name?: string; address?: string } };
}

export const PAGE_SIZE = 25;
