import { Transaction } from '@/app/models/models';
import {toast} from "react-toastify";

const BASE_URL='https://octopus-app-csisq.ondigitalocean.app'

export const getTransactions = async (): Promise<Transaction[]> => {
  const res = await fetch(`${BASE_URL}/transactions`);
  if (!res.ok) {
    const text=await res.text()
    toast(text)
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
  const id=toast('Posting transactions in progress...')
  const res = await fetch(`${BASE_URL}/transactions`,{method:'POST',headers:{'Content-Type':'text/csv'},body:data});
  if (!res.ok) {
    const text=await res.text()
    toast(text)
  }
  toast.dismiss(id)
  toast('Successfully post all transactions')
};

export const deleteTransaction = async (id:string) => {
  const tID=toast('Deleting transaction in progress...')
  const res = await fetch(`${BASE_URL}/transactions/${id}`,{method:'DELETE'});
  if (!res.ok) {
    const text=await res.text()
    toast(text)
  }
  toast.dismiss(tID)
  toast('Successfully delete the transaction')
};


export const getReport = async (): Promise<Transaction[]> => {
  const res = await fetch(`${BASE_URL}/report`);
  if (!res.ok) {
    const text=await res.text()
    toast(text)
  }
  return res.json()
};

