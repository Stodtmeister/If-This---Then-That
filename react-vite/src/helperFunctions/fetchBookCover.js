export async function fetchBookCover(book) {
  if (book.cover) {
    console.log('ALREADY HAS A COVER');
    return Promise.resolve(); // Resolve immediately for books that already have a cover
  } else {
    console.log('FETCHING BOOK COVER');
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(book.title)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.items) {
      const coverImageLink = data.items[0].volumeInfo.imageLinks.thumbnail;
      await fetch(`/api/books/${book.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coverImageLink }),
      });
      return coverImageLink;
    }
  }
}
