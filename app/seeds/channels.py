from app.models import db, Channel

def seed_channels():
    demo_team = Channel(
        title='Demo Team', description='The first team on Simul.', user_id=1)
    money_team = Channel(
        title='Money Team', description='Get Money Or Get Out!', user_id=2)
    tp_management = Channel(
        title='Trailer Park Management', description='The Few, The Proud.', user_id=3)
    bobby_boys = Channel(
        title='Bobby Boys', description='', user_id=4)

    db.session.add(demo_team)
    db.session.add(money_team)
    db.session.add(tp_management)
    db.session.add(bobby_boys)

    db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()