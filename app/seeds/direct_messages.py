from app.models import db, Direct_message

def seed_direct_messages():
    to_ref_1_1 = Direct_message(
        message='First Message', edited=False, created_at='2022-08-10 10:1:23.473031', user_id=1, ref_id=1)
    to_ref_1_1_2 = Direct_message(
        message='Second Message', edited=False, created_at='2022-08-10 10:2:24.473031', user_id=1, ref_id=1)
    to_ref_1_1_3 = Direct_message(
        message='Third Message', edited=False, created_at='2022-08-10 10:3:25.473031', user_id=1, ref_id=1)
    to_ref_1_1_4 = Direct_message(
        message='Fourth Message', edited=False, created_at='2022-08-10 10:4:23.473031', user_id=1, ref_id=1)
    to_ref_1_2 = Direct_message(
        message='First Message', edited=False, created_at='2018-08-10 10:2:23.473031', user_id=2, ref_id=1)
    to_ref_1_3 = Direct_message(
        message='First Message', edited=False, created_at='2018-08-10 10:3:23.473031', user_id=3, ref_id=1)
    to_ref_1_4 = Direct_message(
        message='First Message', edited=False, created_at='2018-08-10 10:4:23.473031', user_id=4, ref_id=1)
    to_ref_2_1 = Direct_message(
        message='Second Message', edited=False, created_at='2018-08-10 10:1:23.473031', user_id=2, ref_id=2)
    to_ref_2_2 = Direct_message(
        message='First Message', edited=False, created_at='2018-08-10 10:2:24.473031', user_id=3, ref_id=2)
    to_ref_2_3 = Direct_message(
        message='First Message', edited=False, created_at='2018-08-10 10:3:25.473031', user_id=4, ref_id=2)
    to_ref_2_4 = Direct_message(
        message='First Message', edited=False, created_at='2018-08-10 10:4:23.473031', user_id=1, ref_id=2)
    to_ref_3_1 = Direct_message(
        message='Second Message', edited=False, created_at='2018-08-10 10:1:23.473031', user_id=3, ref_id=3)
    to_ref_3_2 = Direct_message(
        message='Second Message', edited=False, created_at='2018-08-10 10:2:23.473031', user_id=4, ref_id=3)
    to_ref_3_3 = Direct_message(
        message='First Message', edited=False, created_at='2018-08-10 10:3:23.473031', user_id=1, ref_id=3)
    to_ref_3_4 = Direct_message(
        message='First Message', edited=False, created_at='2018-08-10 10:4:23.473031', user_id=2, ref_id=3)
    to_ref_4_1 = Direct_message(
        message='Second Message', edited=False, created_at='2018-08-10 10:1:23.473031', user_id=4, ref_id=4)
    to_ref_4_2 = Direct_message(
        message='Second Message', edited=False, created_at='2018-08-10 10:2:23.473031', user_id=1, ref_id=4)
    to_ref_4_3 = Direct_message(
        message='Second Message', edited=False, created_at='2018-08-10 10:3:23.473031', user_id=2, ref_id=4)
    to_ref_4_4 = Direct_message(
        message='First Message', edited=False, created_at='2018-08-10 10:4:23.473031', user_id=3, ref_id=4)
    

    db.session.add(to_ref_1_1)
    db.session.add(to_ref_1_1_2)
    db.session.add(to_ref_1_1_3)
    db.session.add(to_ref_1_1_4)
    db.session.add(to_ref_1_2)
    db.session.add(to_ref_1_3)
    db.session.add(to_ref_1_4)
    db.session.add(to_ref_2_1)
    db.session.add(to_ref_2_2)
    db.session.add(to_ref_2_3)
    db.session.add(to_ref_2_4)
    db.session.add(to_ref_3_1)
    db.session.add(to_ref_3_2)
    db.session.add(to_ref_3_3)
    db.session.add(to_ref_3_4)
    db.session.add(to_ref_4_1)
    db.session.add(to_ref_4_2)
    db.session.add(to_ref_4_3)
    db.session.add(to_ref_4_4)

    db.session.commit()


def undo_direct_messages():
    db.session.execute('TRUNCATE direct_messages RESTART IDENTITY CASCADE;')
    db.session.commit()