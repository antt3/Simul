from app.models.db import db, Users_Channels
from app.seeds import users, channels

def seed_users_channels():

    demo_team_1=Users_Channels.insert().values(users=1, channels=1)
    demo_team_2=Users_Channels.insert().values(users=2, channels=1)
    demo_team_3=Users_Channels.insert().values(users=3, channels=1)
    demo_team_4=Users_Channels.insert().values(users=4, channels=1)
    money_team_1=Users_Channels.insert().values(users=2, channels=2)
    money_team_2=Users_Channels.insert().values(users=1, channels=2)
    money_team_3=Users_Channels.insert().values(users=3, channels=2)
    money_team_4=Users_Channels.insert().values(users=4, channels=2)
    tp_man_1=Users_Channels.insert().values(users=3, channels=3)
    tp_man_2=Users_Channels.insert().values(users=1, channels=3)
    tp_man_3=Users_Channels.insert().values(users=2, channels=3)
    tp_man_4=Users_Channels.insert().values(users=4, channels=3)
    bobby_boys_1=Users_Channels.insert().values(users=4, channels=4)
    bobby_boys_2=Users_Channels.insert().values(users=1, channels=4)
    bobby_boys_3=Users_Channels.insert().values(users=2, channels=4)
    bobby_boys_4=Users_Channels.insert().values(users=3, channels=4)

    db.session.execute(demo_team_1)
    db.session.execute(demo_team_2)
    db.session.execute(demo_team_3)
    db.session.execute(demo_team_4)
    db.session.execute(money_team_1)
    db.session.execute(money_team_2)
    db.session.execute(money_team_3)
    db.session.execute(money_team_4)
    db.session.execute(tp_man_1)
    db.session.execute(tp_man_2)
    db.session.execute(tp_man_3)
    db.session.execute(tp_man_4)
    db.session.execute(bobby_boys_1)
    db.session.execute(bobby_boys_2)
    db.session.execute(bobby_boys_3)
    db.session.execute(bobby_boys_4)

    db.session.commit()


def undo_users_channels():
  db.session.execute('TRUNCATE playlist_songs RESTART IDENTITY CASCADE;')
  db.session.commit()
