import MockWallet from 'src/mocks/wallet';
import MockTransactions from 'src/mocks/transactions';
const DB_NAME = 'finance';

const serviceLocalStorage = {
  get: (key) => JSON.parse(localStorage.getItem(`${DB_NAME}_${key}`)),
  set: (key, data) => localStorage.setItem(`${DB_NAME}_${key}`, JSON.stringify(data))
}

const localDB = {
  getWallet() {
    const wallet = serviceLocalStorage.get('wallet')
    if (!wallet) serviceLocalStorage.set('wallet', MockWallet);
    
    return serviceLocalStorage.get('wallet');
  },
  addCardInWallet(card) {
    const wallet = this.getWallet();
    serviceLocalStorage.set('wallet', [...wallet].push(card))
  },
  getTransactions() {
    const transactions = serviceLocalStorage.get('transactions');
    if (!transactions) serviceLocalStorage.set('transactions', MockTransactions);

    return serviceLocalStorage.get('transactions');
  },
  addTransaction(transaction) {
    let transactions = this.getTransactions();
    transactions.push(transaction);
    serviceLocalStorage.set('transactions', transactions);
  }
}

export default localDB;