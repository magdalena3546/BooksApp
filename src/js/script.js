{
  'use strict';
  const select = {
    templateBook: Handlebars.compile(document.querySelector('#template-book').innerHTML)
  };
  const filters = [];
  class BooksList {
    constructor() {
      const thisBooksList = this;
      thisBooksList.getElements();
      thisBooksList.initData();
      thisBooksList.initActions();
    }
    initData() {
      const thisBooksList = this;
      this.data = dataSource.books;
      for (let element of this.data) {

        const ratingBgc = thisBooksList.determineRatingBgc(element.rating);
        const ratingWidth = element.rating * 10;

        element.ratingBgc = ratingBgc;
        element.ratingWidth = ratingWidth;

        const generatedHTML = select.templateBook(element);

        const generatedDOM = utils.createDOMFromHTML(generatedHTML);

        thisBooksList.booksListWrapper.appendChild(generatedDOM);
      }
    }

    getElements() {
      const thisBooksList = this;
      thisBooksList.filters = [];
      thisBooksList.booksListWrapper = document.querySelector('.books-list');
      thisBooksList.filtersDOM = document.querySelector('.filters');
    }

    initActions() {
      const favoriteBooks = [];
      const thisBooksList = this;
      thisBooksList.booksListWrapper.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const book = event.target.offsetParent;
        if (book.classList.contains('book__image')) {
          const bookId = book.getAttribute('data-id');
          const indexOfBook = favoriteBooks.indexOf(bookId);
          if (!favoriteBooks[indexOfBook]) {
            book.classList.add('favorite');
            favoriteBooks.push(bookId);

          } else {
            book.classList.remove('favorite');
            favoriteBooks.splice(indexOfBook, 1);
          }
          console.log(favoriteBooks);
        }
      });

      thisBooksList.filtersDOM.addEventListener('click', function (event) {

        const filterBook = event.target;
        const filterIndexOf = thisBooksList.filters.indexOf(filterBook);
        console.log(event.target);
        if (filterBook.tagName == 'INPUT' && filterBook.type == 'checkbox' && filterBook.name == 'filter') {
          if (filterBook.checked == true && !thisBooksList.filters[filterIndexOf]) {
            thisBooksList.filters.push(filterBook.value);
          } else {
            thisBooksList.filters.splice(filterIndexOf, 1);
          }

        }
        thisBooksList.filterBooks();
      });
    }
    filterBooks() {
      for (let book of dataSource.books) {
        let shouldBeHidden = false;
        const thisBooksList = this;
        for (let filterBook of thisBooksList.filters) {
          if (!book.details[filterBook]) {
            shouldBeHidden = true;
            break;
          }
        }
        const bookImage = document.querySelector('[data-id="' + book.id + '"]');
        if (shouldBeHidden == true) {
          bookImage.classList.add('hidden');
        } else {
          bookImage.classList.remove('hidden');
        }

      }
    }

    determineRatingBgc(rating) {
      let ratingBgc = '';
      if (rating < 6) {
        ratingBgc = 'linear - gradient(to bottom, #fefcea 0 % , #f1da36 100 % )';
      } else if (rating > 6 && rating <= 8) {
        ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return ratingBgc;
    }

  }

  const app = new BooksList();
}