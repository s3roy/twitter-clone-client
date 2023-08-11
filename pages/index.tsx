import Image from 'next/image';
import { Inter } from 'next/font/google';
import { BsTwitter, BsBell, BsEnvelope, BsBookmark } from 'react-icons/bs';
import { BiHomeCircle, BiHash, BiUser } from 'react-icons/bi';

const inter = Inter({ subsets: ['latin'] });
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
    title: 'Profile',
    icon: <BiUser />,
  },
];
export default function Home() {
  return (
    <div className={inter.className}>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-8 px-4">
          <div className="text-4xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
            <BsTwitter />
          </div>
          <div className="mt-4 text-2xl pr-4">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-5 py-2 cursor-pointer w-fit mt-2"
                  key={item.title}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-3">
              <button className="bg-[#1d9bf0] font-semibold rounded-full w-full mx-4  p-4 text-lg">
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-6 border-l-[1px] border-r-[1px] border-gray-400"></div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
