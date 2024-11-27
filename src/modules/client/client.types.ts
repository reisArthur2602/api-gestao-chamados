export type ClientResponse = {
  id: string;
  name: string;
  email: string;
  address: string;
  userId: string;
  cpf: string;
  phone: string;
};

export type EditClient = Partial<Omit<ClientResponse, "userId">>;

export type ClientRequest = {
  name: string;
  email: string;
  address: string;
  cpf: string;
  phone: string;
  userId: string;
};
