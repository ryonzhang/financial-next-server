import { Transaction } from '@/app/models/models';

const BASE_URL='https://oyster-app-xcrss.ondigitalocean.app'

export const getTransactions = async (): Promise<Transaction[]> => {
  const res = await fetch(`${BASE_URL}/transactions`);
  if (!res.ok) {
    throw new Error('Failed to get transactions');
  }
  let transactions:Transaction[]=[]
  const rawTransactions=await res.json()
  for(let transaction of Object.values(rawTransactions['Transaction'])){
    // @ts-ignore
    transactions.push({amount:transaction.amount,date:new Date(transaction.date),id:transaction.id,type:transaction.type,memo:transaction.memo})
  }
  return transactions;
};

export const postTransactions = async (data:string) => {
  console.log(data)
  const res = await fetch(`${BASE_URL}/transactions`,{method:'POST',headers:{'Content-Type':'text/csv'},body:data});
  if (!res.ok) {
    throw new Error('Failed to add transactions');
  }
};

export const deleteTransaction = async (id:string) => {
  const res = await fetch(`${BASE_URL}/transactions/${id}`,{method:'DELETE'});
  if (!res.ok) {
    throw new Error('Failed to delete transaction');
  }
};


export const getReport = async (): Promise<Transaction[]> => {
  const res = await fetch(`${BASE_URL}/report`);
  if (!res.ok) {
    throw new Error('Failed to fetch apps');
  }
  return res.json()
};

