import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetRecs } from '../../redux/recommendations'
import { thunkGetAllBooks } from '../../redux/books'
import './Book.css'
import AddToBoard from '../../components/AddToBoard/AddToBoard'
import AddRecommendation from '../../components/AddRecommendation/AddRecommendation'

export default function Book() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { bookId } = useParams()
  const location = useLocation()
  const coverImage = location.state?.coverImage
  const bookTitle = location.state?.bookTitle
  const recommendations = useSelector((state) => state.recommendations.recommendations ? state.recommendations.recommendations[bookId] : undefined);
  const { books } = useSelector((state) => state.books)
  const [loading, setLoading] = useState(true)
  const [clickedBookId, setClickedBookId] = useState(null)
  const [bookCovers, setBookCovers] = useState({})
  const [book, setBook] = useState(null)

  useEffect(() => {
    const fetchBooksAndRecs = async () => {
      await dispatch(thunkGetAllBooks());
      await dispatch(thunkGetRecs(bookId));
    };

    fetchBooksAndRecs();
  }, [dispatch, bookId]);

  console.log('RECOMMENDATIONS:', recommendations);
  return (
    <>
      <h2 className="author-title">{bookTitle}</h2>
      <div className="rec-container">
        {/* <img
          src={coverImage}
          id="chosen-book"
          alt={`Cover of book ${bookId}`}
          onClick={() => navigate(`/books/${bookId}`)}
        /> */}
        {recommendations && (
          <div className="first-three-images">
            {recommendations
              .sort((a, b) => b.votes - a.votes)
              .slice(0, 3).map((rec, index) => {
              const book = books[rec.recommendationId]

              if(!book) {
                return null;
              }

              let crownColorClass = ''
              let order = 0

              if (index === 0) {
                crownColorClass = 'gold-crown';
                order = 2
              } else if (index === 1) {
                crownColorClass = 'silver-crown';
                order = 1
              } else if (index === 2) {
                crownColorClass = 'bronze-crown';
                order = 3
              }

              return book ? (
                <div key={rec.recommendationId} className="recommendations" style={{ order: order }}>
                  <i className={`fa-solid fa-crown ${crownColorClass} fa-2xl`}></i>
                  <img
                    src={book.cover}
                    className="cover-img"
                    alt={`Cover of book ${rec.recommendationId}`}
                    onClick={() =>
                      navigate(`/books/${book.id}`, {
                        state: { coverImage: bookCovers[book.id] || book.cover, bookTitle: book.title},
                      })
                    }
                  />
                  <div className='voting'>
                    <i className="fa-solid fa-arrow-up fa-lg"></i>
                    <div>{rec.votes}</div>
                    <i className="fa-solid fa-arrow-down fa-lg"></i>
                  </div>
                  <button onClick={() => setClickedBookId(rec.recommendationId)}>+</button>
                  {clickedBookId === rec.recommendationId && (
                    <>
                      <AddToBoard />
                      <button onClick={() => setClickedBookId(null)}>
                        -
                      </button>
                    </>
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
                        state: { coverImage: bookCovers[book.id] || book.cover, bookTitle: book.title},
                      })
                    }
                  />
                  <div className='voting'>
                    <i className="fa-solid fa-arrow-up fa-lg"></i>
                    <div>{rec.votes}</div>
                    <i className="fa-solid fa-arrow-down fa-lg"></i>
                  </div>
                  <button onClick={() => setClickedBookId(rec.recommendationId)}>+</button>
                  {clickedBookId === rec.recommendationId && (
                    <>
                      <AddToBoard />
                      <button onClick={() => setClickedBookId(null)}>
                        -
                      </button>
                    </>
                  )}
                </div>
              ) : null
            })}
          </div>
        )}
        <AddRecommendation />
      </div>
    </>
  )
}
