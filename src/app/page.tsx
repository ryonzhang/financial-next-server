'use client'
import React, {useEffect, useState} from 'react';
import {deleteTransaction, getReport, getTransactions, postTransactions} from "@/api/transactions";
import {Transaction} from "@/app/models/models";

export default function Page() {
  const [transactions, setTransactions] = useState<Transaction[]>()
  const [report, setReport] = useState<any>()
  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedFileName, setSelectedFileName] = useState('No File Selected');
  useEffect(() => {
    getTransactions().then(setTransactions)
    getReport().then(setReport)
  }, []);

  const commitFile=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault()
    var reader = new FileReader();
    reader.onload = async function() {
      var text = reader.result;
      // @ts-ignore
      await postTransactions(text)
      getTransactions().then(setTransactions)
      getReport().then(setReport)
    };
    selectedFile && reader.readAsText(selectedFile);
  }

  const removeTransaction=(id:string)=>{
    deleteTransaction(id).then(()=>{
      getTransactions().then(setTransactions)
      getReport().then(setReport)
    })
  }

  return <div className={'relative overflow-x-auto w-full flex flex-col justify-center items-center mt-24'}>
    {report && <div className={'flex flex-row space-x-4 mb-2' }>
      <div className={'flex flex-row space-x-2'}><div>Gross Revenue</div><div className={'font-bold'}>{report['gross-revenue'].toFixed(2)}</div></div>
      <div className={'flex flex-row space-x-2'}><div>Expenses</div><div className={'font-bold'}>{report['expenses'].toFixed(2)}</div></div>
      <div className={'flex flex-row space-x-2'}><div>Net Revenue</div><div className={'font-bold'}>{report['net-revenue'].toFixed(2)}</div></div>
    </div>}
    <div className={'flex flex-row'}>
      <form>
        <div className="flex flex-row items-center">
          <input
            type="file"
            id="custom-input"
            onChange={(e) => {
              e.target.files && setSelectedFileName(e.target.files[0].name)
              e.target.files && setSelectedFile(e.target.files[0])
            }}
            hidden
            accept=".csv"
          />
          <label
            htmlFor="custom-input"
            className="block text-sm text-slate-500 mr-4 py-2 px-4
            rounded-md border-0 text-sm font-semibold bg-pink-50
            text-pink-700 hover:bg-pink-100 cursor-pointer"
          >
            Choose file
          </label>
          <label className="text-sm text-slate-500">{selectedFileName}</label>
          <button
            onClick={e=>commitFile(e)}
            className="block ml-4 text-sm text-slate-500 mr-4 py-1 px-2
            rounded-md border-0 text-sm font-semibold bg-pink-100
            text-pink-700 hover:bg-pink-300 cursor-pointer"
          >
            Commit
          </button>

          <a
            className="block ml-8 text-sm text-slate-500 mr-4 py-1 px-2
            rounded-md border-0 text-sm font-semibold bg-blue-100
            text-blue-600 hover:bg-blue-300 cursor-pointer float-right"
            href={'/data.csv'}
          >
            Download Example CSV
          </a>
        </div>
      </form>
    </div>

    <table className={'text-sm text-left text-gray-500 dark:text-gray-400 w-fit dark'}>
    <thead className={'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'}>
    <tr>
      <th scope="col" className="px-6 py-3">id</th>
      <th scope="col" className="px-6 py-3">type</th>
      <th scope="col" className="px-6 py-3">amount</th>
      <th scope="col" className="px-6 py-3">date</th>
      <th scope="col" className="px-6 py-3">memo</th>
      <th scope="col" className="px-6 py-3">Operation</th>
    </tr>
    </thead>
    <tbody>
      {transactions?.map(t=><tr className={'bg-white border-b dark:bg-gray-800 dark:border-gray-700'} key={t.id}><td className={'px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'}>{t.id}</td><td className={'px-6 py-4'}>{t.type}</td><td className={'px-6 py-4'}>{t.amount}</td><td className={'px-6 py-4'}>{t.date.toLocaleDateString()}</td><td className={'px-6 py-4'}>{t.memo}</td><td onClick={()=>removeTransaction(t.id)} className={'px-6 py-4 text-blue-300 cursor-pointer uppercase'}>Delete</td></tr>)}
    </tbody>
  </table>
  </div>
}

