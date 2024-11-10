import { ClientRequest, ClientResponse } from "../../domain/models/Client";
import { ConflictError } from "../../helpers/error";
import ClientRepository, {
  IClientRepository,
} from "../../repository/client/ClientRepository";

class ClientController {
  constructor() {
    this.clientRepository = new ClientRepository();
  }
  private clientRepository: IClientRepository;

  async create(data: ClientRequest): Promise<ClientResponse> {
    const hasClientWithEmail = await this.clientRepository.findByEmail(
      data.email
    );

    if (hasClientWithEmail)
      throw new ConflictError("Este email já esta associado a um cliente");

    const hasClientWithPhone = await this.clientRepository.findByPhone(
      data.phone
    );

    if (hasClientWithPhone)
      throw new ConflictError("Este Telefone já esta associado a um cliente");

    const hasClientWithCPF = await this.clientRepository.findByCPF(data.cpf);

    if (hasClientWithCPF)
      throw new ConflictError("Este CPF já esta associado a um cliente");

    const client = await this.clientRepository.create(data);

    return client;
  }

  async list(): Promise<ClientResponse[] | []> {
    const clients = await this.clientRepository.listClients();
    return clients;
  }

  async delete(id: string): Promise<ClientResponse> {
    const clients = await this.clientRepository.remove(id);
    return clients;
  }

  async update(data: Omit<ClientResponse, "userId">): Promise<ClientResponse> {
    const hasClientWithPhone = await this.clientRepository.findByPhone(
      data.phone
    );
    if (hasClientWithPhone) {
      if (hasClientWithPhone.id !== data.id)
        throw new ConflictError("Este telefone já está associado a um cliente");
    }

    const clients = await this.clientRepository.update(data);

    return clients;
  }
}

export default ClientController;
