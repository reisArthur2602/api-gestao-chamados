import { IClient } from '../../domain/models/client/IClient';
import { ICreateClient } from '../../domain/models/client/ICreateClient';
import { IListClients } from '../../domain/models/client/IListClients';
import { IClientRepository } from '../../domain/repository/IClientRepository';
import { ConflictError } from '../../helpers/error';
import ClientRepository from '../../repository/client/ClientRepository';

class ClientController {
    constructor() {
        this.clientRepository = new ClientRepository();
    }
    private clientRepository: IClientRepository;

    async create({
        address,
        cpf,
        email,
        name,
        telefone,
        userId,
    }: ICreateClient): Promise<IClient> {
        const emailExists = await this.clientRepository.findByEmail({ email });
        if (emailExists)
            throw new ConflictError(
                'Este email já esta associado a um cliente'
            );

        const phoneExists = await this.clientRepository.findByPhone({
            telefone,
        });

        if (phoneExists)
            throw new ConflictError(
                'Este Telefone já esta associado a um cliente'
            );

        const cpfExists = await this.clientRepository.findByCPF({ cpf });

        if (cpfExists)
            throw new ConflictError('Este TCPF já esta associado a um cliente');

        const client = await this.clientRepository.create({
            address,
            cpf,
            email,
            name,
            telefone,
            userId,
        });
        return client;
    }

    async list({ userId }: IListClients): Promise<IClient[] | []> {
        const clients = await this.clientRepository.listClients({ userId });
        return clients;
    }
}

export default ClientController;
