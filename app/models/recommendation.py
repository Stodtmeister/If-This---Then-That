from .db import db, environment, SCHEMA, add_prefix_for_prod

# from .book import book_recommendation


class Recommendation(db.Model):
    __tablename__ = "recommendations"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    book_recommendations = db.relationship("BookRecommendation", back_populates="recommendation")

    def __repr__(self):
        return f"<Recommendation {self.id}>"

    def to_dict(self, include_books=True):
        data = {
            "id": self.id,
            # "books": [
            #     br.book.to_dict(include_boards=False, include_recommendations=False)
            #     for br in self.book_recommendations
            # ],
        }

        if include_books:
            data["books"] = [br.book.to_dict(include_boards=False, include_recommendations=False) for br in self.book_recommendations]
        return data
