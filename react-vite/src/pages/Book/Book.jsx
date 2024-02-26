import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetRecs, thunkUpvoteRecommendation } from '../../redux/recommendations'
import { thunkGetAllBooks } from '../../redux/books'
import AddToBoard from '../../components/AddToBoard/AddToBoard'
import AddRecommendation from '../../components/AddRecommendation/AddRecommendation'
import BookReviews from '../../components/BookReviews/BookReviews'
import { Helmet } from 'react-helmet'
import './Book.css'
import RippleButton from '../../components/RippleButton/RippleButton'

export default function Book() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { bookId } = useParams()
  const location = useLocation()
  const coverImage = location.state?.coverImage
  const bookTitle = location.state?.bookTitle
  const recommendations = useSelector(state => state.recommendations?.recommendations ? state.recommendations.recommendations[bookId] : []);
  const { books } = useSelector((state) => state.books)
  const [loading, setLoading] = useState(true)
  const [clickedBookId, setClickedBookId] = useState(null)
  const [bookCovers, setBookCovers] = useState({})
  const [book, setBook] = useState(null)
  const [isUpvoted, setIsUpvoted] = useState({})

  useEffect(() => {
    const fetchBooksAndRecs = async () => {
      await dispatch(thunkGetAllBooks())
      await dispatch(thunkGetRecs(bookId))
    }

    fetchBooksAndRecs()
  }, [dispatch, bookId])


  return (
    <div className='book-page-container'>
      <Helmet><title>{`ITTT: ${bookTitle}`}</title></Helmet>
      <h2 className="author-title book" style={{ textDecoration: 'underline'}}>Recommendations based on:<br /> {bookTitle}</h2>
      <div className="rec-container">
        <div className='main-img-container'>
          <img
            src={coverImage}
            id="chosen-book"
            alt={`Cover of book ${bookId}`}
            onClick={() => navigate(`/books/${bookId}`)}
            />
          <BookReviews bookId={bookId}/>
          <button
            className="add-to-board-btn"
            onClick={() => setClickedBookId(bookId)}
            >
            Add to board
          </button>
          {clickedBookId === bookId && (
            <AddToBoard
              bookId={bookId}
              setClickedBookId={setClickedBookId}
              mainBook={true}
            />
            )}
          </div>
        {recommendations && (
          <div className="first-three-images">
            {recommendations
              .sort((a, b) => b.votes - a.votes)
              .slice(0, 3)
              .map((rec, index) => {
                const book = books[rec.recommendationId]
                if (!book) {return null}

                let crownColorClass = ''
                let order = 0

                if (index === 0) {
                  crownColorClass = 'gold-crown'
                  order = 2
                } else if (index === 1) {
                  crownColorClass = 'silver-crown'
                  order = 1
                } else if (index === 2) {
                  crownColorClass = 'bronze-crown'
                  order = 3
                }

                return book ? (
                  <div
                    key={rec.recommendationId}
                    className="recommendations"
                    style={{ order: order }}
                  >
                    <i className={`fa-solid fa-crown ${crownColorClass} fa-2xl`}></i>
                    <img
                      src={book.cover}
                      className="cover-img"
                      alt={`Cover of book ${rec.recommendationId}`}
                      onClick={() =>
                        navigate(`/books/${book.id}`, {
                          state: {
                            coverImage: bookCovers[book.id] || book.cover,
                            bookTitle: book.title,
                          },
                        })
                      }
                    />
                    <BookReviews
                      bookId={rec.recommendationId}
                      bookTitle={bookTitle}
                    />
                    <div className="voting">
                    <button
                      className={`vote-button ${isUpvoted[rec.recommendationId] ? 'upvoted' : ''}`}
                      title="Upvote this book"
                      onClick={() => {
                        if (!isUpvoted[rec.recommendationId]) {
                          dispatch(thunkUpvoteRecommendation(bookId, rec.recommendationId));
                          setIsUpvoted((prevState) => ({
                            ...prevState,
                            [rec.recommendationId]: true,
                          }));
                        }
                      }}
                    >
                      <i
                        className={`fa-solid fa-arrow-up fa-lg ${
                          isUpvoted[rec.recommendationId] ? 'upvoted' : ''
                        }`}
                      ></i>
                      {rec.votes}
                    </button>
                    </div>
                    <RippleButton
                      className="add-to-board-btn"
                      onClick={() => setClickedBookId(rec.recommendationId)}
                    >
                      Add to board
                    </RippleButton>
                    {clickedBookId === rec.recommendationId && (
                      <AddToBoard
                        bookId={rec.recommendationId}
                        setClickedBookId={setClickedBookId}
                      />
                    )}
                  </div>
                ) : null
              })}
          </div>
        )}
        {recommendations && (
          <div className="rest-of-images">
            {recommendations.slice(3).map((rec) => {
              const book = books[rec.recommendationId]
              return book ? (
                <div key={rec.recommendationId} className="recommendations">
                  <img
                    src={book.cover}
                    className="cover-img"
                    alt={`Cover of book ${rec.recommendationId}`}
                    onClick={() =>
                      navigate(`/books/${book.id}`, {
                        state: {
                          coverImage: bookCovers[book.id] || book.cover,
                          bookTitle: book.title,
                        },
                      })
                    }
                  />
                  <BookReviews
                    bookId={rec.recommendationId}
                    bookTitle={bookTitle}
                  />
                  <div className="voting">
                  <button
                    className={`vote-button ${isUpvoted[rec.recommendationId] ? 'upvoted' : ''}`}
                    title="Upvote this book"
                    onClick={() => {
                      if (!isUpvoted[rec.recommendationId]) {
                        dispatch(thunkUpvoteRecommendation(bookId, rec.recommendationId));
                        setIsUpvoted((prevState) => ({
                          ...prevState,
                          [rec.recommendationId]: true,
                        }));
                      }
                    }}
                  >
                    <i
                      className={`fa-solid fa-arrow-up fa-lg`}
                    ></i>
                    {rec.votes}
                  </button>
                  </div>
                  <RippleButton
                    className="add-to-board-btn"
                    onClick={() => setClickedBookId(rec.recommendationId)}
                  >
                    Add to board
                  </RippleButton>
                  {clickedBookId === rec.recommendationId && (
                    <AddToBoard
                      bookId={rec.recommendationId}
                      setClickedBookId={setClickedBookId}
                    />
                  )}
                </div>
              ) : null
            })}
          </div>
        )}
        <AddRecommendation />
      </div>
    </div>
  )
}
