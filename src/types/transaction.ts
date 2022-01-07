export type TransactionParams = TxnType1Params | TxnType2Params;

export type TxnType1Params = {
  type: 'type1';
  from?: string;
  to?: string;
  nonce?: number;
  value?: string;
  gasLimit?: number;
  gasPrice?: string;
  data?: string;
};

export type TxnType2Params = {
  type: 'type2';
  from?: string;
  to?: string;
  nonce?: number;
  value?: string;
  gasLimit?: number;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  data?: string;
};
