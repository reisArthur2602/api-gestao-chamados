import { IClient } from '../models/client/IClient';
import { ICreateClient } from '../models/client/ICreateClient';
import { IDeleteClient } from '../models/client/IDeleteClients';
import { IFindByCPF } from '../models/client/IFindByCPF';
import { IFindByEmail } from '../models/client/IFindByEmail';
import { IFindByPhone } from '../models/client/IFindByPhone';
import { IListClients } from '../models/client/IListClients';

export interface IClientRepository {
    findByEmail({ email }: IFindByEmail): Promise<IClient | null>;
    findByCPF({ cpf }: IFindByCPF): Promise<IClient | null>;
    findByPhone({ telefone }: IFindByPhone): Promise<IClient | null>;
    listClients({ userId }: IListClients): Promise<IClient[] | []>;
    create({
        address,
        cpf,
        email,
        name,
        telefone,
        userId,
    }: ICreateClient): Promise<IClient>;
    remove({ id }: IDeleteClient): Promise<IClient>;
}
