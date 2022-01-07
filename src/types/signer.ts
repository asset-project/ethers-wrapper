import type { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer';

export type SignTypedData = {
  domain: TypedDataDomain;
  types: Record<string, TypedDataField[]>;
  value: Record<string, any>;
};
