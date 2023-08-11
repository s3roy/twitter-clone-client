import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen">
        <div className="col-span-3"></div>
        <div className="col-span-6 border-l-2 border-r-2 border-white"></div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
