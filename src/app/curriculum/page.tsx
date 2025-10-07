import React from 'react';
import Banner from '@/components/Banner';
import SubTitle from '@/components/SubTitle';
import Title from '@/components/Title';
import Links from '@/components/Links';
import Image from 'next/image';
import { Breadcrumb } from '@/interfaces';

const breadcrumbs: Breadcrumb[] = [
  { label: 'Home', url: '/' },
  { label: 'Admission', url: '/admission' },
  { label: 'Curriculum', url: '' },
];

const CurriculumPage = () => {
  return (
    <>
      <Banner
        backgroundImage="/images/Section.png"
        pageTitle="Curriculum"
        breadcrumbs={breadcrumbs}
      />
      <Links />
      <section className="max-sm:px-[10px] sm:px-[30px] lg:px-[50px] xl:px-[100px] md:py-[50px] py-[24px] bg-[#F6F6FF]">
        <SubTitle subTitle="Know about our" textAlign="left" />
        <Title title="Curriculum Followed" textAlign="left" />
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Text Content */}
          <div className="flex-1">
            <div className="text-[#525252] font-inter text-[16px] md:text-[18px] font-normal leading-[140%]">
              <p className="mb-8">
                Conceptual learning is strengthened with multifarious exposure and interdisciplinary activities.
              </p>
              <p className="mb-8">
                Subject Enrichment Activities play a key role in cognitive enhancement and are instrumental in venturing beyond the textbooks for conferring learning relevant to the day to day life!
              </p>
              <p className="mb-8">
                Club Activities keep the zest of hands-on learning alive and constructive presentation of the knowledge acquired through activities, make learning relatable and fun-filled!
              </p>
              <p className="mb-8">
                The curriculum also entails reaching out to the community and imbibing empathy through social welfare drives, such as charitable donations in orphanages and old age homes.
              </p>
              <p className="mb-8">
                Students gain an in-depth and holistic perspective towards life!
              </p>
              <h3 className="font-semibold text-lg mt-6 mb-2">Curriculum Outline</h3>
              <p>
                Education is the foundation for a rewarding future. It is a philosophy based on the premise that each person finds identity, meaning, and purpose in life through connections to the community, to the natural world, and to spiritual values such as compassion and peace.
              </p>
            </div>
          </div>
          {/* Image */}
          <div className="flex-shrink-0">
            <Image
              src="/images/curriculum.png" // Update path as needed
              alt="Students"
              width={320}
              height={320}
              className="rounded-lg shadow-md object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default CurriculumPage;