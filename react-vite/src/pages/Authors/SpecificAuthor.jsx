import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './SpecificAuthor.css'
import { useEffect, useState } from 'react'
import { thunkGetAuthors } from '../../redux/authors'

export default function SpecificAuthor() {
  const { authorId } = useParams()
  const authors = useSelector(state => state.authors.authors)
  const dispatch = useDispatch()
  const [author, setAuthor] = useState(null)

  useEffect(() => {
    if (!authors) {
      dispatch(thunkGetAuthors())
    }
  }, [dispatch, authors])

  useEffect(() => {
    if (authors) {
      const foundAuthor = authors.find(author => String(author.id) === authorId);
      setAuthor(foundAuthor);
    }
  }, [authors, authorId]);

  return (
    <>
    <div>
      SpecificAuthor {authorId}
    </div>
    {author?.series?.map(series => (
      <div key={series.id}>
        {series.name}
        <ul>
          {series.books.map(book => (
            <>
              {console.log(book)}
              <li key={book.id}>{book.title}</li>
            </>
          ))}
        </ul>
      </div>
    ))}
    </>
  )
}
