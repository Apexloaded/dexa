"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/Form/Button";
import {
  CalendarPlusIcon,
  ImageIcon,
  ShieldQuestionIcon,
  SmilePlusIcon,
  VideoIcon,
} from "lucide-react";
import { GifIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import ape1 from "@/assets/nft/1.png";
import ToggleMintType from "./ToggleMintType";
import Link from "next/link";
import CLEditor from "../Editor/Editor";
import PostCounter from "./PostCounter";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { postResolver } from "@/schemas/post.schema";
import { useGreenField } from "@/context/greenfield.context";
import { useAccount, useWriteContract } from "wagmi";
import { generateToken, lowerTokenAlphaNumeric } from "@/libs/generateId";
import { ReedSolomon } from "@bnb-chain/reed-solomon";
import { CreateObject, StoreBucket } from "@/interfaces/bucket.interface";
import FileSelector from "../ui/FileSelector";
import MediaPreview from "../ui/MediaPreview";
import ShowError from "../Form/ShowError";
import toast from "react-hot-toast";
import { createPost } from "@/actions/post.action";
import { VisibilityType } from "@bnb-chain/greenfield-js-sdk";
import { useIndexDB } from "@/context/indexDB.context";
import { Stores } from "@/hooks/indexDB.hook";
import { useDexa } from "@/context/dexa.context";
import RemintFee from "./RemintFee";
import { Coin } from "@/interfaces/feed.interface";
import { ethers } from "ethers";

function NewPost() {
  let loadToast: string;
  const [maxWord] = useState(70);
  const [remintFee, setRemintFee] = useState<string>("0");
  const [token, selectToken] = useState<Coin>();
  const mediaRef = useRef<HTMLInputElement>(null);
  const [bucket, setBucket] = useState<string>();
  const [percentage, setPercentage] = useState(0);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [exceededCount, setExceededCount] = useState(0);
  const { address } = useAccount();
  const { isDBInit, getData } = useIndexDB();
  const { writeContractAsync } = useWriteContract();
  const { FeedsABI, dexaFeeds } = useDexa();
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid, errors, isSubmitting },
    watch,
  } = useForm({
    ...postResolver,
    reValidateMode: "onChange",
    mode: "onChange",
  });
  const content = watch("content", "");
  const isEmptyContent = content === "<p></p>";

  useEffect(() => {
    const init = async () => {
      if (!isDBInit) return;
      const allBucket = await getData<StoreBucket>(Stores.Buckets);
      const bucket = allBucket.find((f) => f.address == address && f.isDefault);
      if (bucket) setBucket(bucket.name);
    };
    init();
  }, [isDBInit]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const { content, access_level } = data;
      if (!address || !mediaFile) return;
      loadToast = toast.loading("Creating post", {
        position: "bottom-center",
      });
      const formData = new FormData();
      formData.append("file", mediaFile);
      formData.append("content", content);
      formData.append("visibility", access_level);
      formData.append("bucketName", "dexa");

      const response = await createPost(formData);
      if (response.code == 200 && response.message == "success") {
        toast.loading("Minting post", {
          id: loadToast,
        });
        const { tokenURI, externalURI, postId } = response.data;
        const price = remintFee != "" ? remintFee : "0";
        writeContractAsync(
          {
            abi: FeedsABI,
            address: dexaFeeds,
            functionName: "mintPost",
            args: [
              postId,
              externalURI,
              ethers.parseEther(price),
              token?.address,
            ],
          },
          {
            onSuccess: async (data) => {
              toast.success("Post created", {
                id: loadToast,
              });
              resetForm();
            },
            onError(error) {
              toast.error(`${error.message}`, {
                id: loadToast,
              });
            },
          }
        );
      } else {
        toast.error("error creating post", {
          id: loadToast,
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, {
          id: loadToast,
        });
      }
      if (err && typeof err === "object") {
        toast.error(JSON.stringify(err), {
          id: loadToast,
        });
      }
    }
  };

  const onWordCount = (count: number) => {
    const percentage = (count / maxWord) * 100;
    setPercentage(percentage);
    if (count > maxWord) {
      const excess = count - maxWord;
      setExceededCount(excess);
    }
  };

  const toggleMedia = () => {
    if (mediaRef.current) mediaRef.current.click();
  };

  const removeMedia = () => {
    reset({ images: undefined });
    setMediaFile(null);
    if (mediaRef.current) mediaRef.current.value = "";
  };

  const resetForm = () => {
    reset();
    removeMedia();
    setRemintFee("0");
  };

  return (
    <div className="px-5 pt-2 flex items-start space-x-3">
      <Link href="">
        <div className="hover:bg-dark/20 cursor-pointer h-10 w-10 rounded-full absolute"></div>
        <Image
          height={100}
          width={100}
          alt=""
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-700"
          src={ape1}
        />
      </Link>
      <div className="flex-1 flex flex-col relative">
        <div className="flex justify-between items-center">
          <RemintFee
            value={remintFee}
            onInput={setRemintFee}
            selectedCoin={token}
            onSelectCoin={selectToken}
          />
          <div className="flex items-center right-0 absolute gap-1">
            <p className="text-sm text-primary font-semibold">{remintFee}</p>
            <p className="text-sm">{token?.name}</p>
            {token && <token.icon />}
          </div>
        </div>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <CLEditor
                onWordCount={onWordCount}
                onUpdate={onChange}
                defaultValue={value}
              />
              <MediaPreview file={mediaFile} onClear={removeMedia} />
              {errors.images && <ShowError error={errors.images.message} />}
            </>
          )}
          name={"content"}
        />
        <div className="py-2">
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <ToggleMintType
                onSelect={(option) => {
                  onChange(option.id);
                }}
              />
            )}
            name={"access_level"}
            defaultValue={"1"}
          />
        </div>
        <div className="flex items-center justify-between border-t border-light py-[0.6rem]">
          <div className="flex items-center">
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <FileSelector
                    onSelect={(ev) => {
                      if (ev.target.files) {
                        const file = ev.target.files[0];
                        setMediaFile(file);
                        setValue("images", file);
                        onChange(file);
                      }
                    }}
                    ref={mediaRef}
                    accept="image/png, image/jpeg"
                  />
                  <Button
                    type={"button"}
                    kind={"default"}
                    shape={"CIRCLE"}
                    onClick={toggleMedia}
                    className="text-primary hover:bg-primary/20"
                    hoverColor={false}
                    title="Media"
                  >
                    <ImageIcon size={18} />
                  </Button>
                </>
              )}
              name={"images"}
            />

            <Button
              type={"button"}
              kind={"default"}
              shape={"CIRCLE"}
              className="text-primary hover:bg-primary/20"
              hoverColor={false}
              title="GIF"
            >
              <GifIcon height={23} />
            </Button>
            <Button
              type={"button"}
              kind={"default"}
              shape={"CIRCLE"}
              className="text-primary hover:bg-primary/20"
              hoverColor={false}
              title="Emoji"
            >
              <SmilePlusIcon size={18} />
            </Button>
            <Button
              type={"button"}
              kind={"default"}
              shape={"CIRCLE"}
              className="text-primary hover:bg-primary/20"
              hoverColor={false}
              title="Pool"
            >
              <ShieldQuestionIcon size={18} />
            </Button>
            <Button
              type={"button"}
              kind={"default"}
              shape={"CIRCLE"}
              className="text-primary hover:bg-primary/20"
              hoverColor={false}
              title="Schedule"
            >
              <CalendarPlusIcon size={18} />
            </Button>
            <Link
              href="/live"
              className="flex gap-1 rounded-md select-none text-white cursor-pointer hover:bg-danger/90 bg-danger items-center px-[0.5rem] py-[0.2rem]"
            >
              <VideoIcon size={18} />
              <p className="text-sm">Live</p>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {percentage > 100 && (
                <p className="text-xs text-danger">-{exceededCount}</p>
              )}
              <PostCounter showText={false} progress={percentage} />
            </div>

            <Button
              type={"submit"}
              kind={"primary"}
              shape={"ROUNDED"}
              className="font-medium"
              disabled={!isValid || isEmptyContent || isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              Mint
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
