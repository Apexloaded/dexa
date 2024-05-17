export enum StorageTypes {
  ACCESS_TOKEN = "dexa.access-token",
  IS_WELCOME = "dexa.welcome",
  AUTH_USER = "dexa.auth_user",
  REFERRER = "dexa.referrer",
  NEXT_SESSION_TOKEN = "next-auth.session-token",
}

export enum QueryKeys {
  AUTH = "AUTH",
  WALLET = "WALLET",
  PROFILE = "PROFILE",
}

export enum BucketVisibilityType {
  Unspecified = 0,
  PublicRead = 1,
  Private,
  Inherit,
}

export enum EventTypes {
  HELLO = "HELLO",
}
