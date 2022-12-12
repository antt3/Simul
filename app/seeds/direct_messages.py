from app.models import db, Direct_message

def seed_direct_messages():
    to_ref_1_1 = Direct_message(
        message='First Message', edited=False, created_at='2022-08-10 11:1:23.473031', user_id=1, ref_id=1)
    to_ref_1_1_2 = Direct_message(
        message='Second Message', edited=False, created_at='2022-10-08 08:2:24.473031', user_id=1, ref_id=1)
    to_ref_1_1_3 = Direct_message(
        message='Third Message', edited=False, created_at='2022-11-16 17:3:25.473031', user_id=1, ref_id=1)
    to_ref_1_1_4 = Direct_message(
        message='Fourth Message', edited=False, created_at='2022-12-01 13:4:23.473031', user_id=1, ref_id=1)
    to_ref_1_2 = Direct_message(
        message='First Message', edited=False, created_at='2022-07-20 03:1:30.473031', user_id=2, ref_id=1)
    to_ref_1_3 = Direct_message(
        message='First Message', edited=False, created_at='2022-06-11 04:1:15.473031', user_id=3, ref_id=1)
    to_ref_1_4 = Direct_message(
        message='First Message', edited=False, created_at='2022-08-10 07:1:49.473031', user_id=4, ref_id=1)
    to_ref_2_1 = Direct_message(
        message='Second Message', edited=False, created_at='2022-09-15 18:2:23.473031', user_id=2, ref_id=2)
    to_ref_3_1 = Direct_message(
        message='Second Message', edited=False, created_at='2022-07-23 20:2:54.473031', user_id=3, ref_id=3)
    to_ref_4_1 = Direct_message(
        message='Second Message', edited=False, created_at='2022-08-17 06:2:26.473031', user_id=4, ref_id=4)
    to_ref_1_2_2 = Direct_message(
        message='Third Message', edited=False, created_at='2022-10-21 04:3:12.473031', user_id=1, ref_id=2)
    to_ref_2_1_2 = Direct_message(
        message='Fourth Message', edited=False, created_at='2022-12-28 01:4:04.473031', user_id=2, ref_id=1)
    to_ref_1_3_2 = Direct_message(
        message='Third Message', edited=False, created_at='2022-09-12 12:3:07.473031', user_id=1, ref_id=3)
    to_ref_3_1_2 = Direct_message(
        message='Fourth Message', edited=False, created_at='2022-11-10 10:4:09.473031', user_id=3, ref_id=1)
    to_ref_1_4_2 = Direct_message(
        message='Third Message', edited=False, created_at='2022-9-14 06:2:26.473031', user_id=1, ref_id=4)
    to_ref_4_1_2 = Direct_message(
        message='Fourth Message', edited=False, created_at='2022-12-01 04:3:12.473031', user_id=4, ref_id=1)

    db.session.add(to_ref_1_1)
    db.session.add(to_ref_1_1_2)
    db.session.add(to_ref_1_1_3)
    db.session.add(to_ref_1_1_4)
    db.session.add(to_ref_1_2)
    db.session.add(to_ref_1_3)
    db.session.add(to_ref_1_4)
    db.session.add(to_ref_2_1)
    db.session.add(to_ref_3_1)
    db.session.add(to_ref_4_1)
    db.session.add(to_ref_1_2_2)
    db.session.add(to_ref_2_1_2)
    db.session.add(to_ref_1_3_2)
    db.session.add(to_ref_3_1_2)
    db.session.add(to_ref_1_4_2)
    db.session.add(to_ref_4_1_2)

    db.session.commit()


def undo_direct_messages():
    db.session.execute('TRUNCATE direct_messages RESTART IDENTITY CASCADE;')
    db.session.commit()