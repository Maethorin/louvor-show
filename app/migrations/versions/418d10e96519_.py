"""empty message

Revision ID: 418d10e96519
Revises: b2b2731b2d17
Create Date: 2016-01-31 13:10:59.414205

"""

# revision identifiers, used by Alembic.
revision = '418d10e96519'
down_revision = 'b2b2731b2d17'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('estrofes', sa.Column('indice', sa.Integer(), nullable=True))
    op.add_column('versos', sa.Column('ordem', sa.Integer(), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('versos', 'ordem')
    op.drop_column('estrofes', 'indice')
    ### end Alembic commands ###
