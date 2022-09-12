from flask.cli import AppGroup
from .users import seed_users, undo_users
from .channels import seed_channels, undo_channels
from .users_channels import seed_users_channels, undo_users_channels
from .channel_messages import seed_channel_messages, undo_channel_messages
from .direct_messages import seed_direct_messages, undo_direct_messages

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_channels()
    seed_channel_messages()
    seed_direct_messages()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_channels()
    undo_channel_messages()
    undo_direct_messages()