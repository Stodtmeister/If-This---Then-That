import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetRecs } from '../../redux/recommendations'
import { thunkGetAllBooks } from '../../redux/books'
import './Book.css'
import AddToBoard from '../../components/AddToBoard/AddToBoard'

export default function Book() {
  const { bookId } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const coverImage = location.state?.coverImage
  const bookTitle = location.state?.bookTitle
  const { recommendations } = useSelector((state) => state.recommendations)
  const { books } = useSelector((state) => state.books)
  const [loading, setLoading] = useState(true)
  const [clickedBookId, setClickedBookId] = useState(null)
  const [bookCovers, setBookCovers] = useState({})

  useEffect(() => {
    dispatch(thunkGetAllBooks()).then(() => setLoading(false))
    dispatch(thunkGetRecs(bookId))
  }, [dispatch, bookId])

  // useEffect(() => {
  //   const fetchCovers = async () => {
  //     for (let recId of Object.keys(recommendations)) {
  //       const book = books[recId];
  //       if (!book?.cover) {
  //         await fetchBookCover(book);
  //       }
  //       setBookCovers(prevState => ({
  //         ...prevState,
  //         [recId]: book.cover
  //       }));
  //     }
  //   };

  //   fetchCovers();
  // }, [books, recommendations, bookId]);


  if (loading) {
    return <h2>Loading...</h2>
  }

  // const handleUpvote = (recId) => {
  //   setRecommendations(prevRecommendations => ({
  //     ...prevRecommendations,
  //     [recId]: {
  //       ...prevRecommendations[recId],
  //       votes: prevRecommendations[recId].votes + 1
  //     }
  //   }));
  // };

  // const handleDownvote = (recId) => {
  //   setRecommendations(prevRecommendations => ({
  //     ...prevRecommendations,
  //     [recId]: {
  //       ...prevRecommendations[recId],
  //       votes: prevRecommendations[recId].votes - 1
  //     }
  //   }));
  // };

  console.log('books:', books);
  console.log('RECOMMENDATIONS:', recommendations);
  return (
    <>
      <h2 className="author-title">{bookTitle}</h2>
      <div className="rec-container">
        <img
          src={coverImage}
          id="chosen-book"
          alt={`Cover of book ${bookId}`}
        />
        {recommendations && (
          <div className="first-three-images">
            {Object.keys(recommendations)
              .sort((a, b) => recommendations[b].votes - recommendations[a].votes)
              .slice(0, 3).map((recId, index) => {
              const book = books[recId]
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
                <div key={recId} className="recommendations" style={{ order: order }}>
                  <i className={`fa-solid fa-crown ${crownColorClass} fa-2xl`}></i>
                  {/* {!book?.cover && fetchBookCover(book)} */}
                  <img
                    src={book.cover}
                    className="cover-img"
                    alt={`Cover of book ${recId}`}
                  />
                  <div className='voting'>
                    <i className="fa-solid fa-arrow-up fa-lg"></i>
                    <div>{recommendations[recId].votes}</div>
                    <i className="fa-solid fa-arrow-down fa-lg"></i>
                  </div>
                  <button onClick={() => setClickedBookId(recId)}>+</button>
                  {clickedBookId === recId && (
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
            {Object.keys(recommendations).slice(3).map((recId) => {
              const book = books[recId]
              return book ? (
                <div key={recId} className="recommendations">
                  <img
                    src={book.cover}
                    className="cover-img"
                    alt={`Cover of book ${recId}`}
                  />
                  <div className='voting'>
                    <i className="fa-solid fa-arrow-up fa-lg"></i>
                    <div>{recommendations[recId].votes}</div>
                    <i className="fa-solid fa-arrow-down fa-lg"></i>
                  </div>
                  <button onClick={() => setClickedBookId(recId)}>+</button>
                  {clickedBookId === recId && (
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
      </div>
    </>
  )
}
