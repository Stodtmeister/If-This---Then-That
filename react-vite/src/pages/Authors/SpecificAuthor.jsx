import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './SpecificAuthor.css'
import { useEffect, useState } from 'react'
import { thunkGetAuthors } from '../../redux/authors'

export default function SpecificAuthor() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { authorId } = useParams()
  const authors = useSelector((state) => state.authors.authors)
  const [author, setAuthor] = useState(null)
  const [bookCovers, setBookCovers] = useState({})

  useEffect(() => {
    if (!authors) {
      dispatch(thunkGetAuthors())
    }
  }, [dispatch, authors])

  useEffect(() => {
    if (authors) {
      const foundAuthor = authors.find(
        (author) => String(author.id) === authorId
      )
      setAuthor(foundAuthor)

      if (foundAuthor?.series) {
        foundAuthor.series.forEach((series) => {
          series.books.forEach(fetchBookCover)
        })
      }
    }
  }, [authors, authorId])

  async function fetchBookCover(book) {
    if (book.cover) {
      setBookCovers((prev) => ({ ...prev, [book.id]: book.cover }))
      console.log('ALREADY HAS A COVER')
      return Promise.resolve() // Resolve immediately for books that already have a cover
    } else {
      console.log('FETCHING BOOK COVER')
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
          book.title
        )}`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.items) {
        const coverImageLink = data.items[0].volumeInfo.imageLinks.thumbnail
        setBookCovers((prev) => ({ ...prev, [book.id]: coverImageLink }))
        await fetch(`/api/books/${book.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ coverImageLink }),
        })
      }
    }
  }

  // useEffect(() => {
  //   if (author?.series) {
  //     author.series.forEach((series) => {
  //       series.books.forEach(fetchBookCover);
  //     });
  //   }
  // }, [author]);

  console.log('AUTHOR', author)
  return (
    <>
      <div>
        SpecificAuthor {authorId} {author?.name}
      </div>
      {author?.series?.map((series) => (
        <div key={series.id}>
          {series.name}
          <ul>
            {series.books.map((book) => (
              <>
                <img
                  className="cover-img"
                  src={bookCovers[book.id] || book.cover}
                  alt="book cover"
                  title={book.title}
                  onClick={() =>
                    navigate(`/books/${book.id}`, {
                      state: { coverImage: bookCovers[book.id] || book.cover },
                    })
                  }
                />
                <li key={book.id}>{book.title}</li>
              </>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}
