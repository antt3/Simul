from app.models import db, Channel_message

def seed_channel_messages():
    demo_team_1 = Channel_message(
        message='First Message', edited=False, created_at='2022-08-10 10:1:23.473031', user_id=1, channel_id=1)
    demo_team_2 = Channel_message(
        message='Second Message', edited=False, created_at='2022-09-18 10:2:23.473031', user_id=2, channel_id=1)
    demo_team_3 = Channel_message(
        message='Third Message', edited=False, created_at='2022-11-12 10:3:23.473031', user_id=3, channel_id=1)
    demo_team_4 = Channel_message(
        message='Fourth Message', edited=False, created_at='2023-02-15 10:4:23.473031', user_id=4, channel_id=1)
    money_team_1 = Channel_message(
        message='First Message', edited=False, created_at='2022-09-23 10:1:23.473031', user_id=2, channel_id=2)
    money_team_2 = Channel_message(
        message='Second Message', edited=False, created_at='2022-09-25 10:2:24.473031', user_id=3, channel_id=2)
    money_team_3 = Channel_message(
        message='Third Message', edited=False, created_at='2022-10-05 10:3:25.473031', user_id=4, channel_id=2)
    money_team_4 = Channel_message(
        message='Fourth Message', edited=False, created_at='2022-15-12 10:4:23.473031', user_id=1, channel_id=2)
    tp_management_1 = Channel_message(
        message='First Message', edited=False, created_at='2022-11-01 10:1:23.473031', user_id=3, channel_id=3)
    tp_management_2 = Channel_message(
        message='Second Message', edited=False, created_at='2022-12-28 10:2:23.473031', user_id=4, channel_id=3)
    tp_management_3 = Channel_message(
        message='Third Message', edited=False, created_at='2023-01-17 10:3:23.473031', user_id=1, channel_id=3)
    tp_management_4 = Channel_message(
        message='Fourth Message', edited=False, created_at='2023-01-23 10:4:23.473031', user_id=2, channel_id=3)
    bobby_boys_1 = Channel_message(
        message='First Message', edited=False, created_at='2022-05-11 10:1:23.473031', user_id=4, channel_id=4)
    bobby_boys_2 = Channel_message(
        message='Second Message', edited=False, created_at='2022-05-13 10:2:23.473031', user_id=1, channel_id=4)
    bobby_boys_3 = Channel_message(
        message='Third Message', edited=False, created_at='2022-06-06 10:3:23.473031', user_id=2, channel_id=4)
    bobby_boys_4 = Channel_message(
        message='Fourth Message', edited=False, created_at='2022-07-21 10:4:23.473031', user_id=3, channel_id=4)

    db.session.add(demo_team_1)
    db.session.add(demo_team_2)
    db.session.add(demo_team_3)
    db.session.add(demo_team_4)
    db.session.add(money_team_1)
    db.session.add(money_team_2)
    db.session.add(money_team_3)
    db.session.add(money_team_4)
    db.session.add(tp_management_1)
    db.session.add(tp_management_2)
    db.session.add(tp_management_3)
    db.session.add(tp_management_4)
    db.session.add(bobby_boys_1)
    db.session.add(bobby_boys_2)
    db.session.add(bobby_boys_3)
    db.session.add(bobby_boys_4)

    db.session.commit()


def undo_channel_messages():
    db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
    db.session.commit()