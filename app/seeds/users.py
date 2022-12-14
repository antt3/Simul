from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io', password='password', full_name='Demo Lition', nickname='Demo', bio='Just A Quirky Guy!', status=True, profile_pic='https://i.pinimg.com/originals/99/ba/c1/99bac1dab2b7567ca3012b3c3ce89cdc.jpg')
    marnie = User(
        email='marnie@aa.io', password='password', full_name='Marnie Moe', nickname='Marnie', bio='I\'m A Fictional Character!', status=True, profile_pic='https://image.shutterstock.com/image-photo/pure-youth-crazy-english-cocker-260nw-1424153078.jpg')
    randy = User(
        email='randy@aa.io', password='password', full_name='Randy Bobandy', nickname='', bio='I Like Cheeseburgers!', status=True, profile_pic='https://wallpaperaccess.com/full/2004483.jpg')
    bobbie = User(
        email='bobbie@aa.io', password='password', full_name='Bobby Boyle', nickname='Bobby', bio='', status=False, profile_pic='')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(randy)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
