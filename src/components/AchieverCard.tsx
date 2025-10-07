import React from 'react';
import Tag from './Tag';
import Counter from './Counter';
import Image from 'next/image';

interface AchieverCardProps {
    title: string;
    description: string;
    image: string;
}

const AchieverCard: React.FC<AchieverCardProps> = ({ title, description, image }) => {
    return (
        <section className="max-sm:px-[16px] sm:px-[30px] lg:px-[50px] xl:px-[100px] py-[24px] md:py-[50px] bg-gradient-to-b from-white-700 to-blue-50">
        <div className="flex flex-col-reverse lg:flex-row  lg:gap-[120px] md:gap-[50px]">
            <div className="flex-1 pt-[32px] sm:pt-[64px] md:pt-0">
                <Tag
                    label='Impact'
                    textColor='text-[#A28610]'
                    backgroundColor='bg-[#F9F1D2]'
                />
                <h2 className="my-4 max-sm:text-[20px] sm:text-[32px] font-[500]">{title}</h2>
                <p className="my-6 leading-8 max-md:text-[16px] md:text-[18px] text-[#2E2E2E]">{description}</p>
                <div className="grid grid-cols-2 gap-[10px]">
                  <Counter
                   icon = {'/images/book.png'}
                   number={700}
                   label={'Students'}
                  />
                  <Counter
                   icon = {'/images/pen.png'}
                   number={30}
                   label={'Teachers'}
                  />
                  <Counter
                   icon = {'/images/happiness.png'}
                   number={1400}
                   label={'Happy Parents'}
                  />
                  <Counter
                   icon = {'/images/layers.png'}
                   number={3}
                   label={'Acres Campus'}
                  />
                </div>
            </div>
            <div className="flex-1 flex justify-center items-center lg:min-h-[420px]">
                <Image src={image} alt={title} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' , objectFit: 'cover', borderRadius:'20px'}} />
            </div>
        </div>
        </section>
    );
};

export default AchieverCard;

  