/** @jsx jsx */
import { jsx } from '@emotion/core';
import { GetServerSideProps } from 'next';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import fetcher from '../../../../lib/fetcher';
import BackIcon from '../../../../static/svg/back.svg';
import { composeQuery } from '../../../../utils';
import AssetDetail from '../../../../src/components/assetDetail';

import { RootState, wrapper } from '../../../../src/redux/assets';
import BackButton from '../../../../src/components/backButton';
import { setAssetDetail } from '../../../../src/redux/details';

const DetailPage: React.FC<{ initialData: any }> = props => {
  // fixme connect with client store and demonstrate skeleton loading on SSR?

  const { query } = useRouter();
  const dispatch = useDispatch();
  const { data, error } = useSWR(composeQuery(`${query.type}/${query.id}`), fetcher, {
    initialData: props.initialData,
  });
  useEffect(() => {
    data && dispatch(setAssetDetail(data));
  }, [data]);

  return (
    <section>
      <BackButton>
        {
          <BackIcon
            /*// @ts-ignore*/
            viewBox="0 0 24 24"
            width={48}
            height={48}
            css={{ width: '48px', height: '48px', border: 'none', background: 'transparent', fill: 'none' }}
          />
        }
      </BackButton>
      {data ? (
        <div>
          <AssetDetail {...data} />
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </section>
  );
};
export const getServerSideProps: GetServerSideProps = async context => {
  const initialData = await fetcher(composeQuery(`${context.query.type}/${context.query.id}`));
  return { props: { initialData } };
};

export default wrapper.withRedux(DetailPage);
