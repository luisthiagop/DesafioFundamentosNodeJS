import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

// DTO
interface Request {
  title: string;
  value: number;
  type: string;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return Object.assign(this.transactions);
  }

  public getBalance(): Balance {
    this.balance.income = this.transactions.reduce(
      (prev, elem) => (elem.type === 'income' ? prev + elem.value : prev),
      0,
    );
    this.balance.outcome = this.transactions.reduce(
      (prev, elem) => (elem.type === 'outcome' ? prev + elem.value : prev),
      0,
    );
    this.balance.total = this.balance.income - this.balance.outcome;

    return this.balance;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
