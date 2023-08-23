import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import React, { useCallback, useMemo } from 'react';
import { BiHash, BiHomeCircle, BiMoney, BiUser } from 'react-icons/bi';
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from 'react-icons/bs';
import { SlOptions } from 'react-icons/sl';
import { useCurrentUser } from '@/hooks/user';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { graphqlClient } from '@/clients/api';
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

interface TwitterlayoutProps {
  children: React.ReactNode;
}

const Twitterlayout: React.FC<TwitterlayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const sidebarMenuItems: TwitterSidebarButton[] = useMemo(
    () => [
      {
        title: 'Home',
        icon: <BiHomeCircle />,
        link: '/',
      },
      {
        title: 'Explore',
        icon: <BiHash />,
        link: '/',
      },
      {
        title: 'Notifications',
        icon: <BsBell />,
        link: '/',
      },
      {
        title: 'Messages',
        icon: <BsEnvelope />,
        link: '/',
      },
      {
        title: 'Bookmarks',
        icon: <BsBookmark />,
        link: '/',
      },
      {
        title: 'Twitter Blue',
        icon: <BiMoney />,
        link: '/',
      },
      {
        title: 'Profile',
        icon: <BiUser />,
        link: `/${user?.id}`,
      },
      {
        title: 'More Options',
        icon: <SlOptions />,
        link: '/',
      },
    ],
    []
  );

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
      <div className="grid grid-cols-12 h-screen w-screen sm:px-56">
        <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
          <div>
            <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
              <BsTwitter />
            </div>
            <div className="mt-1 text-xl pr-4">
              <ul>
                {sidebarMenuItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 cursor-pointer w-fit mt-2"
                      href={item.link}
                    >
                      <span className=" text-3xl">{item.icon}</span>
                      <span className="hidden sm:inline">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5 px-3">
                <button className="hidden sm:block bg-[#1d9bf0] font-semibold rounded-full w-full  py-2 px-4 text-lg">
                  Tweet
                </button>
                <button className="block sm:hidden bg-[#1d9bf0] font-semibold rounded-full w-full  py-2 px-4 text-lg">
                  <BsTwitter />
                </button>
              </div>
            </div>
          </div>
          {user && (
            <div className="mt-5 absolute bottom-5 flex gap-2 items-center bg-slate-800 rounded-full px-3 py-2">
              {user?.profileImageURL && (
                <Image
                  src={user?.profileImageURL}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div className="hidden sm:block">
                <h3 className="text-xl">{user.firstName}</h3>
                <h3 className="text-xl">{user.lastName}</h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-10 sm:col-span-5  border-l-[1px] border-r-[1px] border-gray-600 h-screen overflow-scroll">
          {props.children}
        </div>
        <div className="col-span-0 sm:col-span-3 p-5">
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
};

export default Twitterlayout;
