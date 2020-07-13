import faunadb, { query as q, values as FaunaValues } from "faunadb"

const secret = <string>process.env.FAUNADB_SECRET_KEY;
const client = new faunadb.Client({ secret })

export async function getHits(id: string): Promise<FaunaValues.Document<Hit>> {
  const doc = await getDocument(id);

  if (doc) {
    return updateDocumet(doc.ref.id, doc.data.hits + 1);
  } else {
    return createDocumet(id);
  }
}

async function getDocument(id: string): Promise<FaunaValues.Document<Hit> | undefined> {
  try {
    return await client.query(
      q.Get(
        q.Match(
          q.Index('hits_by_id'), id
        )
      )
    );
  } catch (e) {
    return undefined;
  }
}

async function createDocumet(id: string): Promise<FaunaValues.Document<Hit>> {
  return await client.query(
    q.Create(
      q.Collection('hits'),
      {
        data: {
          id: id,
          hits: 1,
        }
      }
    )
  );
}

async function updateDocumet(ref: string, hits: number): Promise<FaunaValues.Document<Hit>> {
  return await client.query(
    q.Update(
      q.Ref(q.Collection('hits'), ref),
      {
        data: {
          hits,
        }
      }
    )
  );
}
