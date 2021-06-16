function findAccountById(accounts, id) {
   //returns the account object that has the matching ID
  const accountFound = accounts.find((account) => account.id === id);
  return accountFound;
}

function sortAccountsByLastName(accounts) {
  //returns a sorted array of objects. The objects are sorted alphabetically by last name
  const sortByLast = accounts.sort((account1, account2) => account1.name.last.toLowerCase() < account2.name.last.toLowerCase() ? -1 : 1);
  return sortByLast;
}

function getTotalNumberOfBorrows(account, books) {
  // returns a number that represents the number of times the account's ID has appeared in a book's borrow array.
  return books.reduce((totalBorrowed, book) => {
    const borrowInfo = book.borrows;
    if (borrowInfo.some((book) => book.id === account.id)) 
    totalBorrowed++;
    return totalBorrowed;
  },0);
}

function getBooksPossessedByAccount(account, books, authors) {
   //returns an array of books and authors - represents all books currently checked out by the given account
  //book object and the author object is embedded inside of it
  const checkedOut = books.filter((book) =>
  book.borrows[0].id === account.id);
  
  for (let book of checkedOut) {
    const id = book.authorId;
    const author = authors.find((author) => author.id === id);
    book["author"] = author;
  }
    return checkedOut; 
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
