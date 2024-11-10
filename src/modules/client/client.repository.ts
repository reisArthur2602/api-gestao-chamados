import { db } from "../../database/Client";
import { ClientRequest, ClientResponse } from "../client/client.types";

export interface IClientRepository {
  findByEmail(email: string): Promise<ClientResponse | null>;
  findByCPF(cpf: string): Promise<ClientResponse | null>;
  findByPhone(phone: string): Promise<ClientResponse | null>;
  findById(id: string): Promise<ClientResponse | null>;
  listClients(): Promise<ClientResponse[] | []>;
  create(data: ClientRequest): Promise<void>;
  remove(id: string): Promise<void>;
  update(data: Omit<ClientResponse, "userId">): Promise<void>;
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

  async remove(id: string): Promise<void> {
    await db.client.delete({ where: { id } });
  }

  async create(data: ClientRequest): Promise<void> {
    await db.client.create({
      data,
    });
  }

  async update(data: ClientResponse): Promise<void> {
    await db.client.update({
      where: { id: data.id },
      data: data,
    });
  }
}

export default ClientRepository;
