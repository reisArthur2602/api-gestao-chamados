
import { db } from '../../database/Client';
import { ClientProps } from './protocols';


export const create = async (data: ClientProps) => {
  try {
    const client = await db.client.create({
      data: data,
    });
    return client;
  } catch (error) {
    console.error('Erro ao cadastrar cliente', error);
    return false;
  }
};
