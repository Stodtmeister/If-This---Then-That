import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAuthors } from "../../redux/authors"
import { useNavigate } from "react-router-dom"


export default function Authors() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authors = useSelector((state) => state.authors.authors)


  useEffect(() => {
    dispatch(thunkGetAuthors())
  }, [dispatch])

  const [selectedLetter, setSelectedLetter] = useState(null);
  const letters = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  const filteredAuthors = authors?.filter(author => {
    const lastName = author.name.split(' ').pop();
    return lastName[0].toUpperCase() === selectedLetter;
  });

  return (
    <>
      <h1>Authors</h1>
      <div>
        {letters.map((letter) => (
          <button key={letter} onClick={() => handleLetterClick(letter)}>
            {letter}
          </button>
        ))}
      </div>
      <div>
        {selectedLetter && (
          <div>
            <h2>{`Authors with last name starting with "${selectedLetter}"`}:</h2>
            {filteredAuthors.map((author) => (
              <div key={author.id} onClick={() => navigate(`/authors/${author.id}`)}>
                {author.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
