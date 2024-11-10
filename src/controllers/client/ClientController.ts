import { IClient } from '../../domain/models/client/IClient';
import { ICreateClient } from '../../domain/models/client/ICreateClient';
import { IDeleteClient } from '../../domain/models/client/IDeleteClients';
import { IListClients } from '../../domain/models/client/IListClients';
import { IUpdateClient } from '../../domain/models/client/IUpdateClient';
import { IClientRepository } from '../../domain/repository/IClientRepository';
import { ConflictError } from '../../helpers/error';
import ClientRepository from '../../repository/client/ClientRepositories';

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
        phone,
        userId,
    }: ICreateClient): Promise<IClient> {
        const hasClientWithEmail = await this.clientRepository.findByEmail({ email });

        if (hasClientWithEmail)
            throw new ConflictError(
                'Este email já esta associado a um cliente'
            );

        const hasClientWithPhone = await this.clientRepository.findByPhone({
            phone,
        });

        if (hasClientWithPhone)
            throw new ConflictError(
                'Este Telefone já esta associado a um cliente'
            );

        const hasClientWithCPF = await this.clientRepository.findByCPF({ cpf });

        if (hasClientWithCPF)
            throw new ConflictError('Este CPF já esta associado a um cliente');

        const client = await this.clientRepository.create({
            address,
            cpf,
            email,
            name,
            phone,
            userId,
        });

        return client;
    }

    async list({ userId }: IListClients): Promise<IClient[] | []> {
        const clients = await this.clientRepository.listClients({ userId });
        return clients;
    }

    async delete({ id }: IDeleteClient): Promise<IClient> {
        const clients = await this.clientRepository.remove({ id });
        return clients;
    }

    async update({ id, address, phone }: IUpdateClient): Promise<IClient> {
        const TelefoneExists = await this.clientRepository.findByPhone({
            phone,
        });
        if (TelefoneExists) {
            if (TelefoneExists.id !== id)
                throw new ConflictError(
                    'Este Telefone já está associado a um cliente'
                );
        }

        const clients = await this.clientRepository.update({
            id,
            address,
            phone,
        });

        return clients;
    }
}

export default ClientController;
