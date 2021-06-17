const {findAuthorById} = require('./books');
//Helper function to create object in getMostCommonGenres and getMostPopularAuthors
function newObject(name, count) {
  return {
    name: name,
    count: count
  }
};
function getTotalBooksCount(books) {
  // returns a number that represents the number of book objects inside of the array.
  return books.length
}

function getTotalAccountsCount(accounts) {
  // returns a number that represents the number of account objects inside of the array.
  return accounts.length
}

function getBooksBorrowedCount(books) {
  //returns a number that represents the number of books that have been taken out from the library. This number can be found by looking at the first transaction in the borrows key of each book. If the transaction says the book has not been returned (i.e. returned: false), the book has been borrowed.
   let borrowedNum = 0;
  // everytime a book is not returned, increase the count
  books.forEach((book) => {
    const lastBorrowed = book.borrows[0].returned;
    if(!lastBorrowed) borrowedNum++;
  });
  return borrowedNum;
  
}

function getMostCommonGenres(books) {
  //returns an array containing five objects or less that represents the most common occurring genres, ordered from most common to least.
  //Each object in the returned array has two keys:
/*
The name key which represents the name of the genre.
The count key which represents the number of times the genre occurs.
If more than five genres are present, only the top five should be returned.
*/
  const popularGenres = [];

  books.forEach((book) => {
    const genreName = book.genre;

    popularGenres.forEach((genre) => {
      if(genre.name === genreName) {
        genre.count++;
        return;
      }
    });
  popularGenres.push(newObject(genreName, 1));
  });
  popularGenres.sort((genreA, genreB) => (genreA.count > genreB.count ? -1 : 1));
  return popularGenres.splice(0, 5);
}


function getMostPopularBooks(books) {
  //returns an array containing five objects or less that represents the most popular books in the library. Popularity is represented by the number of times a book has been borrowed.
  const popularBooks = [];

  books.forEach(({title, borrows}) => {
    popularBooks.push({name: title, count: borrows.length});
  });

  popularBooks.sort((bookA, bookB) => (bookA.count > bookB.count ? -1 : 1));

  return popularBooks.splice(0, 5);
}

function getMostPopularAuthors(books, authors) {
 /*returns an array containing five objects or less
 array represents the most popular authors 
 find all of the books written by the author and then add up the number of times those books have been borrowed.
 */
   const popAuthors = [];
  books.forEach((book) => {
    let author = findAuthorById(authors, book.authorId).name;
    const borrowedNum = book.borrows.length;
    popAuthors.forEach((author) => {
      if (author.name === author){
      author.count += borrowedNum;
      return;
    }
  });
   popAuthors.push(newObject(author.first + " " + author.last, borrowedNum))
});
  popAuthors.sort((author1, author2) => (author1.count > author2.count ? -1 : 1));
  return popAuthors.splice(0, 5)
  }


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
