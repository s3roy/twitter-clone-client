import { BsTwitter, BsBell, BsEnvelope, BsBookmark } from 'react-icons/bs';
import {
  BiHomeCircle,
  BiHash,
  BiUser,
  BiMoney,
  BiImageAlt,
} from 'react-icons/bi';
import FeedCard from '@/components/feedcard/FeedCard';
import { SlOptions } from 'react-icons/sl';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

import { verifyUserGoogleTokenQuery } from '@/graphql/query/user';
import { useCurrentUser } from '@/hooks/user';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { graphqlClient } from '@/clients/api';

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: 'Home',
    icon: <BiHomeCircle />,
  },
  {
    title: 'Explore',
    icon: <BiHash />,
  },
  {
    title: 'Notifications',
    icon: <BsBell />,
  },
  {
    title: 'Messages',
    icon: <BsEnvelope />,
  },
  {
    title: 'Bookmarks',
    icon: <BsBookmark />,
  },
  {
    title: 'Twitter Blue',
    icon: <BiMoney />,
  },
  {
    title: 'Profile',
    icon: <BiUser />,
  },
  {
    title: 'More Options',
    icon: <SlOptions />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
  }, []);

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error('Google token not found');

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success('Verified Success');
      console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem('__twitter_token', verifyGoogleToken);

      await queryClient.invalidateQueries(['current-user']);
    },
    [queryClient]
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-1 ml-28 relative">
          <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
            <BsTwitter />
          </div>
          <div className="mt-1 text-xl pr-4">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 cursor-pointer w-fit mt-2"
                  key={item.title}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-3">
              <button className="bg-[#1d9bf0] font-semibold rounded-full w-full  py-2 px-4 text-lg">
                Tweet
              </button>
            </div>
          </div>
          {user && (
            <div className="mt-5 absolute bottom-5 flex gap-2 items-center bg-slate-800 rounded-full px-3 py-2">
              {user && user.profileImageUrl && (
                <Image
                  src={user?.profileImageUrl}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div>
                <h3 className="text-xl">{user.firstName}</h3>
                <h3 className="text-xl">{user.lastName}</h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-5  border-l-[1px] border-r-[1px] border-gray-600 h-screen overflow-scroll">
          <div>
            <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                  {user?.profileImageUrl && (
                    <Image
                      className="rounded-full"
                      src={user?.profileImageUrl}
                      alt="user-image"
                      height={50}
                      width={50}
                    />
                  )}
                </div>

                <div className="col-span-11">
                  <textarea
                    className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
                    placeholder="What's happening?"
                    rows={5}
                  ></textarea>
                  <div className="mt-2 flex justify-between items-center">
                    <BiImageAlt
                      onClick={handleSelectImage}
                      className="text-xl"
                    />
                    <button className="bg-[#1d9bf0] font-semibold rounded-full py-2 px-4 text-sm">
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 p-5">
          {user && (
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="">New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
