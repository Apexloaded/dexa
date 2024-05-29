"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux.hook";
import { setSidebar } from "@/slices/sidebar/sidebar.slice";
import Section from "@/components/Layouts/Section";
import LiveHeader from "@/components/Live/LiveHeader";
import Input from "@/components/Form/Input";
import Label from "@/components/Form/Label";
import Button from "@/components/Form/Button";
import CopyButton from "@/components/Live/CopyButton";
import { IStreamCredentials } from "@/interfaces/stream.interface";
import { useAuth } from "@/context/auth.context";
import RequestKey from "@/components/Live/RequestKey";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  getStreamCredentials,
  requestCredentials,
} from "@/actions/stream.action";
import { IngressInput, QueryKeys } from "@/libs/enum";
import useToast from "@/hooks/toast.hook";

function StreamKey() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { loading, error, success } = useToast();
  const [credentials, setCredentials] = useState<IStreamCredentials>();
  const [isHide, setIsHide] = useState<boolean>(true);
  const {
    control,
    formState: { isSubmitting, isLoading },
  } = useForm();
  const { data, refetch } = useQuery({
    queryKey: [QueryKeys.STREAM_AUTH],
    queryFn: getStreamCredentials,
    enabled: user ? true : false,
  });

  useEffect(() => {
    dispatch(setSidebar(false));
  }, []);

  useEffect(() => {
    if (data) {
      const { serverUrl, streamKey, ingressId } =
        data.data as IStreamCredentials;
      setCredentials({ serverUrl, streamKey, ingressId });
    }
  }, [data]);

  const resetKey = async () => {
    try {
      if (!user) return;
      loading({ msg: "Requesting Key..." });
      const request = await requestCredentials(
        `${user.username}`,
        IngressInput.RTMP_INPUT
      );
      const data = request.data as IStreamCredentials;
      setCredentials(data);
      success({ msg: "Successful" });
    } catch (err: any) {
      error({ msg: err.message });
    }
  };

  return (
    <div className="">
      <LiveHeader title="Credentials" />
      <Section>
        {credentials ? (
          <>
            <div className="max-w-2xl mx-auto w-full p-5 my-5">
              <p className="text-xl font-semibold">Streaming Credentials</p>
              <p className="text-medium">
                Paste these credientials in your streaming software. (eg: OBS)
              </p>
            </div>
            <div className="max-w-2xl px-5 mx-auto w-full flex flex-col gap-10">
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2 mb-[0.65rem]">
                        <Label title="Stream key" />
                        <p className="text-medium text-sm">
                          (Paste in encoder)
                        </p>
                      </div>
                      <div
                        role="button"
                        className="px-5"
                        onClick={() => setIsHide(!isHide)}
                      >
                        <p className="text-medium font-semibold text-sm uppercase">
                          {isHide ? "Show" : "Hide"} Key
                        </p>
                      </div>
                    </div>

                    <Input
                      readOnly
                      onChange={onChange}
                      value={value}
                      className="peer placeholder:text-transparent border border-medium rounded-sm"
                      placeholder="Stream key"
                      type={isHide ? "password" : "text"}
                    />
                    <Label
                      title="Stream key"
                      className="absolute left-0 px-2 ml-2 py-1 text-medium text-xs font-[400] bg-white -translate-y-3 duration-100 ease-linear peer-placeholder-shown:text-[1rem] peer-placeholder-shown:translate-y-3 peer-placeholder-shown:mt-[0.1rem] peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:mt-0"
                      isLowerCase={true}
                    />
                    <div className="absolute right-0 bottom-2">
                      <CopyButton value={credentials.streamKey} />
                    </div>
                  </div>
                )}
                name=""
                defaultValue={credentials.streamKey}
              />
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="relative">
                    <div className="flex items-center gap-x-2 mb-[0.65rem]">
                      <Label title="Stream URL" />
                    </div>
                    <Input
                      readOnly
                      value={value}
                      onChange={onChange}
                      className="peer placeholder:text-transparent border border-medium rounded-sm"
                      placeholder="Stream URL"
                    />
                    <Label
                      title="Stream URL"
                      className="absolute left-0 px-2 ml-2 py-1 text-medium text-xs font-[400] bg-white -translate-y-3 duration-100 ease-linear peer-placeholder-shown:text-[1rem] peer-placeholder-shown:translate-y-3 peer-placeholder-shown:mt-[0.1rem] peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:mt-0"
                      isLowerCase={true}
                    />
                    <div className="absolute right-0 bottom-2">
                      <CopyButton value={credentials.serverUrl} />
                    </div>
                  </div>
                )}
                name=""
                defaultValue={credentials.serverUrl}
              />
            </div>
            <div className="p-5 max-w-2xl mx-auto w-full mt-5 flex items-center justify-between">
              <div></div>
              <Button
                onClick={resetKey}
                kind="primary"
                type="button"
                className="px-[2rem] py-[0.7rem]"
                size="LARGE"
                shape="ROUNDED"
                disabled={isSubmitting || isLoading}
              >
                Reset Key
              </Button>
            </div>
          </>
        ) : (
          <RequestKey setCredentials={setCredentials} />
        )}
      </Section>
    </div>
  );
}

export default StreamKey;
