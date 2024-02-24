# from app.models import db, Recommendation, environment, SCHEMA
# from sqlalchemy.sql import text


# def seed_recommendations():
#     recommendation1 = Recommendation()
#     recommendation2 = Recommendation()
#     recommendation3 = Recommendation()

#     db.session.add_all([recommendation1, recommendation2, recommendation3])
#     db.session.commit()

# def undo_recommendations():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.recommendations RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM recommendations"))

#     db.session.commit()
