import { db } from '../../database/Client';
import { IClient } from '../../domain/models/client/IClient';
import { ICreateClient } from '../../domain/models/client/ICreateClient';
import { IDeleteClient } from '../../domain/models/client/IDeleteClients';
import { IFindByCPF } from '../../domain/models/client/IFindByCPF';
import { IFindByEmail } from '../../domain/models/client/IFindByEmail';
import { IFindByPhone } from '../../domain/models/client/IFindByPhone';
import { IListClients } from '../../domain/models/client/IListClients';

import { IClientRepository } from '../../domain/repository/IClientRepository';

class ClientRepository implements IClientRepository {
    async findByEmail({ email }: IFindByEmail): Promise<IClient | null> {
        const client = await db.client.findUnique({ where: { email } });
        return client;
    }

    async findByCPF({ cpf }: IFindByCPF): Promise<IClient | null> {
        const client = await db.client.findUnique({ where: { cpf } });
        return client;
    }

    async findByPhone({ telefone }: IFindByPhone): Promise<IClient | null> {
        const client = await db.client.findUnique({ where: { telefone } });
        return client;
    }

    async listClients({ userId }: IListClients): Promise<IClient[] | []> {
        const clients = await db.client.findMany({ where: { userId } });
        return clients;
    }

    async remove({ id }: IDeleteClient): Promise<IClient> {
        const client = await db.client.delete({ where: { id } });
        return client;
    }

    async create({
        address,
        cpf,
        email,
        name,
        telefone,
        userId,
    }: ICreateClient): Promise<IClient> {
        const client = await db.client.create({
            data: { address, cpf, email, name, telefone, userId },
        });
        return client;
    }
}

export default ClientRepository;
