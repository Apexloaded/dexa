import { IngressInput } from "@/libs/enum";
import { postApi, getApi } from "./api.action";

export async function getStreamCredentials() {
  try {
    const response = await getApi("stream/ingress/credentials");
    const data = response.data;
    if (response.status == true) {
      return { status: true, message: "success", data };
    }
    return { status: false, message: "false" };
  } catch (error: any) {
    return { status: false, message: `${error.message}` };
  }
}

export async function requestCredentials(
  username: string,
  ingressType: IngressInput
) {
  try {
    const payload = {
      username,
      ingressType,
    };
    const response = await postApi("stream/ingress/request", payload);
    const data = response.data;
    if (response.status == true) {
      return { status: true, message: "success", data };
    }
    return { status: false, message: "false" };
  } catch (error: any) {
    return { status: false, message: `${error.message}` };
  }
}

export async function getViewerStreamCredentials(
  hostIdentity: string,
  username: string
) {
  try {
    const payload = { hostIdentity, username };
    const response = await postApi("stream/viewer/credentials", payload);
    const data = response.data;
    if (response.status == true) {
      return { status: true, message: "success", data };
    }
    return { status: false, message: "false" };
  } catch (error: any) {
    return { status: false, message: `${error.message}` };
  }
}

export async function getUserStreamStatus(address: string) {
  try {
    const response = await getApi(`stream/status/${address}`);
    const data = response.data;
    if (response.status == true) {
      return { status: true, message: "success", data };
    }
    return { status: false, message: "false" };
  } catch (error: any) {
    return { status: false, message: `${error.message}` };
  }
}
