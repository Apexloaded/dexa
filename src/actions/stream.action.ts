// "use server";

// import { STREAM_KEY, STREAM_SECRET } from "@/config/env";
// import { StreamClient } from "@stream-io/node-sdk";

// export const getStreamToken = async (userId: string) => {
//   const key = STREAM_KEY;
//   const secret = STREAM_SECRET;

//   if (key && secret && userId) {
//     const streamClient = new StreamClient(key, secret);
//     const expireAt = Math.floor(Date.now() / 1000) * 60 * 60;
//     const issuedAt = Math.floor(Date.now() / 1000) - 60;
//     const token = streamClient.createToken(userId, expireAt, issuedAt);
//     return token;
//   }
// };
