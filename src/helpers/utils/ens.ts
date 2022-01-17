import { Provider } from '../..';

export const getEnsResolver = async (provider: Provider, ensName: string) => {
  return await provider.getResolver(ensName);
};

export const lookupAddress = async (provider: Provider, targetAddress: string) => {
  return await provider.lookupAddress(targetAddress);
};

export const resolveName = async (provider: Provider, ensName: string) => {
  return await provider.resolveName(ensName);
};
