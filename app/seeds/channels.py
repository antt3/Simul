from app.models import db, Channel

def seed_channels():
    demo_team = Channel(
        title='demo-team', description='The first team on Simul', user_id=1)
    money_team = Channel(
        title='money-team', description='It\s the money team', user_id=2)
    tp_management = Channel(
        title='trailer-park-management', description='Canada\'s FInest', user_id=3)
    bobby_boys = Channel(
        title='bobby-boys', description='', user_id=4)

    db.session.add(demo_team)
    db.session.add(money_team)
    db.session.add(tp_management)
    db.session.add(bobby_boys)

    db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()