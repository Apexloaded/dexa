import React from "react";
import Aside from "@/components/Layouts/Aside";
import Section from "@/components/Layouts/Section";
import PostDetails from "@/components/Posts/PostDetails";
import BackButton from "@/components/ui/BackButton";

type Props = {
  params: { username: string; id: string };
};

function MintDetails({ params: { id } }: Props) {
  return (
    <div className="flex space-x-5">
      <Section>
        <div className="py-3 px-2 bg-white xl:bg-white/95 sticky z-50 top-0">
          <div className="flex items-center justify-start space-x-2">
            <BackButton />
            <p className="text-xl font-semibold">Post</p>
          </div>
        </div>
        <div>
          <PostDetails id={id} />
        </div>
      </Section>
      <Aside>
        <div></div>
      </Aside>
    </div>
  );
}

export default MintDetails;
