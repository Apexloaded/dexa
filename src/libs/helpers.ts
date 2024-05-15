import { generateToken, lowerTokenAlphaNumeric } from "./generateId";

export function toOxString(value?: string) {
  return value as `0x${string}`;
}

export function formatWalletAddress(
  walletAddress: string,
  separator?: string,
  startAt?: number,
  endAt?: number
) {
  if (typeof walletAddress !== "string" || walletAddress.length < 6) {
    return "Invalid wallet address";
  }

  const prefix = startAt
    ? walletAddress.substring(0, startAt)
    : walletAddress.substring(0, 5);
  const suffix = endAt
    ? walletAddress.substring(walletAddress.length - endAt)
    : walletAddress.substring(walletAddress.length - 4);
  const div = separator ? separator : "...";

  return `${prefix}${div}${suffix}`;
}

export const getWagmiError = (inputString: string) => {
  // Split the input string by line breaks
  const lines = inputString.split("\n");

  // Initialize an empty array to store the sentences
  const sentences = [];

  // Iterate through each line
  for (let line of lines) {
    // Trim leading and trailing whitespace from the line
    line = line.trim();

    // If the line is not empty, split it into sentences and add the first sentence to the array
    if (line !== "") {
      // Split the line into sentences using period ('.') as the delimiter
      const lineSentences = line.split(".");

      // Add the first sentence to the array
      sentences.push(lineSentences[0]);

      // Break the loop as we only need the first sentence
      break;
    }
  }

  // Join the sentences array into a single string and return it
  return sentences.join(". ");
};

export function generateBucket(address: string) {
  const bucketName = formatWalletAddress(`${address}`, "-", 5, 5);
  const bucketId = generateToken(lowerTokenAlphaNumeric, 5, true);
  const defaultBucket = `dexa-${bucketName}-${bucketId}`.toLowerCase();
  return defaultBucket;
}

export const walletToLowercase = (wallet: string) => {
  return wallet.toLowerCase();
};

export const weiToUnit = (wei: string | number) => {
  const unit = Number(wei) / 1e18;
  return unit;
};
