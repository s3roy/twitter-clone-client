import Twitterlayout from '@/components/feedcard/Layout/Twitterlayout';
import type { NextPage } from 'next';
import { BsArrowLeftShort } from 'react-icons/bs';

const UserProfilePage: NextPage = () => {
  return (
    <div>
      <Twitterlayout>
        <div>
          <nav>
            <BsArrowLeftShort className="text-4xl" />
          </nav>
        </div>
      </Twitterlayout>
    </div>
  );
};

export default UserProfilePage;
