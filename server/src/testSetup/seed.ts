import db from '../database/models';

export async function seedState() {
  let state = {
    key: '10',
    value: '11',
  }

  const seededState = await db.State.create(state);

  return seededState;
}