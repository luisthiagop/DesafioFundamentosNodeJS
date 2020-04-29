import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

// DTO
interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (
      type === 'outcome' &&
      this.transactionsRepository.getBalance().total - value < 0
    ) {
      throw new Error('You dont have money!');
    }

    const transaction = this.transactionsRepository.create(
      new Transaction({ title, value, type }),
    );

    return transaction;
  }
}

export default CreateTransactionService;
