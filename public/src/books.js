function findAuthorById(authors, id) {
  //returns the author object that has the matching ID.
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  //returns the book object that has the matching ID.
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  //returns an array with two arrays.
  //first array contains books that have been loaned out, not returned             //second array contains books that have been returned
  //check for the return status
  const borrowed = books.filter((book) => !book.borrows[0].returned);
  const returned = books.filter((book) => book.borrows[0].returned);
   return [borrowed, returned];

}

function getBorrowersForBook({borrows}, accounts) {
  //return an array of all the transactions from the book's borrows key.       
  //each transaction in array includes related account information and the returned key.
  let transactions = borrows.map((item) => {
    let accountData = accounts.find((account) => account.id == item.id)
    let _item = {...item, ...accountData}
    return _item
  })
  console.log(transactions)
  return transactions.slice(0,10)
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
