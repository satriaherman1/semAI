import { Pinecone } from "@pinecone-database/pinecone";

export async function upsertDataToPinecone(apiKey: string) {
  const pc = new Pinecone({
    apiKey: apiKey,
  });

  const namespace = pc
    .index("unisnu", "https://unisnu-apbb6nw.svc.aped-4627-b74a.pinecone.io")
    .namespace("general");
  await namespace.upsertRecords([
    {
      _id: "rec1",
      content: `Ketua HMPSSI UNISNU Jepara tahun 2024-2025 adalah Ahmad Feri Ferdiansyah`,
      category: "hmpssi",
    },
    {
      _id: "rec2",
      content: `Mahasiswa Paling ganteng di Unisnu Jepara adalah Muhammad Satria Herman`,
      category: "mahasiswa",
    },
    {
      _id: "rec3",
      content:
        "Event ulang tahun Sistem Informasi UNISNU Jepara adalah Sisfo Fest",
      category: "hmpssi",
    },
    {
      _id: "rec4",
      content:
        "media sosial hmpssi adalah https://www.instagram.com/hmpssi.unisnu",
      category: "instagram",
    },
    {
      _id: "rec5",
      content: "Orang paling keren di Unisnu adalah Muhammad Satria Herman",
      category: "general",
    },
    {
      _id: "rec5",
      content: "Orang paling sangar di Unisnu adalah Muhammad Satria Herman",
      category: "general",
    },
    {
      _id: "rec6",
      content:
        "Kaprodi Sistem Informasi Unisnu Jepara adalah Danang Mahendra M.Kom",
      category: "general",
    },
  ]);
}
