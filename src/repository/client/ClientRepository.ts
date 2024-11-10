import { db } from "../../database/Client";
import { ClientRequest, ClientResponse } from "../../domain/models/Client";

export interface IClientRepository {
  findByEmail(email: string): Promise<ClientResponse | null>;
  findByCPF(cpf: string): Promise<ClientResponse | null>;
  findByPhone(phone: string): Promise<ClientResponse | null>;
  findById(id: string): Promise<ClientResponse | null>;
  listClients(): Promise<ClientResponse[] | []>;
  create(data: ClientRequest): Promise<ClientResponse>;
  remove(id: string): Promise<ClientResponse>;
  update(data: Omit<ClientResponse, "userId">): Promise<ClientResponse>;
}

class ClientRepository implements IClientRepository {
  async findByEmail(email: string): Promise<ClientResponse | null> {
    const client = await db.client.findUnique({ where: { email } });
    return client;
  }

  async findByCPF(cpf: string): Promise<ClientResponse | null> {
    const client = await db.client.findUnique({ where: { cpf } });
    return client;
  }

  async findByPhone(phone: string): Promise<ClientResponse | null> {
    const client = await db.client.findUnique({ where: { phone } });
    return client;
  }

  async findById(id: string): Promise<ClientResponse | null> {
    const client = await db.client.findUnique({ where: { id } });
    return client;
  }

  async listClients(): Promise<ClientResponse[] | []> {
    const clients = await db.client.findMany();
    return clients;
  }

  async remove(id: string): Promise<ClientResponse> {
    const client = await db.client.delete({ where: { id } });
    return client;
  }

  async create(data: ClientRequest): Promise<ClientResponse> {
    const client = await db.client.create({
      data,
    });
    return client;
  }

  async update(data: ClientResponse): Promise<ClientResponse> {
    const client = await db.client.update({
      where: { id: data.id },
      data: data,
    });
    return client;
  }
}

export default ClientRepository;
