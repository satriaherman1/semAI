import { Pinecone } from "@pinecone-database/pinecone";

export default async function searchContext(input: string, apiKey: string) {
  const pc = new Pinecone({
    apiKey: apiKey,
  });

  const namespace = pc
    .index("unisnu", "https://unisnu-apbb6nw.svc.aped-4627-b74a.pinecone.io")
    .namespace("all");
  const response = await namespace.searchRecords({
    query: {
      topK: 1,

      inputs: { text: input },
    },

    fields: ["text", "category"],
  });
  let result = "";

  response.result.hits.map(({ fields }: any) => {
    result += fields.text;
  });

  console.log("Search input:", input);
  console.log("Context found:", response.result.hits.length, "hits");

  return result;
}
