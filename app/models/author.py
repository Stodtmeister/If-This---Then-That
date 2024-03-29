from .db import db, environment, SCHEMA, add_prefix_for_prod


class Author(db.Model):
    __tablename__ = "authors"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)

    series = db.relationship("Series", back_populates="author")
    books = db.relationship("Book", back_populates="author")

    def __repr__(self):
        return f"<Author {self.id} {self.name}>"

    # author
    def to_dict(self, include_series=True):
        data = {
            "id": self.id,
            "name": self.name,
        }
        if include_series:
            data["series"] = [
                series.to_dict(include_author=False, include_books=True)
                for series in self.series
            ]
        return data
