export interface IOrder {
  id: string;
  clientId: string;
  userId: string;
  subject: string;
  status: string;
  description: string;
  created_at: Date;
}
