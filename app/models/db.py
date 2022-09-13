from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import backref

db = SQLAlchemy()


# Users_Channels = db.Table(
#   'users_channels',
#   db.Model.metadata,
#   db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#   db.Column('channels', db.Integer, db.ForeignKey('channels.id'), primary_key=True)
# )


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    nickname = db.Column(db.String(40), nullable=True)
    bio = db.Column(db.String(255), nullable=True)
    status = db.Column(db.Boolean, nullable=True)
    profile_pic = db.Column(db.String(2000), nullable=True)

    channels = db.relationship("Channel", back_populates='user')
    channel_messages = db.relationship('Channel_message', back_populates='user')
    # user = db.relationship("Direct_message", foreign_keys='direct_messages.user_id', back_populates="dm_user")
    # ref = db.relationship("Direct_message", foreign_keys='direct_messages.ref_id', back_populates="dm_ref")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'full_name': self.full_name,
            'nickname': self.nickname,
            'bio': self.bio,
            'status': self.status,
            'profile_pic': self.profile_pic
        }


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(100), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
  
    user = db.relationship('User', back_populates='channels')
    channel_messages = db.relationship('Channel_message', back_populates='channels', cascade="all, delete")
  
  
    def to_dict(self):
        # print('---------Channel.user: ', self.user, '-----------')
        return{
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "user": self.user.to_dict()
        }


class Channel_message(db.Model):
    __tablename__ = 'channel_messages'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(255), nullable=False)
    edited = db.Column(db.Boolean, nullable=True)
    created_at = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(Channel.id), nullable=False)

    user = db.relationship('User', back_populates='channel_messages')
    channels = db.relationship('Channel', back_populates='channel_messages')
  
  
    def to_dict(self):
        # print('---------Channel_messages.user: ', self.user, '-----------')
        # print('---------Channel_messages.user: ', self.channels, '-----------')
        return{
            "id": self.id,
            "message": self.message,
            "edited": self.edited,
            "created_at": self.created_at,
            "user": self.user.to_dict(),
            "channel": self.channels.to_dict()
        }


class Direct_message(db.Model):
    __tablename__ = 'direct_messages'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(255), nullable=False)
    edited = db.Column(db.Boolean, nullable=True)
    created_at = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    ref_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)

    dm_user = db.relationship("User", backref = backref("user", uselist=False), foreign_keys=[user_id])
    dm_ref = db.relationship("User", backref = backref("ref", uselist=False), foreign_keys=[ref_id])
  
  
    def to_dict(self):
        # print('---------Channel_messages.user: ', self.user, '-----------')
        # print('---------Channel_messages.user: ', self.channels, '-----------')
        return{
            "id": self.id,
            "message": self.message,
            "edited": self.edited,
            "created_at": self.created_at,
            "user": self.dm_user.to_dict(),
            "ref": self.dm_ref.to_dict()
        }