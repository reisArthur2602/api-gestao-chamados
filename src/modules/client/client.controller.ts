import { ClientRequest, ClientResponse } from "../client/client.types";
import { ConflictError } from "../../helpers/error";
import ClientRepository, { IClientRepository } from "./client.repository";

class ClientController {
  constructor() {
    this.clientRepository = new ClientRepository();
  }
  private clientRepository: IClientRepository;

  async create(data: ClientRequest): Promise<void> {
    const hasClientWithEmail = await this.clientRepository.findByEmail(
      data.email
    );

    if (hasClientWithEmail) {
      throw new ConflictError("EMAIL_ALREADY_EXISTS");
    }

    const hasClientWithPhone = await this.clientRepository.findByPhone(
      data.phone
    );

    if (hasClientWithPhone) {
      throw new ConflictError("PHONE_ALREADY_EXISTS");
    }

    const hasClientWithCPF = await this.clientRepository.findByCPF(data.cpf);

    if (hasClientWithCPF) {
      throw new ConflictError("CPF_ALREADY_EXISTS");
    }

    await this.clientRepository.create(data);
  }

  async list(): Promise<ClientResponse[] | []> {
    const clients = await this.clientRepository.listClients();
    return clients;
  }

  async delete(id: string): Promise<void> {
    await this.clientRepository.remove(id);
  }

  async update(data: Omit<ClientResponse, "userId">): Promise<void> {
    const hasClientWithPhone = await this.clientRepository.findByPhone(
      data.phone
    );
    const isUniqueClientPhone = hasClientWithPhone?.id !== data.id;

    if (isUniqueClientPhone) {
      throw new ConflictError("PHONE_ALREADY_EXISTS");
    }

    await this.clientRepository.update(data);
  }
}

export default ClientController;