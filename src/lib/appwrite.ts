import { Client, Account, Databases, Query, ID, Permission, Role, Storage } from 'appwrite';
import { environment } from '../environments/environment';

const client = new Client();

client.setEndpoint(environment.apiUrl).setProject(environment.projectId).setLocale('it');

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, Query, ID, Permission, Role, storage };
