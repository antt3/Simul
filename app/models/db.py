from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


db = SQLAlchemy()


Users_Channels = db.Table(
  'users_channels',
  db.Model.metadata,
  db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('channels', db.Integer, db.ForeignKey('channels.id'), primary_key=True)
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    hashed_password = db.Column(db.String(50), nullable=False)
    team = db.Column(db.String(100), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    nickname = db.Column(db.String(40), nullable=True)
    bio = db.Column(db.String(255), nullable=True)
    status = db.Column(db.Boolean, nullable=True)
    profile_pic = db.Column(db.String(2000), nullable=True)

    channels = db.relationship("Channel", secondary=Users_Channels, back_populates='user')
    channel_message = db.relationship('Channel_Message', back_populates='user')

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
            'team': self.team,
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
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  
    user = db.relationship('User', secondary=Users_Channels, back_populates='channels')
    channel_message = db.relationship('Channel_message', back_populates='channels')
  
  
    def to_dict(self):
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
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)


    user = db.relationship('User', back_populates='channel_messages')
    channel = db.relationship('Channel', back_populates='channel_messages')
  
  
    def to_dict(self):
        return{
            "id": self.id,
            "message": self.message,
            "user": self.user.to_dict(),
            "channel": self.channel.to_dict()
        }