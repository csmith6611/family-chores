import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import NotAvailable from "@/components/ErrorMessage/NotAvailable";
import ThumbsUp from "@/components/Icons/ThumbsUp";
import LoadingMessage from "@/components/Loading/Loading";
import VideoGrid from "@/components/Video/VideoGrid";
import { api } from "@/utils/api";
import { assertString } from "@/utils/helpers";
import { useSession } from "next-auth/react";

const LikedVideo = () => {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id ?? "";

  assertString(userId);

  const { data, isLoading, isRefetching, error, refetch } =
    api.playlist.getLikedVideos.useQuery({
      userId,
    });

  if (isLoading || isRefetching) return <LoadingMessage />;
  if (!(!error && data))
    return (
      <ErrorMessage
        icon="GreenPlay"
        message="Error Getting Liked Videos"
        description="Sorry the request cannot be fulfilled."
      />
    );

  return (
    <div className="flex w-full flex-col">
      {data && data.videos.length > 0 ? (
        <div className="flex w-full flex-col p-6">
          <section className="mb-4 ">
            <h2 className="-mb-6 pl-8 text-xl font-semibold">
              <ThumbsUp className="mr-2 inline h-5 w-5 shrink-0 stroke-gray-900" />
              Liked Videos
            </h2>
            <VideoGrid data={data} />;
          </section>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <NotAvailable variant="liked" />
        </div>
      )}
    </div>
  );
};

export default LikedVideo;